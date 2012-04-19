window.ObjectEditorArea = function () {

    var objectEditorArea = uiManager.objectEditorArea = new UiArea(25, 70, {
        width: 320,
        height: 400,
        manager: uiManager,
        visible: true,
        editMode: false
    }); ;


    uiManager.UIAreas.push(objectEditorArea); ;

    objectEditorArea.addControl(new ScrollBox(30, 30, {
        itemHeight: 70,
        items: [],
        visibleItems: 4,
        itemWidth: 200,
        backColor: "rgb(50,60,127)"
    }));
};