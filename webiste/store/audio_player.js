export const useAudioPlayer = defineStore("audioPlayer", {
  state: () => ({
    item: {},
    path: "",
    musicPlay: false,
    audioDownload: '',
  }),
  getters: {
    getItem: (state) => state.item,
    getPath: (state) => state.path,
    getMusicPlay: (state) => state.musicPlay,
    getAudioDownload: (state) => state.audioDownload
  },
  actions: {
    setData(item, path) {
      this.item = item;
      this.path = path;
    },
    setMusicPlay(item = true) {
      this.musicPlay = item;
    },
    setAudioDownload(item) {
      this.audioDownload = item
    },
    playOrPauseButton(item) {
      if (item.pause) {
        this.musicPlay = true;
      } else if (item.play) {
        this.musicPlay = false;
      }
    },
  },
});
