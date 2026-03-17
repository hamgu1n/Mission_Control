export default function Mission({ title }: { title: string }) {
  return (

    <div className="flex justify-center items-center ">
      <div className="w-full px-5 py-4 text-left rounded-lg bg-gray-300 shadow-sm">
        <p className="text-sm font-medium text-gray-900">
          {title}
        </p>
      </div>
    </div>

  );
}
