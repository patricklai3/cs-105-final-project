// README
/*
<project>
Patrick Lai
p9lai

INSTRUCTIONS
Use mouse clicks and press to switch tracks and drift. 
Avoid rocks and collect victims and wrenches. 
Score is displayed in the top left corner. 
Game ends when life reaches 0.


VIDEO
<paste video URL here>


RELEASE
I Patrick Lai grant permission to CS105 course staff to use
my Final Project program and video for the purpose of promoting CS105.

BASIC CONCEPTS
drawing shapes and using drawing attributes (e.g. fill, stroke, lineCap, ...)
conditionals
user-defined functions
loops
arrays
mouse or keyboard interaction

EXTENDED CONCEPTS
loading and displaying images
image processing
sound or video

CODING QUALITY AND VISUAL DESIGN
It's funny, 


*/
// all code goes below here ....

const speed = 3;
let trackNumber = [1, 0];
let victimX, victimY;
let rockX, rockY;
let wrenchX, wrenchY;
let score = 0;
let life = 3;
let victim1Img, victim2Img, victim3Img, trolleyImg, guy1Img, guy2Img, guy3Img, driftImg, bannerImg;

function preload() {
    victim1Img = loadImage("victim1.png");
    victim2Img = loadImage("victim2.png");
    victim3Img = loadImage("victim3.png");
    trolleyImg = loadImage("trolley.png");
    guy1Img = loadImage("guy1.png");
    guy2Img = loadImage("guy2.png");
    guy3Img = loadImage("guy3.png");
    driftImg = loadImage("drift.png");
    bannerImg = loadImage("banner.png");
}

function setup() {
    createCanvas(800, 300);
    victimX = [800];
    victimY = [100];
    rockX = [800];
    rockY = [200];
    wrenchX = [1000];
    wrenchY = [100];
}

