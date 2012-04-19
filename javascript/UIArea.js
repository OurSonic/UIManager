﻿window.EditorEngine = function (element) {
    var that = this;
    this.dragging = false;
    this.editing = false;
    this.element = element;
    this.points = [
        {
            x: 0,
            y: 0,
            size: 10,
            cursor: 'nw-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.height += y;
                that.element.x -= x;
                that.element.y -= y;
                that.element.clearCache();
            }
        },
        {
            x: 100,
            y: 0,
            size: 10,
            cursor: 'ne-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.height += y;
                that.element.y -= y;
                that.element.clearCache();
                dv.x = 0;

            }
        },
        {
            x: 100,
            y: 100,
            size: 10,
            cursor: 'se-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.height -= y;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;

            }
        },
        {
            x: 0,
            y: 100,
            size: 10,
            cursor: 'sw-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.height -= y;
                that.element.x -= x;
                that.element.clearCache(); dv.y = 0;
            }
        },
        {
            x: 50,
            y: 0,
            size: 5,
            cursor: 'n-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.height += y;
                that.element.y -= y;
                that.element.clearCache();

            }
        },
        {
            x: 100,
            y: 50,
            size: 5,
            cursor: 'e-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;

            }
        },
        {
            x: 50,
            y: 100,
            size: 5,
            cursor: 'n-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.height -= y;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;


            }
        },
        {
            x: 0,
            y: 50,
            size: 5,
            cursor: 'e-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.x -= x;
                that.element.clearCache();
            }
        }];
    this.maxSize = function () {
        return 10;
    };
    this.startDragging = null;
    this.dragg = false;
    this.click = function (e) {
        var x = 0;
        var y = 0;
        var w = this.element.width;
        var h = this.element.height;

        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            j.editing = false;
        }

        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            var sz = j.size * 5;

            var rect = { x: x + (w * j.x / 100) - sz / 2, y: y + (h * j.y / 100) - sz / 2, width: sz, height: sz };

            if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {

                document.body.style.cursor = j.cursor;

                this.editing = true;
                j.editing = true;
                return true;

            }
        }

        if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {

            this.dragg = { x: e.x, y: e.y };
            document.body.style.cursor = 'move';
            this.dragging = true;
            return false;

        } else
            document.body.style.cursor = 'default';

    };
    this.mouseUp = function (e) {
        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            j.editing = false;
        }
        this.editing = false;
        this.dragging = false;
        this.startDragging = null;
        this.dragg = false;
    };
    this.mouseMove = function (e) {
        var x = 0;
        var y = 0;
        var w = this.element.width;
        var h = this.element.height;

        document.body.style.cursor = 'move';
        if (this.dragging) {
            if (this.element.childrenAreEditing()) {
                return false;
            }
            var jx = e.x - this.dragg.x;
            var jy = e.y - this.dragg.y;
            this.element.x += jx;
            this.element.y += jy;
             
            
            window.DEBUGLABELS[0] = "E: " + e.x + " " + e.y;
            window.DEBUGLABELS[1] = "Dragg: " + this.dragg.x + " " + this.dragg.y;
            window.DEBUGLABELS[2] = "Element: " + this.element.x + " " + this.element.y;
            window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;
            //this.dragg.x += jx;
            //this.dragg.y += jy;

            return false;
        }
        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            var sz = j.size * 5;

            if (j.editing) {
                document.body.style.cursor = j.cursor;
                var dv = { x: this.startDragging.x - e.x, y: this.startDragging.y - e.y };

                j.click(dv);
                this.startDragging = { x: e.x + dv.x, y: e.y + dv.y };
                return true;
            }

            var rect = { x: x + (w * j.x / 100) - sz / 2, y: y + (h * j.y / 100) - sz / 2, width: sz, height: sz };

            if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
                document.body.style.cursor = j.cursor;

                if (j.editing) {
                    var dv = { x: this.startDragging.x - e.x, y: this.startDragging.y - e.y };

                    j.click(dv);
                    this.startDragging = { x: e.x + dv.x, y: e.y + dv.y };
                }
                return true;
            }
        }

        this.startDragging = { x: e.x, y: e.y };
        return this.editing;
    };
    this.draw = function (canv) {
        var size = 0;
        canv.strokeStyle = canv.fillStyle = 'white';
        canv.lineWidth = 3;

        canv.dashedRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2, [2, 2]);
        //canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);

        var x = this.element.totalX();
        var y = this.element.totalY();
        var w = this.element.width;
        var h = this.element.height;

        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            canv.fillRect(x + (w * j.x / 100) - j.size / 2, y + (h * j.y / 100) - j.size / 2, j.size, j.size);

        }



    };
};


