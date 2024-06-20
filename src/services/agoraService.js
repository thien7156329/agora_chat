import AgoraRTC from 'agora-rtc-sdk-ng';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const options = {
    appId: '3a2a6cdd2e4a4a4fa2bf844faf9cc1f9', // Replace with your Agora App ID
    channel: 'test-channel', // Replace with your channel name
  token: null, // Replace with your Agora token or set it to null if using a temp token
  uid: null,
};

let localTracks = {
  videoTrack: null,
  audioTrack: null,
};

let remoteUsers = {};

// Initialize the Agora client
const initializeClient = async () => {
  client.on('user-published', handleUserPublished);
  client.on('user-unpublished', handleUserUnpublished);
};

// Join the channel
const joinChannel = async () => {
  options.uid = await client.join(options.appId, options.channel, options.token || null, null);
  
  localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
  
  localTracks.videoTrack.play('local-player');
  
  await client.publish(Object.values(localTracks));
};

// Leave the channel
const leaveChannel = async () => {
  for (let trackName in localTracks) {
    let track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      localTracks[trackName] = null;
    }
  }

  remoteUsers = {};
  
  await client.leave();
};

// Handle user published event
const handleUserPublished = async (user, mediaType) => {
  await client.subscribe(user, mediaType);
    console.log(user, mediaType, "user, mediaType");
  if (mediaType === 'video') {
    const remotePlayer = document.createElement('div');
    remotePlayer.id = `player-${user.uid}`;
    remotePlayer.style.width = '320px';
    remotePlayer.style.height = '240px';
    document.getElementById('remote-playerlist').append(remotePlayer);
    user.videoTrack.play(remotePlayer.id);
  }

  if (mediaType === 'audio') {
    user.audioTrack.play();
  }

  remoteUsers[user.uid] = user;
};

// Handle user unpublished event
const handleUserUnpublished = user => {
  const remotePlayer = document.getElementById(`player-${user.uid}`);
  if (remotePlayer) {
    remotePlayer.remove();
  }
  delete remoteUsers[user.uid];
};

export {
  initializeClient,
  joinChannel,
  leaveChannel,
};
