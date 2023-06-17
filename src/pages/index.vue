<template>
  <navbar />
  <main>
    <div
      v-for="stock in stocks"
      class="w-auto h-200 mt-5 lg:mx-[10rem] md:mx-[2rem] m-2"
    >
      <div class="border-2  lg:p-5 p-3" :class="calcPersent(parseInt(stock.data_predict.slice(-2)[0].predict.toFixed(2)), parseInt(stock.data_predict.slice(-1)[0].predict.toFixed(2))) < 0 ? 'border-emerald-600 bg-emerald-100' : 'border-rose-600 bg-rose-100'">
        <span class="flex justify-between gap-2 lg:grid-cols-4">
          <span>
            <p class="font-bold text-neutral-500">Saham Perusahaan</p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">
              {{ stock.name.split(".")[0] }}
            </p>
            <p class="font-bold text-neutral-500">Tanggal</p>
            <p class="font-bold text-2xl text-neutral-700">
              {{ stock.last_date }}
            </p>
          </span>
          <div class="flex gap-2">
            <span>
              <p class="font-bold text-neutral-500">
                Prediksi harga saham kemarin
              </p>
              <p class="font-bold text-4xl text-neutral-700 mb-2">
                Rp. {{ stock.data_predict.slice(-2)[0].predict.toFixed() }}
              </p>
              <span class="flex gap-2">
                <span>
                  <span class="flex relative">
                    <p class="font-bold text-neutral-500 z-0">RMSE</p>
                    <InformationCircleIcon
                      class="h-6 w-5 text-neutral-500 hover:cursor-pointer"
                      @click="isVisibleInfo(2)"
                    />
                    <div
                      class="absolute p-2 bg-white w-[15rem] border-2 z-10"
                      :class="rmseInfo[2] ? '' : 'hidden'"
                    >
                      <XMarkIcon
                        class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2"
                        @click="isVisibleInfo(2)"
                      />
                      <p class="font-bold text-neutral-500">
                        {{ information.title }}
                      </p>
                      <p class="text-neutral-700 text-justify">
                        {{ information.description }}
                      </p>
                    </div>
                  </span>
                  <p class="font-bold text-4xl text-neutral-700">
                    {{ stock.data_predict.slice(-2)[0].rmse.toFixed(2) }}
                  </p>
                </span>
              </span>
            </span>
            <span>
              <p class="font-bold text-neutral-500 lg:whitespace-nowrap">
                Prediksi harga saham berikutnya
              </p>
              <p class="font-bold text-4xl text-neutral-700 mb-2">
                Rp. {{ stock.data_predict.slice(-1)[0].predict.toFixed() }}
              </p>
              <span class="flex gap-2">
                <span>
                  <span class="flex relative">
                    <p class="font-bold text-neutral-500 z-0">RMSE</p>
                    <InformationCircleIcon
                      class="h-6 w-5 text-neutral-500 hover:cursor-pointer"
                      @click="isVisibleInfo(3)"
                    />
                    <div
                      class="absolute p-2 bg-white w-[15rem] border-2 z-10"
                      :class="rmseInfo[3] ? '' : 'hidden'"
                    >
                      <XMarkIcon
                        class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2"
                        @click="isVisibleInfo(3)"
                      />
                      <p class="font-bold text-neutral-500">
                        {{ information.title }}
                      </p>
                      <p class="text-neutral-700 text-justify">
                        {{ information.description }}
                      </p>
                    </div>
                  </span>
                  <p class="font-bold text-4xl text-neutral-700">
                    {{ stock.data_predict.slice(-1)[0].rmse.toFixed(2) }}
                  </p>
                </span>

                <span>
                  <p class="font-bold text-neutral-500">Presentase</p>
                  <span class="flex">
                    <p class="font-bold text-3xl text-neutral-700">{{calcPersent(parseInt(stock.data_predict.slice(-1)[0].predict.toFixed(2)), parseInt(stock.data_predict.slice(-2)[0].predict.toFixed(2)))}}%</p>
                    <ArrowTrendingDownIcon v-if="calcPersent(parseInt(stock.data_predict.slice(-1)[0].predict.toFixed(2)), parseInt(stock.data_predict.slice(-2)[0].predict.toFixed(2))) < 0" class="h-6 w-6 text-rose-500" />
                    <ArrowTrendingUpIcon v-else class="h-6 w-6 text-emerald-500" />
                  </span>
                </span>
              </span>
            </span>
          </div>
        </span>
        <span class="flex justify-between font-bold mt-5">
          <span>
            <p class="font-bold text-neutral-500">Terakhir diperbarui</p>
            <p class="font-bold text-neutral-700">
              {{
                relativeTimeFormat(stock.data_predict.slice(-1)[0].updated_at)
              }}
            </p>
          </span>
          <routerLink
            :to="`/stock?ticker=${stock.name.toUpperCase()}`"
            class="flex items-end hover:translate-x-2 transition cursor-pointer"
          >
            <p class="place-content-end">Info Lebih Lanjut</p>
            <ChevronDoubleRightIcon class="w-5 h-6"></ChevronDoubleRightIcon>
          </routerLink>
        </span>
      </div>
    </div>
  </main>
