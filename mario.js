const highestS = localStorage.getItem("HS");
function StartTheGame(){
// Select the elements
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");

// Set the initial position of the obstacle
let obstaclePosition = 800;

// Move the obstacle from right to left with a random speed
function moveObstacle() {
	// Get a random speed for the obstacle movement
	let obstacleSpeed = getRandomSpeed();

	obstaclePosition -= obstacleSpeed;
	obstacle.style.left = obstaclePosition + "px";

	// If the obstacle hits the left edge, reset its position
	if (obstaclePosition < -60) {
		obstaclePosition = 800;
	}

	// Check for collision
	if (checkCollision()) {
	  clearInterval(obstacleMovement);
		clearInterval(scoreInt);
		if(localStorage.getItem("HS") === null){
		localStorage.setItem("HS", document.getElementById("CS").innerHTML);
		}
		if(localStorage.getItem("HS") != null &&  parseInt(document.getElementById("CS").innerHTML) > parseInt(document.getElementById("HS").innerHTML)){
		localStorage.setItem("HS", document.getElementById("CS").innerHTML);
		}
		
		if(parseInt(document.getElementById("CS").innerHTML) > parseInt(document.getElementById("HS").innerHTML)){
		document.getElementById("HS2").innerHTML = document.getElementById("CS2").innerHTML;
	}
else{
  document.getElementById("HS2").innerHTML = document.getElementById("HS").innerHTML;
}
	
		document.getElementById("report").style.display ="flex";
		document.body.classList.add("overlay");
		document.getElementById("out-mp3").play();
	}
}

const obstacleMovement = setInterval(moveObstacle, 20);

// Jump when the spacebar is pressed
document.body.onclick  = () =>{
jump();
}

function jump() {
 document.getElementById("jump-mp3").play();
	let dinoPosition = 0;
	let timerId = setInterval(function() {
		// Move the dino up
		dinoPosition += 10;
		dino.style.bottom = dinoPosition + 40 + "px";

		// Move the dino down
		if (dinoPosition === 150) {
			clearInterval(timerId);
			let downTimerId = setInterval(function() {
				dinoPosition -= 10;
				dino.style.bottom = dinoPosition + "px";

				// If the dino hits the ground, stop the timer
				if (dinoPosition === 0) {
					clearInterval(downTimerId);
				}
			}, 30);
		}
	}, 18);
}

function checkCollision() {
	let dinoRect = dino.getBoundingClientRect();
	let obstacleRect = obstacle.getBoundingClientRect();

	return !(
		dinoRect.bottom < obstacleRect.top ||
		dinoRect.top > obstacleRect.bottom ||
		dinoRect.right < obstacleRect.left ||
		dinoRect.left > obstacleRect.right
	);
}

function getRandomSpeed(){
	return Math.floor(Math.random() * 10) + 5;
}
setInterval(getRandomSpeed, 500);




/*  scores */
let score = 0;
let hs = document.getElementById("HS");
let cs = document.getElementById("CS");
let cs2 = document.getElementById("CS2");

let scoreInt = setInterval(function(){
cs.innerHTML = score;
cs2.innerHTML = score;
score++;
}, 200);
}




document.getElementById("start-btn").onclick  = () =>{
StartTheGame();
document.getElementById("start-btn").style.display ="none";
document.getElementById("scores").style.display ="block";


if(localStorage.getItem("HS") != null){
const highestS = localStorage.getItem("HS");
document.getElementById("HS").innerHTML = highestS;
}
else{
document.getElementById("HS").innerHTML = 0;
}
}









/* report close */
document.getElementById("report-close").onclick  = () =>{
document.getElementById("report").style.display ="none";
document.body.classList.remove("overlay");
resetGame();
}
function resetGame(){
window.location = window.location;
}






/* onload window */
window.onload = function(){
var y = localStorage.getItem("theme");
var x = document.getElementById("theme-toggler");



if(y =="dark"){
document.body.classList.add("dark-theme");
document.body.classList.remove("light-theme");
x.classList.replace("bx-moon", "bxs-sun");
}	
else if(y =="light"){
document.body.classList.add("light-theme");
document.body.classList.remove("dark-theme");
x.classList.replace("bxs-sun", "bx-moon");
}	
else{
document.body.classList.add("light-theme");
document.body.classList.remove("dark-theme");
x.classList.replace("bxs-sun", "bx-moon");
}				
}




/* theme toggler */
document.getElementById("theme-toggler").onclick = function(){
var x = document.getElementById("theme-toggler");
var body = document.body;


if(x.classList.contains("bx-moon")){
body.classList.remove("light-theme");
body.classList.add("dark-theme"); 			
x.classList.replace("bx-moon", "bxs-sun");
localStorage.setItem("theme", "dark");
}
else{
body.classList.remove("dark-theme");
body.classList.add("light-theme"); 			
x.classList.replace("bxs-sun", "bx-moon");
localStorage.setItem("theme", "light");
}
}





















/* share your points */
document.getElementById("share").onclick = () =>{
let region = document.querySelector("#report");
document.getElementById("report-close").style.display  ="none";
document.getElementById("share").style.display  ="none";

html2canvas(region, {
onrendered: function(canvas){
let pngUrl = canvas.toDataURL(); 
/*  
let img = document.querySelector(".screen");
img.src = pngUrl; */
localStorage.setItem("shareImg", pngUrl);
},
});







function shareScore(){
document.getElementById("report-close").style.display  ="block";
document.getElementById("share").style.display  ="block";


const imageDataUrl =localStorage.getItem("shareImg"); 
fetch(imageDataUrl).then(function(response){
return response.blob()
}).then(function(blob){
var file = new File([blob], "my.jpg", {
type: 'image/jpeg'});
var filesArray = [file];

if(navigator.share){
if (navigator.canShare && navigator.canShare({
files: filesArray
})){
navigator.share({
text: "My new score on this game, wanna try this game? Link is below : ",
files: filesArray,
title: "MARIO || By Ashutosh Pandey",
url: "https://mario-web.netlify.app"
});
}
}

else{
alert("You device do not support Web Share API\nYou played well 🎉\nPlay again !!");
}});
}
/* share score function ended */
setTimeout(shareScore, 800);

}

