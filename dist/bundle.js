(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Board = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require("./Cell.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mod = function mod(x, n) {
    return (x % n + n) % n;
}; //modulo func for negative nbs;

var Board = exports.Board = function () {
    function Board(xCells, yCells) {
        var cellSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.gridSize;

        _classCallCheck(this, Board);

        window.board = this;
        window.board.xCells = xCells;
        window.board.yCells = yCells;
        window.board.cellSize = cellSize;

        window.cellsArray = Array(yCells).fill(0).map(function (line, yIndex) {
            return Array(xCells).fill(0).map(function (cell, xIndex) {
                return new _Cell.Cell(xIndex + 0.25 + Math.random() / 2, yIndex + 0.25 + Math.random() / 2, 0);
            });
        });
        window.cellsArray.forEach(function (line, y, linesArray) {
            line.forEach(function (cell, x, rowArray) {

                var neightbourhood = document.getElementById("NeighbourState").options[document.getElementById("NeighbourState").selectedIndex].value;

                switch (neightbourhood) {
                    case "Von Neumann":
                        {
                            cell.neighbours = cell.getSquareNeighbourhood(1).circularNeighbours.filter(function (nb) {
                                return Math.trunc(nb.x) === Math.trunc(cell.x) || Math.trunc(nb.y) === Math.trunc(cell.y);
                            });
                            if (cell.val > 0) cell.neighbours.forEach(function (nb) {
                                return nb.drawDot("#C0FF33");
                            });
                        }
                        break;
                    case "Moore":
                        cell.neighbours = cell.getSquareNeighbourhood(1).circularNeighbours;

                        break;
                    case "Pentagonalne":
                        var neighbours = cell.getSquareNeighbourhood(1).circularNeighbours;

                        var random = window.pentagon || Math.random() * 4 + 1;

                        neighbours = neighbours.filter(function (nb, i) {
                            var lottery = [i === 0 || i === 3 || i === 5 || i === 1 || i === 6, i === 2 || i === 4 || i === 7 || i === 1 || i === 6, i === 0 || i === 1 || i === 2 || i === 3 || i === 4, i === 5 || i === 6 || i === 7 || i === 3 || i === 4];
                            return lottery[Math.trunc(random) - 1];
                        });

                        cell.neighbours = neighbours;
                        break;
                    case "Heksagonalne":
                        {
                            var _neighbours = cell.getSquareNeighbourhood(1).circularNeighbours;
                            var dir = window.pentagon;

                            if (window.pentagon === null) {
                                dir = Math.trunc(Math.random() + 0.5) + 1;
                            }

                            if (dir === 1) {
                                _neighbours = _neighbours.filter(function (nb, i) {
                                    return i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6;
                                });
                            } else if (dir === 2) {
                                _neighbours = _neighbours.filter(function (nb, i) {
                                    return i === 0 || i === 1 || i === 3 || i === 4 || i === 6 || i === 7;
                                });
                            }
                            cell.neighbours = _neighbours;
                        }
                        break;
                    case "Promien":
                        {

                            var nbours = cell.getCircularNeighbourhood(window.radiusVal);

                            if (cell.val > 0) {
                                nbours.forEach(function (nb) {
                                    return nb.drawDot("#C0FF33");
                                });
                                cell.drawNeighbourhood(window.radiusVal, 1);
                            }

                            cell.neighbours = nbours;
                        }
                        break;
                }
            });
        });
    }

    _createClass(Board, [{
        key: "drawGrid",
        value: function drawGrid() {
            var _this = this;

            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.canvas.width;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.canvas.height;

            window.cellsArray.forEach(function (line, yCells) {
                var y = yCells * _this.cellSize;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            });

            window.cellsArray[0].forEach(function (column, xCells) {
                var x = xCells * _this.cellSize;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            });
            ctx.strokeStyle = 'grey';
            ctx.stroke();
        }
    }]);

    return Board;
}();
},{"./Cell.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mod = function mod(x, n) {
    return (x % n + n) % n;
}; //modulo func for negative nbs;

window.counter = 1;
window.max = Number.MIN_VALUE;
window.min = Number.MAX_VALUE;

var dK = function dK(cellA, cellB) {
    return cellA.val === cellB.val;
};

var probability = function probability(deltaE, kt) {
    if (deltaE <= 0) return 1;else Math.exp(-(deltaE / kt));
};

