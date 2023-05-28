<template>
  <header>
    <div
      class="bg-slate-100 w-full h-[4rem] flex justify-between items-center px-[12rem] text-zinc-950 border-b-4 border-slate-300"
    >
      <p class="font-bold">Stock predict</p>
      <nav class="flex w-[10rem] h-full">
        <p
          class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3"
        >
          Request
        </p>
        <p
          class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3"
        >
          Tentang
        </p>
        <p
          class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3"
        >
          Login
        </p>
      </nav>
    </div>
  </header>
  <main>
    <div class="w-auto h-200 mt-5 mx-[12rem]">
      <div class="border-2 border-rose-600 my-4 bg-rose-100 p-5">
        <span class="flex justify-between">
          <span>
            <p class="font-bold text-neutral-500">Saham Perusahaan</p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">BBRI</p>
            <p class="font-bold text-neutral-500">Tanggal</p>
            <p class="font-bold text-2xl text-neutral-700">30-01-2023</p>
          </span>
          <span class="flex justify-between gap-5">
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
              <span class="flex gap-4">
                <span>
                    <span class="flex relative">
                        <p class="font-bold text-neutral-500 z-0">RMSE</p>
                        <InformationCircleIcon class="h-6 w-5 text-neutral-500 hover:cursor-pointer" @click="isVisibleInfo(2)"/>
                        <div class="absolute p-2 bg-white w-[15rem] border-2 right-[-15rem] z-10" :class="rmseInfo[2] ? '' : 'hidden'">
                            <XMarkIcon class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2" @click="isVisibleInfo(2)"/>
                            <p class="font-bold text-neutral-500">{{ information.title }}</p>
                            <p class="text-neutral-700 text-justify">{{information.description}}</p>
                        </div>
                    </span>
                  <p class="font-bold text-4xl text-neutral-700">10</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">MAPE</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">Presentase</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
              </span>
            </span>
            <span>
              <p class="font-bold text-neutral-500">
                Prediksi harga saham berikutnya
              </p>
              <p class="font-bold text-4xl text-neutral-700 mb-2">Rp. 4.000</p>
              <span class="flex gap-4">
                <span>
                  <span class="flex relative">
                        <p class="font-bold text-neutral-500 z-0">RMSE</p>
                        <InformationCircleIcon class="h-6 w-5 text-neutral-500 hover:cursor-pointer" @click="isVisibleInfo(3)"/>
                        <div class="absolute p-2 bg-white w-[15rem] border-2 right-[-15rem] z-10" :class="rmseInfo[3] ? '' : 'hidden'">
                            <XMarkIcon class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2" @click="isVisibleInfo(3)"/>
                            <p class="font-bold text-neutral-500">{{ information.title }}</p>
                            <p class="text-neutral-700 text-justify">{{information.description}}</p>
                        </div>
                    </span>
                  <p class="font-bold text-4xl text-neutral-700">10</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">MAPE</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">Presentase</p>
                  <span class="flex">
                      <p class="font-bold text-4xl text-neutral-700">10%</p>
                      <ArrowTrendingDownIcon class="h-6 w-6 text-rose-500"/>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
        <span class="flex justify-between"> </span>
      </div>
      <div class="border-2 border-emerald-600 my-4 bg-emerald-100 p-5">
        <span class="flex justify-between">
          <span>
            <p class="font-bold text-neutral-500">Saham Perusahaan</p>
            <p class="font-bold text-4xl text-neutral-700 mb-2">BBRI</p>
            <p class="font-bold text-neutral-500">Tanggal</p>
            <p class="font-bold text-2xl text-neutral-700">30-01-2023</p>
          </span>
          <span class="flex justify-between gap-5">
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
              <span class="flex gap-4">
                <span>
                    <span class="flex relative">
                        <p class="font-bold text-neutral-500 z-0">RMSE</p>
                        <InformationCircleIcon class="h-6 w-5 text-neutral-500 hover:cursor-pointer" @click="isVisibleInfo(0)"/>
                        <div class="absolute p-2 bg-white w-[15rem] border-2 right-[-15rem] z-10" :class="rmseInfo[0] ? '' : 'hidden'">
                            <XMarkIcon class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2" @click="isVisibleInfo(0)"/>
                            <p class="font-bold text-neutral-500">{{ information.title }}</p>
                            <p class="text-neutral-700 text-justify">{{information.description}}</p>
                        </div>
                    </span>
                  <p class="font-bold text-4xl text-neutral-700">10</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">MAPE</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">Presentase</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
              </span>
            </span>
            <span>
              <p class="font-bold text-neutral-500">
                Prediksi harga saham berikutnya
              </p>
              <p class="font-bold text-4xl text-neutral-700 mb-2">Rp. 4.000</p>
              <span class="flex gap-4">
                <span>
                  <span class="flex relative">
                        <p class="font-bold text-neutral-500 z-0">RMSE</p>
                        <InformationCircleIcon class="h-6 w-5 text-neutral-500 hover:cursor-pointer" @click="isVisibleInfo(1)"/>
                        <div class="absolute p-2 bg-white w-[15rem] border-2 right-[-15rem] z-10" :class="rmseInfo[1] ? '' : 'hidden'">
                            <XMarkIcon class="h-4 w-4 text-neutral-500 hover:cursor-pointer absolute right-2 top-2" @click="isVisibleInfo(1)"/>
                            <p class="font-bold text-neutral-500">{{ information.title }}</p>
                            <p class="text-neutral-700 text-justify">{{information.description}}</p>
                        </div>
                    </span>
                  <p class="font-bold text-4xl text-neutral-700">10</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">MAPE</p>
                  <p class="font-bold text-4xl text-neutral-700">10%</p>
                </span>
                <span>
                  <p class="font-bold text-neutral-500">Presentase</p>
                  <span class="flex">
                      <p class="font-bold text-4xl text-neutral-700">10%</p>
                      <ArrowTrendingUpIcon class="h-6 w-6 text-emerald-500"/>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
        <span class="flex justify-between"> </span>
      </div>
    </div>
  </main>
</template>
<script>
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon,InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, reactive, computed } from 'vue';
export default {
    components: {
        ArrowTrendingUpIcon,
        ArrowTrendingDownIcon,
        InformationCircleIcon,
        XMarkIcon
    },
    setup(_, context){
        const information = reactive({
            'title' : 'RMSE',
            'description' : 'Metode pengukuran dengan mengukur perbedaan rata - rata nilai dari prediksi sebuah model sebagai estimasi atas nilai yang sebenarnya. Semakin rendah nilai RMSE semakin baik performa model.',
        })
        let rmseInfo = reactive([false, false, false, false])

        const isVisibleInfo = (index) => {
            rmseInfo[index] = !rmseInfo[index]
            for (let i = 0; i < rmseInfo.length; i++) {
                if (i != index) {
                    rmseInfo[i] = false
                }
            }
        }

        return {
            information,
            rmseInfo,
            isVisibleInfo
        }
    }
};
</script>
