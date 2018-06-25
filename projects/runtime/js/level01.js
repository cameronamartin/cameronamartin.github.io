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
                    name: "Robot Romp",
                    number: 1, 
                    speed: -3,
                    gameItems: [
                        
                    ]
                };
                window.levelData = levelData;
                // set this to true or false depending on if you want to see hitzones
                game.setDebugMode(false);
        
                // BEGIN EDITING YOUR CODE HERE
                var type;
                var height;
                for(var i = 1; i <= 50; i++){
                    if(i%10 == 0){
                        levelData.gameItems.push({type: 'reward',x: 400 + 200 * i})
                    }
                    else{
                        type = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                        if(type == 1){
                            height = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                            if(height == 1){
                                levelData.gameItems.push({type: 'box',x: 400 + 200 * i})
                            }
                            else if (height == 2){
                                levelData.gameItems.push({type: 'sawblade',x: 400 + 200 * i})
                            }
                            else{
                                levelData.gameItems.push({type: 'ufo',x: 400 + 200 * i})
                            }
                        }
                        else if(type == 2){
                           levelData.gameItems.push({type: 'enemy',x: 400 + 200 * i})
                        }
                    }
                }
                var hitZoneSize = 25;
                var damageFromObstacle = 25;
                function createSawBlade(inputX) {
                    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
                    myObstacle.x = inputX;
                    myObstacle.y = groundY - 105;
                    game.addGameItem(myObstacle);
                    myObstacle.rotationalVelocity = -30;
                    var obstacleImage = draw.bitmap('img/sawblade.png');
                    myObstacle.addChild(obstacleImage);
                    obstacleImage.x = -25;
                    obstacleImage.y = -25;
                }
                function createBox(inputX){
                    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
                    myObstacle.x = inputX;
                    myObstacle.y = groundY - 15;
                    game.addGameItem(myObstacle);
                    var obstacleImage = draw.bitmap('img/box.png');
                    myObstacle.addChild(obstacleImage);
                    obstacleImage.x = -25;
                    obstacleImage.y = -25;
                    
                }
                function createUfo(inputX){
                    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
                    myObstacle.x = inputX;
                    myObstacle.y = groundY - 145;
                    game.addGameItem(myObstacle);
                    var obstacleImage = draw.bitmap('img/ufo.png');
                    myObstacle.addChild(obstacleImage);
                    obstacleImage.x = -36;
                    obstacleImage.y = -30;
                }
                function createEnemy(inputX){
                    var enemy =  game.createGameItem('enemy',25);
                    enemy.x = inputX;
                    enemy.y = groundY - 30;
                    enemy.velocityX = -2;
                    enemy.rotationalVelocity = 3;
                    game.addGameItem(enemy);
                    enemy.onPlayerCollision = function() {
                        game.changeIntegrity(-100);
                    };
                    enemy.onProjectileCollision = function(){
                        enemy.fadeOut();
                        game.increaseScore(10);
                    };
                    var redSquare = draw.rect(50,50,'red');
                    redSquare.x = -25;
                    redSquare.y = -25;
                    enemy.addChild(redSquare);
                }
                function createReward(inputX){
                    var reward = game.createGameItem('reward',25);
                    reward.x = inputX;
                    reward.y = groundY - 145;
                    reward.velocityX = -2;
                    game.addGameItem(reward);
                    reward.onPlayerCollision = function() {
                        game.changeIntegrity(25);
                        game.increaseScore(100);
                        reward.fadeOut();
                    }
                    var wrench = draw.bitmap('img/wrench.png');
                    wrench.x = -25;
                    wrench.y = -25;
                    reward.addChild(wrench);
                }
                
                for(var i = 0; i < levelData.gameItems.length; i++){
                    if(levelData.gameItems[i].type == 'sawblade'){
                        createSawBlade(levelData.gameItems[i].x);
                    }
                    if(levelData.gameItems[i].type == 'enemy'){
                        createEnemy(levelData.gameItems[i].x);
                    }
                    if(levelData.gameItems[i].type == 'box'){
                        createBox(levelData.gameItems[i].x);
                    }
                    if(levelData.gameItems[i].type == 'ufo'){
                        createUfo(levelData.gameItems[i].x);
                    }
                    if(levelData.gameItems[i].type == 'reward'){
                        createReward(levelData.gameItems[i].x);
                    }
                }
        
        
        
            }
        };
        
        // DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
        if((typeof process !== 'undefined') &&
            (typeof process.versions.node !== 'undefined')) {
            // here, export any references you need for tests //
            module.exports = level01;
        }