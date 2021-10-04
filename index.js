// Read the input text file
var fs = require('fs')
, filename = "input.txt";

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    // Split data by line
    var lines = data.split("\n");

    // There should be at least 4 lines
    if (lines.length < 4) {
        console.log("Invalid input file. Please check again.");
        process.exit(1);
    }

    // Extract information

    // - driving instructions
    var navigation = Array.from(lines.pop());
    
    // check if all letters are within NSEW
    if (!/^([NSEW]*)$/.test(navigation.join(""))) {
        console.log("Invalid driving instructions. Please check again.");
        process.exit(1);
    }

    var room = lines.shift().split(" ").map((i) => Number(i));
    // check if room dimensions are valid
    if (hasNaN(room)) {
        console.log("Invalid room dimensions. Please check again.");
        process.exit(1);
    }

    var pos = lines.shift().split(" ").map((i) => Number(i));
    // check if hoover position is valid
    if (hasNaN(pos)) {
        console.log("Invalid hoover position. Please check again.");
        process.exit(1);
    }

    var dirts = Array();
    for (i in lines) {
        dirts.push(lines[i].split(" ").map((i) => Number(i)));
    }
    // check if dirt positions are valid.
    if (hasNaN(room)) {
        console.log("Invalid dirt positions. Please check again.");
        process.exit(1);
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
        // if the spot is dirty, clean the spot
        if (isDirty(dirts, [x, y])) {
            clean += 1;
            dirts = updateDirts(dirts, [x, y])
        }
    }

    // Outputs
    console.log(x, y);
    console.log(clean);
});

// Helper Methods ---------------------------------------------------

// Check if array has NaN element
function hasNaN(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (Number.isNaN(arr[i])) {
            return true;
        }
    }
    return false;
}

// Check if the spot is dirty
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