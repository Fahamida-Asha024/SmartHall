export default function Card({ className = "", children }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-soft ${className}`}>
      {children}
    </div>
  );
}