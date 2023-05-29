<template>
  <navbar />
  <div class="p-3  flex justify-center">
    <apexchart
      class="!w-[500px] border-2 border-gray-500"
      type="area"
      height="400"
      widht="600"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import navbar from "../components/navbarComponent.vue";
import VueApexCharts from "vue3-apexcharts";
import { dataSeries } from "../assets/tempDataSeries";
export default {
  components: {
    navbar,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      ts2: 1484418600000,
      dates: [],
      series: [],
      chartOptions: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: "Stock Price Movement",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
          title: {
            text: "Price",
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
        },
      },
    };
  },

  methods: {
    updateSeries() {
      for (let i = 0; i < 120; i++) {
        this.ts2 = this.ts2 + 86400000;
        this.dates.push([this.ts2, dataSeries[1][i].value]);
      }
      console.log(this.dates);

      this.series = [
        {
          name: "XYZ MOTORS",
          data: this.dates,
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      this.updateSeries();
    }, 2000);
  },
};
</script>
