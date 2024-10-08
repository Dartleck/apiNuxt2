// store/index.js
export const state = () => ({
    user: null
  });
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    }
  };
  
  export const actions = {
    setUser({ commit }, user) {
      commit('setUser', user);
    }
  };
  