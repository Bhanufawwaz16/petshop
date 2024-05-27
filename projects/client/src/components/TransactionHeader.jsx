export default function TransactionHeader({ title, desc }) {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:bg-blue-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700">{desc}</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:bg-blue-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
          Jam Operasional
        </h1>
        <p className="mt-2 text-sm text-gray-700">07:00 Pagi - 22.00 Malam</p>
      </div>
    </div>
  );
}
