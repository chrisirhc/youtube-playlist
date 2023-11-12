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

      this.initYoutTube();
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

  initYoutTube() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const videoList = [
      {
        videoId: "c0VxUFHdYzs",
        startSeconds: 3,
        endSeconds: 5,
      },
      { videoId: "VCcar3MA07w", startSeconds: 52, endSeconds: 55 },
    ];

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "M7lc1UVf-VE",
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      const player = event.target;
      // event.target.playVideo();
      player.loadVideoById({
        videoId: "c0VxUFHdYzs",
        startSeconds: 3,
        endSeconds: 5, // For testing
      });
    }

    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED && !done) {
        // Play next video
        event.target.loadVideoById({
          videoId: "VCcar3MA07w",
          startSeconds: 52,
          endSeconds: 55,
        });
        done = true;
      }
    }
  }
}
customElements.define("video-list-text-area", VideoListTextArea, {
  extends: "textarea",
});
