import React, { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(null);

  if (images.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-400">
        <ImageIcon className="h-4 w-4" /> No images attached.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActive(src)}
            className="aspect-square overflow-hidden rounded-lg border border-slate-200"
          >
            <img src={src} alt={`Attachment ${idx + 1}`} className="h-full w-full object-cover transition hover:scale-105" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
          <button className="absolute right-4 top-4 text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
          <img src={active} alt="Preview" className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </>
  );
}