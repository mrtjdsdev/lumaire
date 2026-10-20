import type { Composition } from "@/lib/display/geometry";

export type PhotoRecord = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
  createdAt: string;
  blob: Blob;
  thumbBlob: Blob;
};

export type CompositionRecord = {
  photoId: string;
  composition: Composition;
};

export type FrameRecord = {
  id: "current";
  blob: Blob;
  updatedAt: string;
};

/**
 * Binary storage for photographs and prepared frames.
 * IndexedDB is the local implementation. A server-backed store can replace it
 * later without changing callers, as long as these methods stay the same.
 */
export interface MediaStore {
  listPhotos(): Promise<PhotoRecord[]>;
  getPhoto(id: string): Promise<PhotoRecord | null>;
  addPhoto(file: File): Promise<PhotoRecord>;
  removePhoto(id: string): Promise<void>;
  getComposition(photoId: string): Promise<Composition | null>;
  saveComposition(photoId: string, composition: Composition): Promise<void>;
  getCurrentFrame(): Promise<Blob | null>;
  saveCurrentFrame(blob: Blob): Promise<void>;
}
