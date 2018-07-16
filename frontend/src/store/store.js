import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    audioLinks: []
  },
  getters: {
    getAudioLinks: state => {
      return state.audioLinks;
    }
  },
  actions: {
    updateAudioLinks(context, audioLinks) {
      console.log("actions");
      context.commit("updateAudioLinks", audioLinks);
    }
  },
  mutations: {
    updateAudioLinks: (state, audioLinks) => {
      console.log("mutations");
      console.log(audioLinks[0]);
      state.audioLinks = audioLinks;
    }
  }
});
