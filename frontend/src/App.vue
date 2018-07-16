<template>
  <div id="app">
    <h1>Hello World!</h1>
    <!-- <button @click="sendRequest">Get Audio</button> -->
    <!-- <button @click="getAudioLinks">Get Audio Links</button> -->
    <RawAudioView></RawAudioView>

  </div>
</template>

<script>
import RawAudioView from "./components/cards/RawAudioView.vue";

export default {
  name: "app",

  components: {
    RawAudioView
  },
  // sockets: {
  //   connect: function() {
  //     console.log("Client: get Server");
  //   },

  //   returnAudio: function(audio) {
  //     console.log(audio);
  //   },

  //   // listen for "returnAudioLinks" emmited from backend with data "audioLinks"
  //   returnAudioLinks: function(audioLinks) {
  //     // console.log(audioLinks);

  //     this.$store.commit("setAudioLinks", audioLinks);
  //     console.log("From store getters getAudioLinks");
  //     console.log(this.$store.getters.getAudioLinks);
  //   }
  // },
  // methods: {
  //   sendRequest() {
  //     console.log("sendRequest activate");
  //     this.$socket.emit("getAudio");
  //   },

  //   // emit "getAudioLinks" to backend server
  //   getAudioLinks() {
  //     console.log("getAudioLinks emitted");
  //     this.$socket.emit("getAudioLinks");
  //   }
  // },
  // created() {
  //   this.getAudioLinks();
  // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
