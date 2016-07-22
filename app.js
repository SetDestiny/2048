var createMatrix = function(rows, columns) {
    var arr = new Array();
    arr.rows = rows;
    arr.columns = columns;

    for (var i = 0; i < columns; i++) {
        arr[i] = new Array();
        for (var j = 0; j < rows; j++) {
            arr[i][j] = "empty";
        }
    }
    return arr;
}

var Point = function() {
    return {
        setCords: function(x, y) {
            this.x = x;
            this.y = y;
        }
    };
}

var Counter = function() {
    return {
        reset: function() {
            this.counter = 0;
        },
        increment: function() {
            this.counter++;
        }
    };
}

var clearMatrix = function(arr) {
    for (var i = 0; i < field.columns; i++) {
        for (var j = 0; j < field.rows; j++) {
            arr[i][j] = "empty";
        }
    }
}

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var showField = function(arr) {
    document.getElementById("moveCount").innerHTML = "<p>Moves count:" + moveCount.counter + "</p>";
    document.getElementById("field").innerHTML = "";
    for (var i = 0; i < arr.columns; i++) {
        for (var j = 0; j < arr.rows; j++) {
            document.getElementById("field").innerHTML += "<img src=\"images/" + arr[i][j] + ".jpg\" style=\"width:200px;height:200px;\">";
        }
        document.getElementById("field").innerHTML += "<br />";
    }
}

var restartGame = function() {
    matrix = startGame();
    moveCount.reset();
    showField(matrix);
}

var startGame = function() {
    var matrix = createMatrix(4, 4);
    clearMatrix(matrix);

    var x = getRandomInt(0, 4);
    var y = getRandomInt(0, 4);
    matrix[getRandomInt(0, 4)][getRandomInt(0, 4)] = 2;

    if (matrix[x][y] === "empty") {
        if (x <= 1) {
            matrix[x][y] = 4;
        } else {
            matrix[x][y] = 2;
        }
    } else {
        startGame(matrix);
    }
    return matrix;
}

var copyArr = function(arr) {
    var copyArr = new Array();
    copyArr.rows = arr.rows;
    copyArr.columns = arr.columns;

    for (var i = 0; i < copyArr.columns; i++) {
        copyArr[i] = new Array();
        for (var j = 0; j < copyArr.rows; j++) {
            copyArr[i][j] = arr[i][j];
        }
    }
    return copyArr;
}

var checkLose = function(arr) {
    var copy = copyArr(arr);

    if (moveUp(copy) !== true) {
        if (moveDown(copy) !== true) {
            if (moveRight(copy) !== true) {
                if (moveLeft(copy) !== true) {
                    alert("You lose!");
                }
            }
        }
    }
}

var addTwo = function(arr) {
    var x = getRandomInt(0, 4);
    var y = getRandomInt(0, 4);

    if (arr[x][y] === "empty") {
        arr[x][y] = 2;
    } else {
        try {
            addTwo(arr);
        } catch (err) {
            alert("Stack overflow!");
        }
    }
}

var moveUp = function(field) {
    var action = false;
    var prevCord = null;

    for (var i = 0; i < field.rows; i++) {
        for (var j = 0; j < field.columns; j++) {
            if (field[j][i] === "empty") {
                if (prevCord === null) {
                    prevCord = new Point();
                    prevCord.setCords(j, i);
                }
            } else {
                if (prevCord !== null) {
                    if (field[prevCord.x][prevCord.y] !== "empty") {
                        if (field[prevCord.x][prevCord.y] === field[j][i]) {
                            field[prevCord.x][prevCord.y] += field[j][i];
                            field[j][i] = "empty";
                            prevCord.setCords(prevCord.x + 1, prevCord.y);
                            action = true;
                        } else {
                            prevCord.setCords(prevCord.x + 1, prevCord.y);
                            field[prevCord.x][prevCord.y] = field[j][i];
                            if (prevCord.x !== j) {
                                field[j][i] = "empty";
                                action = true;
                            }
                        }
                    } else {
                        field[prevCord.x][prevCord.y] = field[j][i];
                        field[j][i] = "empty";
                        action = true;
                    }
                } else {
                    prevCord = new Point();
                    prevCord.setCords(j, i);
                }
            }
        }
        prevCord = null;
    }
    return action;
}

