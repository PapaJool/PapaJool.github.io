//Мир
var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [1, 9, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,1 ],
    [1, 10,1, 1, 1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 1, 1, 10,1 ],
    [1, 10,1, 10,10,10,10,10,10,10,1, 10,10,10,10,10,10,10,1, 10,1 ],
    [1, 10,1, 10,1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 10,1, 10,1 ],
    [1, 10,1, 10,10,10,10,10,10,10,1, 10,10,10,10,10,10,10,1, 10,1 ],
    [1, 10,1, 1, 1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 1, 1, 10,1 ],
    [1, 10,10,10,10,10,10,10,10,10,1, 10,10,10,10,10,10,10,10,10,1 ],
    [1, 10,1, 1, 1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 1, 1, 10,1 ],
    [1, 10,1, 10,10,10,10,10,10,10,1, 10,10,10,10,10,10,10,1, 10,1 ],
    [1, 10,1, 10,1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 10,1, 10,1 ],
    [1, 10,1, 10,10,10,10,10,10,10,1, 10,10,10,10,10,10,10,1, 10,1 ],
    [1, 10,1, 1, 1, 1, 1, 1, 1, 10,1, 10,1, 1, 1, 1, 1, 1, 1, 10,1 ],
    [1, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,1 ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
]

//PACMAN
var pacman = {
    x: 1,
    y: 1
}

var ghost = {
    x: 19,
    y: 13
}

//Очки
var score = 0 ;

//Отображение мира
function displayWorld(){
    var output = '';
    for(var i=0; i<world.length; i++){
        output += "\n<div class='row'>\n"
        for(var j=0; j<world[i].length; j++){
//            Блоки
            if(world[i][j] == 1)
                output += "<div class='brick'></div>";
//           Монетки и пустая клетка
            else if(world[i][j] == 9)
                output += "<div class='empty'></div>";    
            else if(world[i][j] == 10)
                output += "<div class='coin'></div>";
        }
        output += "\n</div>"
    }
    $('#world').html(output);
}

//Отображение пакмана
function displayPacman(){
    document.getElementById('pacman').style.left = pacman.x*20+"px";
    document.getElementById('pacman').style.top = pacman.y*20+"px";
}
//Отображение призрака
function displayGhost(){
    document.getElementById('ghost').style.left = ghost.x*20+"px";
    document.getElementById('ghost').style.top = ghost.y*20+"px";
}



//Отображение очков
function displayScore(){
    document.getElementById('score').innerHTML = score;
}


//Движение пакмана
document.onkeydown = function(e){
//LEFT
    if(e.keyCode == 37 && (world[pacman.y][pacman.x-1]==9 || world[pacman.y][pacman.x-1]==10)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('left');
        pacman.x --;
    }
//RIGHT
    else if(e.keyCode == 39 && (world[pacman.y][pacman.x+1]==9 || world[pacman.y][pacman.x+1]==10)){
        $('#pacman').removeClass('left');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('right');
        pacman.x ++;
    }
//DOWN
    else if(e.keyCode == 38 && (world[pacman.y-1][pacman.x]==9 || world[pacman.y-1][pacman.x]==10)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('left');
        $('#pacman').addClass('down');
        pacman.y --;
    }
//UP
    else if(e.keyCode == 40 && (world[pacman.y+1][pacman.x]==9 || world[pacman.y+1][pacman.x]==10)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('left');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('up');
        pacman.y ++;
    }    
//Подсчет очков
    if(world[pacman.y][pacman.x] == 10){
        world[pacman.y][pacman.x] = 9;
        score+=10;
        displayWorld();
        displayScore();
    }
    displayPacman()
    checkend()
}



//Движение призраков
function getRandom() {
    var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    return random;
}

var currentDirection = 1;

function ghostMove(){
    var newDirection = getRandom();
    
//Left Right New Direction
    if(
        //If it's going right or left and up or down is available
        ((currentDirection == 1 || currentDirection == 2) && (world[ghost.y+1][ghost.x]==9 || world[ghost.y+1][ghost.x]==10 || world[ghost.y-1][ghost.x]==9 || world[ghost.y-1][ghost.x]==10))
        ||
        //Or if it's going up or down and left or right is available
        ((currentDirection == 3 || currentDirection == 4) && (world[ghost.y][ghost.x+1]==9 || world[ghost.y][ghost.x+1]==10 || world[ghost.y][ghost.x-1]==9 || world[ghost.y][ghost.x-1]==10 ))
    ){
        //Check to make sure it won't change direction to it's current direction
        while(newDirection == currentDirection){
            newDirection = getRandom();
        }
        //Change direction to a new direction
        currentDirection = newDirection;
    }
    
    if(currentDirection ==  1 && (world[ghost.y][ghost.x-1]==9 || world[ghost.y][ghost.x-1]==10 )){
        ghost.x --;
//        console.log("move left")
    }else if(currentDirection == 2 && (world[ghost.y][ghost.x+1]==9 || world[ghost.y][ghost.x+1]==10)){
//        console.log("move right")
        ghost.x ++;
    }else if(currentDirection == 3 && (world[ghost.y-1][ghost.x]==9 || world[ghost.y-1][ghost.x]==10)){
//        console.log("move up")
        ghost.y --;
    }else if(currentDirection == 4 && (world[ghost.y+1][ghost.x]==9 || world[ghost.y+1][ghost.x]==10)){
//        console.log("move down")
        ghost.y ++;
    }
    displayGhost();   
}

//Обновление призрака
setInterval(ghostMove, 500)


//Проверка на соприкосновение с призраком 
function checkend(){
    if((pacman.x == ghost.x) && (pacman.y == ghost.y)){
        $('#gameover').fadeIn();
    }
    if(score > 1460)
    {
        $('#win').fadeIn();
    }
    
}




$(document).ready(function(){
    displayWorld();
    displayPacman();
    displayGhost();
    displayScore();
    


    
})