var Cell = exports.Cell = function () {
    function Cell(x, y, val) {
        _classCallCheck(this, Cell);

        this.x = x;
        this.y = y;
        this.val = val;
        this.neighbours = [];
        this.color = null;
        this.energy = null;
    }

    _createClass(Cell, [{
        key: "toString",
        value: function toString() {
            return this.val;
        }
    }, {
        key: "updateColor",
        value: function updateColor() {
            var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (this.val == 0) this.color = color || "#ffffff";else this.color = color || "hsl(" + this.val * 29 % 360 + ", 75%, 50%)";
        }
    }, {
        key: "click",
        value: function click() {
            this.val = window.counter++;
            this.updateColor();
            this.drawCell();
            return this;
        }
    }, {
        key: "getEnergy",
        value: function getEnergy() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.val;

            var energy = 0;

            this.neighbours.forEach(function (nb) {
                energy += 1 - dK({ "val": val }, nb);
            });
            var J = 1.0; //Energia granicy ziarna;
            energy *= J;

            if (energy > window.max) window.max = energy;
            if (energy < window.min) window.min = energy;

            return energy;
        }
    }, {
        key: "deltaEnergy",
        value: function deltaEnergy() {
            var eBefore = this.getEnergy();

            var newVal = this.neighbours[Math.trunc(Math.random() * this.neighbours.length)].val;

            var eAfter = this.getEnergy(newVal);

            return { "delta": eAfter - eBefore, "hisVal": newVal };
        }
    }, {
        key: "growMC",
        value: function growMC() {
            var dE = this.deltaEnergy();
            var p = probability(dE.delta, window.kt); //kt stała <0.1 -6>;
            if (p > Math.random()) return dE.hisVal;
            return this.val;
        }
    }, {
        key: "isInCircle",
        value: function isInCircle(cell, radius) {
            var dist = Math.sqrt(Math.pow(this.x - cell.x, 2) + Math.pow(this.y - cell.y, 2));
            if (dist < radius) {
                //Meet diameter
                if (dist > 0) return true;
            }
            return false;
        }
    }, {
        key: "getSquareNeighbourhood",
        value: function getSquareNeighbourhood(distance) {
            //param{distance} = a/2 (half of side)
            var circularNeighbours = [];
            var fakeIndexes = [];
            //console.log(window.cellsArray);
            for (var y = Math.trunc(this.y) - distance; y <= Math.trunc(this.y) + distance; y++) {
                //square neighbourhood (MAX indexes)
                for (var x = Math.trunc(this.x) - distance; x <= Math.trunc(this.x) + distance; x++) {
                    if (Math.trunc(this.y) === y && Math.trunc(this.x) === x) continue; //ignore itself
                    var cell = null;
                    try {
                        if (window.periodity) {
                            cell = window.cellsArray[mod(y, window.board.yCells)][mod(x, window.board.xCells)];
                        } else {
                            if (x >= 0 && x < window.board.xCells && y >= 0 && y < window.board.yCells) cell = window.cellsArray[y][x];
                        }

                        fakeIndexes.push({ "x": x, "y": y });
                    } catch (e) {
                        //console.info("neighbour not found probably peroidity off and cell beyond board");
                        //console.error(e);
                    }
                    if (cell) circularNeighbours.push(cell);
                }
            }
            return { circularNeighbours: circularNeighbours, fakeIndexes: fakeIndexes };
        } //getsSquare neighbourhood with distance of param{distance}

    }, {
        key: "drawSquareNeighbourhood",
        value: function drawSquareNeighbourhood(distance) {
            var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#ffdd00";

            this.getSquareNeighbourhood(distance).circularNeighbours.forEach(function (c) {
                return c.drawDot(color);
            });
        }
    }, {
        key: "getCircularNeighbourhood",
        value: function getCircularNeighbourhood(radius) {
            var _this = this;

            var circNeigbours = [];
            var potentialNeighbours = this.getSquareNeighbourhood(radius);

            if (window.periodity) {
                potentialNeighbours.fakeIndexes.forEach(function (val, index) {
                    var cell = potentialNeighbours.circularNeighbours[index];
                    var xShift = cell.x - Math.trunc(cell.x);
                    var yShift = cell.y - Math.trunc(cell.y);
                    if (_this.isInCircle({ "x": val.x + xShift, "y": val.y + yShift }, radius)) circNeigbours.push(cell);
                });
            } else {
                potentialNeighbours.circularNeighbours.forEach(function (cell) {
                    var xShift = cell.x - Math.trunc(cell.x);
                    var yShift = cell.y - Math.trunc(cell.y);
                    if (_this.isInCircle({ "x": cell.x + xShift, "y": cell.y + yShift }, radius)) circNeigbours.push(cell);
                });
            }

            return circNeigbours;
        }
    }, {
        key: "drawCircularNeighbourhood",
        value: function drawCircularNeighbourhood(diameter) {
            var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#fb8f00";

            this.getCircularNeighbourhood(diameter).forEach(function (e) {
                return e.drawDot(color);
            });
        }
    }, {
        key: "drawNeighbourhood",
        value: function drawNeighbourhood(radius) {
            var drawCircle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var color1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#aae5ff";
            var color2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "#0300fc";

            if (window.dots) this.drawSquareNeighbourhood(radius, color1);
            this.drawCircularNeighbourhood(radius, color2);
            var size = window.gridSize;
            var scaledRadius = radius * size;
            if (drawCircle) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.arc(this.x * size, this.y * size, scaledRadius, 0, 2 * Math.PI);
                ctx.stroke();

                if (window.periodity) {
                    var boardW = window.board.xCells * size;
                    var boardH = window.board.yCells * size;
                    for (var X = -boardW; X <= boardW; X += boardW) {
                        for (var Y = -boardH; Y <= boardH; Y += boardH) {
                            ctx.beginPath();
                            var pointX = this.x * size + X;
                            var pointY = this.y * size + Y;
                            ctx.arc(pointX, pointY, scaledRadius, 0, 2 * Math.PI);
                            ctx.stroke();
                        }
                    }
                } //teleportedCircles;)
            }
        }
    }, {
        key: "drawDot",
        value: function drawDot() {
            var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#ffffff";

            var size = window.gridSize;
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x * size, this.y * size, size / 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }, {
        key: "drawNumber",
        value: function drawNumber() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#3f3f3f";

            var numb = val || this.val;

            var size = window.gridSize;
            ctx.font = Math.round(size * 0.5).toString() + "px Arial";
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.fillText(numb.toString(), Math.trunc(this.x) * size + size / 2, Math.trunc(this.y) * size + size / 2);
        }
    }, {
        key: "drawEnergy",
        value: function drawEnergy() {
            this.energy = this.getEnergy();

            var size = window.gridSize;
            ctx.globalAlpha = 1;
            var scale = function scale(num, in_min, in_max, out_min, out_max) {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            };
            var brightness = scale(this.energy, window.min, window.max, 75, 100);

            ctx.fillStyle = "hsl(" + 0 + ", 75%, " + (100 - brightness) * 4 + "%)";
            ctx.fillRect(Math.trunc(this.x) * size, Math.trunc(this.y) * size, size, size);

            if (window.dots) this.drawDot();

            if (window.numbers) this.drawNumber(this.energy);
            ctx.restore();
            return this;
        }
    }, {
        key: "drawCell",
        value: function drawCell() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.gridSize;
            var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.ctx;

            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.fillRect(Math.trunc(this.x) * size, Math.trunc(this.y) * size, size, size);

            if (window.dots) this.drawDot();

            if (window.numbers) this.drawNumber();
            ctx.restore();
            return this;
        }
    }, {
        key: "nextTourValue",
        value: function nextTourValue() {
            var dominatingNeighbours = [];
            this.neighbours.forEach(function (i) {
                var value = i.val;
                if (value !== 0) dominatingNeighbours.push(value);
            });
            //console.log(dominatingNeighbours);

            //console.log(dominatingNeighbours);
            var val = dominatingNeighbours.reduce(function (a, b, i, arr) {
                return arr.filter(function (v) {
                    return v === a;
                }).length >= arr.filter(function (v) {
                    return v === b;
                }).length ? a : b;
            }, null);
            if (this.val > 0) return this.val;

            return val ? val : 0;
        }
    }]);

    return Cell;
}();
},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Cell = require("./Cell");

