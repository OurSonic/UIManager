window.LevelInformationArea = function () {

    uiManager.curLevelName = "Level Not Saved";

    var levelInformation = uiManager.levelInformation = new UiArea(390, 70, {
        width: 550,
        height: 420,
        manager: uiManager,
        visible: true,
        editMode:false
    });
    uiManager.UIAreas.push(levelInformation);
    levelInformation.addControl(new TextArea(30, 25, {
        text: "Level Selector",
        font: uiManager.textFont,
        color: "blue"
    }));
    levelInformation.addControl(new TextArea(30, 52, {
        text: function () { return uiManager.curLevelName; },
        font: uiManager.textFont,
        color: "black"
    }));
    levelInformation.addControl(new Button(350, 52, {
        text: "did",
        width: 120,
        height: 40
    }));
    levelInformation.addControl(new Button(350, 120, {
        text: "didd",
        width: 120,
        height: 40
    }));

    /* levelInformation.addControl(new Button(320, 70, 100, 22, "Save Level", uiManager.buttonFont, "rgb(50,150,50)",
    function () {
    if (uiManager.curLevelName) {
    OurSonic.SonicLevels.SaveLevelInformation(uiManager.curLevelName, Base64.encode(_H.stringify(sonicManager.SonicLevel)), function (c) {
    }, function (c) { alert("Failure: " + _H.stringify(c)); });
    } else {
    OurSonic.SonicLevels.saveLevel(Base64.encode(_H.stringify(sonicManager.SonicLevel)), function (j) {
    addLevelToList(uiManager.curLevelName);
    });

    }
    }));

    var tb;
    levelInformation.addControl(tb = new Button(320, 105, 160, 22, "Load Empty Level", uiManager.buttonFont, "rgb(50,150,50)",
    function () {

    levelManagerArea.visible = true;
    loadingText.visible = true;
    var index = 0;
    var tim = function () {
    var max = 188;
    if (index == max) {
    setTimeout(function () {
    alert(_H.stringify(sonicManager.SonicLevel));
    uiManager.loadGame(_H.stringify(sonicManager.SonicLevel), sonicManager.mainCanvas);
    loadingText.visible = false;
    }, 500);
    return;
    }
    setTimeout(tim, 100);

    _H.loadSprite("assets/Chunks/Tile" + index++ + ".png", function (image) {
    loadingText.text = "Loading " + index + "/" + max;
    sonicManager.importChunkFromImage(image);
    if (index == max) {
    sonicManager.inds = { done: true };
    }
    });

    };
    setTimeout(tim, 100);


    }));
    tb.visible = false;*/

    var ctls;
    levelInformation.addControl(ctls = new ScrollBox(30, 70, {
        itemHeight: 25,
        visibleItems: 11,
        itemWidth: 250,
        backColor: "rgb(50,60,127)"
    }));

    var curLevelName;

    //    var getLevels = OurSonic.SonicLevels.getLevels;
    var getLevels = function (exe) {exe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);};


    getLevels(function (lvls) {
        for (var i = 0; i < lvls.length; i++) {
            var lvlName = lvls[i];
            addLevelToList(lvlName);
        }

        var dl = _H.getQueryString();
        if (dl["level"]) {
            loadLevel(dl["level"]);
        }
    });


    function addLevelToList(name) {
        ctls.addControl(new Button(0, 0, {
            text: name,
            font: "10pt Arial",
            color: "rgb(50,190,90)",
            click: function () {
                loadLevel(name);
            }
        }));
    }

    function loadLevel(name) {
        uiManager.updateTitle("Downloading " + name);
        OurSonic.SonicLevels.getLevel(name, function (lvl) {
            uiManager.updateTitle("Loading: " + name);

            uiManager.loadGame(lvl, sonicManager.mainCanvas);
        });
    }
};