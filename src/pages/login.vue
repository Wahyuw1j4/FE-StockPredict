<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div
            v-if="succesRegister"
            class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span class="font-medium">Registrasi Success</span>
            {{ succesRegister }}
          </div>

          <div
            v-if="error"
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Error </span>
            {{ error }}
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="loginSubmit">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                type="text"
                name="username"
                v-model="login.username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
                placeholder="Your Username"
                required=""
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
                v-model="login.password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <routerLink
                to="/register"
                class="font-medium text-violet-600 hover:underline"
                >Sign up</routerLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const login = ref({
      username: "",
      password: "",
    });
    const { proxy } = getCurrentInstance();
    const error = ref("");
    const webHost = ref(import.meta.env.VITE_BACKEND_WEB_HOST)

    const loginSubmit = async () => {
      try {
        console.log('webHost.value', webHost.value);
        const response = await axios.post(
          `${webHost.value}/login`,
          login.value
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        store.commit("setUser", token);
        proxy.$router.push("/");
      } catch (err) {
        // Tangkap error jika username atau password tidak sesuai
        console.log(err);
        if (err.response && err.response.status === 401) {
          error.value = "Username or password is incorrect.";
        } else {
          error.value =
            "An error occurred during login. Please try again later.";
        }
      }
    };

    const succesRegister = ref(proxy.$route.query.message);

    return {
      login,
      error,
      loginSubmit,
      succesRegister,
    };
  },
};
</script>