var _Board = require("./Board");

window.start = function () {
    console.log("START!!");
    window.xCells = document.getElementById("xCells").valueAsNumber;
    window.yCells = document.getElementById("yCells").valueAsNumber;
    window.yCount = document.getElementById("yCount").valueAsNumber;
    window.xCount = document.getElementById("xCount").valueAsNumber;
    window.gridSize = (window.innerWidth - 35) / xCells;
    window.canvas = document.getElementById("workingCanvas");
    window.ctx = canvas.getContext("2d");
    window.canvas.width = xCells * window.gridSize;
    window.canvas.height = yCells * window.gridSize;
    window.setPeroidity();
    window.setNumbers();
    window.setDots();
    window.generated = false;
    window.updatePentagon();
    window.speed = 1000 / document.getElementById("speedMultiplier").valueAsNumber;

    window.board = new _Board.Board(window.xCells, window.yCells, window.gridSize);
    window.initState();
    board.drawGrid();
};

window.setPeroidity = function () {
    window.periodity = document.getElementById("peroid").checked;
};

window.setNumbers = function () {
    document.getElementById("yCount").setAttribute("max", window.yCells);
    document.getElementById("xCount").setAttribute("max", window.xCells);
    window.numbers = document.getElementById("numbers").checked;
};

window.handleEnergyButton = function () {
    window.energyShow = document.getElementById('Energy').checked;

    window.cellsArray.forEach(function (line, y) {
        return line.forEach(function (cell, x) {
            if (window.energyShow === true) {
                window.cellsArray[y][x].drawEnergy();
            } else {
                window.cellsArray[y][x].updateColor();
                window.cellsArray[y][x].drawCell();
            }
        });
    });
};

