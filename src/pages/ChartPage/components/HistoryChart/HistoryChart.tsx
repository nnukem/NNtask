import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import pStyles from "../../../../styles/common/page.module.scss";
import { HistoryRate } from "../../../../service/nbp";
import { Placeholder } from "../../../../components/Placeholder";
import { useCSSVar } from "../../../../hooks/useCSSVar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoryChartProps {
  data: HistoryRate[];
  currency: string;
  loading?: boolean;
}

export const HistoryChart = ({
  data,
  currency,
  loading = false,
}: HistoryChartProps) => {
  if (loading) {
    return (
      <div className={pStyles.cardContainer}>
        <Placeholder height="100%" width="100%" />
      </div>
    );
  }

  const thickColor = useCSSVar("--border-color") || "";
  const lineColor = useCSSVar("--chart-line-color") || "";
  const bgColor = useCSSVar("--chart-bg-color") || "";
  const bgTooltipColor = useCSSVar("--chart-tooltip-bg-color") || "";

  const chartData = {
    labels: data.map((item) => format(new Date(item.effectiveDate), "MMM dd")),
    datasets: [
      {
        label: ` ${currency}/PLN kurs wymiany`,
        data: data.map((item) => item.mid),
        borderColor: lineColor,
        backgroundColor: bgColor,
        borderWidth: 1,
        fill: true,
        pointBackgroundColor: lineColor,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: `${currency}/PLN kurs historyczny`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        backgroundColor: bgTooltipColor,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: lineColor,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: thickColor,
        },
        ticks: {
          callback: function (value: any) {
            return typeof value === "number" ? value.toFixed(4) : value;
          },
        },
      },
      x: {
        grid: {
          color: thickColor,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className={pStyles.cardContainer}>
      <Line data={chartData} options={options} />
    </div>
  );
};
