import { convertToDate } from "../helper/convertToDate";
import { numToIDRCurrency } from "../helper/currency";

export default function StockHistoryTable({ data = [] }) {
  console.log("detail data", data);
  return (
    <>
      {data.map((value, stockIdx) => (
        <tbody>
          <tr key={value.id} className="border-b border-gray-200">
            <td className="py-4  pr-3 text-center text-sm sm:pl-6 md:pl-0">
              <div className="font-medium text-gray-900 flex items-center justify-center">
                {stockIdx + 1}
              </div>
            </td>
            <td className="py-4 pl-4 pr-2 text-left  text-sm sm:pl-4 md:pl-2">
              <div className="font-medium text-gray-900">{value.name}</div>
            </td>
            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {value.suplier_customer}
            </td>
            <td className="hidden  py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              <div
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  value.status === "IN"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="max-w-[100px] truncate">{value.status}</span>
              </div>
            </td>

            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {convertToDate(value.createdAt)}
            </td>
            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {value.qty}
            </td>
            <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
              {numToIDRCurrency(value.total_price)}
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
