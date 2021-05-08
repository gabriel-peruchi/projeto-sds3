import axios from "axios";
import { SaleSuccess } from "interfaces/sale";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

interface SeriesData {
  name: string;
  data: number[];
}
interface ChartData {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
}

const BarChart = () => {
  const options = {
    plotOptions: { bar: { horizontal: true } },
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: { categories: [] },
    series: [{ name: "", data: [] }],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map((saleSuccess) => saleSuccess.sellerName);
      const mySeries = data.map((saleSuccess) =>
        round((100 * saleSuccess.deals) / saleSuccess.visited, 1)
      );

      setChartData({
        labels: { categories: myLabels },
        series: [{ name: "$ Success", data: mySeries }],
      });
    });
  }, []);

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
};

export default BarChart;
