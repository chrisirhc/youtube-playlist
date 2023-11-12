// TODO: Try lit later
// import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class VideoListTextArea extends HTMLTextAreaElement {
  player = null;

  connectedCallback() {
    if (document.location.search) {
      const params = new URLSearchParams(document.location.search);
      const value = params.get("l");
      this.value = value;
      try {
        const videoList = JSON.parse(value);
        this.videoList = videoList;
        this.initYoutTubeAndPlay();
      } catch (e) {}
    }
    this.addEventListener("change", (e) => {
      console.log("changed", e.target.value);
      const value = e.target.value;
      const searchParams = new URLSearchParams({
        l: value,
      });
      history.pushState(null, "", `?${searchParams}`);
      console.log("url");
    });
    // Update HTML5 history to add state into url
    this.addEventListener("change", (e) => {
      console.log("changed", e.target.value);
      const value = e.target.value;
      const videoList = JSON.parse(value);
      // Update HTML5 history to add state into url

      this.videoList = videoList;
      if (!this.player) {
        this.initYoutTubeAndPlay();
      } else {
        this.playNextVideo();
      }
    });
  }

  videoList = [];

  initYoutTubeAndPlay() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: this.videoList[0].videoId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: this.playNextVideo,
          onStateChange: this.onPlayerStateChange,
        },
      });
    };
  }

  // Once video ended it will advance to the next video
  onPlayerStateChange = (event) => {
    if (event.data == YT.PlayerState.ENDED) {
      this.playNextVideo();
    }
  };

  playNextVideo = () => {
    if (!this.videoList.length) {
      console.log("no more videos");
      return;
    }
    const video = this.videoList.shift();
    this.player.loadVideoById(video);
  };
}
customElements.define("video-list-text-area", VideoListTextArea, {
  extends: "textarea",
});