function draw() {
    background(255);

    if (life == 100) {
        textSize(40);
        text("Game Over", 300, 150);
    } else {
        drawTrack(100, 100);
        drawTrack(200, 200);

        gameFlow();
        detectVictim();
        detectRock();
        detectWrench();
        printScore();

        train(); 
    }
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

function gameFlow() { 
    let x = random(0, 100); // generate victims
    if (x < 1) { // 1% chance & not too close to the next rock
        if (victimX[victimX.length - 1] > 800 - 50) {
            victimX[victimX.length] = victimX[victimX.length - 1] + 50;
            victimY[victimY.length] = Math.random() < 0.5 ? 100 : 200;
        } else if (rockX[rockX.length - 1] > 800 - 100) {
            victimX[victimX.length] = rockX[rockX.length - 1] + 50;
            victimY[victimY.length] = Math.random() < 0.5 ? 100 : 200;
        } else {
            victimX[victimX.length] = 800;
            victimY[victimY.length] = Math.random() < 0.5 ? 100 : 200;
        }
    }
    for (let i = 0; i < victimX.length; i++) { // move all victims
        victimX[i] -= speed;
        drawVictim(victimX[i], victimY[i]);
    }

    let y = random(0, 200); // generate rocks
    if (y < 1) { // 0.2% chance & not too close to the next rock
        if (victimX[victimX.length - 1] > 800 - 100) {
            rockX[rockX.length] = victimX[victimX.length - 1] + 100;
            rockY[rockY.length] = Math.random() < 0.5 ? 100 : 200;
        } else if (rockX[rockX.length - 1] > 800 - 200) {
            rockX[rockX.length] = rockX[rockX.length - 1] + 200;
            rockY[rockY.length] = Math.random() < 0.5 ? 100 : 200;
        } else {
            rockX[rockX.length] = 800;
            rockY[rockY.length] = Math.random() < 0.5 ? 100 : 200;
        }
    }
    for (let i = 0; i < rockX.length; i++) { // move all rocks
        rockX[i] -= speed;
        drawRock(rockX[i], rockY[i]);
    }

    let z = random(0, 2000); // generate wrenches
    if (z < 1) { // 0.1% chance & not too close to the next rock
       if (victimX[victimX.length - 1] > 800 - 50) {
            wrenchX[wrenchX.length] = wrenchX[wrenchX.length - 1] + 2000;
            wrenchY[wrenchY.length] = Math.random() < 0.5 ? 100 : 200;
        } else if (rockX[rockX.length - 1] > 800 - 100) {
            wrenchX[wrenchX.length] = rockX[rockX.length - 1] + 2000;
            wrenchY[wrenchY.length] = Math.random() < 0.5 ? 100 : 200;
        } else {
            wrenchX[wrenchX.length] = 800;
            wrenchY[wrenchY.length] = Math.random() < 0.5 ? 100 : 200;
        }
    }
    for (let i = 0; i < wrenchX.length; i++) { // move all wrenches
        wrenchX[i] -= speed;
        drawWrench(wrenchX[i], wrenchY[i]);
    }

}

function detectVictim() {
    for (let i = 0; i < victimX.length; i++) { // normal
        if (victimX[i] > 30 && victimX[i] < 150) {
            if (victimY[i] == 100 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                victimX.splice(i, 1);
                victimY.splice(i, 1);
                score++;
            } else if (victimY[i] == 200 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                victimX.splice(i, 1);
                victimY.splice(i, 1);
                score++;
            }
        }
        if (victimX[i] > 30 && victimX[i] < 90 && trackNumber[1] == 1) { // drift
            victimX.splice(i, 1);
            victimY.splice(i, 1);
            score++;
        }
        if (victimX[i] < 0) {
            victimX.splice(i, 1);
            victimY.splice(i, 1);
        }
    }
}

function detectRock() {
    for (let i = 0; i < rockX.length; i++) { // normal
        if (rockX[i] > 30 && rockX[i] < 150) {
            if (rockY[i] == 100 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                rockX.splice(i, 1);
                rockY.splice(i, 1);
                score--;
                life--;
            } else if (rockY[i] == 200 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                rockX.splice(i, 1);
                rockY.splice(i, 1);
                score--;
                life--;
            }
        }
        if (rockX[i] > 30 && rockX[i] < 90 && trackNumber[1] == 1) { // drift
            rockX.splice(i, 1);
            rockY.splice(i, 1);
            score--;
            life--;
        }
        if (rockX[i] < 0) {
            rockX.splice(i, 1);
            rockY.splice(i, 1);
        }
    }
}

function detectWrench() {
    for (let i = 0; i < wrenchX.length; i++) { // normal
        if (wrenchX[i] > 30 && wrenchX[i] < 150) {
            if (wrenchY[i] == 100 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                wrenchX.splice(i, 1);
                wrenchY.splice(i, 1);
                score++;
                life++;
            } else if (wrenchY[i] == 200 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                wrenchX.splice(i, 1);
                wrenchY.splice(i, 1);
                score++;
                life++;
            }
        }
        if (wrenchX[i] > 30 && wrenchX[i] < 90 && trackNumber[1] == 1) { // drift
            wrenchX.splice(i, 1);
            wrenchY.splice(i, 1);
            score++;
            life++;
        }
        if (wrenchX[i] < 0) {
            wrenchX.splice(i, 1);
            wrenchY.splice(i, 1);
        }
    }
}

function printScore() {
    textSize(20);
    text("Score: " + score, 10, 20);
    text("Life: " + life, 10, 40);
}

function drawTrack(y1, y2) {
    line(0, y1 + 20, 800, y2 + 20);
    line(0, y1 - 20, 800, y2 - 20);
}

function drawVictim(x, y) {
    ellipse(x, y, 20, 20);
    rect(x - 10, y + 10, 20, 30);
}

function drawRock(x, y) {
    circle(x, y, 50);
}

function drawWrench(x, y) {
    rect(x, y, 50, 10);
    rect(x + 40, y - 5, 10, 20);
}

function mousePressed() {
    trackNumber[1] = 1; // drift
}

function mouseReleased() {
    if (trackNumber[0] == 1) { // switch track
        trackNumber[0] = 2;
    } else if (trackNumber[0] == 2) {
        trackNumber[0] = 1;
    }
    trackNumber[1] = 0; // reset
}