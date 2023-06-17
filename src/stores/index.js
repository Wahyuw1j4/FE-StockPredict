import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 0,
    role: "",
    username: "",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setRole: (state, role) => {
      if (role == 0){
          state.role = "Admin";
        }else if (role == 1){
            state.role = "User";
        }
    },
    setUsername: (state, username) => {
      state.username = username;
    },
  },
});

export { store };
