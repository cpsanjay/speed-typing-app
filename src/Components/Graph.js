import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  return (
    <div>
      <Line
        data={{
          labels: [1, 2, 3, 4],
          datasets: [
            {
              data: [5, 6, 7, 8],
              label: "random value",
              borderColor: "gold",
            },
          ],
        }}
      ></Line>
    </div>
  );
};

export default Graph;
