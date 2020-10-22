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

    texts.push({ text: msg, x: random(width - textWidth(msg)), time: new Date().getTime(), z: random(10) });
});

function setup() {
    const canvas = createCanvas(windowWidth - 15, windowHeight - 50);
    canvas.parent('canvas');
    background(255);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/shareTexts/getTexts", true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            JSON.parse(xhr.responseText).reverse().forEach((msg, index) => {
                texts.push({ text: msg, x: random(width - textWidth(msg)), time: new Date().getTime() - index * 500, z: random(10) });
            });
        }
    };
    xhr.send(null);
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
    strokeWeight(4);
    stroke(255);
    strokeJoin(ROUND);
    textSize(32);
    textAlign(LEFT, TOP);
    texts.forEach((value) => {
        text(value.text, value.x, (time - value.time) / speed);
    });
};

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 50);
    background(0);
}