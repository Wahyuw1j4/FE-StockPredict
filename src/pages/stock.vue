<template>
  <navbar />
  <div class="p-3 lg:px-[12rem]">
    <p class="font-bold text-3xl">BBRI</p>
    <p class="font-bold text-2sxl">30-3-2023</p>
    <div class="lg:flex">
      <apexchart
        class="lg:w-[500px] border-2 border-gray-500"
        type="area"
        height="400"
        widht="600"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <div
        class="mt-3 grid grid-cols-2 place-items-center h-20 lg:place-items-start lg:mx-4 text-center lg:text-left lg:gap-4"
      >
        <span class="align-center lg:align-left">
          <p class="text-slate-400">Harga closing kemarin</p>
          <p class="font-bold">Rp. 4000</p>
        </span>
        <span>
          <p class="text-slate-400">Prediksi closing kemarin</p>
          <p class="font-bold">Rp. 4000</p>
        </span>
        <span class="col-start-1 col-end-6 text-center">
          <p class="text-slate-400">Harga Prediksi closing Hari Berikutnya</p>
          <p class="font-bold">Rp. 4000</p>
        </span>
      </div>
    </div>
    <EasyDataTable :headers="headers" :items="items" />
  </div>
</template>
<script>
import navbar from "../components/navbarComponent.vue";
import VueApexCharts from "vue3-apexcharts";
import { dataSeries } from "../assets/tempDataSeries";
import Vue3EasyDataTable from "vue3-easy-data-table";
// import { Header, Item } from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
export default {
  components: {
    navbar,
    apexchart: VueApexCharts,
    EasyDataTable: Vue3EasyDataTable,
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
      headers: [
        { text: "PLAYER", value: "player" },
        { text: "TEAM", value: "team" },
        { text: "NUMBER", value: "number" },
        { text: "POSITION", value: "position" },
        { text: "HEIGHT", value: "indicator.height" },
        { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
        { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
        { text: "COUNTRY", value: "country" },
      ],

      items: [
        {
          player: "Stephen Curry",
          team: "GSW",
          number: 30,
          position: "G",
          indicator: { height: "6-2", weight: 185 },
          lastAttended: "Davidson",
          country: "USA",
        },
        {
          player: "Lebron James",
          team: "LAL",
          number: 6,
          position: "F",
          indicator: { height: "6-9", weight: 250 },
          lastAttended: "St. Vincent-St. Mary HS (OH)",
          country: "USA",
        },
        {
          player: "Kevin Durant",
          team: "BKN",
          number: 7,
          position: "F",
          indicator: { height: "6-10", weight: 240 },
          lastAttended: "Texas-Austin",
          country: "USA",
        },
        {
          player: "Giannis Antetokounmpo",
          team: "MIL",
          number: 34,
          position: "F",
          indicator: { height: "6-11", weight: 242 },
          lastAttended: "Filathlitikos",
          country: "Greece",
        },
      ],
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
