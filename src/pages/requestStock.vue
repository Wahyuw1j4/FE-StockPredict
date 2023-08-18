<template>
  <navbar />
  <div class="flex flex-col lg:mx-[20rem] mx-4">
    <p class="font-bold py-4 mx-auto">Request Saham Perusahaan</p>
    <form class="bg-white" @submit.prevent="submitData" method="post">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="ticker"
          id="ticker"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="data.ticker"
        />
        {{ data.ticker }}
        <label
          for="ticker"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Masukan nama ticker saham</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="name_stock"
          id="name_stock"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="data.name_stock"
        />
        <label
          for="name_stock"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Masukan nama panjang saham perusahaan</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="reason"
          id="reason"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="data.reason"
        />
        <label
          for="reason"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Mengapa kami harus menambahkan saham ini?</label
        >
      </div>
      <div class="mt-4">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Tambahkan
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import navbar from "../components/navbarComponent.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    navbar,
  },
  setup() {
    let data = reactive({
      ticker: "",
      name_stock: "",
      reason: "",
    });

    const webHost = ref(import.meta.env.VITE_BACKEND_WEB_HOST)

    const submitData = async () => {
      console.log(data);
      const response = await axios.post(`${webHost.value}/request`, data, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
      });
      if (response.status == 200) {
        toast.success("Data request Stock Terkirim", {
          autoClose: 3000,
        });
      } else{
        toast.error("Ada Kesalahan, Hubungi pemilik website", {
          autoClose: 3000,
        });
      }
    };
    return {
      data,
      submitData,
    };
  },
};
</script>