window.handleIterations = function () {
    window.iterations = document.getElementById('iterations').valueAsNumber;
};

window.setDots = function () {
    window.dots = document.getElementById("dots").checked;
};

window.updateNeigbourhood = function () {
    resetCounter();
    start();
    document.getElementById('Pentagon').style.display = 'none';document.getElementById('pentagonP').innerHTML = '';
    document.getElementById('radius').style.display = 'none';document.getElementById('radiusP').innerHTML = '';
    if (document.getElementById('NeighbourState').options[document.getElementById('NeighbourState').selectedIndex].value == 'Pentagonalne') {
        document.getElementById('Pentagon').style.display = 'inline';
        document.getElementById('pentagonP').innerHTML = 'Pentagonalne:';
        document.getElementById('Gora').disabled = false;
        document.getElementById('Dol').disabled = false;
    } else if (document.getElementById('NeighbourState').options[document.getElementById('NeighbourState').selectedIndex].value == 'Heksagonalne') {
        document.getElementById('Gora').disabled = true;
        document.getElementById('Dol').disabled = true;
        document.getElementById('Pentagon').style.display = 'inline';
        document.getElementById('pentagonP').innerHTML = 'Pentagonalne:';
    } else if (document.getElementById('NeighbourState').options[document.getElementById('NeighbourState').selectedIndex].value == 'Promien') {
        document.getElementById('radius').style.display = 'inline';
        document.getElementById('radiusP').innerHTML = 'Promien:';
    }
};

window.updatePentagon = function () {
    switch (document.getElementById('Pentagon').options[document.getElementById('Pentagon').selectedIndex].value) {
        case "Losowe":
            window.pentagon = null;
            break;
        case "Lewe":
            window.pentagon = 1;
            break;
        case "Prawe":
            window.pentagon = 2;
            break;
        case "Góra":
            window.pentagon = 3;
            break;
        case "Dół":
            window.pentagon = 4;
            break;

    }
};

var game;

window.run = function () {
    if (!game && !generated) {
        game = setInterval(function () {
            var newVals = window.cellsArray.map(function (line, yIndex) {
                return line.map(function (cell, xIndex) {
                    return cell.nextTourValue();
                });
            });
            //console.log(newVals);
            var conti = false;
            window.cellsArray.forEach(function (line, y) {
                return line.forEach(function (cell, x) {
                    if (window.cellsArray[y][x].val !== newVals[y][x]) conti = true;
                    if (newVals[y][x] > 0 && window.cellsArray[y][x].val == 0) window.cellsArray[y][x].val = newVals[y][x];
                    if (window.energyShow === true) {
                        window.cellsArray[y][x].drawEnergy();
                    } else {
                        window.cellsArray[y][x].updateColor();
                        window.cellsArray[y][x].drawCell();
                    }
                });
            });
            if (conti === false) {
                window.generated = true;
                window.mcGrowth();
                clearInterval(game);
                game = null;
                document.getElementById("startBtn").textContent = "Start";
            }

            // board.drawGrid()
        }, 1000 / document.getElementById("speedMultiplier").valueAsNumber);
        document.getElementById("startBtn").textContent = "STOP";
    } else {
        window.mcGrowth();
        clearInterval(game);
        game = null;
        document.getElementById("startBtn").textContent = "Start";
    }
};

