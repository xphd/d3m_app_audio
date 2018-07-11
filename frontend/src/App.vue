<template>
  <div id="app">
    <h1>Hello World!</h1>
    <button @click="getSth">Get Request</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  sockets: {
    connect: function() {
      console.log("socket connected frontend");
    },
    customEmit: function(val) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)' +
          val
      );
    }
  },
  methods: {
    getSth() {
      this.$socket.emit("start");
      // console.log("getSth is invoked!");
      // this.$http.get("http://localhost:5000/").then(
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
