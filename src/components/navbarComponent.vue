<template>
<header>
    <div
      class="bg-slate-100 w-full h-[4rem] flex justify-between items-center lg:px-[12rem] px-[1rem] text-zinc-950 border-b-4 border-slate-300"
    >
      <routerLink to="/" class="font-bold">Stock Predict</routerLink>
      <nav class="lg:flex w-[10rem] h-full hidden">
        <span v-if="role == 'Admin'">
          <routerLink to="/listrequest"  class='font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3'
          >
            Request List
          </routerLink>
        </span>
        <routerLink to="/request"
          class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3"
        >
          Request
        </routerLink>
        <routerLink to="/tentang"
          class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3"
        >
          Tentang
        </routerLink>
        <span class="font-bold hover:cursor-pointer hover:bg-slate-200 hover:text-neutral-500 w-full h-full flex items-center justify-center px-3" @click="logouted">
          Logout
        </span>
      </nav>
    </div>
  </header>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default{
  setup(){
    const store = useStore()
    const role = store.state.role
    const username = store.state.username
    const { proxy } = getCurrentInstance()

    const logouted = () => {
      localStorage.removeItem('token')
      store.commit('setRole', '')
      store.commit('setUsername', '')
      proxy.$router.push('/login')
    }
    return{
      role,
      username,
      logouted 
    }
  }

}
</script>