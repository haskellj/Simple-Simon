//------------------------Global Stuff----------------------
var userSequence = [];
var challengeSequence = [];
var x = 1;

var instructions = document.getElementsByTagName('h2');
var boxes = document.getElementsByClassName('box');

//start game button
var button = document.getElementsByTagName('button');
button[0].addEventListener('click', gameStart, false);

function gameStart(){
	button[0].style.display = "none";
	userSequence = [];
	challengeSequence = [];
	challengeGenerator();
}


//-------------------------Player Side------------------------

//attach event listener to each box when it's the user's turn
function userTurn() {
	for (i = 0; i < boxes.length; i++){
		boxes[i].addEventListener('mousedown', press, false);
		boxes[i].addEventListener('mouseup', release, false );
		boxes[i].addEventListener('click', userChoices, false);
	}
	setTimeout(function(){
			instructions[0].innerHTML = "Now you try";
		}, 800);
}

//box color highlights when selected 
function press(event){
	this.style.opacity = "1";
}

//box color reverts back to original opacity upon release
function release(event){
	this.style.opacity = "0.4";
}

//adds user selections to user array
function userChoices(event){
	var selected = this.attributes['data-value'].value;
	userSequence.push(selected);
	compare();
	console.log(userSequence);
}

//-----------------------Computer Side-------------------------

//remove event listener from each box so user cannot click during animation
function computerTurn() {
	for (i = 0; i < boxes.length; i++){
		boxes[i].removeEventListener('mousedown', press, false);
		boxes[i].removeEventListener('mouseup', release, false );
		boxes[i].removeEventListener('click', userChoices, false);
	}
	setTimeout(function(){
		instructions[0].innerHTML = "Watch the sequence";
	}, 400);
}

//randomly select a square & add to challenge array
//repeat this process at the beginning of each round
function challengeGenerator() {
		document.getElementById('round').innerHTML = "Round: " + x;
		var a = Math.floor(Math.random() * 4);	//a = index of boxes
		challengeSequence.push(a);
		challengeAnimator(challengeSequence);
		console.log(challengeSequence);
}


//loop through the challenge array and (un)highlight each corresponding box
function challengeAnimator(sequence){ 
	computerTurn();
	var b = 0;
	var interval = setInterval(function() {
		var currentBox = boxes[sequence[b]];
		currentBox.style.opacity = "1";
		b++;

		setTimeout(function(){
			currentBox.style.opacity = "0.4";
		}, 300);

		if (b >= sequence.length){
			clearInterval(interval);
			userTurn();
		}
	}, 900);
}



// -----------------------Round Referee------------------------

//Compares the user's array to the challenge array after each choice.
//The moment they don't match, stop the game.
//If user matches entire challenge array, increment x, the round counter, and 
//call computer-side to generate new element for challenge array.
function compare() {
	for (var i = 0; i < userSequence.length; i++) {
		if(userSequence[i] != challengeSequence[i]){
			instructions[0].innerHTML = "Woops!";
			button[0].style.display = "inline-block";
			x = 1;
		}
	}
	if (userSequence.length == challengeSequence.length){
	userSequence = [];
	x++;
	challengeGenerator();
	}
}


//change text when it's the user's turn

// function directions(event){
// 	this.replace(event, "<p>Watch the Sequence</p>");
// 	setTimeout(this.replace(event, "<p>Repeat the Sequence"), //time it takes the sequence to run through);
// }