window.Element = Class.create({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    depth: -1,
    visible: true,
    cachedDrawing: null,
    click: null,
    mouseUp: null,
    mouseOver: null,
    editMode: false,
    editorEngine: null,
    init: function () {
        this.editorEngine = new EditorEngine(this);
    },
    isEditMode: function () {
        return this.editMode || (this.parent && this.parent.isEditMode && this.parent.isEditMode());
    },
    isEditMode: function () {
        return this.editMode || (this.parent && this.parent.isEditMode && this.parent.isEditMode());
    },
    childrenAreEditing: function () {


        var ch = this.controls;
        if (!ch)
            return;
        for (var k = 0; k < ch.length; k++) {
            if (ch[k].editorEngine.dragging || ch[k].editorEngine.editing)
                return true;
            if (ch[k].childrenAreEditing())
                return true;
        }
        return false;
    },
    totalX: function () {
        return this.x + (this.parent ? this.parent.totalX() : 0);
    },
    totalY: function () {
        return this.y + (this.parent ? this.parent.totalY() : 0);
    },
    parent: null,
    start: function (x, y, properties) {
        this.x = x;
        this.y = y;
        for (var prop in properties) {
            this[prop] = properties[prop];
        }
        if (this.construct) this.construct();
    },
    forceDrawing: function () {
        return { redraw: false, clearCache: false };
    },
    onKeyDown: function (e) {
    },
    focus: function () {
    },
    loseFocus: function () {
    },
    onClick: function (e) {
        if (this.isEditMode() == true) {
            if (this.editorEngine.click(e))
                return true;
        }
        return false;
    },
    onMouseUp: function (e) {
        if (this.isEditMode() == true) {
            if (this.editorEngine.mouseUp(e))
                return true;
        }
        return false;

    },
    onMouseOver: function (e) {
        if (this.isEditMode() == true) {
            if (this.editorEngine.mouseMove(e))
                return true;
        }
        return false;

    },
    draw: function (canv) {
        if (this.isEditMode() == true) {
            this.editorEngine.draw(canv);
        }
    },
    clearCache: function () {
        this.cachedDrawing = null;
    }
});



window.UiArea = Element.extend({

    manager: null,
    closable: null,
    dragging: false,
    controls: [],
    onMove: function () { },
    cachedDrawing: null,
    construct: function () {
        if (this.closable) {
            this.addControl(new Button(this.width - 30, 4, 26, 23, "X", this.manager.buttonFont, "Green", function () {
                that.loseFocus();
                that.visible = false;
            }));
        }
    },
    addControl: function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    },
    focus: function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focus();
        }
    },
    loseFocus: function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.loseFocus();
        }
    },
    onClick: function (e) {
        if (!this.visible) return false;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focused = false;
            if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
                e.x -= control.x;
                e.y -= control.y;
                control.onClick(e);
                return false;

            }
        }
        this.dragging = { x: e.x, y: e.y };
    },
    onKeyDown: function (e) {
        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onKeyDown(e);
        }
    },
    onMouseOver: function (e) {
        if (!this.visible) return;
        if (!this.dragging) {
            for (var ij = 0; ij < this.controls.length; ij++) {
                var control = this.controls[ij];
                if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
                    e.x -= control.x;
                    e.y -= control.y;
                    control.onMouseOver(e);
                    return;
                }
            }

            return;
        }

        this.x += e.x - this.dragging.x;
        this.y += e.y - this.dragging.y;
        this.onMove();
    },
    onMouseUp: function (e) {


        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
        }
        this.dragging = false;
    },
    onScroll: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
                if (control.onScroll) {
                    e.x -= control.x;
                    e.y -= control.y;
                    control.onScroll(e);
                    return false;
                }
            }
        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        var good;
        var t;
        var j;
        if (!this.cachedDrawing) {

            var cg = document.createElement("canvas");
            cg.width = this.width;
            cg.height = this.height;

            var cv = cg.getContext('2d');

            var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
            lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
            lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


            cv.fillStyle = lingrad;
            cv.strokeStyle = "#333";
            var xy = [this.x, this.y];
            this.x = 0;
            this.y = 0;


            var rad = 30;
            roundRect(cv, this.x, this.y, this.width, this.height, rad, true, true);

            cv.beginPath();
            cv.moveTo(this.x, this.y + rad);
            cv.lineTo(this.x + this.width, this.y + rad);
            cv.lineWidth = 2;
            cv.strokeStyle = "#000000";
            cv.stroke();

            for (j = 0; j < this.controls.length; j++) {
                t = this.controls[j];
                good = t.forceDrawing();
                if (good.redraw)
                    t.draw(cv);
            }


            this.x = xy[0];
            this.y = xy[1];

            this.cachedDrawing = cg;
        }

        canv.drawImage(this.cachedDrawing, _H.floor(this.x), _H.floor(this.y));
        if (this.cachedDrawing.width != this.width || this.cachedDrawing.height != this.height)
            this.cachedDrawing = null;

        _H.save(canv);
        for (j = 0; j < this.controls.length; j++) {
            t = this.controls[j];
            good = t.forceDrawing();
            if (!good.redraw)
                t.draw(canv);
            if (good.clearCache)
                this.cachedDrawing = null;
        }
        _H.restore(canv);


    }

});




