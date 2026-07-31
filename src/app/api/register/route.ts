import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import {
  getAdminBucket,
  getAdminDb,
  isFirebaseConfigured,
} from "@/lib/firebase/admin";
import { validateRegistration } from "@/lib/validations/registration";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import type { RegistrationPayload, TeamMember, TrackId } from "@/types/registration";

export const runtime = "nodejs";

type RegisterBody = RegistrationPayload & { locale?: Locale };

function parseMembers(raw: unknown): TeamMember[] {
  if (Array.isArray(raw)) {
    return raw.map((m) => ({
      name: String((m as TeamMember)?.name ?? ""),
      email: String((m as TeamMember)?.email ?? ""),
    }));
  }
  if (typeof raw === "string") {
    try {
      return parseMembers(JSON.parse(raw));
    } catch {
      return [];
    }
  }
  return [];
}

async function parseRequest(request: Request): Promise<{
  body: RegisterBody;
  projectFile: File | null;
}> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const fd = await request.formData();
    const fileValue = fd.get("projectFile");
    const projectFile =
      fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

    const trackRaw = String(fd.get("track") ?? "");
    const track = (["academic", "campus", "digital"] as TrackId[]).includes(
      trackRaw as TrackId
    )
      ? (trackRaw as TrackId)
      : undefined;

    const body: RegisterBody = {
      fullName: String(fd.get("fullName") ?? ""),
      universityId: String(fd.get("universityId") ?? ""),
      universityName: String(fd.get("universityName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      participationType:
        String(fd.get("participationType") ?? "hackathon") === "showcase"
          ? "showcase"
          : "hackathon",
      track,
      teamName: String(fd.get("teamName") ?? ""),
      memberCount: Number(fd.get("memberCount") ?? 3),
      members: parseMembers(fd.get("members")),
      projectIdea: String(fd.get("projectIdea") ?? ""),
      major: String(fd.get("major") ?? ""),
      universityYear: String(fd.get("universityYear") ?? ""),
      graduationYear: String(fd.get("graduationYear") ?? ""),
      locale: String(fd.get("locale") ?? "ar") === "en" ? "en" : "ar",
    };

    return { body, projectFile };
  }

  const body = (await request.json()) as RegisterBody;
  return { body, projectFile: null };
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._\-\u0600-\u06FF]/g, "_").slice(0, 120);
}

async function uploadExhibitFile(file: File, email: string) {
  const bucket = getAdminBucket();
  const safeName = sanitizeFileName(file.name || "project");
  const path = `exhibit-projects/${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, "_")}_${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileRef = bucket.file(path);

  await fileRef.save(buffer, {
    metadata: {
      contentType: file.type || "application/octet-stream",
      metadata: {
        originalName: file.name,
        uploadedBy: email,
      },
    },
    resumable: false,
  });

  const [url] = await fileRef.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  return { path, url, name: file.name };
}

export async function POST(request: Request) {
  try {
    const { body, projectFile } = await parseRequest(request);
    const locale: Locale = body.locale === "en" ? "en" : "ar";
    const v = dictionaries[locale].validation;
    const isShowcase = body.participationType === "showcase";

    if (!isFirebaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            locale === "en"
              ? "Firebase is not configured yet. Please set environment variables in .env.local"
              : "Firebase غير مُعدّ بعد. يرجى ضبط متغيرات البيئة في ملف .env.local",
        },
        { status: 503 }
      );
    }

    const validation = validateRegistration(body, locale, {
      projectFile,
      hasProjectFile: Boolean(projectFile),
    });

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            locale === "en"
              ? "Please fix the errors in the form"
              : "يرجى تصحيح الأخطاء في النموذج",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    let projectFileName: string | undefined;
    let projectFileUrl: string | undefined;
    let projectFilePath: string | undefined;

    if (isShowcase && projectFile) {
      try {
        const uploaded = await uploadExhibitFile(
          projectFile,
          body.email.trim().toLowerCase()
        );
        projectFileName = uploaded.name;
        projectFileUrl = uploaded.url;
        projectFilePath = uploaded.path;
      } catch (uploadError) {
        console.error("Exhibit file upload error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message:
              locale === "en"
                ? "Could not upload the project file. Check Firebase Storage is enabled and FIREBASE_STORAGE_BUCKET is set."
                : "تعذر رفع ملف المشروع. تأكد من تفعيل Firebase Storage وضبط FIREBASE_STORAGE_BUCKET.",
            errors: { projectFile: v.projectFileUpload },
          },
          { status: 500 }
        );
      }
    }

    const db = getAdminDb();
    const docRef = await db.collection("hackathon_registrations").add({
      fullName: body.fullName.trim(),
      universityId: body.universityId.trim(),
      universityName: body.universityName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.replace(/\s|-/g, ""),
      participationType: body.participationType ?? "hackathon",
      track: isShowcase ? null : body.track,
      teamName: isShowcase ? "" : body.teamName.trim(),
      memberCount: isShowcase ? 1 : body.members.length + 1,
      // Leader is member 1; teammates from the form follow (up to 4).
      members: isShowcase
        ? []
        : [
            {
              name: body.fullName.trim(),
              email: body.email.trim().toLowerCase(),
              role: "leader",
            },
            ...body.members.map((member) => ({
              name: member.name.trim(),
              email: member.email.trim().toLowerCase(),
              role: "teammate",
            })),
          ],
      projectIdea: body.projectIdea.trim(),
      major: body.major?.trim() ?? "",
      universityYear: isShowcase ? null : body.universityYear?.trim() ?? "",
      graduationYear: isShowcase ? body.graduationYear?.trim() ?? "" : null,
      projectFileName: projectFileName ?? null,
      projectFileUrl: projectFileUrl ?? null,
      projectFilePath: projectFilePath ?? null,
      locale,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: v.successFallback,
      registrationId: docRef.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "حدث خطأ أثناء إرسال التسجيل. يرجى المحاولة لاحقاً. / An error occurred while submitting. Please try again later.",
      },
      { status: 500 }
    );
  }
}
