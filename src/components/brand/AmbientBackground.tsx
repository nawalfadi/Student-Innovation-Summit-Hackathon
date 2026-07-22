export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fffcf5 0%, #d8d5ca 100%)",
      }}
    >
      <div className="ambient-blob ambient-blob-cyan -left-24 top-10 h-[28rem] w-[28rem]" />
      <div
        className="ambient-blob ambient-blob-blue right-[-8%] top-[18%] h-[32rem] w-[32rem]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="ambient-blob ambient-blob-cyan bottom-[8%] left-[20%] h-[24rem] w-[24rem]"
        style={{ animationDelay: "-11s", opacity: 0.4 }}
      />
      <div
        className="ambient-blob ambient-blob-gold bottom-[20%] right-[15%] h-[20rem] w-[20rem]"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="ambient-blob ambient-blob-blue left-[40%] top-[-10%] h-[22rem] w-[22rem]"
        style={{ animationDelay: "-14s", opacity: 0.35 }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