</template>
<script>
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  InformationCircleIcon,
  XMarkIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import navbar from "../components/navbarComponent.vue";
import axios from "axios";

export default {
  components: {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    InformationCircleIcon,
    XMarkIcon,
    ChevronDoubleRightIcon,
    navbar,
  },
  setup(_, context) {
    let stocks = ref(null);
    const apiUrl = "http://192.168.8.110:5000/";
    const information = reactive({
      title: "RMSE",
      description:
        "Metode pengukuran dengan mengukur perbedaan rata - rata nilai dari prediksi sebuah model sebagai estimasi atas nilai yang sebenarnya. Semakin rendah nilai RMSE semakin baik performa model.",
    });
    let rmseInfo = reactive([false, false, false, false]);

    const isVisibleInfo = (index) => {
      rmseInfo[index] = !rmseInfo[index];
      for (let i = 0; i < rmseInfo.length; i++) {
        if (i != index) {
          rmseInfo[i] = false;
        }
      }
    };

    const getStock = async () => {
      console.log("getStock");
      let response = await axios.get(apiUrl + "stock");
      stocks.value = response.data.data;
      console.log(stocks.value);
    };

    const relativeTimeFormat = (unixTime) => {
      const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
      const difference = currentTime - unixTime; // Perbedaan waktu dalam detik

      // Array untuk menyimpan kata-kata yang digunakan dalam format waktu relatif
      const timeUnits = [
        { unit: "tahun", duration: 31536000 },
        { unit: "bulan", duration: 2592000 },
        { unit: "minggu", duration: 604800 },
        { unit: "hari", duration: 86400 },
        { unit: "jam", duration: 3600 },
        { unit: "menit", duration: 60 },
        { unit: "detik", duration: 1 },
      ];

      for (let i = 0; i < timeUnits.length; i++) {
        const { unit, duration } = timeUnits[i];

        if (difference >= duration) {
          const timeDiff = Math.floor(difference / duration);
          return `${timeDiff} ${unit} yang lalu`;
        }
      }

      return "Baru saja";
    };

    const calcPersent = (value1, value2) => {
      console.log(value1, value2)
      const difference = value1 - value2;
      const percentageDifference = (difference / ((value1 + value2) / 2)) * 100;
      return percentageDifference.toFixed(2); // Mengembalikan persentase perbedaan dengan 2 angka desimal
    };

    onMounted(() => {
      getStock();
    });

    return {
      information,
      rmseInfo,
      isVisibleInfo,
      stocks,
      getStock,
      relativeTimeFormat,
      calcPersent,
    };
  },
};
</script>
