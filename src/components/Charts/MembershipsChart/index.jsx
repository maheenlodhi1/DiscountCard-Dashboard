import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MembershipsChart = ({ membershipSeries, xaxis }) => {
  // const series = [
  //   {
  //     name: "series1",
  //     data: [31, 40, 28, 51, 42, 109, 100],
  //   },
  // ];

  const options = {
    title: { text: "Memberships Subscribed", style: { fontWeight: "600" } },
    chart: {
      toolbar: {
        show: true,
      },
      height: 250,
      type: "area",
    },
    grid: { show: false },
    dataLabels: {
      enabled: false,
    },
    colors: ["#249369"],
    stroke: { curve: "smooth" },
    // xaxis: xaxis,
    xaxis: {
      type: "datetime",
      categories: xaxis.categories,
    },
    // yaxis: { show: false },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ApexChart
          options={options}
          series={membershipSeries}
          type="area"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MembershipsChart;
