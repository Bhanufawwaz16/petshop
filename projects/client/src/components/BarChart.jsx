import Plot from "react-plotly.js";
import { numToIDRCurrency } from "../helper/currency";

export default function BarChart({ data }) {
  const dataRender = () => {
    return data.map((data2) => {
      return {
        x: ["Buy", "Sell"],
        y: [data2.status_IN, data2.status_OUT],
        // name: data2.category_name,
        type: "bar",
        marker: {
          color: ["blue", "red"],
        },
      };
    });
  };

  const barChart = dataRender();

  const layout = {
    barmode: "group",
    title: "Buyer vs Sales",
    yaxis: {
      tickformat: ",.0f",
      title: "Rp",
    },
  };

  return (
    <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
      <Plot data={barChart} layout={layout} />
    </div>
  );
}
