<template>
<div>
    <div>
        <template v-for="audio in audios">
            <RawAudioViewSingle :audio='audio' :key="audio.id"></RawAudioViewSingle>
        </template>
    </div>
    <p><strong>{{ indexOfLastLoaded+1 }}</strong> of {{ numOfAudioLinks }} Loaded</p>
    <div v-if="isMoreAudios">
        Load Another
        <input type="number" min="1" max="500" v-model="numOfEachLoaded" value="numOfEachLoaded"> Videos
        <button @click="loadAudios()" class="btn btn-success">Go!</button>
    </div>
    <div v-else>
        <button disabled class="btn btn-warning">No More Audios</button>
    </div>
</div>
</template>

<script>
import RawAudioViewSingle from "./RawAudioViewSingle.vue";
export default {
  data: function() {
    return {
      numOfFirstLoaded: 2, // numver of audios firstly loaded
      numOfEachLoaded: 5, // numver of audios loaded each time the button is pressed
      audioLinks: [], // list of audios from backend response
      audios: [], // audio objects, {id, audioLink} where auidoLink is from audioLinks
      numOfAudioLinks: 0, // number of audioLinks totally, initialize as 0
      indexOfLastLoaded: -1, // record the index of the last loaded audio
      isMoreAudios: true
    };
  },
  sockets: {
    connect: function() {
      // console.log("Client: connect to Server");
    },
    // listen for "returnAudioLinks" emmited from backend with data "audioLinks"
    responseAudioLinks: function(audioLinks) {
      this.$store.dispatch("updateAudioLinks", audioLinks); // update data in store
      this.audioLinks = this.$store.getters.getAudioLinks; // update data in this vue object
      this.numOfAudioLinks = this.audioLinks.length; // update numOfAudioLinks
      this.loadAudios(this.numOfFirstLoaded); // when get audioLinks from backend, load some of them
    }
  },
  methods: {
    loadAudios(numToLoad = this.numOfEachLoaded) {
      // if there is no more audios, then return
      if (!this.isMoreAudios) {
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
      }
      // if all audios have been loaded, indexOfLastLoaded is same as numOfAudioLinks-1, no more audio to load
      if (this.indexOfLastLoaded == this.numOfAudioLinks - 1) {
        this.isMoreAudios = false;
      }
    },
    // emit "getAudioLinks" to backend server
    requestAudioLinks() {
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
input {
  text-align: right;
}
</style>
