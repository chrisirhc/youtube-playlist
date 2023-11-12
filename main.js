// TODO: Try lit later
// import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class VideoListTextArea extends HTMLTextAreaElement {
  connectedCallback() {
    console.log("Custom element added to page.");
    this.addEventListener('change', (e) => {
      console.log('changed', e.target.value)
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
}
customElements.define("video-list-text-area", VideoListTextArea, { extends: "textarea" });
