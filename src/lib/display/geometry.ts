export const PANEL = {
  id: "epaper-7in5-800x480",
  label: "7.5 inch landscape",
  width: 800,
  height: 480,
} as const;

export const PANEL_ASPECT = PANEL.width / PANEL.height;

export type CompositionMode = "fit" | "fill" | "crop";
export type PaperTone = "color" | "graphite";

export type Composition = {
  mode: CompositionMode;
  tone: PaperTone;
  zoom: number;
  panX: number;
  panY: number;
  cropScale: number;
  cropCenterX: number;
  cropCenterY: number;
};

export type NormRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function defaultComposition(): Composition {
  return {
    mode: "fit",
    tone: "graphite",
    zoom: 1,
    panX: 0,
    panY: 0,
    cropScale: 1,
    cropCenterX: 0.5,
    cropCenterY: 0.5,
  };
}

export function isComposition(value: unknown): value is Composition {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Composition>;
  return (
    (candidate.mode === "fit" || candidate.mode === "fill" || candidate.mode === "crop") &&
    (candidate.tone === "color" || candidate.tone === "graphite") &&
    typeof candidate.zoom === "number" &&
    typeof candidate.panX === "number" &&
    typeof candidate.panY === "number" &&
    typeof candidate.cropScale === "number" &&
    typeof candidate.cropCenterX === "number" &&
    typeof candidate.cropCenterY === "number"
  );
}

export function compositionSignature(photoId: string, composition: Composition) {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return JSON.stringify({
    photoId,
    mode: composition.mode,
    tone: composition.tone,
    zoom: round(composition.zoom),
    panX: round(composition.panX),
    panY: round(composition.panY),
    cropScale: round(composition.cropScale),
    cropCenterX: round(composition.cropCenterX),
    cropCenterY: round(composition.cropCenterY),
  });
}

export function maxCropSize(imageWidth: number, imageHeight: number) {
  const imageAspect = imageWidth / imageHeight;
  if (imageAspect > PANEL_ASPECT) {
    return {
      width: (PANEL_ASPECT * imageHeight) / imageWidth,
      height: 1,
    };
  }
  return {
    width: 1,
    height: imageWidth / PANEL_ASPECT / imageHeight,
  };
}

export function cropRect(imageWidth: number, imageHeight: number, composition: Composition): NormRect {
  const max = maxCropSize(imageWidth, imageHeight);
  const scale = clamp(composition.cropScale, 0.35, 1);
  const width = max.width * scale;
  const height = max.height * scale;
  const x = clamp(composition.cropCenterX - width / 2, 0, 1 - width);
  const y = clamp(composition.cropCenterY - height / 2, 0, 1 - height);
  return { x, y, width, height };
}

export function moveCrop(
  imageWidth: number,
  imageHeight: number,
  composition: Composition,
  nextCenterX: number,
  nextCenterY: number,
) {
  const rect = cropRect(imageWidth, imageHeight, {
    ...composition,
    cropCenterX: nextCenterX,
    cropCenterY: nextCenterY,
  });
  return {
    cropCenterX: rect.x + rect.width / 2,
    cropCenterY: rect.y + rect.height / 2,
  };
}

export function fillPlacement(imageWidth: number, imageHeight: number, composition: Composition) {
  const zoom = clamp(composition.zoom, 1, 2.5);
  const scale = Math.max(PANEL.width / imageWidth, PANEL.height / imageHeight) * zoom;
  const dw = imageWidth * scale;
  const dh = imageHeight * scale;
  const overflowX = Math.max(0, dw - PANEL.width);
  const overflowY = Math.max(0, dh - PANEL.height);
  const panX = clamp(composition.panX, -1, 1);
  const panY = clamp(composition.panY, -1, 1);
  return {
    dx: (PANEL.width - dw) / 2 + panX * (overflowX / 2),
    dy: (PANEL.height - dh) / 2 + panY * (overflowY / 2),
    dw,
    dh,
    overflowX,
    overflowY,
  };
}

export function fitPlacement(imageWidth: number, imageHeight: number) {
  const scale = Math.min(PANEL.width / imageWidth, PANEL.height / imageHeight);
  const dw = imageWidth * scale;
  const dh = imageHeight * scale;
  return {
    dx: (PANEL.width - dw) / 2,
    dy: (PANEL.height - dh) / 2,
    dw,
    dh,
  };
}
