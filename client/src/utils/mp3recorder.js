// src/utils/mp3Recorder.js
import Recorder from 'recorder-js';
import lamejs from 'lamejs';

export default class MP3Recorder {
  constructor(audioContext) {
    this.recorder = new Recorder(new AudioContext(), {
      onAnalysed: null,
    });
    this.audioContext = audioContext;
  }

  async init() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    await this.recorder.init(stream);
  }

  start() {
    return this.recorder.start();
  }

  async stop() {
    const { blob, buffer } = await this.recorder.stop();

    // Convert to MP3 using lamejs
    const mp3Blob = await this.encodeMP3(buffer[0], this.audioContext.sampleRate);
    return mp3Blob;
  }

  async encodeMP3(samples, sampleRate) {
    const mp3encoder = new lamejs.Mp3Encoder(1, sampleRate, 128);
    const mp3Data = [];

    const sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) mp3Data.push(mp3buf);
    }

    const mp3buf = mp3encoder.flush();
    if (mp3buf.length > 0) mp3Data.push(mp3buf);

    return new Blob(mp3Data, { type: 'audio/mp3' });
  }
}
