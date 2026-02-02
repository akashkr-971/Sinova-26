export default function SlotCounter({ remaining }: { remaining: number }) {
  return (
    <div className="mb-6 text-center">
      <span className="text-sm text-gray-400">Slots Available</span>
      <div className="text-2xl font-bold text-blue-400">
        {remaining} / 20
      </div>
    </div>
  );
}