window.resetCounter = function () {
    window.counter = 1;
};

window.initState = function (i, j) {
    var type = document.getElementById("InitState").options[document.getElementById("InitState").selectedIndex].value;
    window.yCount = document.getElementById("yCount").valueAsNumber;
    window.xCount = document.getElementById("xCount").valueAsNumber;
    switch (type) {
        case "jednorodne":
            {
                document.getElementById("xCount").hidden = false;
                document.getElementById("yCount").hidden = false;
                document.getElementById("xPar").style.display = "inline";
                document.getElementById("yPar").style.display = "inline";
                document.getElementById("yPar").innerHTML = "yCount:";
                document.getElementById("xPar").innerHTML = "xCount:";
                var yC = window.yCount;
                var xC = window.xCount;
                var yL = window.cellsArray.length;
                var xL = window.cellsArray[0].length;
                var yParts = yL / (yC + 1);
                var xParts = xL / (xC + 1);
                for (var _i = 1; _i <= yC; _i++) {
                    for (var _j = 1; _j <= xC; _j++) {
                        window.cellsArray[Math.floor(yParts * _i)][Math.floor(xParts * _j)].click();
                    }
                }
                //console.log(window.cellsArray)
            }
            break;
        case "promien":
            {
                window.resetCounter();
                document.getElementById("xCount").hidden = false;
                document.getElementById("yCount").hidden = false;
                document.getElementById("xPar").style.display = "inline";
                document.getElementById("yPar").style.display = "inline";
                document.getElementById("yPar").innerHTML = "promień:";
                document.getElementById("xPar").innerHTML = "ilość:";
                document.getElementById("yCount").setAttribute("max", 9999);
                document.getElementById("xCount").setAttribute("max", 9999);

                var cells = [];
                var _j2 = 0;

                var _loop = function _loop(_i3) {
                    if (++_j2 > 100) {
                        alert("probably impossible");
                        return "break";
                        _i3 = xCount;
                        return {
                            v: void 0
                        };
                    } else {
                        var cell = window.cellsArray[Math.round(Math.random() * window.cellsArray.length) % window.cellsArray.length][Math.round(Math.random() * window.cellsArray[0].length) % window.cellsArray[0].length];
                        var val = true;
                        cells.forEach(function (circleCell) {
                            var dist = Math.sqrt(Math.pow(cell.x * window.gridSize - circleCell.x * window.gridSize, 2) + Math.pow(cell.y * window.gridSize - circleCell.y * window.gridSize, 2));

                            if (dist < yCount * window.gridSize) {
                                console.log(dist + "<" + yCount * window.gridSize / 2);
                                _i3--;
                                val = false;
                            } else {
                                ctx.beginPath();
                                ctx.moveTo(cell.x * window.gridSize, cell.y * window.gridSize);
                                ctx.lineTo(circleCell.x * window.gridSize, circleCell.y * window.gridSize);
                                ctx.stroke();
                            }
                        });
                        if (val) {
                            ctx.beginPath();
                            ctx.arc(cell.x * window.gridSize, cell.y * gridSize, yCount * gridSize, 0, 2 * Math.PI);
                            ctx.stroke();
                            cells.push(cell);
                        }
                    }
                    _i2 = _i3;
                };

                _loop2: for (var _i2 = 0; _i2 < xCount; ++_i2) {
                    var _ret = _loop(_i2);

                    switch (_ret) {
                        case "break":
                            break _loop2;

                        default:
                            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                }

                cells.forEach(function (cell) {
                    return cell.click();
                });
                document.getElementById("textBox").innerHTML = "Udało się wygenerować:" + cells.length;
            }
            break;
        case "losowe":
            {
                var count = window.yCount;
                document.getElementById("yCount").setAttribute("max", window.yCells * window.xCells - 1);
                document.getElementById("xCount").hidden = true;
                document.getElementById("yCount").hidden = false;

                document.getElementById("xPar").style.display = "none";
                document.getElementById("yPar").innerHTML = "ilość:";
                document.getElementById("yPar").style.display = "inline";
                var _i4 = 0;
                if (count >= window.xCells * window.yCells) {
                    alert("nice try;)");
                    break;
                }
                do {
                    var cell = window.cellsArray[Math.round(Math.random() * window.cellsArray.length) % window.cellsArray.length][Math.round(Math.random() * window.cellsArray[0].length) % window.cellsArray[0].length];
                    if (cell.val == 0) {
                        cell.click();
                        _i4++;
                    }
                } while (_i4 < count);
            }
            break;
        case "wyklinanie":
            {
                document.getElementById("xCount").hidden = true;
                document.getElementById("xPar").style.display = "none";
                document.getElementById("yCount").hidden = true;
                document.getElementById("yPar").style.display = "none";
                if (i != null && j != null) {
                    window.cellsArray[i][j].click();
                    console.log(window.cellsArray[i][j]);
                    //window.cellsArray[i][j].drawNeighbourhood(1);
                }
            }
    }

    window.cellsArray.forEach(function (l) {
        return l.forEach(function (c) {
            if (c.val > 0) {
                if (c.neighbours !== undefined) {
                    if (document.getElementById("NeighbourState").options[document.getElementById("NeighbourState").selectedIndex].value === "Promien") {
                        c.drawNeighbourhood(window.radiusVal, 1);
                    }
                    c.neighbours.forEach(function (n) {
                        return n.drawDot(c.color);
                    });
                }
            }
        });
    });
};

document.addEventListener("DOMContentLoaded", function () {
    start();
    document.getElementById("workingCanvas").addEventListener('click', function (event) {

        var xClickIndex = Math.floor(getCursorPosition(window.canvas, event)[0] / window.gridSize);
        var yClickIndex = Math.floor(getCursorPosition(window.canvas, event)[1] / window.gridSize);
        // console.log(`x:${xClickIndex} y:${yClickIndex}`);
        // console.log(window.cellsArray);
        if (document.getElementById("InitState").options[document.getElementById("InitState").selectedIndex].value == "wyklinanie") window.initState(yClickIndex, xClickIndex);
    }, false);

    document.getElementById("workingCanvas").addEventListener('contextmenu', function (event) {
        event.preventDefault();
        var xClickIndex = Math.floor(getCursorPosition(window.canvas, event)[0] / window.gridSize);
        var yClickIndex = Math.floor(getCursorPosition(window.canvas, event)[1] / window.gridSize);
        // console.log(`x:${xClickIndex} y:${yClickIndex}`);
        // console.log(window.cellsArray);

        console.log(window.cellsArray[yClickIndex][xClickIndex].getEnergy());
    }, false);

    document.getElementById("workingCanvas").addEventListener('auxclick', function (event) {
        event.preventDefault();
        var xClickIndex = Math.floor(getCursorPosition(window.canvas, event)[0] / window.gridSize);
        var yClickIndex = Math.floor(getCursorPosition(window.canvas, event)[1] / window.gridSize);
        // console.log(`x:${xClickIndex} y:${yClickIndex}`);
        // console.log(window.cellsArray);
        console.log(window.lcc = window.cellsArray[yClickIndex][xClickIndex]);
    }, false);
});

function getCursorPosition(canvas, event) {
    var x, y;

    var canoffset = canvas.getBoundingClientRect();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

    return [x, y];
}

window.mcGrowth = function () {
    var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.iterations;


    var max = Number.MIN_VALUE;
    var min = Number.MAX_VALUE;

    window.energyArray = new Array(window.board.yCells).fill(null).map(function () {
        return new Array(window.board.xCells).fill(null);
    });
    var cells = [];
    cellsArray.forEach(function (line, y) {
        return line.forEach(function (cell, x) {
            energyArray[y][x] = new _Cell.Cell(cell.x, cell.y, null);
            cells.push(cell);
        });
    });

    var _loop3 = function _loop3(i) {
        setTimeout(function () {
            console.log("ITERATION" + i);
            cells.sort(function () {
                return Math.random() - 0.5;
            });
            cells.forEach(function (cell) {
                var newVal = cell.growMC();
                if (newVal > max) max = newVal;
                if (newVal < min) min = newVal;

                cellsArray[Math.trunc(cell.y)][Math.trunc(cell.x)].val = newVal;
            });
            handleEnergyButton();
        }, 1000 / document.getElementById("speedMultiplier").valueAsNumber);
    };

    for (var i = 0; i < iterations; i++) {
        _loop3(i);
    }

    document.getElementById("startBtn").textContent = "START";
};
},{"./Board":1,"./Cell":2}]},{},[3]);
