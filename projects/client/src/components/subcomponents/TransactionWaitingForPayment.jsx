import Table from "../Table";
import TransactionTableBody from "./TransactionTableBody";
import TransactionTableBody2 from "./TransactionTableBody2";
export default function TransactionWaitingForPayment() {
  return (
    <div className="sm:flex sm:items-center">
      <Table
        className="mb-4"
        headCols={[
          "Invoice No.",
          "Product",
          "Date",
          // "Branch"
        ]}
        tableBody={<TransactionTableBody />}
      />
    </div>
  );
}
