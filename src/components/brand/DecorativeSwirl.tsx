import Image from "next/image";
import { cn } from "@/lib/utils";

type DecorativeSwirlProps = {
  src: string;
  /** Figma X on the 1280-wide artboard */
  left: number;
  /** Figma Y relative to the section/frame top */
  top: number;
  /** Display width in Figma artboard units */
  width: number;
  /** Display height in Figma artboard units */
  height: number;
  opacity?: number;
  rotate?: number;
  flipY?: boolean;
  flipX?: boolean;
  className?: string;
  artboardWidth?: number;
  /** Extra uniform scale (1 = Figma size). Use <1 to shrink. */
  scale?: number;
};

/**
 * Places a Figma swirl using 1280-artboard coordinates.
 * Sizes with object-contain so assets keep their aspect ratio.
 */
export function DecorativeSwirl({
  src,
  left,
  top,
  width,
  height,
  opacity = 0.5,
  rotate = 0,
  flipY = false,
  flipX = false,
  className,
  artboardWidth = 1280,
  scale = 1,
}: DecorativeSwirlProps) {
  const w = width * scale;
  const h = height * scale;
  // Keep the visual center when scaling down from the Figma box
  const offsetX = left + (width - w) / 2;
  const offsetY = top + (height - h) / 2;

  const transforms = [
    flipX ? "scaleX(-1)" : null,
    flipY ? "scaleY(-1)" : null,
    rotate ? `rotate(${rotate}deg)` : null,
  ].filter(Boolean);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[1] hidden select-none lg:block",
        className
      )}
      style={{
        left: `${(offsetX / artboardWidth) * 100}%`,
        top: `${(offsetY / artboardWidth) * 100}vw`,
        width: `${(w / artboardWidth) * 100}%`,
        height: `${(h / artboardWidth) * 100}vw`,
        opacity,
        transform: transforms.length ? transforms.join(" ") : undefined,
        transformOrigin: "center center",
      }}
    >
      <Image
        src={src}
        alt=""
        width={Math.round(w * 2)}
        height={Math.round(h * 2)}
        sizes={`${Math.round((w / artboardWidth) * 100)}vw`}
        className="h-full w-full max-w-none object-contain [filter:contrast(1.05)_saturate(1.08)]"
        unoptimized
        priority={false}
      />
    </div>
  );
}
