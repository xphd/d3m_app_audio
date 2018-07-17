<template>
<div>
    <!-- <p>RawAudioView Child</p> -->
    <p>{{ name }}</p>
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
    <hr>
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
      id: "audio" + this.audio.id,
      link: this.audio.link,
      name: ""
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
    this.wavesurfer.load(this.link);

    // get the name of audio file, that is the last part of link
    var temp = this.link.split("/");
    this.name = temp[temp.length - 1];
  }

  // created() {
  //   console.log(this.link);
  // },
};
</script>

<style scoped>
</style>