window.TextArea = Element.extend({
    text: '',
    font: '18pt Calibri',
    color: 'black',
    forceDrawing: function () {
        var txt = (_H.isFunction(this.text) ? this.text() : this.text);
        if (txt == this.oldText) {
            return { redraw: true, clearCache: false };
        }
        this.oldText = txt;
        return { redraw: true, clearCache: true };
    },
    draw: function (canv) {

        if (!this.visible) return;
        var txt = _H.isFunction(this.text) ? this.text() : this.text;
        if (canv.font != this.font)
            canv.font = this.font;

        var w = canv.measureText(txt).width;
        var h = parseInt(canv.font.split('pt')[0]);
        this.width = w;
        this.height = h;

        //   canv.fillStyle = "rgba(255,255,255,0.78)";
        var pad = 3;
        //     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));

        canv.fillStyle = this.color;

        canv.fillText(txt, this.parent.x + this.x, this.parent.y + this.y + h);

    }
});

window.ImageButton = Element.extend({
    text: '',
    toggle: false,
    toggled: false,
    font: '',
    clicking: false,
    image: null,
    created: false,
    button1Grad: null,
    button2Grad: null,
    buttonBorderGrad: null,
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
        if (this.toggle)
            this.toggled = !this.toggled;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;
        if (this.clicking) {
            if (this.click) this.click();
        }
        this.clicking = false;
        if (this.mouseUp) this.mouseUp();
    },
    onMouseOver: function (e) {

        if (!this.visible) return;
        if (this.mouseOver) this.mouseOver();
    },
    draw: function (canv) {

        if (!this.visible) return;

        if (!this.created) {
            this.created = true;
            this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);

            this.button1Grad.addColorStop(0, '#FFFFFF');
            this.button1Grad.addColorStop(1, '#A5A5A5');

            this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
            this.button2Grad.addColorStop(0, '#A5A5A5');
            this.button2Grad.addColorStop(1, '#FFFFFF');


            this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
            this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
            this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

        }

        canv.strokeStyle = this.buttonBorderGrad;
        if (this.toggle) {
            canv.fillStyle = (this.toggled ?
                this.button1Grad :
                this.button2Grad);

        } else {
            canv.fillStyle = (this.clicking ?
                this.button1Grad :
                this.button2Grad);

        }
        canv.lineWidth = 2;
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
        if (canv.font != this.font)
            canv.font = this.font;
        canv.fillStyle = "#000000";
        var txt = (_H.isFunction(this.text) ? this.text() : this.text);


        this.image(canv, this.parent.x + this.x, this.parent.y + this.y);

        canv.fillText(txt, this.parent.x + this.x + ((this.width / 2) - (canv.measureText(txt).width / 2)), this.parent.y + this.y + this.height - 3);
    }
});



window.Button = Element.extend({
    text: '',
    toggle: false,
    toggled: false,
    font: "13pt Arial bold",
    clicking: false,
    color: 'black',
    parent: null,
    created: false,
    button1Grad: null,
    button2Grad: null,
    buttonBorderGrad: null,
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
        if (this.toggle)
            this.toggled = !this.toggled;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;
        if (this.clicking) {
            if (this.click) this.click();
        }
        this.clicking = false;
        if (this.mouseUp) this.mouseUp();
    },
    onMouseOver: function (e) {

        if (!this.visible) return;
        if (this.mouseOver) this.mouseOver();
    },

    draw: function (canv) {

        if (!this.visible) return;

        if (!this.created) {
            this.created = true;
            this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);

            this.button1Grad.addColorStop(0, '#FFFFFF');
            this.button1Grad.addColorStop(1, '#A5A5A5');

            this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
            this.button2Grad.addColorStop(0, '#A5A5A5');
            this.button2Grad.addColorStop(1, '#FFFFFF');


            this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
            this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
            this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

        }

        canv.strokeStyle = this.buttonBorderGrad;
        if (this.toggle) {
            canv.fillStyle = (this.toggled ?
                this.button1Grad :
                this.button2Grad);

        } else {
            canv.fillStyle = (this.clicking ?
                this.button1Grad :
                this.button2Grad);

        }
        canv.lineWidth = 2;
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
        if (canv.font != this.font)
            canv.font = this.font;
        canv.fillStyle = "#000000";
        var txt = (_H.isFunction(this.text) ? this.text() : this.text);
        canv.fillText(txt, this.parent.x + this.x + ((this.width / 2) - (canv.measureText(txt).width / 2)), this.parent.y + this.y + (this.height / 3) * 2);

    }
});



