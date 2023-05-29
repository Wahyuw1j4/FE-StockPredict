<template>
  <navbar />
  <main>
    <div class="w-auto h-200 mt-5 lg:mx-[10rem] md:mx-[2rem] m-2">
      <div class="border-2 border-rose-600 bg-rose-100 lg:p-5 p-3">
        <span class="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <span>
            <p class="font-bold text-neutral-500">Saham Perusahaan</p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">BBRI</p>
            <p class="font-bold text-neutral-500">Tanggal</p>
            <p class="font-bold text-2xl text-neutral-700">30-01-2023</p>
          </span>
          <span>
            <p class="font-bold text-neutral-500">
              Harga saham closing kemarin
            </p>
            <p class="font-bold text-4xl text-neutral-700">Rp. 4.000</p>
          </span>
          <span>
            <p class="font-bold text-neutral-500">
              Prediksi harga saham kemarin
            </p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">Rp. 4.000</p>
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
                <p class="font-bold text-4xl text-neutral-700">10</p>
              </span>

              <span>
                <p class="font-bold text-neutral-500">Presentase</p>
                <p class="font-bold text-4xl text-neutral-700">10%</p>
              </span>
            </span>
          </span>
          <span>
            <p class="font-bold text-neutral-500 lg:whitespace-nowrap">
              Prediksi harga saham berikutnya
            </p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">Rp. 4.000</p>
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
                <p class="font-bold text-4xl text-neutral-700">10</p>
              </span>

              <span>
                <p class="font-bold text-neutral-500">Presentase</p>
                <span class="flex">
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                  <ArrowTrendingDownIcon class="h-6 w-6 text-rose-500" />
                </span>
              </span>
            </span>
          </span>
        </span>
        <span class="flex justify-between font-bold mt-5">
          <span>
            <p class="font-bold text-neutral-500">Terakhir diperbarui</p>
            <p class="font-bold text-neutral-700">4 Jfam yang lalu</p>
          </span>
          <span
            class="flex items-end hover:translate-x-2 transition cursor-pointer"
          >
            <p class="place-content-end">Info Lebih Lanjut</p>
            <ChevronDoubleRightIcon class="w-5 h-6"></ChevronDoubleRightIcon>
          </span>
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
import { ref, reactive, computed } from "vue";
import navbar from "../components/navbarComponent.vue";

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
    return {
      information,
      rmseInfo,
      isVisibleInfo,
    };
  },
};
</script>
