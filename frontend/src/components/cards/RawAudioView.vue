<template>
<div>
  <p>RawAudioView Child</p>
  <!-- #waveform will be replaced later by WaveSurfer -->
  <div :id="id"></div>

  <div style="text-align: center">
    <button class="btn btn-primary" @click="wavesurfer.skipBackward()">
      <i class="glyphicon glyphicon-step-backward"></i>
      Backward
    </button>

    <button class="btn btn-primary" @click="wavesurfer.playPause()">
      <i class="glyphicon glyphicon-play"></i>
      Play /
      <i class="glyphicon glyphicon-pause"></i>
      Pause
    </button>

    <button class="btn btn-primary" @click="wavesurfer.skipForward()">
      <i class="glyphicon glyphicon-step-forward"></i>
      Forward
    </button>

    <button class="btn btn-primary" @click="wavesurfer.toggleMute()">
      <i class="glyphicon glyphicon-volume-off"></i>
      Toggle Mute
    </button>

  </div>

  
</div>
</template>

<script>
export default {
  props: ["audio"], // audio is an object with id and url of audio file
  data: function() {
    return {
      // wavefurfer will be created by WaveSurfer.create()
      wavesurfer: null,

      // pass the audio info
      id: this.audio.id,
      url: this.audio.url
    };
  },

  // after the template is crated, mount it
  // WaveSurfer is from wavesurfer.min.js, it can be accessed from window
  // that's why to use window.WaveSurfer
  mounted() {
    //wavesurfer is declared in Vue data component
    this.wavesurfer = window.WaveSurfer.create({
      container: "#" + this.id,
      waveColor: "red",
      progressColor: "purple"
    });

    // load a sample mp3 file from cloud
    // this.wavesurfer.load(
    //   "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
    // );
    // var url =
    // "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3";
    // var path = "/src/static/344.wav";
    // var unregisterModule = "/src/static/204919.mp3";
    // var path = "/src/static/SampleAudio_0.4mb.mp3";
    var url = this.url;
    this.wavesurfer.load(url);
  }
};
</script>

<style scoped>
</style>
