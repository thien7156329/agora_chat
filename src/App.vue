<!-- src/App.vue -->
<template>
  <div id="app">
    <VideoCall />
    <Chat />
  </div>
</template>

<script>
import VideoCall from '@/components/VideoCall.vue';
import Chat from '@/components/ChatUI.vue';

export default {
  name: 'App',
  components: {
    VideoCall,
    Chat
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
