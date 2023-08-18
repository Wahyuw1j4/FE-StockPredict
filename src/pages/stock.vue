<template>
  <navbar />
  <div class="p-3 lg:px-[12rem]">
    <p class="font-bold text-3xl">{{ ticker.split(".")[0].toUpperCase() }}</p>
    <label
      for="countries"
      class="block my-4 text-sm font-medium text-gray-900 dark:text-white"
      >Pilih Hari</label
    >
    <select
      id="countries"
      class="bg-gray-50 w-[15rem] mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" v-model="selectedDate" @change="changedDate"
    >
    <option v-for="(date, index) in listDates" >{{ date }}</option>
      
    </select>
    <div class="">
      <div class="flex justify-center">
        <apexchart
          class="lg:w-[700px] w-full border-2 border-gray-500"
          type="area"
          height="500"
          widht="700"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <div class="flex gap-4 mt-6 justify-center">
        <div v-if="prevPredict != null" class="flex gap-4 border-2 p-3">
          <span>
            <p class="text-slate-500">Prediksi kemarin</p>
            <p class="font-bold">Rp. {{ Math.floor(prevPredict.predict) }}</p>
          </span>
          <span>
            <p class="text-slate-5s00">RMSE</p>
            <p class="font-bold">
              {{ parseFloat(prevPredict.rmse.toFixed(2)) }}
            </p>
          </span>
        </div>
        <div class="flex gap-4 border-2 p-3">
          <span class="">
            <p class="text-slate-500">Prediksi hari berikutnya</p>
            <p class="font-bold">Rp. {{ Math.floor(nextPredict.predict) }}</p>
          </span>
          <span class="">
            <p class="text-slate-5s00">RMSE</p>
            <p class="font-bold">
              {{ nextPredict.rmse.toFixed(2) }}
            </p>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8 lg:px-[12rem]">
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
      url_api: import.meta.env.VITE_BACKEND_FLASK_HOST,
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
          text: "Pergerakan Harga Saham",
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
          title: {
            text: "Price",
          },
          labels: {
            formatter: function (value) {
              // Menggunakan floor.js untuk membulatkan nilai ke bawah
              return value.toFixed();
            },
          },
        },
        xaxis: {
          type: "datetime",
          
        },
        tooltip: {
          shared: false,
        },
      },
      headers: [
        { text: "Date", value: "date" },
        { text: "Closing", value: "closing" },
        { text: "Prediksi", value: "predict" },
      ],

      items: [],

      listDates: [],

      nextPredict: {
        date: "",
        predict: 0,
        rmse: 0,
        updateAt: "",
      },

      prevPredict: {
        date: "",
        predict: 0,
        rmse: 0,
        updateAt: "",
      },

      dataGraphClose: [],
      dataGraphPredict: [],

      selectedDate: "",
      ticker: this.$route.query.ticker,
    };
  },

  methods: {
    updateSeries() {
      for (let i = 0; i < 120; i++) {
        this.ts2 = this.ts2 + 86400000;
        this.dates.push([this.ts2, dataSeries[1][i].value]);
      }

      this.series = [
        {
          name: "Close",
          data: this.dataGraphClose,
        },
        {
          name: "Predict",
          data: this.dataGraphPredict,
        },
      ];
    },

    changedDate() {
      this.getStockBySelectedDate();
      // this.getGraph();
      this.getGraphBySelectedDate();
    },

    getStock() {
      let ticker = this.ticker;
     
      this.$http
        .get(`${this.url_api}/stock?ticker=${ticker}`)
        .then((response) => {
          response.data.data_predict.forEach((element) => {
            this.listDates.push(element.date);
            this.listDates = this.listDates.reverse();
            this.selectedDate = this.listDates[0];
          });
          console.log(this.selectedDate, "selected date");
          console.log(this.listDates[0]);
          if (this.selectedDate == this.listDates[0]) {
            this.nextPredict = response.data.data_predict.slice(-1)[0];
            this.prevPredict = response.data.data_predict.slice(-2)[0];
          } else {
            response.data.data_predict.forEach((element) => {
              if (element.date == this.selectedDate) {
                this.nextPredict = element;
                if (response.data.data_predict.indexOf(element) == 0) {
                  this.prevPredict = null;
                } else{
                  this.prevPredict =
                    response.data.data_predict[
                      response.data.data_predict.indexOf(element) - 1
                    ];
                }
              }
            });
          }
        });
    },

    getStockBySelectedDate(){
      this.nextPredict = {
        date: "",
        predict: 0,
        rmse: 0,
        updateAt: "",
      };
      this.prefPredict = {
        date: "",
        predict: 0,
        rmse: 0,
        updateAt: "",
      };
      let ticker = this.ticker;
      let date = this.selectedDate;
      this.$http
        .get(`${this.url_api}/stock?ticker=${ticker}&date=${date}`)
        .then((response) => {
          if (this.selectedDate == this.listDates[0]) {
            this.nextPredict = response.data.data_predict.slice(-1)[0];
            this.prevPredict = response.data.data_predict.slice(-2)[0];
          } else {
            response.data.data_predict.forEach((element) => {
              if (element.date == this.selectedDate) {
                this.nextPredict = element;
                if (response.data.data_predict.indexOf(element) == 0) {
                  this.prevPredict = null;
                } else{
                  this.prevPredict =
                    response.data.data_predict[
                      response.data.data_predict.indexOf(element) - 1
                    ];
                }
              }
            });
          }
        });
    },
    

    getGraph() {
      this.dataGraphClose= []
      this.dataGraphPredict= []
      let ticker = this.ticker;

      this.$http
        .get(`${this.url_api}/datastock?ticker=${ticker}`)
        .then((response) => {
          response.data.forEach((element) => {
            this.dataGraphClose.push({ x: element.Date, y: element.Close });
            this.dataGraphPredict.push({ x: element.Date, y: element.predict });
            this.items.push({
              date: element.Date,
              closing: element.Close,
              predict: element.predict,
            });
          });
        });
    },

    getGraphBySelectedDate(){
      this.dataGraphClose= []
      this.dataGraphPredict= []
      this.items = []
      let ticker = this.ticker;
      let date = this.selectedDate;
      console.log(ticker, date, "date selected")
      this.$http
        .get(`${this.url_api}/datastock?ticker=${ticker}&date=${date}`)
        .then((response) => {
          response.data.forEach((element) => {
            this.dataGraphClose.push({ x: element.Date, y: element.Close });
            this.dataGraphPredict.push({ x: element.Date, y: element.predict });
            this.items.push({
              date: element.Date,
              closing: element.Close,
              predict: element.predict,
            });
          });
        }).then(() => {
          this.updateSeries();
          this.items = this.items.reverse();
        });
    }
  },
  created() {
    
    
  },

  mounted() {
    this.getStock();
    this.getGraph();
    setTimeout(() => {
      this.updateSeries();
      this.items = this.items.reverse();
    }, 2000);
  },
};
</script>
