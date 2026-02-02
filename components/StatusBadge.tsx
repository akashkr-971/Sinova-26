type Status = "PENDING" | "VERIFIED" | "REJECTED";

export default function StatusBadge({ status }: { status: Status }) {
  const styles = {
    PENDING: "bg-yellow-500/20 text-yellow-400",
    VERIFIED: "bg-green-500/20 text-green-400",
    REJECTED: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
