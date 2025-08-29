
export default function Card({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`rounded-2xl border p-4 hover:shadow-sm ${onClick ? "cursor-pointer" : ""}`}>
      {children}
    </div>
  );
}