window.TextBox = Element.extend({

    textChanged: null,
    text: '',
    font: '',
    clicking: false,
    color: null,
    parent: null,
    cursorPosition: 0,
    dragPosition: -1,
    drawTicks: 0,
    lastClickTick: 0,
    created: false,
    focused: false,
    blinked: false,
    blinkTick: 0,
    button1Grad: null,
    button2Grad: null,
    buttonBorderGrad: null,

    can: null,

    onKeyDown: function (e) {

        if (e.altKey) return;
        if (this.focused) {

            if (e.ctrlKey) {
                if (e.keyCode == 65) {
                    this.dragPosition = 0;
                    this.cursorPosition = this.text.length;
                } else if (e.keyCode == 67) {
                    // _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
                } else if (e.keyCode == 88) {
                    //  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));


                    this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);

                    this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                    this.dragPosition = -1;
                }
            }
            else
                if (e.keyCode == 37) {
                    if (e.shiftKey) {
                        if (this.dragPosition == -1) {
                            this.dragPosition = this.cursorPosition;
                        }
                        this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
                    } else {
                        this.dragPosition = -1;
                        this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
                    }
                } else if (e.keyCode == 39) {
                    if (e.shiftKey) {
                        if (this.dragPosition == -1) {
                            this.dragPosition = this.cursorPosition;
                        }
                        this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
                    } else {
                        this.dragPosition = -1;
                        this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
                    }
                } else {
                    if (e.keyCode == 8) {
                        if (this.dragPosition == -1) {
                            this.text = this.text.substring(0, this.cursorPosition - 1) + this.text.substring(this.cursorPosition, this.text.length);
                        } else {
                            this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
                        }
                        if (this.dragPosition == -1) {
                            if (this.cursorPosition > 0)
                                this.cursorPosition--;
                        } else {
                            this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                        }

                    } else if (e.keyCode == 46) {
                        if (this.dragPosition == -1) {
                            this.text = this.text.substring(0, this.cursorPosition) + this.text.substring(Math.min(this.cursorPosition + 1, this.text.length), this.text.length);
                        } else {
                            this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
                        }
                        if (this.dragPosition == -1) {

                        } else {
                            this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                        }

                    } else {
                        var t = String.fromCharCode(e.keyCode);
                        if (this.dragPosition == -1) {
                            this.text = this.text.substring(0, this.cursorPosition) + t + this.text.substring(this.cursorPosition, this.text.length);
                        } else {
                            this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + t + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);

                        }
                        if (this.dragPosition == -1) {
                            this.cursorPosition++;
                        } else {
                            this.cursorPosition = Math.max(this.cursorPosition, this.dragPosition);
                        }
                    }
                    this.dragPosition = -1;
                }

        if (this.textChanged)
            this.textChanged();

        e.preventDefault();
    }
},
onClick: function (e) {

    if (!this.visible) return;
    this.clicking = true;
    this.focused = true;
    if (can.font != this.font)
        can.font = this.font;
    for (var i = 0; i < this.text.length; i++) {
        this.dragPosition = -1;
        var w = can.measureText(this.text.substring(0, i)).width;
        if (w > e.x - 14) {
            this.cursorPosition = i;
            if (this.drawTicks - this.lastClickTick < 15) {
                this.selectWord();
            }
            this.lastClickTick = this.drawTicks;
            return;
        }
    }
    this.cursorPosition = this.text.length;
    if (this.drawTicks - this.lastClickTick < 20) {
        this.selectWord();
    }
    this.lastClickTick = this.drawTicks;
},
selectWord: function () {
    var j = this.text.split(' ');

    var pos = 0;
    for (var i = 0; i < j.length; i++) {
        if (this.cursorPosition < j[i].length + pos) {
            this.dragPosition = pos;
            this.cursorPosition = j[i].length + pos;
            return;
        } else {
            pos += j[i].length + 1;
        }
    }

    this.dragPosition = pos - j[j.length - 1].length;
    this.cursorPosition = this.text.length;
},
onMouseUp: function (e) {

    if (!this.visible) return;
    if (this.clicking) {

    }
    this.clicking = false;
    if (this.mouseUp) this.mouseUp();
},
onMouseOver: function (e) {

    if (!this.visible) return;
    document.body.style.cursor = "text";
    if (this.clicking) {
        if (this.dragPosition == -1) {
            this.dragPosition = this.cursorPosition;
        }
        if (can.font != this.font)
            can.font = this.font;
        for (var i = 0; i < this.text.length; i++) {
            var w = can.measureText(this.text.substring(0, i)).width;
            if (w > e.x - 14) {
                this.cursorPosition = i;
                return;
            }
        }
        this.cursorPosition = this.text.length;
    }
    if (this.mouseOver) this.mouseOver();
},
draw: function (canv) {

    if (!this.visible) return;
    if (!this.focused) {
        this.cursorPosition = -1;
        this.dragPosition = -1;
    }
    this.drawTicks++
    can = canv;
    if (!this.created) {
        this.created = true;
        this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button1Grad.addColorStop(0, '#FFFFFF');
        this.button1Grad.addColorStop(1, '#A5A5A5');

        this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button2Grad.addColorStop(0, '#A5A5A5');
        this.button2Grad.addColorStop(1, '#FFFFFF');


        this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
        this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
        this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

    }

    canv.strokeStyle = this.buttonBorderGrad;
    canv.fillStyle = this.clicking ? this.button1Grad : this.button2Grad;
    canv.lineWidth = 2;
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
    if (canv.font != this.font)
        canv.font = this.font;

    if (this.dragPosition != -1) {
        canv.fillStyle = "#598AFF";

        var w1 = canv.measureText(this.text.substring(0, Math.min(this.dragPosition, this.cursorPosition))).width;
        var w2 = canv.measureText(this.text.substring(0, Math.max(this.dragPosition, this.cursorPosition))).width;
        canv.fillRect(this.parent.x + this.x + 8 + w1, this.parent.y + this.y + 3,
                w2 - w1, (this.height - 7));
    }


    canv.fillStyle = "#000000";
    canv.fillText(this.text, this.parent.x + this.x + 8, this.parent.y + this.y + (this.height / 3) * 2);

    if (this.focused && ((this.blinkTick++ % 35) == 0)) {
        this.blinked = !this.blinked;
    }
    if (this.focused && this.blinked) {
        canv.strokeStyle = "#000000";
        var w = canv.measureText(this.text.substring(0, this.cursorPosition)).width;
        canv.beginPath();
        canv.moveTo(this.parent.x + this.x + 8 + w, this.parent.y + this.y + 3);
        canv.lineTo(this.parent.x + this.x + 8 + w, this.parent.y + this.y + (this.height - 7));
        canv.lineWidth = 2;
        canv.stroke();
    }
}
});


