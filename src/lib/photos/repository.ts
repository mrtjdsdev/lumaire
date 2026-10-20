import type { Composition } from "@/lib/display/geometry";
import { isComposition } from "@/lib/display/geometry";
import { createThumbnail, decodePhoto } from "@/lib/photos/image-file";
import type { CompositionRecord, FrameRecord, MediaStore, PhotoRecord } from "@/lib/photos/types";
import { mimeFromName, validatePhotoFile } from "@/lib/photos/validate";

const DB_NAME = "elink";
const DB_VERSION = 1;

let databasePromise: Promise<IDBDatabase> | null = null;

function openDatabase() {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("Photo storage is not available in this browser."));
  }
  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("photos")) db.createObjectStore("photos", { keyPath: "id" });
        if (!db.objectStoreNames.contains("compositions")) {
          db.createObjectStore("compositions", { keyPath: "photoId" });
        }
        if (!db.objectStoreNames.contains("frames")) db.createObjectStore("frames", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        databasePromise = null;
        reject(request.error ?? new Error("Could not open photo storage."));
      };
    });
  }
  return databasePromise;
}

async function runTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
) {
  const db = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const request = fn(tx.objectStore(storeName));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Photo storage could not complete that request."));
    tx.onerror = () => reject(tx.error ?? new Error("Photo storage could not complete that request."));
    tx.onabort = () => reject(tx.error ?? new Error("Photo storage was interrupted."));
  });
}

export const mediaStore: MediaStore = {
  async listPhotos() {
    const records = await runTransaction<PhotoRecord[]>("photos", "readonly", (store) => store.getAll());
    return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getPhoto(id) {
    const record = await runTransaction<PhotoRecord | undefined>("photos", "readonly", (store) => store.get(id));
    return record ?? null;
  },

  async addPhoto(file) {
    const problem = validatePhotoFile(file);
    if (problem) throw new Error(problem);

    let bitmap: ImageBitmap;
    try {
      bitmap = await decodePhoto(file);
    } catch {
      throw new Error(`"${file.name}" could not be read as a photograph.`);
    }

    try {
      if (bitmap.width < 2 || bitmap.height < 2) {
        throw new Error(`"${file.name}" is too small to place on the display.`);
      }
      const thumbBlob = await createThumbnail(bitmap);
      const record: PhotoRecord = {
        id: crypto.randomUUID(),
        name: file.name || "Untitled photograph",
        mimeType: file.type || mimeFromName(file.name),
        size: file.size,
        width: bitmap.width,
        height: bitmap.height,
        createdAt: new Date().toISOString(),
        blob: file,
        thumbBlob,
      };
      await runTransaction("photos", "readwrite", (store) => store.put(record));
      return record;
    } finally {
      bitmap.close();
    }
  },

  async removePhoto(id) {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(["photos", "compositions"], "readwrite");
      tx.objectStore("photos").delete(id);
      tx.objectStore("compositions").delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Could not remove that photograph."));
      tx.onabort = () => reject(tx.error ?? new Error("Could not remove that photograph."));
    });
  },

  async getComposition(photoId) {
    const record = await runTransaction<CompositionRecord | undefined>("compositions", "readonly", (store) =>
      store.get(photoId),
    );
    if (!record || !isComposition(record.composition)) return null;
    return record.composition;
  },

  async saveComposition(photoId, composition: Composition) {
    const record: CompositionRecord = { photoId, composition };
    await runTransaction("compositions", "readwrite", (store) => store.put(record));
  },

  async getCurrentFrame() {
    const record = await runTransaction<FrameRecord | undefined>("frames", "readonly", (store) => store.get("current"));
    return record?.blob ?? null;
  },

  async saveCurrentFrame(blob) {
    const record: FrameRecord = { id: "current", blob, updatedAt: new Date().toISOString() };
    await runTransaction("frames", "readwrite", (store) => store.put(record));
  },
};
