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
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import { es } from "date-fns/locale";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
);

const Grafico = ({ datasets }) => {
  const chartData = React.useMemo(() => {
    if (!datasets || datasets.length === 0) {
      return { datasets: [] };
    }

    let overallMaxTime = null;
    const initialProcessedDatasets = datasets.map((ds) => {
      const dataPoints = Array.isArray(ds.data)
        ? ds.data.map((item) => {
            const time = new Date(item.tiempo);
            if (
              overallMaxTime === null ||
              time.getTime() > overallMaxTime.getTime()
            ) {
              overallMaxTime = time;
            }
            return {
              x: time,
              y: item.valor,
            };
          })
        : [];
      dataPoints.sort((a, b) => a.x.getTime() - b.x.getTime());
      return {
        ...ds,
        data: dataPoints,
      };
    });

    if (overallMaxTime === null) {
      return { datasets: initialProcessedDatasets };
    }

    const finalProcessedDatasets = initialProcessedDatasets.map((ds) => {
      if (ds.data.length > 0) {
        const lastPoint = ds.data[ds.data.length - 1];
        if (lastPoint.x.getTime() < overallMaxTime.getTime()) {
          return {
            ...ds,
            data: [
              ...ds.data,
              {
                x: overallMaxTime,
                y: lastPoint.y,
              },
            ],
          };
        }
      }
      return ds;
    });

    return {
      datasets: finalProcessedDatasets,
    };
  }, [datasets]);

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Evolución de Cantidad en el Tiempo",
          font: { size: 16 },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: function (tooltipItems) {
              if (tooltipItems.length > 0 && tooltipItems[0].parsed) {
                const date = new Date(tooltipItems[0].parsed.x);
                return date.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                });
              }
              return "";
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
            tooltipFormat: "PPpp",
            displayFormats: {
              hour: "HH:mm",
              day: "dd MMM yy",
              month: "MMM yyyy",
            },
          },
          adapters: {
            date: {
              locale: es,
            },
          },
          title: {
            display: true,
            text: "Fecha y Hora",
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Cantidad",
          },
          suggestedMin: 0,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      elements: {
        point: {
          radius: 3,
          hoverRadius: 5,
        },
        line: {
          borderWidth: 2,
        },
      },
    }),
    []
  );

  const noData =
    !datasets || datasets.every((ds) => !ds.data || ds.data.length === 0);

  if (noData) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No hay datos históricos disponibles para el gráfico.
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default Grafico;
