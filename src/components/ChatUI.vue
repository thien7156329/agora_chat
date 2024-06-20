<!-- src/components/Chat.vue -->
<template>
  <div class="chat">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span class="sender">{{ message.senderId }}:</span> {{ message.text }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import agoraRtmService from '@/services/agoraRtmService';

export default {
  name: 'chat-ui',
  data() {
    return {
      appId: '3a2a6cdd2e4a4a4fa2bf844faf9cc1f9', // Replace with your Agora App ID
      channelName: 'test-channel', // Replace with your channel name
      messages: [],
      newMessage: ''
    };
  },
  async created() {
    await agoraRtmService.initialize(this.appId);
    await agoraRtmService.joinChannel(this.channelName);
    agoraRtmService.onMessage(this.handleMessage);
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        await agoraRtmService.sendMessage(this.newMessage);
        this.messages.push({ text: this.newMessage, senderId: 'Me' });
        this.newMessage = '';
      }
    },
    handleMessage(text, senderId) {
      this.messages.push({ text, senderId });
    },
    async leaveChannel() {
      await agoraRtmService.leaveChannel();
    }
  },
  beforeDestroy() {
    this.leaveChannel();
  }
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 10px;
}

.sender {
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