window.PieceLayoutMaker = Element.extend({

    lastPosition: null,
    showHurtMap: false,
    showCollideMap: false,
    visible: true,
    clicking: false,
    pieceLayoutMaker: null,
    clickHandled: false,

    init: function (pieceLayout) {
        this.pieceLayout = pieceLayout;
        this.pieceLayoutMaker = new PieceLayoutMaker(pieceLayout);
    },

    onClick: function (e) {

        if (!this.visible) return;
        if (!this.pieceLayoutMaker) return;
        this.clicking = true;
        this.clickHandled = false;
        this.lastPosition = e;
        this.pieceLayoutMaker.placeItem(e);

    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        this.lastPosition = null;
        this.clickHandled = false;
        this.clicking = false;
        this.pieceLayoutMaker.mouseUp();

    },
    onMouseOver: function (e) {

        if (!this.pieceLayoutMaker) return;



        if (this.clicking) {
            this.clickHandled = true;
            this.pieceLayoutMaker.placeItem(e, this.lastPosition);
            this.lastPosition = { x: e.x, y: e.y };


        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        if (!this.pieceLayoutMaker) return;
        var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

        this.pieceLayoutMaker.draw(canv, pos, { x: this.width, y: this.height });

    }
});

window.ColorEditingArea = Element.extend({
    lastPosition: null,

    showHurtMap: false,
    showCollideMap: false,
    editable: true,
    editor: null,
    clicking: false,
    paletteEditor: null,
    showOffset: false,
    clickHandled: false,
    click: undefined,
    init: function (frame) {
        this.frame = frame;

        this.editor = new Editor(frame, this.showOffset);
    },
    onClick: function (e) {

        if (!this.visible) return;
        if (!this.editor) return;
        this.clicking = true;
        this.clickHandled = false;
        var scalex = this.width / this.editor.assetFrame.width;
        var scaley = this.height / this.editor.assetFrame.height;
        var pos = { x: _H.floor(e.x / scalex), y: _H.floor(e.y / scaley) };
        if (!this.editable) {
            if (this.click) {
                this.click(pos);
            }
        } else {
            this.lastPosition = pos;
            if (this.paletteEditor)
                this.editor.currentColor = this.paletteEditor.selectedIndex;
            this.editor.drawPixel(pos);
        }

    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        this.lastPosition = null;
        this.clickHandled = false;
        this.clicking = false;
    },
    onMouseOver: function (e) {

        if (!this.editor) return;

        var scalex = this.width / this.editor.assetFrame.width;
        var scaley = this.height / this.editor.assetFrame.height;

        var pos = { x: _H.floor(e.x / scalex), y: _H.floor(e.y / scaley) };


        if (this.clicking) {
            if (!this.editable) {
                if (this.click) {
                    this.click(pos);
                }
            } else {
                this.clickHandled = true;
                this.editor.drawLine(pos, this.lastPosition);
                this.lastPosition = pos;
            }
        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        if (!this.editor) return;
        var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

        this.editor.draw(canv, pos, { width: this.width, height: this.height }, this.showCollideMap, this.showHurtMap);

    }
});




window.Panel = Element.extend({

    area: null,
    cachedDrawing: null,
    outline: true,
    controls: [],
    addControl: function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    },
    focus: function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focus();
        }
    },
    loseFocus: function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.loseFocus();
        }
    },
    empty: function () {

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.parent = null;
        }

        this.controls = [];
    },
    onClick: function (e) {

        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focused = false;
            if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onClick(e);
                return false;

            }
        }

    },

    onKeyDown: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onKeyDown(e);
        }
    },
    onMouseOver: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseOver(e);
            }
        }
    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
        }
    },
    onScroll: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                if (control.onScroll) {
                    e.x -= control.x;
                    e.y -= control.y;
                    control.onScroll(e);
                    return false;
                }
            }
        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        var t;
        var j;
        var _x = this.x;
        var _y = this.y;

        this.x += this.parent.x;
        this.y += this.parent.y;

        if (this.outline) {
            var lingrad = canv.createLinearGradient(0, 0, 0, this.height);
            lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
            lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


            canv.fillStyle = lingrad;
            canv.strokeStyle = "#333";


            var rad = 5;
            roundRect(canv, this.x, this.y, this.width, this.height, rad, true, true);
        }

        for (j = 0; j < this.controls.length; j++) {
            t = this.controls[j];
            t.draw(canv);
        }
        this.x = _x;
        this.y = _y;
    }
});

