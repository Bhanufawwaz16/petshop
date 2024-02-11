export default function SalesReportTable({ detailData = [] }) {
  console.log("detail data", detailData);
  return (
    <>
      {detailData.map((transd, stockIdx) => (
        <tbody>
          <tr key={transd.id} className="border-b border-gray-200">
            <td className="py-4  pr-3 text-center text-sm sm:pl-6 md:pl-0">
              <div className="font-medium text-gray-900 flex items-center justify-center">
                {stockIdx + 1}
              </div>
            </td>
            <td className="py-4 pl-4 pr-2 text-left  text-sm sm:pl-4 md:pl-2">
              <div className="font-medium text-gray-900">
                {transd.product_name}
              </div>
            </td>
            <td className="hidden  py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {transd.date}
            </td>
            <td className="hidden py-4 px-2 text-left text-sm text-gray-500 sm:table-cell">
              {transd.username}
            </td>
            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {transd.qty}
            </td>
            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {transd.total_price}
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
