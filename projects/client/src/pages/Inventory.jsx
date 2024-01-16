import React from "react";
import NavbarInventory from "../components/NavbarInventory";

const navigation = [
  {
    name: "Sales Report",
    path: "/dashboard/inventory/sales-report",
    current: true,
  },
  {
    name: "Stock History",
    path: "/dashboard/inventory/stock-history",
    current: false,
  },
];

const Inventory = ({ element }) => {
  return (
    <div>
      <NavbarInventory navigation={navigation} children={element} />
    </div>
  );
};

export default Inventory;
