<template>
  <div id="app">
    <h1>Hello World!</h1>
    <button @click="sendRequest">Get Audio</button>
    <RawAudioView></RawAudioView>
  </div>
</template>

<script>
import RawAudioView from "./components/cards/RawAudioView.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    RawAudioView
  },
  sockets: {
    connect: function() {
      console.log("Client: get Server");
    },
    // customEmit: function(val) {
    //   console.log(
    //     'this method was fired by the socket server. eg: io.emit("customEmit", data)' +
    //       val
    //   );
    // }
    returnAudio: function(audio) {
      console.log(audio);
    }
  },
  methods: {
    sendRequest() {
      this.$socket.emit("getAudio");
      // console.log("getSth is invoked!");
      // this.$http.get("http://localhost:3000/").then(
      //   res => {
      //     console.log(res);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    }
  }
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
