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

let trackNumber = [1, 0];
let victimX, victimY;

function setup() {
    createCanvas(800, 300);
    victimX = [];
    victimY = [];
}

function draw() {
    background(255);

    drawTrack(100, 100);
    drawTrack(200, 200);

    victimFlow();
    detectVictim();

    train();
}

function train() {
    if (trackNumber[0] == 1 && trackNumber[1] == 0) {
        rect(30, 70, 150, 60);
    }
    if (trackNumber[0] == 2 && trackNumber[1] == 0) {
        rect(30, 170, 150, 60);
    }
    if (trackNumber[1] == 1) {
        rect(30, 75, 60, 150);
    }
}

function victimFlow() {
    let x = random(0, 100);
    if (x < 1) {
        victimX[victimX.length] = 800;
        victimY[victimY.length] = Math.random() < 0.5 ? 100 : 200;
    }
    for (let i = 0; i < victimX.length; i++) {
        victimX[i] -= 3;
        drawVictim(victimX[i], victimY[i]);
    }
}

function detectVictim() {
    if (victimX[0] < 150 && trackNumber[1] == 0) {
        if (int(victimY[0]) == 100 && trackNumber[0] == 1) {
            victimX.shift();
            victimY.shift();
        } else if (int(victimY[0]) == 200 && trackNumber[0] == 2) {
            victimX.shift();
            victimY.shift();
        }
    }
    if (victimX[0] < 70 && trackNumber[1] == 1) {
        victimX.shift();
        victimY.shift();
    }
}

function drawTrack(y1, y2) {
    line(0, y1 + 20, 800, y2 + 20);
    line(0, y1 - 20, 800, y2 - 20);
}

function drawVictim(x, y) {
    ellipse(x, y, 20, 20);
    rect(x - 10, y + 10, 20, 30);
}

function mousePressed() {
    trackNumber[1] = 1;
}

function mouseReleased() {
    if (trackNumber[0] == 1) {
        trackNumber[0] = 2;
    } else if (trackNumber[0] == 2) {
        trackNumber[0] = 1;
    }
    trackNumber[1] = 0;
}