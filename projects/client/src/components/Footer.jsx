export default function Footer({ dataSalesReport = [], statusSend }) {
  const colSpan = 5;

  const totalSales =
    dataSalesReport && dataSalesReport.length
      ? dataSalesReport.reduce(
          (total, item) => total + (item.total_price || 0),
          0
        )
      : null;

  return (
    <>
      {dataSalesReport.length ? (
        <tfoot>
          <tr className="bg-gray-50">
            <th
              scope="row"
              colSpan={colSpan}
              className="hidden pl-4 pr-6 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
            >
              Total Price
            </th>

            <td className="pl-3 pr-4 pt-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
              {totalSales}
            </td>
          </tr>
        </tfoot>
      ) : null}
    </>
  );
}
