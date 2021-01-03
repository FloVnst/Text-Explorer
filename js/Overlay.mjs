export { PopupWindow };

class Overlay {
    static object = document.getElementById("overlay");
    static hide_area = document.getElementById("overlay_hideArea");
    static hidden = true;

    static hide() {
        Overlay.object.classList.add("hidden");
        Overlay.hidden = true;
    }

    static show() {
        Overlay.hidden = false;
        Overlay.object.classList.remove("hidden");
    }
}


class PopupWindow {

    constructor(htmlElement, showButton) {
        this.htmlElement = htmlElement;

        this.showButton = showButton;
        this.closeButton = this.htmlElement.querySelector(".window_closeButton");

        this.hidden = this.htmlElement.classList.contains("hidden");

        Overlay.hide_area.addEventListener("click", function () {
            Overlay.hide();
        })
    }

    hide() {
        this.hidden = true;
        Overlay.hide();
        this.htmlElement.classList.add("hidden");
    }

    show() {
        this.hidden = false;
        this.htmlElement.classList.remove("hidden");
        Overlay.show();
    }

}