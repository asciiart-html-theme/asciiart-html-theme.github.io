(() => {
  // dist/js/asciiart.esm.min.js
  function r(i) {
    return i instanceof HTMLElement ? i : typeof i == "string" ? i.startsWith("#") ? document.getElementById(i.slice(1)) : document.querySelector(i) : null;
  }
  var s = class {
    constructor(e) {
      this.root = r(e), this.root && (this.buttons = this.root.querySelectorAll("li > button"), this.buttons.forEach((t) => {
        t.addEventListener("click", () => this.toggleMenu(t));
      }));
    }
    toggleMenu(e) {
      let t = e.nextElementSibling, o = e.parentNode, u = t.checkVisibility() ? "false" : "true";
      o.dataset.visible = u;
    }
  };
  var a = class {
    constructor(e) {
      this.sidebar = r(e), this.breakpoint = window.getComputedStyle(document.documentElement).getPropertyValue("--md-width"), this.breakpoint || (this.breakpoint = 1700), this.breakpoint = parseInt(this.breakpoint), this.button_selector = (t) => `button[aria-controls="#${t}"], button[aria-controls="${t}"]`, this.init();
    }
    init() {
      window.addEventListener("resize", () => this.handleResize());
      let e = this.sidebar.id;
      e && document.querySelectorAll(this.button_selector(e)).forEach((t) => {
        if (t.classList.contains("button-close")) {
          t.addEventListener("click", () => this.hide(t));
          return;
        }
        t.addEventListener("click", () => this.toggle(t));
      }), this.updateButtons();
    }
    toggle(e) {
      let t = this.sidebar.checkVisibility();
      this.sidebar.dataset.visible = !t, this.updateButtons();
    }
    hide(e) {
      this.sidebar.dataset.visible = false, this.updateButtons();
    }
    handleResize() {
      window.innerWidth > this.breakpoint && (this.sidebar.removeAttribute("data-visible"), this.sidebar.removeAttribute("aria-expanded"), this.updateButtons());
    }
    updateButtons() {
      let e = this.sidebar.id;
      e && document.querySelectorAll(this.button_selector(e)).forEach((t) => {
        t.dataset.elementHidden = !this.sidebar.checkVisibility(), t.setAttribute("aria-expanded", this.sidebar.checkVisibility());
      });
    }
  };
  var h = a;
  var n = class {
    constructor(e) {
      this.wrapperElement = r(e), Array.from(this.wrapperElement.children).forEach((t) => {
        t.addEventListener("click", () => this.select(t));
        let o = document.getElementById(t.getAttribute("aria-controls"));
        if (!o) {
          console.error("No element to control skipping");
          return;
        }
        if (t.getAttribute("aria-selected") == "true") {
          o.hidden = false;
          return;
        }
        o.hidden = true;
      });
    }
    select(e) {
      Array.from(this.wrapperElement.children).forEach((t) => {
        let o = document.getElementById(t.getAttribute("aria-controls"));
        if (console.log("Controlling Element", o), !o) {
          console.error("No element to controll skipping");
          return;
        }
        if (t === e) {
          console.log("Switching Element", o), o.hidden = false, t.setAttribute("aria-selected", "true");
          return;
        }
        o.hidden = true, t.setAttribute("aria-selected", "false");
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
      }).catch((o) => {
        console.error("Failed to copy code: ", o);
      });
    }
  };

  // src/demo/main.js
  document.addEventListener("DOMContentLoaded", () => {
    new s(".treemenu");
    new h("#sidebar");
    new c("#codewrapper");
  });
})();
//# sourceMappingURL=bundle.js.map
