import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CustomersChart({ customerSeries, xaxis }) {
  // const series = [
  //   {
  //     name: "Net Profit",
  //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  //   },
  // ];

  const options = {
    title: { text: "Customers Registered", style: { fontWeight: "600" } },
    toolbar: { show: true },
    chart: {
      type: "bar",
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xaxis.categories,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#249369"],
  };

  return (
    <div id="chart">
      <ApexChart
        options={options}
        series={customerSeries}
        type="bar"
        height={250}
      />
    </div>
  );
}
