export default function Button({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-glow",
    ghost: "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200",
  };
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}