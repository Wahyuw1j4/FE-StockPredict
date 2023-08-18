<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 "
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create and account
          </h1>
          <div v-if="error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Error </strong>
            <span class="block sm:inline"
              >{{ error }}</span
            >
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
          <form
            class="space-y-4 md:space-y-6"
            method="post"
            @submit.prevent="registerSubmit"
          >
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700"
                placeholder="Your name"
                required
                v-model="register.name"
              />
            </div>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700"
                placeholder="Your username"
                required
                v-model="register.username"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700"
                required=""
                v-model="register.password"
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm password</label
              >
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700"
                required=""
                v-model="register.repeat_password"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <routerLink
                to="/login"
                class="font-medium text-violet-600 hover:underline"
                >Login here</routerLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, getCurrentInstance, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const register = reactive({
      name: "",
      username: "",
      password: "",
      repeat_password: "",
    });
    let error = ref("");
    const webHost = ref(import.meta.env.VITE_BACKEND_WEB_HOST)
    const registerSubmit = async () => {
      if (register.password !== register.repeat_password) {
        // Kasus: Password dan konfirmasi password tidak sesuai
        // Tampilkan pesan kesalahan atau lakukan manipulasi yang sesuai
        error.value = "Password dan konfirmasi password tidak sesuai";
        console.log("Password dan konfirmasi password tidak sesuai");
        return;
      }

      try {
        const response = await axios.post(
          `${webHost.value}/register`,
          register
        );
        if (response.data.status === "success") {
          // Kasus: Response menunjukkan pendaftaran berhasil
          proxy.$router.push({
            path: "/login",
            query: { message: response.data.message },
          });
        } else {
          // Kasus: Pendaftaran gagal atau ada kesalahan lainnya
          // Tampilkan pesan kesalahan atau lakukan manipulasi yang sesuai
          error.value = response.data.message;
          console.log("Pendaftaran gagal:", response.data.message);
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi masalah dengan permintaan ke server
        error = error.response.data.message;
        console.log("Error:", error.response.data.message);
      }
    };
    return {
      register,
      error,
      registerSubmit,
    };
  },
};
</script>
