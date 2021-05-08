import axios from "axios";
import { SaleSum } from "interfaces/sale";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { BASE_URL } from "utils/requests";
interface ChartData {
  labels: string[];
  series: number[];
}

const DonutChart = () => {
  const options = {
    legend: { show: true },
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
      const data = response.data as SaleSum[];
      const myLabels = data.map((saleSum) => saleSum.sellerName);
      const mySeries = data.map((saleSum) => saleSum.sum);
      setChartData({ labels: myLabels, series: mySeries });
    });
  }, []);

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
