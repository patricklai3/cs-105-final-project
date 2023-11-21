// README
/*
<project>
Patrick Lai
p9lai

INSTRUCTIONS
<explain what your program does and how to use it>

VIDEO
<paste video URL here>


RELEASE
I <type your full name> grant permission to CS105 course staff to use
my Final Project program and video for the purpose of promoting CS105.
<if you don't grant permission, erase the line above>



BASIC CONCEPTS
<List the best examples of the "Basic Concepts" used in the Final Project with a brief description of how/where each is used>


EXTENDED CONCEPTS
<List the "Extended Concepts" used in the Final Project with a brief description of how/where each is used>


CODING QUALITY AND VISUAL DESIGN
<argue for your coding quality and visual design>


*/

// all code goes below here ....

let k;
let track = [1, 0];

function setup() {
    createCanvas(800, 300);
}

function draw() {
    background(255);
    line(0, 100, 800, 100);
    line(0, 200, 800, 200);
    train();
}

function train() {
    if (track[0] == 1 && track[1] == 0) {
        rect(30, 70, 150, 60);
    }
    if (track[0] == 2 && track[1] == 0) {
        rect(30, 170, 150, 60);
    }
    if (track[1] == 1) {
        rect(30, 75, 60, 150);
    }
}

function mousePressed() {
    track[1] = 1;
}


function mouseReleased() {
    if (track[0] == 1) {
        track[0] = 2;
    } else if (track[0] == 2) {
        track[0] = 1;
    }
    track[1] = 0;
}