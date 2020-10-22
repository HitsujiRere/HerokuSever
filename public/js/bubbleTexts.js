'use strict';

const socketio = io();

let texts = new Array();

document.getElementById('message_form').addEventListener('submit', (e) => {
    socketio.emit('shareTexts_message', document.getElementById('input_msg').value);
    document.getElementById('input_msg').value = '';
    return e.preventDefault();
});

socketio.on('shareTexts_message', (msg) => {
    const element = document.createElement('li');
    element.appendChild(document.createTextNode(msg));
    // document.getElementById('messages').appendChild(element);
    print(msg);

    texts.push({ text: msg, x: random(width - textWidth(msg)), y: random(height - 32) });
});

function setup() {
    const canvas = createCanvas(windowWidth - 15, windowHeight - 35);
    canvas.parent('canvas');
    background(255);
}

function draw() {
    update();

    display();
}

const update = () => {
};

const display = () => {
    background(255);

    fill(0);
    strokeWeight(4);
    stroke(255);
    strokeJoin(ROUND);
    textSize(32);
    textAlign(LEFT, TOP);
    texts.forEach((value) => {
        text(value.text, value.x, value.y);
    });
};

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 35);
    background(0);
}