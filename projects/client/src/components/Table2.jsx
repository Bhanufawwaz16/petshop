export default function Table2({
  transH,
  headCols = [],
  tableBody = null,
  tfoot = null,
  pageIndex,
}) {
  console.log("page index", pageIndex);
  return (
    <>
      {/* <div className="sm:flex sm:items-center">
        {pageIndex === 0 && (
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              List return asset {convertToDate(transH.date)}
            </p>
          </div>
        )}
      </div> */}
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headCols.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={
                    idx === 0
                      ? "text-center"
                      : idx === 1
                      ? "py-4 pl-4 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                      : "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  }
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          {tableBody}
          {tfoot}
        </table>
      </div>
      
    </>
  );
}
