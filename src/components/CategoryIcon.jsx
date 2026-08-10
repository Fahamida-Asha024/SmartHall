import { Droplets, Zap, Sparkles, Sofa, Wifi, CircleHelp } from "lucide-react";

const ICONS = {
  Plumbing: Droplets,
  Electrical: Zap,
  Sanitation: Sparkles,
  Furniture: Sofa,
  Internet: Wifi,
  Other: CircleHelp,
};

export default function CategoryIcon({ category, className = "w-4 h-4" }) {
  const Icon = ICONS[category] || CircleHelp;
  return <Icon className={className} aria-hidden="true" />;
}