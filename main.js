// TODO: Try lit later
// import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class VideoListTextArea extends HTMLTextAreaElement {
  player = null;
  
  connectedCallback() {
    console.log("Custom element added to page.");
    this.addEventListener('change', (e) => {
      console.log('changed', e.target.value);
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
    var tag = document.createElement('script');
  
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // const videoList = [
    //   'https://youtu.be/c0VxUFHdYzs?si=G2tZ9W-IvrQaU47c&t=12',
    //   'https://youtu.be/VCcar3MA07w?si=ds7ME2irMfY8-6Cm&t=62',
    // ];
  
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };
  
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      const player = event.target;
      // event.target.playVideo();
      player.loadVideoById({'videoId': 'c0VxUFHdYzs',
               'startSeconds': 3,
               'endSeconds': 5 // For testing
              });
    }
  
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      console.log('onPlayerStateChange', event.data);
      if (event.data == YT.PlayerState.ENDED && !done) {
        event.target.loadVideoById({'videoId': 'VCcar3MA07w',
                'startSeconds': 52,
                'endSeconds': 55});
        done = true;
      }
      // if (event.data == YT.PlayerState.PLAYING && !done) {
      //   setTimeout(stopVideo, 6000);
      //   done = true;
      // }
    }
    const stopVideo = () => {
      this.player.stopVideo();
    }
  }
}
customElements.define("video-list-text-area", VideoListTextArea, { extends: "textarea" });

