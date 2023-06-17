<template>
  <navbar />
  <main class="lg:px-[12rem] px-4">
    <p class="font-bold py-4">List Request Saham</p>
    <easyTable
      :headers="headersReq"
      :items="itemsReq"
      table-class-name="custom-table"
      header-text-direction="center"
      body-text-direction="center"
    />
    <p class="font-bold py-4">Tambah Saham Perusahaan</p>
    <div class="flex justify-end pb-2">
      <button
        type="button"
        @click="openModal"
        class="rounded-md bg-violet-800 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Tambah Request
      </button>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 mb-4 stext-gray-900"
                >
                  Tambah Saham
                </DialogTitle>
                <div class="mt-2">
                  <form class="bg-white">
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        for="ticker"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Masukan Nama Ticker Saham</label
                      >
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        for="ticker"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Masukan Nama Panjang Saham Perusahaan</label
                      >
                    </div>
                    <div class="mt-4">
                      <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="closeModal"
                      >
                        Tambahkan
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <easyTable
      :headers="headersAdd"
      :items="itemsAdd"
      table-class-name="custom-table"
      header-text-direction="center"
      body-text-direction="center"
    >
      <template #item-operation="item">
        <div class="operation-wrapper flex justify-center">
          <img
            src="../assets/svg/delete.svg"
            class="cursor-pointer hover:text-slate-300"
            @click="deleteItem(item)"
          />
          <img
            src="../assets/svg/edit.svg "
            class="cursor-pointer"
            @click="editItem(item)"
          />
        </div>
      </template>
    </easyTable>
  </main>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import navbar from "../components/navbarComponent.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    navbar,
    easyTable: Vue3EasyDataTable,
  },
  setup() {
    const isOpen = ref(false);

    function closeModal() {
      isOpen.value = false;
    }
    function openModal() {
      isOpen.value = true;
    }

    const headersReq = reactive([
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Nama Saham",
        value: "name",
      },
      {
        text: "Ticker Saham",
        value: "ticker",
      },
      {
        text: "Alasan",
        value: "alasan",
      },
    ]);

    const itemsReq = reactive([]);

    const headersAdd = reactive([
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Tiker Saham",
        value: "ticker",
      },
      {
        text: "Nama Saham Perusahaan",
        value: "name",
      },
      { text: "Operation", value: "operation" },
    ]);

    const itemsAdd = reactive([]);

    const deleteItem = (item) => {
      const response = axios.delete(`http://localhost:4140/stock/${item.id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200){
        itemsAdd.splice(itemsAdd.indexOf(item), 1);
      }else{
        toast.error('ada kesalahan');
      }
    };

    const editItem = (item) => {
      const response = axios.put(`http://localhost:4140/stock/${item.id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.status === 200){
        itemsAdd.splice(itemsAdd.indexOf(item), 1);
      }else{
        toast.error('ada kesalahan');
      }
    };

    const ganerateItemsReq = async () => {
      const response = await axios.get("http://localhost:4140/request", {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data, "ini data req");
      itemsReq.push(...response.data.data);
    }

    const ganerateItemsAdd = async () => {
      const response = await axios.get("http://localhost:4140/stock", {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data, "ini data add");
      itemsAdd.push(...response.data.data);
    }

    onMounted(() => {
      ganerateItemsReq();
      ganerateItemsAdd();
    });

  

    return {
      isOpen,
      closeModal,
      openModal,
      headersReq,
      itemsReq,
      headersAdd,
      itemsAdd,
    };
  },
};
</script>

<style>
.custom-table {
  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;
}
</style>
