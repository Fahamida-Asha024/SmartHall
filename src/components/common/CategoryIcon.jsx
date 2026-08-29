import React from "react";
import { Fan, Droplet, Armchair, Wifi, Sparkles, UtensilsCrossed, ShieldAlert, Leaf, HelpCircle } from "lucide-react";

const CATEGORY_MAP = {
  Electrical: { icon: Fan, bg: "bg-blue-100", color: "text-blue-600" },
  Plumbing: { icon: Droplet, bg: "bg-sky-100", color: "text-sky-600" },
  Furniture: { icon: Armchair, bg: "bg-emerald-100", color: "text-emerald-600" },
  Internet: { icon: Wifi, bg: "bg-purple-100", color: "text-purple-600" },
  Cleaning: { icon: Sparkles, bg: "bg-teal-100", color: "text-teal-600" },
  Dining: { icon: UtensilsCrossed, bg: "bg-orange-100", color: "text-orange-600" },
  Security: { icon: ShieldAlert, bg: "bg-rose-100", color: "text-rose-600" },
  Environment: { icon: Leaf, bg: "bg-lime-100", color: "text-lime-600" },
  Other: { icon: HelpCircle, bg: "bg-slate-100", color: "text-slate-500" },
};

export default function CategoryIcon({ category, size = "md" }) {
  const config = CATEGORY_MAP[category] || CATEGORY_MAP.Other;
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
      <Icon className={iconSize} />
    </div>
  );
}