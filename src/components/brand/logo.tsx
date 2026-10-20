type LogoMarkProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function LogoMark({ className, alt = "", priority = false }: LogoMarkProps) {
  return (
    // The supplied Lumaire mark is served as the original file so its shape is not redrawn or recompressed.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/lumaire-mark.svg"
      alt={alt}
      width={100}
      height={100}
      draggable={false}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}
