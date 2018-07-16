<template>
<div>
    <p>RawAudioViews Parent</p>

    <template v-for="audio in audios">
        <RawAudioViewSingle :audio='audio' :key="audio.id"></RawAudioViewSingle>
    </template>
    <!-- <RawAudioViewSingle :audio='audios[0]'></RawAudioViewSingle> -->

    <br>
    <button @click="loadMore" class="btn btn-primary">Load More</button>
    <button @click="generateAudios" class="btn btn-primary">generateAudios</button>
    

</div>
</template>

<script>
import RawAudioViewSingle from "./RawAudioViewSingle.vue";
export default {
  data: function() {
    return {
      // audioLinks: this.$store.state.audioLinks,
      audioLinks: [],

      audios: [], // populated once created, {id, link}, link in from audioLinks

      numOfAudioLinks: 0, // number of audioLinks, initialize as 0
      numOfFirstLoaded: 2, // numver of audios firstly loaded
      numOfEachLoaded: 1, // numver of audios loaded each time the button is pressed
      indexOfLastLoaded: 0 // record the index of the last loaded audio
    };
  },
  sockets: {
    connect: function() {
      console.log("Client: get Server");
    },

    // returnAudio: function(audio) {
    //   console.log(audio);
    // },

    // listen for "returnAudioLinks" emmited from backend with data "audioLinks"
    returnAudioLinks: function(audioLinks) {
      // console.log(audioLinks);

      this.$store.commit("setAudioLinks", audioLinks);
      console.log("From store getters getAudioLinks");
      console.log(this.$store.getters.getAudioLinks);
      this.generateAudios();
    }
  },
  methods: {
    // sendRequest() {
    //   console.log("sendRequest activate");
    //   this.$socket.emit("getAudio");
    // },

    // emit "getAudioLinks" to backend server
    getAudioLinks() {
      console.log("getAudioLinks emitted");
      this.$socket.emit("getAudioLinks");
    },

    loadMore() {
      // if all audios have been loaded, indexOfLastLoaded is same as numOfAudioLinks-1, then return
      if (this.indexOfLastLoaded == this.numOfAudioLinks - 1) {
        console.log("No more audio to load");
        return;
      }
      var len = this.numOfAudioLinks;
      var indexLastEnd = this.indexOfLastLoaded;
      var indexEnd = Math.min(indexLastEnd + this.numOfEachLoaded, len - 1);
      this.indexOfLastLoaded = indexEnd;

      for (var i = indexLastEnd + 1; i <= indexEnd; i++) {
        var audio = {
          id: i,
          link: this.audioLinks[i]
        };
        this.audios.push(audio);
        console.log(audio);
      }
      // console.log(this.audios.len);
    },

    generateAudios() {
      // create audio object, {id, link}, link is from audioLinks
      // for each audio link in audioLinks, create an object with id and link
      this.audioLinks = this.$store.state.audioLinks;
      console.log(this.audioLinks);
      this.numOfAudioLinks = this.audioLinks.length; // len for shortcut
      var len = this.numOfAudioLinks;
      console.log(len);
      this.indexOfLastLoaded = Math.min(len, this.numOfFirstLoaded) - 1;
      this.audios = [];
      for (var i = 0; i <= this.indexOfLastLoaded; i++) {
        var audio = {
          id: i,
          link: this.audioLinks[i]
        };
        this.audios.push(audio);
      }
    }
  },
  created() {
    this.getAudioLinks();
    // this.generateAudios();
  },

  components: {
    RawAudioViewSingle
  }
};
</script>

<style scoped>
</style>
