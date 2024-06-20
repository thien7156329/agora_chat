// src/services/agoraRtmService.js
import AgoraRTM from 'agora-rtm-sdk';

const agoraRtmService = {
    client: null,
    channel: null,

    async initialize(appId) {
        this.client = AgoraRTM.createInstance(appId);
        await this.client.login({ uid: String(Math.floor(Math.random() * 100000)) });
    },

    async joinChannel(channelName) {
        this.channel = this.client.createChannel(channelName);
        await this.channel.join();
    },

    async leaveChannel() {
        if (this.channel) {
            await this.channel.leave();
            this.channel = null;
        }
    },

    async sendMessage(message) {
        if (this.channel) {
            await this.channel.sendMessage({ text: message });
        }
    },

    onMessage(callback) {
        if (this.channel) {
            this.channel.on('ChannelMessage', ({ text }, senderId) => {
                callback(text, senderId);
            });
        }
    },

    async logout() {
        await this.client.logout();
    }
};

export default agoraRtmService;
