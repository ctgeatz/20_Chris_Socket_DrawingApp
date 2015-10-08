/*

	Client-side Drawing Board

	p5 Hints
	========
	mouseIsPressed, mouseButton, LEFT, RIGHT
	http://p5js.org/reference/#/p5/mouseButton
*/
var socket = io();

function Marker (color, thickness) {
	this.color = color;
	this.thickness = thickness;
}

Marker.prototype.drawLine = function (p1, p2) {
	stroke(this.color.h, this.color.s, this.color.b)
	strokeWeight(this.thickness)
	line(p1.x, p1.y, p2.x, p2.y);
}

var color;
var marker;
var eraser;


function setup() {
	
	createCanvas(windowWidth, windowHeight);
	background(0);
	colorMode(HSB, 360, 100, 100);
	strokeWeight(10);
	strokeCap(ROUND);
	color = {
		h: random(0, 360),
		s: 100,
		b: 100
	}
	marker = new Marker(color, 10);
	eraser = new Marker({h:0, s:0, b:0}, 20);
};

function draw() {
	var p1 = {x: pmouseX, y: pmouseY}
	var p2 = {x: mouseX, y: mouseY}
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			marker.drawLine(p1, p2)
			socket.emit("player drew", marker.color, marker.thickness, p1, p2)
		}
		else if (mouseButton === RIGHT) {
			eraser.drawLine(p1, p2)
			socket.emit("player drew", eraser.color, eraser.thickness , p1, p2)

		}
	}
}

socket.on("other player drew", function (color, thickness, p1, p2) {
	var otherMarker = new Marker(color, thickness)
	otherMarker.drawLine(p1, p2);
});

