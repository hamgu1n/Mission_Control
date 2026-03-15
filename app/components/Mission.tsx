export default function Mission({ title }: { title: string }) {
  return (
    <>
      <div className="rounded-xl border border-black bg-white p-4">
        <p><strong className="text-black">{title}</strong></p>
      </div>
    </>
  );
}
