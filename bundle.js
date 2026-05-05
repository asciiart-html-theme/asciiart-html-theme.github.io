(() => {
  // dist/js/asciiart.esm.min.js
  function r(o) {
    return o instanceof HTMLElement ? o : typeof o == "string" ? o.startsWith("#") ? document.getElementById(o.slice(1)) : document.querySelector(o) : null;
  }
  var s = class {
    constructor(e) {
      this.root = r(e), this.root && (this.buttons = this.root.querySelectorAll("li > button"), this.buttons.forEach((t) => {
        t.addEventListener("click", () => this.toggleMenu(t));
      }));
    }
    toggleMenu(e) {
      let t = e.nextElementSibling, i = e.parentNode, u = t.checkVisibility() ? "false" : "true";
      i.dataset.visible = u;
    }
  };
  var l = class {
    constructor(e, t = 1700) {
      this.sidebar = r(e), this.breakpoint = t, this.init();
    }
    init() {
      window.addEventListener("resize", () => this.handleResize());
      let e = this.sidebar.id;
      e && document.querySelectorAll('button[data-control-element="#' + e + '"').forEach((t) => {
        if (t.classList.contains("button-close")) {
          t.addEventListener("click", () => this.hide(t));
          return;
        }
        t.addEventListener("click", () => this.toggle(t));
      });
    }
    toggle(e) {
      let t = this.sidebar.checkVisibility();
      this.sidebar.dataset.visible = !t, this.updateButtons();
    }
    hide(e) {
      this.sidebar.dataset.visible = false, this.updateButtons();
    }
    handleResize() {
      window.innerWidth > this.breakpoint && (this.sidebar.removeAttribute("data-visible"), this.updateButtons());
    }
    updateButtons() {
      let e = this.sidebar.id;
      e && document.querySelectorAll('button[data-control-element="#' + e + '"').forEach((t) => {
        t.dataset.elementHidden = !this.sidebar.checkVisibility();
      });
    }
  };
  var p = l;
  var n = class {
    constructor(e) {
      this.wrapperElement = r(e), Array.from(this.wrapperElement.children).forEach((t) => {
        t.addEventListener("click", () => this.select(t));
        let i = r(t.getAttribute("aria-controls"));
        if (!i) {
          console.error("No element to controll skipping");
          return;
        }
        if (t.getAttribute("aria-selected") == "true") {
          i.hidden = false;
          return;
        }
        i.hidden = true;
      });
    }
    select(e) {
      Array.from(this.wrapperElement.children).forEach((t) => {
        let i = r(t.getAttribute("aria-controls"));
        if (console.log("Controlling Element", i), !i) {
          console.error("No element to controll skipping");
          return;
        }
        if (t === e) {
          console.log("Switching Element", i), i.hidden = false, t.setAttribute("aria-selected", "true");
          return;
        }
        i.hidden = true, t.setAttribute("aria-selected", "false");
      });
    }
  };
  var c = class {
    constructor(e) {
      this.wrapperElement = r(e), this.copyButton = this.wrapperElement.querySelector(".copy"), this.copyButton && this.copyButton.addEventListener("click", () => this.copyCodeIntoClipboard());
      let t = this.wrapperElement.querySelector(".tab-button-container");
      t && (console.debug("Init tab", t), this.tabSelector = new n(t));
    }
    copyCodeIntoClipboard() {
      let e = this.wrapperElement.querySelector("code");
      this.tabSelector && (e = this.wrapperElement.querySelector("pre:not([hidden])").querySelector("code"));
      let t = e.innerText.trim();
      navigator.clipboard.writeText(t).then(() => {
        console.log("Code copied to clipboard!"), this.copyButton.innerText = "Copied!", setTimeout(() => this.copyButton.innerText = "Copy", 2e3);
      }).catch((i) => {
        console.error("Failed to copy code: ", i);
      });
    }
  };

  // src/demo/main.js
  document.addEventListener("DOMContentLoaded", () => {
    new s(".treemenu");
    new p("#sidebar");
    new c("#codewrapper");
  });
})();
//# sourceMappingURL=bundle.js.map
