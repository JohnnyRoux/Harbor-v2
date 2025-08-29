
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}
