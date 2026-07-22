import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isFirebaseConfigured } from "@/lib/firebase/admin";
import { validateRegistration } from "@/lib/validations/registration";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import type { RegistrationPayload } from "@/types/registration";

type RegisterBody = RegistrationPayload & { locale?: Locale };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const locale: Locale = body.locale === "en" ? "en" : "ar";
    const v = dictionaries[locale].validation;

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

    const validation = validateRegistration(body, locale);

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

    const db = getAdminDb();
    const docRef = await db.collection("hackathon_registrations").add({
      fullName: body.fullName.trim(),
      universityId: body.universityId.trim(),
      universityName: body.universityName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.replace(/\s|-/g, ""),
      track: body.track,
      teamName: body.teamName.trim(),
      memberCount: body.memberCount,
      members: body.members.map((member) => ({
        name: member.name.trim(),
        email: member.email.trim().toLowerCase(),
      })),
      projectIdea: body.projectIdea.trim(),
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
