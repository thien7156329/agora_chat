<template>
  <div>
    <div id="local-player" class="player"></div>
    <div id="remote-playerlist" class="player-list"></div>
    <button @click="joinCall">Join Call</button>
    <button @click="leaveCall">Leave Call</button>
  </div>
</template>

<script>
import { initializeClient, joinChannel, leaveChannel } from '@/services/agoraService';

export default {
  data() {
    return {};
  },
  async created() {
    await initializeClient();
  },
  methods: {
    async joinCall() {
      await joinChannel();
    },
    async leaveCall() {
      await leaveChannel();
    },
  },
};
</script>

<style>
.player {
  width: 320px;
  height: 240px;
  border: 1px solid #000;
  margin: 10px;
}

.player-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
