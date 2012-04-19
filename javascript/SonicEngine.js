DEBUGs = true;
window.DEBUGLABELS = [];

window.requestAnimFrame = (function (ff) {
    if (window.requestAnimationFrame)
        return window.requestAnimationFrame(ff);
    if (window.webkitRequestAnimationFrame)
        return window.webkitRequestAnimationFrame(ff);
    if (window.mozRequestAnimationFrame)
        return window.mozRequestAnimationFrame(ff);
    if (window.oRequestAnimationFrame)
        return window.oRequestAnimationFrame(ff);
    if (window.msRequestAnimationFrame)
        return window.msRequestAnimationFrame(ff);
    return window.setTimeout(ff, 1000 / 60);
});

var uiManager;

function SonicEngine(canvasName) {
    var that = this;

    this.canvas = $("#" + canvasName);
    this.canvasItem = document.getElementById(canvasName).getContext("2d");

    this.canvasWidth = 0;
    this.canvasHeight = 0;

    var element = document.getElementById(canvasName);

    element.addEventListener('DOMMouseScroll', handleScroll, false);
    element.addEventListener('mousewheel', handleScroll, false);

    element.addEventListener('touchmove', canvasMouseMove);
    element.addEventListener('touchstart', canvasOnClick);
    element.addEventListener('touchend', canvasMouseUp);

    element.addEventListener('mousedown', canvasOnClick);
    element.addEventListener('mouseup', canvasMouseUp);
    element.addEventListener('mousemove', canvasMouseMove);

    element.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
    }, false);


    function canvasOnClick(e) {
        e.preventDefault();
        if (uiManager.onClick(e)) return false;

        return false;
    }

    var lastMouseMove;
    function canvasMouseMove(e) {
        e.preventDefault();
        document.body.style.cursor = "default";
        lastMouseMove = e;
        if (uiManager.onMouseMove(e)) return false;

        return false;
    }

    function canvasMouseUp(e) {
        e.preventDefault();
        uiManager.onMouseUp(lastMouseMove);
        return false;
    }


    function handleScroll(evt) {
        evt.preventDefault();

        if (uiManager.onMouseScroll(evt)) return false;

        return evt.preventDefault() && false;
    };

    $(document).keypress(function (e) {

        uiManager.onKeyDown(e);

    });

    that.resizeCanvas = function () {
        that.canvasWidth = $(window).width();
        that.canvasHeight = $(window).height();
        that.canvas.attr("width", that.canvasWidth);
        that.canvas.attr("height", that.canvasHeight);
    };

    function clear(ctx) {
        ctx.clearRect(0, 0, that.canvasWidth, that.canvasHeight);
    }

    that.draw = function () {
        clear(that.canvasItem);

        uiManager.draw(that.canvasItem);

        that.canvasItem.save();
        for (var i = 0; i < window.DEBUGLABELS.length; i++) {
            that.canvasItem.fillStyle = "#ffffff";
            that.canvasItem.font = "16pt Arial bold";
            that.canvasItem.fillText(window.DEBUGLABELS[i], 200, i * 30 + 100);
        }

        that.canvasItem.restore();

    };


    $(window).resize(this.resizeCanvas);

    var uiManager = new UIManager(this.canvasItem);
    
    this.resizeCanvas();

    window.setInterval(that.draw, 1000 / 60);
}; 