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
It's funny, I swear. ( ͡° ͜ʖ ͡°)

*/
// all code goes below here ....

let speed = 3;
let gameState = 0;
let trackNumber = [1, 0];
let victimX, victimY, victimImg;
let rockX, rockY;
let wrenchX, wrenchY;
let score;
let life;
let victim1Img, victim2Img, victim3Img, trolleyImg, guy1Img, guy2Img, guy3Img, driftImg, bannerImg, rockImg, wrenchImg;

function preload() {
    victim1Img = loadImage("victim1.png");
    victim2Img = loadImage("victim2.png");
    victim3Img = loadImage("victim3.png");
    trolleyImg = loadImage("trolley.png");
    guy1Img = loadImage("guy1.png");
    guy2Img = loadImage("guy2.png");
    guy3Img = loadImage("guy3.png");
    driftImg = loadImage("drifting.png");
    bannerImg = loadImage("banner.png");
    rockImg = loadImage("rock.png");
    wrenchImg = loadImage("wrench.png");
}

function setup() {
    createCanvas(800, 500);
    victimX = [800];
    victimY = [360];
    victimImg = [1];
    rockX = [800];
    rockY = [460];
    wrenchX = [1000];
    wrenchY = [360 + 200 / 800 * 260];
    life = 1;
    score = 0;
}

function draw() {
    background(255);
    if (gameState == 0) { // start screen
        textAlign(CENTER);
        background(255);
        image(guy1Img, 300, 300, 700, 700);
        textSize(40);
        text("The Trolley Problem \n but The Intrusive Thoughts Took Over", 400, 150);
        textSize(20);
        text("Press Any Key to Start", 400, 400);
    } else if (gameState == 1) {
        if (trackNumber[1] == 1) { // drift 
            image(bannerImg, 0, 300, 800, 200);
        }
        drawTrack(100, 360);
        drawTrack(200, 460);

        gameFlow();
        detectVictim();
        detectRock();
        detectWrench();
        printScore();

        drawTrolley(); 
    }
    if (life == 0) { // game over
        textSize(40);
        textAlign(CENTER);
        text("Game Over", 400, 250);
        image(guy1Img, 300, 300, 700, 700);
        textSize(20);
        text("Press Any Key to Replay", 400, 400);
        gameState = 3;
    }
}


function drawTrolley() {
    if (trackNumber[0] == 1 && trackNumber[1] == 0) {
        image(trolleyImg, 0, 15, 250, 250 / 3 * 2);
        image(guy1Img, 600, 100, 100, 100);
    }
    if (trackNumber[0] == 2 && trackNumber[1] == 0) {
        image(trolleyImg, 0, 115, 250, 250 / 3 * 2);
        image(guy2Img, 600, 100, 100, 100);
    }
    if (trackNumber[1] == 1) {
        image(driftImg, 0, 50, 300, 280);
        image(guy3Img, 600, 100, 100, 100);
    }
}

function gameFlow() { 
    let x = random(0, 50); // generate victims
    if (x < 1) {
            victimX[victimX.length] = 800;
            victimY[victimY.length] = Math.random() < 0.5 ? 360 : 460;
            victimImg[victimImg.length] = random(0, 100);
    }
    for (let i = 0; i < victimX.length; i++) { // move all victims
        victimX[i] -= speed;
        victimY[i] -= speed / 800 * 260;
        drawVictim(victimX[i], victimY[i], victimImg[i]);
    }

    let y = random(0, 100); // generate rocks
    if (y < 1) {
        rockX[rockX.length] = 800;
        rockY[rockY.length] = Math.random() < 0.5 ? 360 : 460;
    }
    for (let i = 0; i < rockX.length; i++) { // move all rocks
        rockX[i] -= speed;
        rockY[i] -= speed / 800 * 260;
        drawRock(rockX[i], rockY[i]);
    }

    let z = random(0, 500); // generate wrenches
    if (z < 1) {
            wrenchX[wrenchX.length] = 800;
            wrenchY[wrenchY.length] = Math.random() < 0.5 ? 360 : 460;
    }
    for (let i = 0; i < wrenchX.length; i++) { // move all wrenches
        wrenchX[i] -= speed;
        wrenchY[i] -= speed / 800 * 260;
        drawWrench(wrenchX[i], wrenchY[i]);
    }
}

function detectVictim() {
    for (let i = 0; i < victimX.length; i++) { // normal
        if (victimX[i] > 40 && victimX[i] < 180) {
            if (victimY[i] < 190 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                victimX.splice(i, 1);
                victimY.splice(i, 1);
                victimImg.splice(i, 1);
                score++;
                speed++;
            } else if (victimY[i] > 200 && victimY[i] < 300 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                victimX.splice(i, 1);
                victimY.splice(i, 1);
                victimImg.splice(i, 1);
                score++;
                speed++;
            }
        }
        if (victimX[i] > 40 && victimX[i] < 200 && trackNumber[1] == 1) { // drift
            victimX.splice(i, 1);
            victimY.splice(i, 1);
            victimImg.splice(i, 1);
            score++;
            speed++;
        }
        if (victimX[i] < 0) {
            victimX.splice(i, 1);
            victimY.splice(i, 1);
            victimImg.splice(i, 1);
        }
    }
}

function detectRock() {
    for (let i = 0; i < rockX.length; i++) { // normal
        if (rockX[i] > 40 && rockX[i] < 180) {
            if (rockY[i] < 180 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                rockX.splice(i, 1);
                rockY.splice(i, 1);
                score--;
                life--;
            } else if (rockY[i] > 200 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                rockX.splice(i, 1);
                rockY.splice(i, 1);
                score--;
                life--;
            }
        }
        if (rockX[i] > 40 && rockX[i] < 200 && trackNumber[1] == 1) { // drift
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
        if (wrenchX[i] > 40 && wrenchX[i] < 180) {
            if (wrenchY[i] < 200 && trackNumber[0] == 1 && trackNumber[1] == 0) {
                wrenchX.splice(i, 1);
                wrenchY.splice(i, 1);
                score++;
                speed++;
                life++;
            } else if (wrenchY[i] > 200 && wrenchY < 300 && trackNumber[0] == 2 && trackNumber[1] == 0) {
                wrenchX.splice(i, 1);
                wrenchY.splice(i, 1);
                score++;
                speed++;
                life++;
            }
        }
        if (wrenchX[i] > 40 && wrenchX[i] < 200 && trackNumber[1] == 1) { // drift
            wrenchX.splice(i, 1);
            wrenchY.splice(i, 1);
            score++;
            speed++;
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
    textAlign(LEFT);
    text("Score: " + score, 10, 20);
    text("Life: " + life, 10, 40);
}

function drawTrack(y1, y2) {
    line(0, y1 + 20, 800, y2 + 20);
    line(0, y1 - 20, 800, y2 - 20);
}

function drawVictim(x, y, p) {
    if (p < 33) {
        image(victim1Img, x, y, 70, 70);
    } else if (p < 66 & p > 33) {
        image(victim2Img, x, y, 70, 70);
    } else {
        image(victim3Img, x, y, 70, 70);
    }
}

function drawRock(x, y) {
    image(rockImg, x, y - 5, 50, 50);
}

function drawWrench(x, y) {
    image(wrenchImg, x, y, 50, 50);
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

function keyPressed() {
    gameState = 1;
    victimX = [800];
    victimY = [360];
    victimImg = [1];
    rockX = [800];
    rockY = [460];
    wrenchX = [1000];
    wrenchY = [360 + 200 / 800 * 260];
    life = 1;
    score = 0;
    speed = 3;
}