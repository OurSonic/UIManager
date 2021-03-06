﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Game.aspx.cs" Inherits="Game" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1, user-scalable = no" />
    <title>UI Manager</title>
    <script src="uploadify/jquery-1.4.2.min.js" type="text/javascript">
    </script> 
    <script src="javascript/linq.js?1" type="text/javascript"> 
    </script> 
    <script src="lib/keyboardjs.js?1" type="text/javascript"> 
    </script>
    <script src="javascript/Help.js?1" type="text/javascript"> 
    </script>
    <script src="javascript/Editor.js?1" type="text/javascript"> 
    </script>
    <script src="javascript/Stats.js?1" type="text/javascript"> 
    </script> 
    <script src="javascript/ObjectManager.js?1" type="text/javascript"> 
    </script> 
    <script src="javascript/ParallaxBG.js?1" type="text/javascript"> 
    </script> 
    <script src="javascript/PieceLayoutMaker.js?1" type="text/javascript"> 
    </script>  
    <script src="javascript/UIManager.js?1" type="text/javascript"> 
    </script>
    <script src="javascript/SonicEngine.js?1" type="text/javascript"> 
    </script>
    <script src="javascript/UIArea.js?1" type="text/javascript"> 
    </script>  
    <script src="javascript/UserInterfaces/LevelInformationArea.js?1" type="text/javascript"> 
    </script> 
    <script type="text/javascript">
    //<![CDATA[
        $(function () {
            var stats = new xStats;
            document.body.appendChild(stats.element);

            var myCanv = new SonicEngine("build");
        });  
    //]]> 
    </script> 
</head>
<body style="background-color: #000080;">
    <form id="form1" runat="server"> 
    <canvas id="build" style="margin: 0px; position: absolute; top: 0px; left: 0px; z-index: 0;"></canvas> 
    <textarea id="items" style="z-index: -100;"></textarea>
    </form>
</body>
</html>
