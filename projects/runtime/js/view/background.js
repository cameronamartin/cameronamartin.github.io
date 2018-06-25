var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // Add any variables that will be used by render AND update here:
        var tree;
        var buildings= [];
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY, '#000030');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var star;
            for(var i=0;i<75;i++) {
                star = draw.bitmap('img/4-point-star.png');
                star.x = canvasWidth*Math.random();
                star.y = (groundY-100)*Math.random();
                star.scaleX = .9*Math.random(.25);
                star.scaleY = star.scaleX;
                background.addChild(star);
            }
            var moon = draw.bitmap('img/moon.png');
            moon.x = 50;
            moon.y = 25;
            moon.scaleX = .5;
            moon.scaleY = .5;
            background.addChild(moon);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight;
            var building;
            for(var i=0;i<7;++i) {
                buildingHeight = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
                building = draw.rect(75,buildingHeight,'LightGray','Black',1);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }

            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 200;
            tree.y = groundY-175;
            tree.scaleX = .75;
            tree.scaleY = .75;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x -= 1;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
            for(var i = buildings.length - 1; i > -1; i--){
                buildings[i].x -= .2;
                if(buildings[i].x < -100){
                    buildings[i].x = canvasWidth;
                }
            }

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
