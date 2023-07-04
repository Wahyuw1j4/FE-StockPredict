import { createStore } from "vuex";
import jwt_decode from "jwt-decode";


const store = createStore({
  state: {
    count: 0,
    role: "",
    username: "",
    token: "",
    decodeToken: "",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser: (state, token) => {
      state.token = token;
      try {
        state.decodeToken = jwt_decode(token);
        if(state.decodeToken.role == 0){
          state.role = "Admin";
        }else if(state.decodeToken.role == 1){
          state.role = "User";
        }
        state.username = state.decodeToken.username;
      } catch (error) {
        localStorage.removeItem('token')
        store.commit('setRole', '')
        store.commit('setUsername', '')
      }
    },

  },
});

export { store };
