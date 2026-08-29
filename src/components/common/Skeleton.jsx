import React from "react";

export function SkeletonLine({ width = "100%" }) {
  return <div className="h-3 animate-pulse rounded bg-slate-200" style={{ width }} />;
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <SkeletonLine width="40%" />
      <SkeletonLine width="80%" />
      <SkeletonLine width="60%" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-lg border border-slate-100 p-3">
          <SkeletonLine width="20%" />
          <SkeletonLine width="30%" />
          <SkeletonLine width="15%" />
          <SkeletonLine width="15%" />
        </div>
      ))}
    </div>
  );
}