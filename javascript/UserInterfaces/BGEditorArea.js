window.BGEditorArea = function () {
    var bgEditor = sonicManager.uiManager.bgEditor = new UiArea(100, 440, {
        width: 420,
        height: 360,
        manager: sonicManager.uiManager,
        closable: true
    });
    bgEditor.visible = false;
    sonicManager.uiManager.UIAreas.push(bgEditor);
    bgEditor.addControl(new TextArea(30, 25, {
        text: "BG Editor",
        font: sonicManager.uiManager.textFont,
        color: "blue"
    }));
    bgEditor.addControl(new TileBGEditArea(60, 35));
};