window.HScrollBox = Element.extend({
    itemWidth: 0,
    scrollWidth: 14,
    jWidth: 5,
    visibleItems: 5,
    itemHeight: 10,
    backColor: '',
    scrollOffset: 0,
    scrollPosition: 0,
    dragging: false,
    controls: [],
    construct: function () {

        this.width = this.visibleItems * (this.itemWidth + this.jWidth);
        this.height = this.itemHeight + this.scrollWidth;
        this.scrolling = false;

    },
    addControl: function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    },
    onClick: function (e) {

        if (!this.visible) return;
        for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onClick(e);
                return false;

            }
        }


        if (e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {

            var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
            this.scrollOffset = _H.floor((e.x / width) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        this.dragging = true;

        return false;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;
        this.dragging = false;

        for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseUp(e);
                return false;

            }
        }

        if (this.mouseUp) this.mouseUp();
    },
    onMouseOver: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseOver(e);
                break;

            }
        }
        if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
            var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
            this.scrollOffset = _H.floor((e.x / width) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        if (this.mouseOver) this.mouseOver();
    },
    onScroll: function (e) {

        if (!this.visible) return;
        if (e.delta > 0) {
            if (this.scrollOffset > 0) {
                this.scrollOffset--;
            }
        } else {
            if (this.scrollOffset < this.controls.length - this.visibleItems) {
                this.scrollOffset++;
            }
        }
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                if (control.onScroll)
                    control.onScroll(e);
                return false;

            }
        }
        if (this.scroll) this.scroll();
    },

    draw: function (canv) {

        if (!this.visible) return;
        canv.fillStyle = this.backColor;

        var i;
        var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;

        canv.fillStyle = this.backColor;
        canv.lineWidth = 1;
        canv.strokeStyle = "#333";
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.visibleItems * (this.itemWidth + this.jWidth) + 2, this.itemHeight + this.scrollWidth + 6, 3, true, true);

        canv.fillStyle = "grey";
        canv.lineWidth = 1;
        canv.strokeStyle = "#444";
        canv.fillRect(this.parent.x + this.x + 2, this.parent.y + this.y + this.itemHeight + 6, this.visibleItems * (this.itemWidth + this.jWidth), this.scrollWidth);

        canv.fillStyle = "FFDDFF";
        canv.lineWidth = 1;
        canv.strokeStyle = "#FFDDFF";
        this.scrollPosition = width * this.scrollOffset / (this.controls.length - this.visibleItems);

        canv.fillRect(this.parent.x + this.x + (this.scrollPosition) + 2, this.parent.y + this.y + this.itemHeight + 6, 5, this.scrollWidth - 2);




        var curX = 3;
        for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
            this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
            this.controls[i].x = curX;
            this.controls[i].y = 2;
            this.controls[i].height = this.itemHeight;
            this.controls[i].width = this.itemWidth;

            curX += this.itemWidth + this.jWidth;
            this.controls[i].draw(canv);
        }



    }
});


