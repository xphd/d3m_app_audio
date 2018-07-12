<template>
  <div>
    <p>RawAudioViews Parent</p>
    <RawAudioView :audio='audio1'></RawAudioView>    
    <RawAudioView :audio='audio2' ></RawAudioView>    
        
  </div>
</template>

<script>
import RawAudioView from "./RawAudioView.vue";
export default {
  data() {
    return {
      audio1: {
        id: "id_1",
        url: "http://localhost:3000/Beethoven_12_Variation.mp3"
      },
      audio2: {
        id: "id_2",
        url:
          "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
      }
    };
  },
  components: {
    RawAudioView
  },
  // created() {
  //   let recaptchaScript = document.createElement("script");
  //   recaptchaScript.setAttribute(
  //     "src",
  //     "//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/2.0.5/wavesurfer.min.js"
  //   );
  //   document.head.appendChild(recaptchaScript);
  // }
};
</script>

<style scoped>
</style>