import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart = () => {
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const options = {
    title: { text: "Offers Listed", style: { fontWeight: "600" } },
    chart: {
      toolbar: {
        show: false,
      },
      height: 250,
      type: "area",
    },
    grid: { show: false },
    dataLabels: {
      enabled: false,
    },
    colors: ["#249369"],
    stroke: { curve: "straight" },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    yaxis: { show: false },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ApexChart options={options} series={series} type="area" height={250} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart;
