<template>
<div>
    <!-- <p>RawAudioViews Parent</p> -->
    <template v-for="audio in audios">
        <RawAudioViewSingle :audio='audio' :key="audio.id"></RawAudioViewSingle>
    </template>
    <br>
    <p><strong>{{ indexOfLastLoaded+1 }}</strong> of {{ numOfAudioLinks }} Loaded</p>
    <br>
    <button @click="loadAudios()" class="btn btn-primary">Load More</button>
</div>
</template>

<script>
import RawAudioViewSingle from "./RawAudioViewSingle.vue";
export default {
  data: function() {
    return {
      numOfFirstLoaded: 10, // numver of audios firstly loaded
      numOfEachLoaded: 5, // numver of audios loaded each time the button is pressed

      audioLinks: [], // list of audios from backend response
      audios: [], // audio objects, {id, audioLink} where auidoLink is from audioLinks

      numOfAudioLinks: 0, // number of audioLinks totally, initialize as 0
      indexOfLastLoaded: -1 // record the index of the last loaded audio
    };
  },
  sockets: {
    connect: function() {
      console.log("Client: connect to Server");
    },

    // listen for "returnAudioLinks" emmited from backend with data "audioLinks"
    responseAudioLinks: function(audioLinks) {
      this.$store.dispatch("updateAudioLinks", audioLinks); // update data in store
      this.audioLinks = this.$store.getters.getAudioLinks; // update data in this vue object
      // this.audioLinks = audioLinks;

      this.numOfAudioLinks = this.audioLinks.length; // update numOfAudioLinks

      this.loadAudios(this.numOfFirstLoaded); // when get audioLinks from backend, load some of them
    }
  },
  methods: {
    loadAudios(numToLoad = this.numOfEachLoaded) {
      console.log("loadAudios called");
      // if all audios have been loaded, indexOfLastLoaded is same as numOfAudioLinks-1, then return
      if (this.indexOfLastLoaded == this.numOfAudioLinks - 1) {
        console.log("No more audio to load");
        return;
      }
      var len = this.numOfAudioLinks;
      var indexLastEnd = this.indexOfLastLoaded;
      var indexEnd = Math.min(indexLastEnd + numToLoad, len - 1);
      this.indexOfLastLoaded = indexEnd;

      for (var i = indexLastEnd + 1; i <= indexEnd; i++) {
        var audio = {
          id: i,
          link: this.audioLinks[i]
        };
        this.audios.push(audio);
        // console.log(audio);
      }
    },

    // emit "getAudioLinks" to backend server
    requestAudioLinks() {
      // console.log("getAudioLinks emitted");
      this.$socket.emit("requestAudioLinks");
    }
  },
  created() {
    this.requestAudioLinks();
  },
  components: {
    RawAudioViewSingle
  }
};
</script>

<style scoped>
</style>
