var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY -20 },
                { "type": "sawblade", "x": 600, "y": groundY -70 },
                { "type": "sawblade", "x": 900, "y": groundY -20 },
                { "type": "sawblade", "x": 1400, "y": groundY -70 },
                { "type": "sawblade", "x": 1600, "y": groundY -20 },
                { "type": "sawblade", "x": 1800, "y": groundY -70 },
                { "type": "sawblade", "x": 2000, "y": groundY -20 },
                { "type": "sawblade", "x": 2200, "y": groundY -70 },
                { "type": "sawblade", "x": 2400, "y": groundY -20 },
                { "type": "sawblade", "x": 2600, "y": groundY -70 },

                { "type": "enemy", "x": 500, "y": groundY -50 },
                { "type": "enemy", "x": 700, "y": groundY -50 },
                { "type": "enemy", "x": 900, "y": groundY -50 },
                { "type": "enemy", "x": 1100, "y": groundY -50 },
                { "type": "enemy", "x": 1300, "y": groundY -50 },
                { "type": "enemy", "x": 1500, "y": groundY -50 },
                { "type": "enemy", "x": 1700, "y": groundY -50 },
                { "type": "enemy", "x": 1900, "y": groundY -50 },
                { "type": "enemy", "x": 2100, "y": groundY -50 },
                { "type": "enemy", "x": 2300, "y": groundY -50 },

                { "type": "reward", "x": 200, "y": groundY  -50 },
                { "type": "reward", "x": 1100, "y": groundY -50 },
                { "type": "reward", "x": 1200, "y": groundY -50 },
                { "type": "reward", "x": 1550, "y": groundY -50 },
                { "type": "reward", "x": 1740, "y": groundY -50 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

            function createSawBlade(x, y){
                 var hitZoneSize = 25; //creates the size of the hitzone 
                 var damageFromObstacle = 10; //sets the damage of the obstacle 
                 var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hit zone and stores it in this variable 
                 sawBladeHitZone.x = x; //x pos of the hitzone
                 sawBladeHitZone.y =  y; // y pos of the hitzone
                 game.addGameItem(sawBladeHitZone); //adds to the hizone of the game 
         
               var obstacleImage = draw.bitmap('img/sawblade.png'); //drawing the image and storing in the variable 
               sawBladeHitZone.addChild(obstacleImage); // add the image to the hitzone so we can see it
               obstacleImage.x = -25; //tweaks the image 25 pixels to the left 
               obstacleImage.y = -25; //tweaks the image 25 pixels up 
            }

        

        function createEnemy(x,y){    
            var redSquare = draw.bitmap("enemy.png");
            var enemy = game.createGameItem('enemy',25); //creating the game item and storing it in the variable enemy
            var redSquare = draw.rect(50, 50,'red'); //created rectangle and stores as redSquare  
            redSquare.x = -25; //
            redSquare.y = -25;
            enemy.addChild(redSquare); //adds the redSquare to the enemy game item 

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy); //adds enemy to the game 

            enemy.velocityX = -2; //causes the enemy to move one pixel to the left on the x pos 

            enemy.rotationalVelocity = 25; //causes the enemy to rotate 

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10); 
            };

            enemy.onProjectileCollision = function() {
                console.log('The projectile has hit the enemy');
                game.changeIntegrity(5); 
                game.increaseScore(30);
                enemy.flyTo(120,10); 
            };

        }
       


            function createReward(x, y){
                var reward = game.createGameItem('reward', 25);
                var blueSquare = draw.rect(50, 50, 'blue');
                blueSquare.x = -25;
                blueSquare.y = -25;
                reward.addChild(blueSquare);

                reward.x = x;
                reward.y = y;

                game.addGameItem(reward);

                reward.velocityX = -1

                reward.rotationalVelocity = 25

                reward.onPlayerCollision = function(){
                    console.log("The reward has hit halle");
                    game.changeIntegrity(100);
                    game.increaseScore(100);
                }; 
            }      
           

        for(var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }

            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }

            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
        }

    

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
