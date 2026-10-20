const MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const MAX_PHOTO_BYTES = 15 * 1024 * 1024;

export function mimeFromName(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export function validatePhotoFile(file: File) {
  const lower = file.name.toLowerCase();
  const extensionOk = EXTENSIONS.some((extension) => lower.endsWith(extension));
  const typeOk = file.type === "" || MIME_TYPES.has(file.type);

  if (!extensionOk || !typeOk) {
    return `"${file.name}" needs to be a JPG, PNG, or WebP photograph.`;
  }
  if (file.size === 0) return `"${file.name}" is empty.`;
  if (file.size > MAX_PHOTO_BYTES) {
    return `"${file.name}" is larger than 15 MB.`;
  }
  return null;
}
