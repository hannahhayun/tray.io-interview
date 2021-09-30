// Helper Methods ---------------------------------------------------

// Find if the spot is dirty
function isDirty(dirts, search) {
    for (var i = 0, len = dirts.length; i < len; i++) {
        if (dirts[i][0] === search[0] && dirts[i][1] === search[1]) {
            return true;
        }
    }
    return false;
}

// Remove cleaned spot from dirts
function updateDirts(dirts, search) {
    for (var i = 0, len = dirts.length; i < len; i++) {
        if (dirts[i][0] === search[0] && dirts[i][1] === search[1]) {
            dirts.splice(i, 1);
            return dirts;
        }
    }
}

// ------------------------------------------------------------------

// Read the input text file
var fs = require('fs')
, filename = "input.txt";

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    // Split data by line
    var lines = data.split("\n");

    // Extract information
    var room = lines.shift().split(" ").map((i) => Number(i));
    var pos = lines.shift().split(" ").map((i) => Number(i));
    var navigation = Array.from(lines.pop());
    var dirts = Array();
    for (i in lines) {
        dirts.push(lines[i].split(" ").map((i) => Number(i)));
    }

    // Navigate and clean dirts
    var x = pos[0];
    var y = pos[1];
    var clean = 0;

    for (i in navigation) {
        if (navigation[i] === "N") {
            if (y < room[1]) {
                y += 1;
            }
        } else if (navigation[i] === "S") {
            if (y > 0) {
                y -= 1;
            }
        } else if (navigation[i] === "E") {
            if (x < room[0]) {
                x += 1;
            }
        } else if (navigation[i] === "W") {
            if (x > 0) {
                x -= 1;
            }
        }

        if (isDirty(dirts, [x, y])) {
            clean += 1;
            dirts = updateDirts(dirts, [x, y])
        }
    }

    // Outputs
    console.log(x, y);
    console.log(clean);
});