window.PaletteArea = Element.extend({
    showCurrent: null,
    scale: { x: 1, y: 1 },
    clicking: false,
    selectedIndex: 0,
    parent: null,
    wide: false,
    clickHandled: false,
    init: function (palette, wide) {
        this.wide = wide;
        if (!wide) {
            this.width = this.scale.x * 2;
            this.height = this.scale.y * palette.length / 2;
        }
        else {
            this.width = this.scale.x * palette.length / 2;
            this.height = this.scale.y * 2;
        }
        this.palette = palette;

    },
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
        this.clickHandled = false;

        var _x = _H.floor(e.x / scale.x);
        var _y = _H.floor(e.y / scale.y);

        if (this.wide) {
            this.selectedIndex = _y * palette.length / 2 + _x;
        }
        else {
            this.selectedIndex = _y * 2 + _x;
        }

    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        this.clickHandled = false;
        this.clicking = false;
    },
    onMouseOver: function (e) {

        if (this.clicking) {

            var _x = _H.floor(e.x / scale.x);
            var _y = _H.floor(e.y / scale.y);

            if (this.wide) {
                this.selectedIndex = _y * palette.length / 2 + _x;
            }
            else {
                this.selectedIndex = _y * 2 + _x;
            }
        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        if (!this.palette) return;


        canv.strokeStyle = "#000";
        canv.lineWidth = 1;
        var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

        if (this.wide) {
            var f = _H.floor(this.palette.length / 2);
            for (var h = 0; h < 2; h++) {
                for (var w = 0; w < f; w++) {
                    canv.fillStyle = this.palette[w + h * f];
                    canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                    canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                }
            }
            if (this.showCurrent) {
                canv.fillStyle = this.palette[this.selectedIndex];
                canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
            }
        } else {

            var f = _H.floor(this.palette.length / 2);
            for (var h = 0; h < f; h++) {
                for (var w = 0; w < 2; w++) {
                    canv.fillStyle = this.palette[w + h * 2];
                    canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                    canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                }
            }
            if (this.showCurrent) {
                canv.fillStyle = this.palette[this.selectedIndex];
                canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
            }
        }

    }
});

window.TilePieceArea = Element.extend({
    scale: { x: 1, y: 1 },
    clicking: false,
    tilePiece: null,
    state: null,
    clickHandled: false,
    construct: function () {
        this.width = this.scale.x * 16;
        this.height = this.scale.y * 17;
    },
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
        this.clickHandled = false;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        if (this.tilePiece && this.clicking && !this.clickHandled) {
            this.tilePiece.click(_H.floor(e.x / scale.x), _H.floor(e.y / scale.y), this.state);
        }
        this.clickHandled = false;
        this.clicking = false;
    },

    onMouseOver: function (e) {

        if (!this.tilePiece) return;
        if (this.clicking) {
            this.clickHandled = true;
            this.tilePiece.click(_H.floor(e.x / scale.x), _H.floor(e.y / scale.y), this.state);
        } else
            this.tilePiece.mouseOver(_H.floor(e.x / scale.x), _H.floor(e.y / scale.y));
    },
    draw: function (canv) {

        if (!this.visible) return;
        if (!this.tilePiece) return;
        this.tilePiece.tag = true;
        if (!this.tpc) return;
        var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };
        this.tilePiece.drawUI(canv, pos, this.scale, this.tpc.XFlip, this.tpc.YFlip);
        if (sonicManager.showHeightMap) {

            var jc = (sonicManager.SonicLevel.curHeightMap ? sonicManager.SonicLevel.CollisionIndexes1 : sonicManager.SonicLevel.CollisionIndexes2);
            var hm = sonicManager.SonicLevel.HeightMaps[jc[this.tpc.Block]];
            if (hm != 0 && hm != 1) {
                hm.drawUI(canv, pos, this.scale, 0, this.tpc.XFlip, this.tpc.YFlip, sonicManager.SonicLevel.curHeightMap ? this.tpc.Solid1 : this.tpc.Solid2, sonicManager.SonicLevel.Angles[jc[this.tpc.Block]]);
            }
        }
        this.tilePiece.tag = false;

    }
});

window.TileBGEditArea = Element.extend({
    clicking: false,
    parallaxBG: null,
    lowestClickedY: -1,
    highestClickedY: -1,
    clickHandled: false,
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
        this.parallaxBG = sonicManager.background;

        if (e.x > 0 && e.y > 0 && e.y < this.parallaxBG.height && e.x < this.parallaxBG.width) {
            var bar;
            if ((bar = this.parallaxBG.onBar(e.x, e.y))) {
                this.lowestClickedY = bar.top;
                this.highestClickedY = bar.bottom;
            } else {
                this.lowestClickedY = e.y;
                this.highestClickedY = e.y;
            }

        }
        this.clickHandled = false;
    },

    onMouseUp: function (e) {

        if (!this.visible) return;

        this.parallaxBG = sonicManager.background;
        this.highestClickedY = -1;
        this.lowestClickedY = -1;

        this.clickHandled = false;
        this.clicking = false;
    },

    onMouseOver: function (e) {

        if (!this.clicking) return;
        this.parallaxBG = sonicManager.background;
        if (e.x > 0 && e.y > 0 && e.y < this.parallaxBG.height && e.x < this.parallaxBG.width) {
            if (e.y > this.highestClickedY) this.highestClickedY = e.y;
            if (e.y < this.lowestClickedY) this.lowestClickedY = e.y;
            for (var i = this.lowestClickedY; i < this.highestClickedY; i++) {
                this.parallaxBG.click(e.x, i);
            }
        }
        return false;
    },
    draw: function (canv) {

        if (!this.visible) return;

        this.parallaxBG = sonicManager.background;
        if (!this.parallaxBG) return;

        this.width = this.parallaxBG.width;
        this.height = this.parallaxBG.height;
        this.parent.width = this.width + 70;
        this.parent.height = this.height + 50;

        var scale = { x: 1, y: 1 };
        this.parallaxBG.drawUI(canv, { x: this.parent.x + this.x, y: this.parent.y + this.y }, scale);


    }
});
window.TileChunkArea = Element.extend({
    visible: true,
    scale: { x: 1, y: 1 },
    clicking: false,
    tileChunk: null,
    parent: null,
    state: null,
    setToTile: null,
    clickHandled: false,
    construct: function () {

        this.width = this.scale.x * 128;
        this.height = this.scale.y * 128;
    },
    onClick: function (e) {

        if (!this.visible) return;
        this.clicking = true;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;

        if (this.clicking) {
            if (this.setToTile != null) {
                this.tileChunk.tilePieces[((_H.floor(e.x / this.scale.x / 16)))][(_H.floor(e.y / this.scale.y / 16))] = sonicManager.SonicLevel.Blocks.indexOf(this.setToTile);
                this.tileChunk.sprites = [];
            }
        }
        this.clickHandled = false;
        this.clicking = false;
    },
    onMouseOver: function (e) {

        if (this.clicking) {

        }
    },
    draw: function (canv) {

        if (!this.visible) return;
        if (!this.tileChunk) return;
        this.tileChunk.draw(canv, { x: this.parent.x + this.x, y: this.parent.y + this.y }, this.scale, true);
    }
});

