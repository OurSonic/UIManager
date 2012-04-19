window.ColorEditorArea = function () {
    var colorEditorArea = sonicManager.uiManager.colorEditorArea = new UiArea(650, 30, {
        width: 960,
        height: 800,
        manager: sonicManager.uiManager,
        closable: true,
        visible: false
    });
    sonicManager.uiManager.UIAreas.push(colorEditorArea);
    colorEditorArea.addControl(colorEditorArea.colorEditor = new ColorEditingArea(30, 45, {
        width: 680,
        height: 680,
        showOffset: false
    }));
    colorEditorArea.addControl(new Button(770, 70, {
        width: 150,
        height: 22,
        text: "Show Outline",
        font: sonicManager.uiManager.buttonFont,
        color: "rgb(50,150,50)",
        click: function () {
            colorEditorArea.colorEditor.editor.showOutline = !colorEditorArea.colorEditor.editor.showOutline;
        }
    }));

    colorEditorArea.addControl(new TextArea(750, 150, {
        text: function () { return "Line Width:" + colorEditorArea.colorEditor.editor.lineWidth; },
        font: sonicManager.uiManager.textFont,
        color: "Black"
    }));

    colorEditorArea.addControl(new Button(900, 120, {
        width: 14,
        height: 20,
        text: "^",
        font: sonicManager.uiManager.buttonFont,
        color: "rgb(50,150,50)",
        click: function () {
            colorEditorArea.colorEditor.editor.lineWidth = Math.max(colorEditorArea.colorEditor.editor.lineWidth + 1, 1);
        }
    }
    ));

    colorEditorArea.addControl(new Button(900, 145, {
            width: 14,
            height: 20,
            text: "v",
            font: sonicManager.uiManager.buttonFont,
            color: "rgb(50,150,50)",
            click: function() {
                colorEditorArea.colorEditor.editor.lineWidth = Math.min(colorEditorArea.colorEditor.editor.lineWidth - 1, 10);
            }
        }
    ));
    
    colorEditorArea.addControl(colorEditorArea.paletteArea = new PaletteArea(770, 250, { x: 45, y: 45 }, true));
    colorEditorArea.colorEditor.paletteEditor = colorEditorArea.paletteArea;
    colorEditorArea.init = function (frame) {
        colorEditorArea.colorEditor.scale = { x: 700 / frame.width, y: 700 / frame.height };
        colorEditorArea.colorEditor.init(frame);
        colorEditorArea.paletteArea.init(frame.palette, false);
    };

};