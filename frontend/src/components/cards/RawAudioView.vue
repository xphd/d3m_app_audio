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
        <input type="number" min="1" max="500" v-model.number="numOfEachLoaded"> Videos
        <button @click="loadAudios()" class="btn btn-success">Go!</button>
    </div>
    <div v-else>
        <button disabled class="btn btn-warning">No More Audios</button>
    </div>
    <br>
    <div>
        View First
        <input type="number" min="1" :max="numOfAudioLinks" v-model.number="numOfLoaded"> Videos
        <button @click="loadAudiosTotal()" class="btn btn-success">Go!</button>
    </div>
</div>
</template>

<script>
import RawAudioViewSingle from "./RawAudioViewSingle.vue";
export default {
  data: function() {
    return {
      numOfFirstLoaded: 5, // number of audios firstly loaded
      numOfLoaded: 0, // total number of loaded audio, this is just one more than indexOfLastLoaded
      indexOfLastLoaded: -1, // record the index of the last loaded audio
      numOfEachLoaded: 10, // numver of audios loaded each time the button is pressed
      audioLinks: [], // list of audios from backend response
      audios: [], // audio objects, {id, audioLink} where auidoLink is from audioLinks
      numOfAudioLinks: 0, // number of audioLinks totally, initialize as 0
      isMoreAudios: true
    };
  },
  sockets: {
    connect: function() {
      // console.log("Client: connect to Server");
    },
    // listen for "returnAudioLinks" emmited from backend with data "audioLinks"
    responseAudioLinks: function(audioLinks) {
      // this.$store.dispatch("updateAudioLinks", audioLinks); // update data in store
      // this.audioLinks = this.$store.getters.getAudioLinks; // update data in this vue object
      this.$store.audioLinks = audioLinks;
      this.audioLinks = this.$store.audioLinks;
      this.numOfAudioLinks = this.audioLinks.length; // update numOfAudioLinks
      this.loadAudios(this.numOfFirstLoaded); // when get audioLinks from backend, load some of them
    }
  },
  methods: {
    loadAudiosTotal() {
      // calculate the difference between wanted number of loaded audios and current number of loaded audios
      var difference = this.numOfLoaded - (this.indexOfLastLoaded + 1);
      console.log(this.numOfLoaded);
      if (difference >= 0) {
        // if difference > 0, aka wanted more than current, just load more "difference" audios
        this.loadAudios(difference);
      } else {
        // else, pick up the first wanted number of audios, and update something
        this.audios = this.audios.splice(0, this.numOfLoaded);
        this.indexOfLastLoaded = this.numOfLoaded - 1;
        this.isMoreAudios = true;
      }
    },
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
    this.numOfLoaded = this.numOfFirstLoaded;
  },
  components: {
    RawAudioViewSingle
  }
};
</script>

<style scoped>
input {
  text-align: right;
  border: 1px solid black;
}
</style>
