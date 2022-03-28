var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:

            var tree; 
            var buildings = []; 

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game

            var backgroundFill = draw.rect(canvasWidth,groundY,'#383942');
            background.addChild(backgroundFill);
            

            // TODO: 3 - Add a moon and starfield

            //everytime this loop runs it creates a circle with a random x and y respective to the canvas and is added to the background
            for(var i = 0; i <= 100; i++){ //loop for the stars 
                var circle = draw.circle(3,'white','lightGrey',2); //size and color of the stars
                circle.x = canvasWidth*Math.random(); //randomizes the x coordinates of the stars
                circle.y = groundY*Math.random(); //randomizes the y coordinates of the stars 
                background.addChild(circle); //runs it as the background             
            }
            var moon = draw.bitmap('img/moon.png'); //created a variable called moon. 
            moon.x = canvasWidth - 400; //moves the moon towards the left or right
            moon.y = groundY - 400 // moves the moon up or down                   
            moon.scaleX = .3; //makes the moon wider 
            moon.scaleY = .3; // makes the moon taller
            background.addChild(moon); //adds the moon to the background
            
        
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            //creates a variable call buildingHeights that hold the height of the building in pixels
            for(var i=0;i<5;++i) { 
                var buildingHeight = 300; 
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // creates a variable called bulding that holds the data for for the drawn building 
                building.x = 200*i; // positions the x of each building 200 pixels from the next building on each loop 
                building.y = groundY-buildingHeight; //sets the y of the buliding off the groundY
                background.addChild(building); //adds building to the background so it can be seen 
                buildings.push(building); //push each indivdual bulding to the building array 
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 100;
            tree.y = groundY - 100;
            tree.scaleX = .5;
            tree.scaleY = .5; 
            background.addChild(tree);


        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
            function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
               
            tree.x = tree.x - 1; //taking the value of tree.x and decreasing it by one pixel every time the update function runs. 

            if(tree.x < -200) {
            tree.x = canvasWidth;
            }

            // TODO 5: Part 2 - Parallax
            //loops the buildings and moves them to the left by 0.5 pixels 
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5; //moves the buildings x position by 0.5 pixels
                if(buildings[i].x < 0){ //checks to see id=f the buildings x pos is off the left side and if it is resets the position
                    buildings[i].x = canvasWidth
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
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
