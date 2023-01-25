import "chart.js/auto";
import { Line } from "react-chartjs-2";

import theme from "@/styles/theme";

// context
import { useDownload } from "@/context";
import { DailyReport } from "@/context/useForm/models";

interface IChart {
  currentPeriod: number;
}

export const Chart = ({currentPeriod}: IChart) => {
  const { getDaysOfMonth, getDaysOfWeek } = useDownload();

  function getData() {
    const dates = getLabels();

    let data: number[] = [];

    for (let date of dates) {
      if (localStorage.getItem(date)) {
        const report: DailyReport = JSON.parse(localStorage.getItem(date)!);

        if (report?.hoursInDay) {
          data.push(report?.hoursInDay / 1000 / 60 - 8 * 60);
        }
      }
    }

    return data;
  }

  function getLabels() {
    switch (currentPeriod) {
      case 0: {
        return getDaysOfWeek();
      }
      case 1: {
        return getDaysOfMonth();
      }
      case 2: {
        return [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ];
      }
      default: {
        return getDaysOfWeek();
      }
    }
  }

  const data = {
    labels: getLabels(),
    datasets: [
      {
        data: getData(),
        borderColor: `#0000`,
        fill: {
          above: theme.palette.action.green,
          below: theme.palette.status.red,
          target: { value: 0 },
        },
        tension: 0.5,
      },
    ],
  };

  const config: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Balanço de horas",
        font: {
          size: 18,
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Período (dias / meses)",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Tempo (minutos)",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 60,
        },
      },
    },
  };

  return (
    <Line options={config} data={data} />
  )
}