var moveDown = function(field) {
    var action = false;
    var prevCord = null;

    for (var i = 0; i < field.rows; i++) {
        for (var j = field.columns - 1; j >= 0; j--) {
            if (field[j][i] === "empty") {
                if (prevCord === null) {
                    prevCord = new Point();
                    prevCord.setCords(j, i);
                }
            } else {
                if (prevCord !== null) {
                    if (field[prevCord.x][prevCord.y] !== "empty") {
                        if (field[prevCord.x][prevCord.y] === field[j][i]) {
                            field[prevCord.x][prevCord.y] += field[j][i];
                            field[j][i] = "empty";
                            prevCord.setCords(prevCord.x - 1, prevCord.y);
                            action = true;
                        } else {
                            prevCord.setCords(prevCord.x - 1, prevCord.y);
                            field[prevCord.x][prevCord.y] = field[j][i];
                            if (prevCord.x !== j) {
                                field[j][i] = "empty";
                                action = true;
                            }
                        }
                    } else {
                        field[prevCord.x][prevCord.y] = field[j][i];
                        field[j][i] = "empty";
                        action = true;
                    }
                } else {
                    prevCord = new Point();
                    prevCord.setCords(j, i);
                }
            }
        }
        prevCord = null;
    }
    return action;
}

var moveRight = function(field) {
    var action = false;
    var prevCord = null;

    for (var i = 0; i < field.columns; i++) {
        for (var j = field.rows - 1; j >= 0; j--) {
            if (field[i][j] === "empty") {
                if (prevCord === null) {
                    prevCord = new Point();
                    prevCord.setCords(i, j);
                }
            } else {
                if (prevCord !== null) {
                    if (field[prevCord.x][prevCord.y] !== "empty") {
                        if (field[prevCord.x][prevCord.y] === field[i][j]) {
                            field[prevCord.x][prevCord.y] += field[i][j];
                            field[i][j] = "empty";
                            prevCord.setCords(prevCord.x, prevCord.y - 1);
                            action = true;
                        } else {
                            prevCord.setCords(prevCord.x, prevCord.y - 1);
                            field[prevCord.x][prevCord.y] = field[i][j];
                            if (prevCord.y !== j) {
                                field[i][j] = "empty";
                                action = true;
                            }
                        }
                    } else {
                        field[prevCord.x][prevCord.y] = field[i][j];
                        field[i][j] = "empty";
                        action = true;
                    }
                } else {
                    prevCord = new Point();
                    prevCord.setCords(i, j);
                }
            }

        }
        prevCord = null;
    }
    return action;
}

var moveLeft = function(field) {
    var action = false;
    var prevCord = null;

    for (var i = 0; i < field.columns; i++) {
        for (var j = 0; j < field.rows; j++) {
            if (field[i][j] === "empty") {
                if (prevCord === null) {
                    prevCord = new Point();
                    prevCord.setCords(i, j);
                }
            } else {
                if (prevCord !== null) {
                    if (field[prevCord.x][prevCord.y] !== "empty") {
                        if (field[prevCord.x][prevCord.y] === field[i][j]) {
                            field[prevCord.x][prevCord.y] += field[i][j];
                            field[i][j] = "empty";
                            prevCord.setCords(prevCord.x, prevCord.y + 1);
                            action = true;
                        } else {
                            prevCord.setCords(prevCord.x, prevCord.y + 1);
                            field[prevCord.x][prevCord.y] = field[i][j];
                            if (prevCord.y !== j) {
                                field[i][j] = "empty";
                                action = true;
                            }
                        }
                    } else {
                        field[prevCord.x][prevCord.y] = field[i][j];
                        field[i][j] = "empty";
                        action = true;
                    }
                } else {
                    prevCord = new Point();
                    prevCord.setCords(i, j);
                }
            }
        }
        prevCord = null;
    }
    return action;
}


document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);

    switch (charStr) {
        case "w":
            if (moveUp(matrix) === true) {
                showField(matrix);
                addTwo(matrix);
                moveCount.increment();
            }
            setTimeout(showField, 150, matrix);
            checkLose(matrix);
            break;

        case "d":
            if (moveRight(matrix) === true) {
                showField(matrix);
                addTwo(matrix);
                moveCount.increment();
            }
            setTimeout(showField, 150, matrix);
            checkLose(matrix);
            break;

        case "s":
            if (moveDown(matrix) === true) {
                showField(matrix);
                addTwo(matrix);
                moveCount.increment();
            }
            setTimeout(showField, 150, matrix);
            checkLose(matrix);
            break;

        case "a":
            if (moveLeft(matrix) === true) {
                showField(matrix);
                addTwo(matrix);
                moveCount.increment();
            }
            setTimeout(showField, 150, matrix);
            checkLose(matrix);
            break;
    }
};

var matrix = null;
var moveCount = new Counter();
moveCount.reset();
window.onload = function() {
    matrix = startGame();
    showField(matrix);
}
