import React, { useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ files, onChange, maxFiles = 5 }) {
  const inputRef = useRef();

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].slice(0, maxFiles);
    onChange(combined);
  };

  const removeAt = (idx) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 text-center hover:border-indigo-400 hover:bg-indigo-50/40"
      >
        <UploadCloud className="h-6 w-6 text-slate-400" />
        <p className="text-sm text-slate-600">Click to upload images</p>
        <p className="text-xs text-slate-400">PNG, JPG up to {maxFiles} files</p>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={handleSelect} />
      </div>

      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {files.map((file, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
              {file instanceof File ? (
                <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}
              <button
                onClick={() => removeAt(idx)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}