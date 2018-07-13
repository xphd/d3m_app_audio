<template>
<div>
    <p>RawAudioViews Parent</p>

    <template v-for="audio in audios">
        <RawAudioViewSingle :audio='audio' :key="audio.id"></RawAudioViewSingle>
    </template>
    <!-- <RawAudioViewSingle :audio='audios[0]'></RawAudioViewSingle> -->

    <br>
    <button @click="loadMore" class="btn btn-primary">Load More</button>

</div>
</template>

<script>
import RawAudioViewSingle from "./RawAudioViewSingle.vue";
export default {
  data() {
    return {
      audioLinks: this.$store.getters.getAudioLinks,

      audios: [], // populated once created, {id, link}, link in from audioLinks

      numOfAudioLinks: 0, // number of audioLinks
      numOfFirstLoaded: 3, // numver of audios firstly loaded
      numOfEachLoaded: 2, // numver of audios loaded each time the button is pressed
      indexOfLastLoaded: 0 // record the index of the last loaded audio
    };
  },
  methods: {
    loadMore: () => {
      console.log("load more");
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
      }
      console.log(this.audios.length);
    }
  },
  created() {
    // create audio object, {id, link}, link is from audioLinks
    // for each audio link in audioLinks, create an object with id and link
    var len = this.audioLinks.length;
    this.numOfAudioLinks = len;
    this.indexOfLastLoaded = Math.min(len - 1, this.numOfFirstLoaded - 1);
    for (var i = 0; i <= this.indexOfLastLoaded; i++) {
      var audio = {
        id: i,
        link: this.audioLinks[i]
      };
      this.audios.push(audio);
    }
    console.log();
  },

  components: {
    RawAudioViewSingle
  }
};
</script>

<style scoped>
</style>
