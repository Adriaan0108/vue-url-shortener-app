<template>
  <div class="card">
    <h2>Profit Growth - Current Month</h2>
    <canvas v-if="profitGrowthData" ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useGetProfitGrowth } from "../composables/useMutations";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const chartCanvas = ref(null);
const chartInstance = ref(null);

const { data: profitGrowthData } = useGetProfitGrowth();

const chartLabels = computed(() => {
  return (profitGrowthData.value ?? []).map((item) => {
    const d = new Date(item.date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  });
});

const chartDataPoints = computed(() => {
  const points = [];
  if (profitGrowthData.value) {
    for (let i = 0; i < profitGrowthData.value.length; i++) {
      const item = profitGrowthData.value[i];
      points.push(
        item.profitGrowthPercentage != null ? item.profitGrowthPercentage : null
      );
    }
  }
  return points;
});

function initializeChart() {
  if (!profitGrowthData.value || !chartCanvas.value || chartInstance.value) {
    return;
  }

  chartInstance.value = new Chart(chartCanvas.value, {
    type: "line",
    data: {
      labels: chartLabels.value,
      datasets: [
        {
          label: "Profit Growth (%)",
          data: chartDataPoints.value,
          borderColor: "purple",
          fill: false,
          tension: 0.3,
          spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: (context) =>
              context.raw != null ? context.raw.toFixed(2) + "%" : "N/A",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false, // Don't force zero since you have negative values
        },
      },
    },
  });
}

// Watch for data changes and initialize chart
watch([profitGrowthData, chartCanvas], () => {
  if (chartInstance.value) {
    chartInstance.value.destroy(); // Clean up existing chart
    chartInstance.value = null;
  }
  initializeChart();
});

// Also try on mount in case data is already there
onMounted(() => {
  initializeChart();
});
</script>

<style scoped></style>
