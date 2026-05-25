import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "./commitChart";
import { getDateFormat } from "../../Utilities/Utility";
import { getAllCommits } from "../../services/commit.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Commits Bar Chart",
    },
  },
};

const labels = [""];
const initialChart = {
  labels,
  datasets: [
    {
      label: "",
      data: [0],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function CommitChart() {
  const [chartData, setChartData] = useState(initialChart);
  const { repoName, gitName } = useSelector((state) => state.repoInfo);

  useEffect(() => {
    getCommitsAndFilterData(repoName);
  }, [repoName]);

  const getCommitsAndFilterData = async (repoName) => {
    const allCommits = await getAllCommits(gitName, repoName);
    let dataForChart = [];
    let labels = [];
    allCommits.length &&
      allCommits.forEach((element) => {
        let date = getDateFormat(element.commit.author.date);
        if (!dataForChart.some((ele) => ele.x === date)) {
          dataForChart.push({ x: date, y: 1 });
          labels.push(date);
        } else {
          dataForChart.forEach((ele) => {
            if (ele.x === date) {
              ele.y = ele.y + 1;
            }
          });
        }
      });
    makeChartData(labels, dataForChart);
  };

  const makeChartData = (labels, dataForChart) => {
    let data = {
      labels,
      datasets: [
        {
          label: "Number of Commits",
          data: dataForChart,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        // {
        //   label: "Dataset 2",
        //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
      ],
    };
    setChartData(data);
  };

  return <Bar options={options} data={chartData} />;
}

export default CommitChart;
