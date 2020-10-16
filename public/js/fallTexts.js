'use strict';

const socketio = io();

let texts = new Array();

document.getElementById('message_form').addEventListener('submit', (e) => {
    socketio.emit('fallTexts_message', document.getElementById('input_msg').value);
    document.getElementById('input_msg').value = '';
    return e.preventDefault();
});

socketio.on('fallTexts_message', (msg) => {
    const element = document.createElement('li');
    element.appendChild(document.createTextNode(msg));
    // document.getElementById('messages').appendChild(element);
    print(msg);

    texts.push({ text: msg, x: random(width), time: new Date().getTime(), z: random(10) });
});

function setup() {
    const canvas = createCanvas(windowWidth - 15, windowHeight - 50);
    canvas.parent('canvas');
    background(255);
}

function draw() {
    update();

    display();
}

const update = () => {
    const time = new Date().getTime();
    const speed = document.getElementById('msg_speed').value;
    texts = texts.filter((value) => (time - value.time) / speed <= height + 100);
};

const display = () => {
    const time = new Date().getTime();
    const speed = document.getElementById('msg_speed').value;

    background(255);

    fill(0);
    textSize(32);
    textAlign(CENTER);
    texts.forEach((value) => {
        text(value.text, value.x, (time - value.time) / speed);
    });
};

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 50);
    background(0);
}