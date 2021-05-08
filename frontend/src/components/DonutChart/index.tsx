import axios from "axios";
import { SaleSum } from "interfaces/sale";
import Chart from "react-apexcharts";
import { BASE_URL } from "utils/requests";
interface ChartData {
  labels: string[];
  series: number[];
}

// const mockData = {
//   series: [477138, 499928, 444867, 220426, 473088],
//   labels: ["Anakin", "Barry Allen", "Kal-El", "Logan", "Padmé"],
// };

const options = {
  legend: {
    show: true,
  },
};

const DonutChart = () => {
  // forma errada
  let chartData: ChartData = {
    labels: [],
    series: [],
  };

  // forma errada
  axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
    const data = response.data as SaleSum[];
    const myLabels = data.map((saleSum) => saleSum.sellerName);
    const mySeries = data.map((saleSum) => saleSum.sum);

    chartData = { labels: myLabels, series: mySeries };
    console.log(chartData);
  });

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
};

export default DonutChart;
