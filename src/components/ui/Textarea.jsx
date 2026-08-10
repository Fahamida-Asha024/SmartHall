export default function Textarea({ label, id, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 resize-none"
        {...props}
      />
    </div>
  );
}