window.HtmlBox = Element.extend({
    construct: function (e) {
        this.init();
    },
    focus: function () {
        this._focus();
    },
    loseFocus: function () {
        this._hide();
    },

    draw: function (canv) {

        if (!this.visible) return;
        this.updatePosition(this.parent.x + this.x, this.parent.y + this.y);
    }
});

window.ScrollBox = Element.extend({
    itemWidth: 10,
    visible: true,
    scrollWidth: 14,
    visibleItems: 3,
    itemHeight: 10,
    backColor: '',

    jHeight: 5,
    parent: null,
    scrollOffset: 0,
    scrollPosition: 0,
    controls: [],

    scrolling: false,
    construct: function () {

        this.height = this.visibleItems * (this.itemHeight + this.jHeight);
        this.width = this.itemWidth + this.scrollWidth + 5;

    },
    addControl: function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    },
    onClick: function (e) {

        if (!this.visible) return;
        for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onClick(e);
                return false;

            }
        }


        if (e.x > this.itemWidth && e.x < this.itemWidth + scrollWidth) {

            var height = this.visibleItems * (this.itemHeight + jHeight) - 2;
            this.scrollOffset = _H.floor((e.y / height) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        this.dragging = true;

        return false;
    },
    onMouseUp: function (e) {

        if (!this.visible) return;
        this.dragging = false;

        for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseUp(e);
                return false;

            }
        }

        if (this.mouseUp) this.mouseUp();
    },
    onMouseOver: function (e) {

        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseOver(e);
                break;

            }
        }
        if (this.dragging && e.x > this.itemWidth && e.x < this.itemWidth + scrollWidth) {
            var height = this.visibleItems * (this.itemHeight + jHeight) - 2;
            this.scrollOffset = _H.floor((e.y / height) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        if (this.mouseOver) this.mouseOver();
    },
    onScroll: function (e) {

        if (!this.visible) return;
        if (e.delta > 0) {
            if (this.scrollOffset > 0) {
                this.scrollOffset--;
            }
        } else {
            if (this.scrollOffset < this.controls.length - this.visibleItems) {
                this.scrollOffset++;
            }
        }
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                e.x -= control.x;
                e.y -= control.y;
                if (control.onScroll)
                    control.onScroll(e);
                return false;

            }
        }
        if (this.scroll) this.scroll();
    },
    draw: function (canv) {


        if (!this.visible) return;
        canv.fillStyle = this.backColor;

        var i;
        var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;

        canv.fillStyle = this.backColor;
        canv.lineWidth = 1;
        canv.strokeStyle = "#333";
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.itemWidth + this.scrollWidth + 6, this.visibleItems * (this.itemHeight + this.jHeight), 3, true, true);

        canv.fillStyle = "grey";
        canv.lineWidth = 1;
        canv.strokeStyle = "#444";
        canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2, this.parent.y + this.y + 2, this.scrollWidth, this.height);

        canv.fillStyle = "FFDDFF";
        canv.lineWidth = 1;
        canv.strokeStyle = "#FFDDFF";
        this.scrollPosition = height * this.scrollOffset / (this.controls.length - this.visibleItems);

        canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2 + 2, this.parent.y + this.y + 2 + (this.scrollPosition), this.scrollWidth - 2, 5);




        var curY = 3;
        for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
            this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
            this.controls[i].x = 2;
            this.controls[i].y = curY;
            this.controls[i].height = this.itemHeight;
            this.controls[i].width = this.itemWidth;

            curY += this.itemHeight + this.jHeight;
            this.controls[i].draw(canv);
        }

    }
});




function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width, y);
    //ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x, y + height);
    // ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}