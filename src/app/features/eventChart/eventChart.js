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
import { getAllEvents } from "../../services/event.service";
import { capitalizeFirstLetter } from "../../Utilities/Utility";

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
      text: "Events Bar Chart",
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

function EventChart() {
  const [chartData, setChartData] = useState(initialChart);
  const { repoName, gitName } = useSelector((state) => state.repoInfo);

  useEffect(() => {
    getEventsAndFilterData(repoName);
  }, [repoName]);

  const getEventsAndFilterData = async (repoName) => {
    const allEvents = await getAllEvents(gitName, repoName);
    let dataForChart = [];
    let labels = [];
    allEvents.length &&
      allEvents.forEach((element) => {
        let event = capitalizeFirstLetter(element.event);
        if (!dataForChart.some((ele) => ele.x === event)) {
          // const capitalizedEvent = capitalizeFirstLetter(event);
          dataForChart.push({ x: event, y: 1 });
          labels.push(event);
        } else {
          dataForChart.forEach((ele) => {
            if (ele.x === event) {
              ele.y = ele.y + 1;
            }
          });
        }
      });
    makeChartData(labels, dataForChart);
    console.log(allEvents);
    console.log(labels);
    console.log(dataForChart);
  };

  const makeChartData = (labels, dataForChart) => {
    let data = {
      labels,
      datasets: [
        {
          label: "Number of Events",
          data: dataForChart,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
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

export default EventChart;
