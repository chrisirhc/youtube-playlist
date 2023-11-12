// TODO: Try lit later
// import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class VideoListTextArea extends HTMLTextAreaElement {
  player = null;

  connectedCallback() {
    console.log("Custom element added to page.");
    this.addEventListener("change", (e) => {
      console.log("changed", e.target.value);
      // Format should be youtube video urls line by line

      // Initiate play with the content

      // Once player is done, advance to the next video

      this.initYoutTubeAndPlay();
    });
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  videoList = [
    { videoId: "c0VxUFHdYzs", startSeconds: 3, endSeconds: 5 },
    { videoId: "VCcar3MA07w", startSeconds: 52, endSeconds: 55 },
  ];

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

  onPlayerStateChange = (event) => {
    if (event.data == YT.PlayerState.ENDED) {
      if (this.videoList.length === 0) {
        return;
      }
      this.playNextVideo();
    }
  };

  playNextVideo = () => {
    const video = this.videoList.shift();
    this.player.loadVideoById(video);
  };
}
customElements.define("video-list-text-area", VideoListTextArea, {
  extends: "textarea",
});
