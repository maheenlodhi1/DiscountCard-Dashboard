import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = () => {
  const series = [44, 55, 41, 17, 15];
  const options = {
    toolbar: { show: false },
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart">
        <ApexChart options={options} series={series} type="pie" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
