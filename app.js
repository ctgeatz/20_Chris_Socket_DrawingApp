/*
	Server - the lazy foreman

	The server doesn't do any drawing itself.  It just relays drawing messages
	between all the connected clients.
*/

var express = require("express");
var app = express()

var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

var portPath = process.env.PORT || 8080;
var server = app.listen(portPath);
var io = require("socket.io")(server);

io.on("connection", function (socket) {
	socket.on("player drew", function (color, thickness, p1, p2) {
		socket.broadcast.emit("other player drew", color, thickness, p1, p2);
	})

})

