const CANVAS_COLOUR="#A9ACB6"
const CANVAS_BORDER="green"
const SNAKE_COLOUR="#003EFF"
const SNAKE_STROKE_COLOUR="#3B4990"
const FOOD_COLOUR="red"
const FOOD_STROKE_COLOUR="black"
var snake_speed=300
//creating the snake
var snake= [
    {x:150,y:150},{x:140,y:150}, 
    {x:130,y:150},{x:120,y:150},
    {x:110,y:150},{x:100,y:150},
    {x:90,y:150},{x:80,y:150},
    // {x:110,y:150},{x:100,y:150},
    // {x:110,y:150},{x:100,y:150},
]
var score=0;
//increment/decrement to move the snake
let dx=10
let dy=0
//food coordinates
let fx
let fy
//creating the canvas
var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");
main();
createfood();
//to change direction on keypress
document.addEventListener("keydown",changeDirection)
scorelement=document.getElementById("score");
increasespeed=document.getElementById("morespeed");
increasespeed.addEventListener("click",function speed()
{
    snake_speed+=400;
}
)
//creates delay to show each increment while snake is moving
function main()
{
    if(gameend()) {
        alert("gameover")
        return;
    }
    setTimeout(function delay()
    {
        resetcanvas();
        drawfood();
        movesnake();
        fullsnake();
        main();
    },snake_speed)
}

function resetcanvas()
{
    ctx.fillStyle = CANVAS_COLOUR;
    ctx.strokestyle = CANVAS_BORDER;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width,canvas.height);
}

//moves snake
function movesnake()
{
    const head={x:snake[0].x +dx,y:snake[0].y+dy}
    snake.unshift(head);
    if(snake[0].x===fx && snake[0].y===fy){
        score+=10;
        scorelement.innerHTML=`Score: ${score}`;
        createfood();
    } 
    else{
        snake.pop();
    }
}
//creates snake
function createsnakebox(snakebox)
{
    ctx.fillStyle=SNAKE_COLOUR;
    ctx.strokeStyle=SNAKE_STROKE_COLOUR;
    ctx.fillRect(snakebox.x,snakebox.y,10,10);
    ctx.strokeRect(snakebox.x,snakebox.y,10,10);
}
function fullsnake()
{
    snake.forEach(createsnakebox);
}



function changeDirection(event)
{
    const UP_KEY=38
    const DOWN_KEY=40
    const RIGHT_KEY=39
    const LEFT_KEY=37
    key=event.keyCode;
    const movingDown=(dy===10);
    const movingRight=(dx===10)
    const movingLeft=(dx===-10)
    const movingUp=(dy===-10)
    if(key===UP_KEY && !movingDown)
    {
        dy=-10;dx=0;
    } 
    if(key===DOWN_KEY && !movingUp)
    {
        dy=10;dx=0;
    } 
    if(key===LEFT_KEY && !movingRight)
    {
        dy=0;dx=-10;
    } 
    if(key===RIGHT_KEY && !movingLeft)
    {
        dy=0;dx=10;
    }   
}

//creating the food for the snake
function createfood()
{
    fx=Math.round((Math.random()*canvas.width)/10)*10  
     fy=Math.round((Math.random()*canvas.height)/10)*10 
    snake.forEach(function didsnakeeat(box){
    if(box.x==fx && box.y==fy)
        createfood();
    })
}

function drawfood()
{
    ctx.fillStyle=FOOD_COLOUR;
    ctx.strokeStyle=FOOD_STROKE_COLOUR;
    ctx.fillRect(fx,fy,10,10);
    ctx.strokeRect(fx,fy,10,10);
}

function gameend()
{
    for(i=3;i<snake.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) 
        {
            return true
        }
    }
    return snake[0].x>canvas.width-10 || snake[0].x<0 || snake[0].y>canvas.height-10 || snake[0].y<0 
}




