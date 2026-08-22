import Image from "next/image";

/**
 * Contained skyline graphic for the left hero column.
 * Crops empty left padding in the source PNG; max height ~560px.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto w-full max-w-[560px] overflow-hidden ${className}`}
      style={{ maxHeight: 560 }}
    >
      <div className="relative mx-auto aspect-[5/4] w-full max-h-[560px]">
        <Image
          src="/hero-visual-scene.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) min(100vw, 560px), 560px"
          className="object-cover object-[82%_center]"
        />
      </div>
    </div>
  );
}
