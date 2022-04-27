!function r(e, n, t) {
    function o(i, f) {
        if (!n[i]) {
            if (!e[i]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var p = n[i] = {exports: {}};
            e[i][0].call(p.exports, (function (r) {
                return o(e[i][1][r] || r)
            }), p, p.exports, r, e, n, t)
        }
        return n[i].exports
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
}({
    1: [function (require, module, exports) {
        module.exports = {
            themes: [{
                id: "default",
                variables: {
                    bgColor: {h: 0, s: 0, l: 6, minOpacity: 0},
                    textColor: {h: 0, s: 0, l: 100},
                    averageColor: {h: 220, s: 60, l: 70},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 50, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 30, s: 80, l: 60},
                    incsDanger: {h: 10, s: 80, l: 60},
                    pitFill: {h: 0, s: 0, l: 20},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "light",
                variables: {
                    bgColor: {h: 0, s: 0, l: 90, minOpacity: 0},
                    textColor: {h: 0, s: 0, l: 24},
                    averageColor: {h: 220, s: 60, l: 60},
                    qualyColor: {h: 300, s: 50, l: 60},
                    lastColor: {h: 50, s: 70, l: 50},
                    customColor: {h: 120, s: 50, l: 60},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 30, s: 80, l: 50},
                    incsDanger: {h: 10, s: 80, l: 50},
                    pitFill: {h: 0, s: 0, l: 20},
                    pitWindowOpenFill: {h: 140, s: 70, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 50}
                }
            }, {
                id: "red",
                variables: {
                    bgColor: {h: 0, s: 80, l: 53, minOpacity: 0},
                    textColor: {h: 0, s: 80, l: 96},
                    averageColor: {h: 190, s: 60, l: 70},
                    qualyColor: {h: 300, s: 80, l: 80},
                    lastColor: {h: 50, s: 100, l: 80},
                    customColor: {h: 120, s: 50, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 60},
                    incsDanger: {h: 190, s: 100, l: 70},
                    pitFill: {h: 0, s: 80, l: 40},
                    pitWindowOpenFill: {h: 140, s: 80, l: 60},
                    pitTwoLapsLeftFill: {h: 60, s: 80, l: 60},
                    pitOneLapLeftFill: {h: 190, s: 90, l: 70}
                }
            }, {
                id: "coral",
                variables: {
                    bgColor: {h: 16, s: 80, l: 52, minOpacity: 0},
                    textColor: {h: 16, s: 100, l: 96},
                    averageColor: {h: 190, s: 100, l: 70},
                    qualyColor: {h: 300, s: 90, l: 80},
                    lastColor: {h: 50, s: 90, l: 70},
                    customColor: {h: 120, s: 70, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 70},
                    incsDanger: {h: 190, s: 100, l: 70},
                    pitFill: {h: 16, s: 50, l: 40},
                    pitWindowOpenFill: {h: 140, s: 80, l: 60},
                    pitTwoLapsLeftFill: {h: 60, s: 80, l: 50},
                    pitOneLapLeftFill: {h: 190, s: 100, l: 70}
                }
            }, {
                id: "orange",
                variables: {
                    bgColor: {h: 33, s: 80, l: 52, minOpacity: 0},
                    textColor: {h: 33, s: 100, l: 96},
                    averageColor: {h: 190, s: 100, l: 70},
                    qualyColor: {h: 300, s: 90, l: 80},
                    lastColor: {h: 50, s: 100, l: 70},
                    customColor: {h: 120, s: 80, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 70},
                    incsDanger: {h: 180, s: 90, l: 60},
                    pitFill: {h: 33, s: 50, l: 40},
                    pitWindowOpenFill: {h: 140, s: 100, l: 60},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 70},
                    pitOneLapLeftFill: {h: 10, s: 100, l: 60}
                }
            }, {
                id: "lemon",
                variables: {
                    bgColor: {h: 54, s: 90, l: 48, minOpacity: 0},
                    textColor: {h: 54, s: 100, l: 96},
                    averageColor: {h: 220, s: 60, l: 70},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 80, l: 40},
                    customColor: {h: 120, s: 50, l: 50},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 200, s: 100, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 54, s: 50, l: 60},
                    pitWindowOpenFill: {h: 140, s: 70, l: 50},
                    pitTwoLapsLeftFill: {h: 200, s: 80, l: 70},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "lime",
                variables: {
                    bgColor: {h: 75, s: 90, l: 48, minOpacity: 0},
                    textColor: {h: 75, s: 100, l: 96},
                    averageColor: {h: 220, s: 60, l: 60},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 70, l: 40},
                    customColor: {h: 120, s: 60, l: 40},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 200, s: 100, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 75, s: 50, l: 60},
                    pitWindowOpenFill: {h: 140, s: 70, l: 50},
                    pitTwoLapsLeftFill: {h: 200, s: 90, l: 60},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "apple",
                variables: {
                    bgColor: {h: 110, s: 90, l: 48, minOpacity: 0},
                    textColor: {h: 110, s: 100, l: 96},
                    averageColor: {h: 220, s: 60, l: 60},
                    qualyColor: {h: 300, s: 60, l: 65},
                    lastColor: {h: 50, s: 50, l: 40},
                    customColor: {h: 120, s: 60, l: 35},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 210, s: 100, l: 50},
                    incsDanger: {h: 10, s: 70, l: 60},
                    pitFill: {h: 110, s: 50, l: 50},
                    pitWindowOpenFill: {h: 60, s: 100, l: 50},
                    pitTwoLapsLeftFill: {h: 200, s: 100, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 100, l: 70}
                }
            }, {
                id: "aquamarine",
                variables: {
                    bgColor: {h: 160, s: 80, l: 48, minOpacity: 0},
                    textColor: {h: 160, s: 100, l: 96},
                    averageColor: {h: 220, s: 60, l: 60},
                    qualyColor: {h: 300, s: 50, l: 60},
                    lastColor: {h: 50, s: 80, l: 40},
                    customColor: {h: 120, s: 60, l: 40},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 210, s: 100, l: 50},
                    incsDanger: {h: 10, s: 100, l: 80},
                    pitFill: {h: 160, s: 50, l: 50},
                    pitWindowOpenFill: {h: 290, s: 50, l: 65},
                    pitTwoLapsLeftFill: {h: 200, s: 100, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "aqua",
                variables: {
                    bgColor: {h: 180, s: 80, l: 48, minOpacity: 0},
                    textColor: {h: 180, s: 100, l: 96},
                    averageColor: {h: 220, s: 60, l: 50},
                    qualyColor: {h: 300, s: 40, l: 60},
                    lastColor: {h: 50, s: 80, l: 40},
                    customColor: {h: 120, s: 50, l: 40},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 100, l: 70},
                    incsDanger: {h: 180, s: 100, l: 70},
                    pitFill: {h: 180, s: 50, l: 50},
                    pitWindowOpenFill: {h: 140, s: 100, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 80, l: 60},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "blue-eyes",
                variables: {
                    bgColor: {h: 210, s: 100, l: 36, minOpacity: 0},
                    textColor: {h: 210, s: 100, l: 96},
                    averageColor: {h: 190, s: 90, l: 60},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 140, s: 70, l: 60},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 90, l: 60},
                    incsDanger: {h: 180, s: 80, l: 70},
                    pitFill: {h: 210, s: 50, l: 50},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 20, s: 70, l: 60}
                }
            }, {
                id: "deep-ocean",
                variables: {
                    bgColor: {h: 240, s: 60, l: 40, minOpacity: 0},
                    textColor: {h: 240, s: 100, l: 96},
                    averageColor: {h: 190, s: 90, l: 60},
                    qualyColor: {h: 300, s: 70, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 140, s: 70, l: 50},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 240, s: 50, l: 60},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "violet-blue",
                variables: {
                    bgColor: {h: 270, s: 80, l: 56, minOpacity: 0},
                    textColor: {h: 270, s: 100, l: 96},
                    averageColor: {h: 190, s: 70, l: 70},
                    qualyColor: {h: 300, s: 100, l: 75},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 60, l: 60},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 80},
                    pitFill: {h: 270, s: 50, l: 50},
                    pitWindowOpenFill: {h: 120, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 20, s: 80, l: 60}
                }
            }, {
                id: "violet-dark",
                variables: {
                    bgColor: {h: 280, s: 80, l: 56, minOpacity: 0},
                    textColor: {h: 280, s: 100, l: 96},
                    averageColor: {h: 180, s: 80, l: 60},
                    qualyColor: {h: 0, s: 100, l: 80},
                    lastColor: {h: 50, s: 90, l: 50},
                    customColor: {h: 120, s: 80, l: 60},
                    customIncreaseHoverColor: {h: 120, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 180, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 80},
                    pitFill: {h: 280, s: 50, l: 50},
                    pitWindowOpenFill: {h: 120, s: 80, l: 60},
                    pitTwoLapsLeftFill: {h: 50, s: 90, l: 50},
                    pitOneLapLeftFill: {h: 0, s: 100, l: 80}
                }
            }, {
                id: "violet",
                variables: {
                    bgColor: {h: 300, s: 80, l: 56, minOpacity: 0},
                    textColor: {h: 300, s: 100, l: 96},
                    averageColor: {h: 190, s: 100, l: 70},
                    qualyColor: {h: 300, s: 100, l: 80},
                    lastColor: {h: 50, s: 90, l: 50},
                    customColor: {h: 120, s: 80, l: 60},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 50},
                    incsDanger: {h: 190, s: 100, l: 80},
                    pitFill: {h: 300, s: 50, l: 50},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 210, s: 100, l: 75}
                }
            }, {
                id: "rose",
                variables: {
                    bgColor: {h: 330, s: 80, l: 56, minOpacity: 0},
                    textColor: {h: 330, s: 100, l: 96},
                    averageColor: {h: 190, s: 90, l: 70},
                    qualyColor: {h: 300, s: 80, l: 80},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 70, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 60, s: 90, l: 50},
                    incsDanger: {h: 190, s: 100, l: 80},
                    pitFill: {h: 330, s: 50, l: 50},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 190, s: 90, l: 60}
                }
            }, {
                id: "monokai",
                variables: {
                    bgColor: {h: 70, s: 8, l: 20, minOpacity: 0},
                    textColor: {h: 0, s: 0, l: 100},
                    averageColor: {h: 220, s: 60, l: 70},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 50, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 70, s: 10, l: 40},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "solarized-light",
                variables: {
                    bgColor: {h: 44, s: 87, l: 88, minOpacity: 0},
                    textColor: {h: 195, s: 15, l: 45},
                    averageColor: {h: 220, s: 60, l: 66},
                    qualyColor: {h: 300, s: 50, l: 65},
                    lastColor: {h: 50, s: 70, l: 50},
                    customColor: {h: 120, s: 50, l: 55},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 70, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 44, s: 10, l: 70},
                    pitWindowOpenFill: {h: 140, s: 60, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "solarized-dark",
                variables: {
                    bgColor: {h: 192, s: 100, l: 13, minOpacity: 0},
                    textColor: {h: 210, s: 7, l: 89},
                    averageColor: {h: 220, s: 60, l: 70},
                    qualyColor: {h: 300, s: 50, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 50, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 192, s: 20, l: 40},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 80, l: 60}
                }
            }, {
                id: "obsidian",
                variables: {
                    bgColor: {h: 196, s: 12, l: 24, minOpacity: 0},
                    textColor: {h: 210, s: 7, l: 89},
                    averageColor: {h: 220, s: 70, l: 70},
                    qualyColor: {h: 300, s: 55, l: 70},
                    lastColor: {h: 50, s: 70, l: 70},
                    customColor: {h: 120, s: 50, l: 70},
                    customIncreaseHoverColor: {h: 220, s: 60, l: 60},
                    customDecreaseHoverColor: {h: 0, s: 60, l: 60},
                    clickableHoverColor: {h: 0, s: 0, l: 100},
                    incsWarning: {h: 50, s: 90, l: 50},
                    incsDanger: {h: 10, s: 100, l: 70},
                    pitFill: {h: 196, s: 20, l: 40},
                    pitWindowOpenFill: {h: 140, s: 80, l: 50},
                    pitTwoLapsLeftFill: {h: 60, s: 70, l: 50},
                    pitOneLapLeftFill: {h: 10, s: 90, l: 70}
                }
            }]
        }
    }, {}], 2: [function (require, module, exports) {
        module.exports = {
            families: [{
                id: "roboto",
                variables: {sansSerif: "Roboto", monospace: "Roboto Mono"}
            }, {id: "fira", variables: {sansSerif: "Fira Sans", monospace: "Fira Code"}}, {
                id: "ubuntu",
                variables: {sansSerif: "Ubuntu", monospace: "Ubuntu Mono"}
            }, {id: "overpass", variables: {sansSerif: "Overpass", monospace: "Overpass Mono"}}]
        }
    }, {}], 3: [function (require, module, exports) {
        var app, appWindow, camelCaseToDashed, colorThemes, fontSizes, ipcRenderer, isWeb, overlaysData,
            indexOf = [].indexOf;
        window.electron ? (ipcRenderer = electron.ipcRenderer, appWindow = electron.appWindow) : isWeb = !0, overlaysData = require("../racing-overlay/overlays-data"), colorThemes = require("./color-themes"), fontSizes = require("./font-sizes"), require("../../../js/ir-fuel-calc"), require("../../../js/angular-is-app-maximized"), camelCaseToDashed = require("../../../js/camel-case-to-dashed"), app = angular.module("fuel-calc", ["ngStorage", "is-app-maximized", "ir.service", "ir.fuel-calc"]).config((function ($localStorageProvider) {
            return $localStorageProvider.setKeyPrefix("")
        })).config((function (iRServiceProvider, config) {
            var requestParams, requestParamsOnce;
            return requestParams = ["DisplayUnits", "DriverInfo"], requestParamsOnce = ["WeekendInfo"], config.showInfo && (1 & config.carInfoFlag && requestParams.push("OilTemp"), 2 & config.carInfoFlag && requestParams.push("WaterTemp"), 3 & config.carInfoFlag && requestParams.push("EngineWarnings"), 4 & config.carInfoFlag && requestParams.push("CarSetup"), 1 & config.trackInfoFlag && requestParams.push("AirTemp"), 2 & config.trackInfoFlag && requestParams.push("TrackTempCrew"), 4 & config.trackInfoFlag && requestParams.push("RelativeHumidity"), config.incidentsFlag && requestParams.push("PlayerCarTeamIncidentCount")), iRServiceProvider.addOptions({
                requestParams: requestParams,
                requestParamsOnce: requestParamsOnce
            })
        })).config((function (iRFastServiceProvider, config) {
            var requestParams;
            return requestParams = [], config.showInfo && 4 & config.carInfoFlag && requestParams.push("dcBrakeBias"), iRFastServiceProvider.addOptions({requestParams: requestParams})
        })).constant("config", function () {
            var j, k, len, od, params, ref, ref2, v, z;
            for (params = {
                fps: 10,
                fpsFast: 20
            }, j = 0, len = (ref = (od = overlaysData.getById("fuelCalc")).urlKeys).length; j < len; j++) (k = ref[j]) in od.defaultSettings && (v = od.defaultSettings[k], params[k] = "number" != typeof v && /^\d{1,10}$/.test(v) ? parseInt(v) : v);
            for (z of new URLSearchParams(window.location.search)) [k, v] = z, params[k] = /^\d{1,10}$/.test(v) ? parseInt(v) : v;
            return isWeb && (params.server = params.host || `${window.location.hostname || "127.0.0.1"}:8182`), params.bgOpacity = parseInt(params.bgOpacity), isNaN(params.bgOpacity) && (params.bgOpacity = 70), params.bgOpacity = Math.max(0, Math.min(100, params.bgOpacity)), params.borderRadius = params.borderRadius.toString().split(".").join("px ") + "px", params.showClock && (null == params.clockStyle && (params.clockStyle = "24"), params.clockStyle = params.clockStyle.toString(), "24" !== (ref2 = params.clockStyle) && "12" !== ref2 && (params.clockStyle = "24")), params
        }())
            .service('iRServiceProvider', function($rootScope) {
            let ir;
            ir = new IRacing([
                'Speed',
                'RPM',
                'Gear',
                'dcBrakeBias',
                'dcPitSpeedLimiterToggle',
                'dcHysNoBoostToggle',
                'dcHysBoostHold',
                'dcHeadlightFlash',
                'LapDeltaToSessionBestLap',
                'LapDeltaToSessionOptimalLap',
                'LapDeltaToSessionLastlLap',
                'PlayerCarClassPosition',
                'dcTractionControl3',
                'dcMGUKDeployFixed',
                'PlayerCarTeamIncidentCount',
                'IsOnTrack',
                'dcABS',
                'WeekendInfo',
                'EnergyERSBatteryPct',
                'EnergyMGU_KLapDeployPct',
                'PowerMGU_K',
                'FuelLevel',
                'LapLastLapTime',
                'LapBestLapTime',
                'LapOptimalLapTime',
                'SessionTimeRemain',
                'OnPitRoad',
                'PlayerCarIdx',
                'dcTractionControl',
                'ShiftIndicatorPct',
                'DriverInfo',
                'Lap',
                'Throttle',
                'Brake',
                'Clutch',
                'PlayerCarPosition',
                'CarIdxLastLapTime',
                'CarIdxBestLapTime',
                'CarIdxClassPosition',
                'CarIdxPosition',
                'CarIdxF2Time',
                'CarIdxLap',
                'AirTemp',
                'TrackTemp',
                'SessionNum',
                'FuelUsePerHour',
                'SessionLapsRemain',
                'CarLeftRight',
                'LRCarLeft',
                'SessionInfo'
            ], [], 30, null,null, null);
            ir.onConnect = function() {
                localStorage.setItem("lastPitStop", ir.data['Lap']);
                return console.log('connected');
            };
            ir.onDisconnect = function() {
                return console.log('disconnected');
            };
            ir.onUpdate = function() {

                let currentDriverId = ir.data['PlayerCarIdx'];
                let drivers = ir.data['DriverInfo']['Drivers'];
                let lastLapTime = ir.data['CarIdxLastLapTime'];
                let classPositions = ir.data['CarIdxClassPosition'];
                let positions = ir.data['CarIdxPosition'];
                let CarIdxF2Time = ir.data['CarIdxF2Time'];
                let CarIdxLap = ir.data['CarIdxLap'];
                let clutch = ir.data['Clutch'];

                let driverCarClassColor
                let currentDriver = drivers[currentDriverId]
                let currentDriverGapToLeader = CarIdxF2Time[currentDriverId]

                let driverAheadPos
                let driverAheadId
                let driverAheadName
                let driverAheadCarClassColor
                let driverAheadClassPos
                let driverAheadLapTimeRaw
                let driverAheadLapTime
                let driverAheadLapTimeGapRaw
                let driverAheadLapTimeGap
                let driverAheadLiveGapRaw
                let driverAheadLiveGap
                let driverAheadGapToLeader

                let driverBehindPos
                let driverBehindId
                let driverBehindName
                let driverBehindCarClassColor
                let driverBehindClassPos
                let driverBehindLapTimeRaw
                let driverBehindLapTime
                let driverBehindLapTimeGapRaw
                let driverBehindLapTimeGap
                let driverBehindLiveGapRaw
                let driverBehindLiveGap
                let driverBehindGapToLeader

                $rootScope.mguCharging = Math.abs(ir.data['PowerMGU_K']);

                if (ir.data['dcHeadlightFlash'] === true){
                    $rootScope.HeadlightFlash = true
                    setTimeout(() => $rootScope.HeadlightFlash = false, 2000);
                }

                $rootScope.HysBoostHold = ir.data['dcHysBoostHold'] === true;

                if (ir.data['SessionInfo']['Sessions'][2]){
                    $rootScope.SessionLaps = ir.data['SessionInfo']['Sessions'][2]['SessionLaps']
                }

                if (ir.data['OnPitRoad'] === true) {
                    localStorage.setItem("lastPitStop", ir.data['Lap']);
                }

                $rootScope.lapsSincelastPitStop = ir.data['Lap'] - localStorage.getItem("lastPitStop");
                $rootScope.lastPitStop = localStorage.getItem("lastPitStop");

                if(clutch < 1.01){
                    $rootScope.Clutch =  Math.abs(clutch - 1)
                }

                if(currentDriver['CarClassColor'] > 0) {
                    driverCarClassColor = '#' + currentDriver['CarClassColor'].toString(16);
                }else if(currentDriver['CarClassColor'] === 0){
                    driverCarClassColor = 'white';
                }

                $rootScope.driverCarClassColor = driverCarClassColor

                if (positions[currentDriverId] !== 0) {

                    driverAheadPos = positions[currentDriverId] - 1
                    driverBehindPos = positions[currentDriverId] + 1

                    if (driverAheadPos >= 1 ) {

                        driverAheadId = positions.indexOf(driverAheadPos);

                        for (const key in drivers) {
                            if (drivers.hasOwnProperty(key)) {
                                const driver = drivers[key];

                                if (driver['CarIdx'] === driverAheadId) {
                                    driverAheadId = driver['CarIdx']
                                    driverAheadName = driver['UserName']
                                    driverAheadCarClassColor = driver['CarClassColor']
                                }
                            }
                        }

                        driverAheadClassPos = classPositions[driverAheadId]

                        if (ir.data['SessionNum'] < 2){
                            driverAheadLapTimeRaw = CarIdxF2Time[driverAheadId]
                        }else {
                            driverAheadLapTimeRaw = lastLapTime[driverAheadId]
                        }

                        if (driverAheadLapTimeRaw > 0) {
                            driverAheadLapTime = moment.duration(driverAheadLapTimeRaw, "seconds").format("mm:ss.SSS")
                        }

                        if( driverAheadCarClassColor > 0) {
                            driverAheadCarClassColor = '#' + driverAheadCarClassColor.toString(16);
                        }else if(driverAheadCarClassColor === 0){
                            driverAheadCarClassColor = 'white';
                        }

                        if (ir.data['SessionNum'] < 2){
                            if (driverAheadLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                                driverAheadLapTimeGapRaw = ir.data['LapBestLapTime'] - driverAheadLapTimeRaw
                            }
                        }else {
                            if (driverAheadLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                                driverAheadLapTimeGapRaw = ir.data['LapLastLapTime'] - driverAheadLapTimeRaw
                            }
                            driverAheadGapToLeader = CarIdxF2Time[driverAheadId]
                            driverAheadLiveGapRaw = currentDriverGapToLeader - driverAheadGapToLeader

                            if (CarIdxLap[driverAheadId] === CarIdxLap[currentDriverId]) {
                                driverAheadLiveGap = moment.duration(driverAheadLiveGapRaw, "seconds").format("s.SS", {trim: false})
                            }else{
                                driverAheadLiveGapRaw =  CarIdxLap[currentDriverId] - CarIdxLap[driverAheadId]
                                driverAheadLiveGapRaw = Math.abs(driverAheadLiveGapRaw)
                                console.log(driverAheadLiveGapRaw)
                                driverAheadLiveGap = '+' + driverAheadLiveGapRaw + ' Lap'
                            }
                        }

                        driverAheadLapTimeGap = moment.duration(driverAheadLapTimeGapRaw, "seconds").format("s.SS", { trim: false })

                    }

                    if (driverBehindPos > 1) {

                        driverBehindId = positions.indexOf(driverBehindPos);

                        for (const key in drivers) {
                            if (drivers.hasOwnProperty(key)) {
                                const driver = drivers[key];

                                if (driver['CarIdx'] === driverBehindId) {
                                    driverBehindId = driver['CarIdx']
                                    driverBehindName = driver['UserName']
                                    driverBehindCarClassColor = driver['CarClassColor']
                                }
                            }
                        }

                        driverBehindClassPos = classPositions[driverBehindId]

                        if (ir.data['SessionNum'] < 2){
                            driverBehindLapTimeRaw = CarIdxF2Time[driverBehindId]
                        }else {
                            driverBehindLapTimeRaw = lastLapTime[driverBehindId]
                        }

                        if (driverBehindLapTimeRaw > 0) {
                            driverBehindLapTime = moment.duration(driverBehindLapTimeRaw, "seconds").format("mm:ss.SSS")
                        }

                        if( driverBehindCarClassColor > 0) {
                            driverBehindCarClassColor = '#' + driverBehindCarClassColor.toString(16);
                        }else if(driverBehindCarClassColor === 0){
                            driverBehindCarClassColor = 'white';
                        }

                        if (ir.data['SessionNum'] < 2){
                            if (driverBehindLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                                driverBehindLapTimeGapRaw = ir.data['LapBestLapTime'] - driverBehindLapTimeRaw
                            }
                        }else {
                            if (driverBehindLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                                driverBehindLapTimeGapRaw = ir.data['LapLastLapTime'] - driverBehindLapTimeRaw
                            }
                            driverBehindGapToLeader = CarIdxF2Time[driverBehindId]
                            driverBehindLiveGapRaw = currentDriverGapToLeader - driverBehindGapToLeader

                            if (CarIdxLap[driverBehindId] === CarIdxLap[currentDriverId]) {
                                driverBehindLiveGap = moment.duration(driverBehindLiveGapRaw, "seconds").format("s.SS", {trim: false})
                            }else{
                                driverBehindLiveGapRaw = CarIdxLap[driverBehindId] - CarIdxLap[currentDriverId]
                                driverBehindLiveGap = driverBehindLiveGapRaw + ' Lap'
                            }
                        }

                        driverBehindLapTimeGap = moment.duration(driverBehindLapTimeGapRaw, "seconds").format("s.SS", { trim: false })
                    }

                    $rootScope.driverAheadPos = driverAheadPos
                    $rootScope.driverAheadClassPos = driverAheadClassPos
                    $rootScope.driverAheadLapTime = driverAheadLapTime
                    $rootScope.driverAheadLapTimeGap = driverAheadLapTimeGap
                    $rootScope.driverAheadCarClassColor = driverAheadCarClassColor
                    $rootScope.driverAheadName = driverAheadName
                    $rootScope.driverAheadLiveGap = driverAheadLiveGap

                    $rootScope.driverBehindPos = driverBehindPos
                    $rootScope.driverBehindClassPos = driverBehindClassPos
                    $rootScope.driverBehindLapTime = driverBehindLapTime
                    $rootScope.driverBehindLapTimeGap = driverBehindLapTimeGap
                    $rootScope.driverBehindCarClassColor = driverBehindCarClassColor
                    $rootScope.driverBehindName = driverBehindName
                    $rootScope.driverBehindLiveGap = driverBehindLiveGap
                }

                return $rootScope.$apply();
            };
            return ir;
        })
            .controller('MainCtrl', function($rootScope, $scope, iRService, $http, $interval) {

            $scope.isElectron = isElectron();

            $interval(function() {
                $scope.CurrentTime = new Date()
            }, 100)

            return $scope.ir = iRService.data;
        })
            .controller("AppCtrl", (function ($scope, $element, $localStorage, config, iRService) {
            var checkWindowFocused, fontFamily, k, onAppWindowBlur, onAppWindowFocus, onBroadcastMessage, opacity, ref,
                ref1, ref2, requestUpdateURLParams, requestUpdateURLParamsInterval, rootStyle, settings, theme, v;
            for (k in rootStyle = document.documentElement.style, config.test || ($scope.overlay = config.overlay), $scope.showInfo = config.showInfo, config.showInfo && ($scope.showOilTemp = 1 & config.carInfoFlag, $scope.showWaterTemp = 2 & config.carInfoFlag, $scope.showBrakeBias = 4 & config.carInfoFlag, $scope.showAirTemp = 1 & config.trackInfoFlag, $scope.showTrackTemp = 2 & config.trackInfoFlag, $scope.showSOF = 1 & config.sofFlag, $scope.showHumidity = 4 & config.trackInfoFlag), $scope.showQualy = config.showQualy, $scope.showLast = config.showLast, $scope.showCustom = config.showCustom, $scope.showClock = config.showClock, $scope.hideClockWhenInMulticlass = config.hideClockWhenInMulticlass, null == (fontFamily = fontSizes.families.find((function (i) {
                return i.id === config.fontFamily
            }))) && (fontFamily = fontSizes.families.find((function (i) {
                return "roboto" === i.id
            }))), ref = fontFamily.variables) v = ref[k], rootStyle.setProperty(`--font-family-${camelCaseToDashed(k)}`, "number" == typeof v ? `${v}px` : v);
            for (k in opacity = config.bgOpacity / 100, null == (theme = colorThemes.themes.find((function (i) {
                return i.id === config.colorTheme
            }))) && (theme = colorThemes.themes.find((function (i) {
                return "default" === i.id
            }))), config.colorThemeBgSaturation < 100 && (theme.variables.bgColor.s *= config.colorThemeBgSaturation / 100, theme.variables.pitFill.s *= config.colorThemeBgSaturation / 100), config.colorThemeBgBrightness < 100 && (theme.variables.bgColor.l *= config.colorThemeBgBrightness / 100), ref1 = theme.variables) v = ref1[k], rootStyle.setProperty(`--theme-${camelCaseToDashed(k)}`, `hsla(${v.h}, ${v.s}%, ${v.l}%${null == v.minOpacity ? "" : ", " + Math.max(v.minOpacity, opacity)})`);
            return config.overlay || (requestUpdateURLParams = function () {
                try {
                    return iRService.broadcast({fuelCalc: {requestUpdateURLParams: !0}})
                } catch (error) {
                }
            }, requestUpdateURLParamsInterval = null, $scope.$on("iRServiceWebsocketConnected", (function () {
                return requestUpdateURLParams(), requestUpdateURLParamsInterval = setInterval(requestUpdateURLParams, 200)
            })), onBroadcastMessage = $scope.$on("broadcastMessage", (function (event, data) {
                var prevURLParams, ref2, test, updatedURLParams, url;
                if (null != (null != (ref2 = data.fuelCalc) ? ref2.updateURLParams : void 0) && (clearInterval(requestUpdateURLParamsInterval), prevURLParams = new URLSearchParams(location.search), updatedURLParams = new URLSearchParams(data.fuelCalc.updateURLParams), test = prevURLParams.get("test"), prevURLParams.delete("test"), prevURLParams.toString() !== updatedURLParams.toString())) return (url = new URL(location.href)).search = updatedURLParams.toString(), test && url.searchParams.set("test", test), location.href = url, onBroadcastMessage()
            }))), isWeb ? ($element.addClass("is-web"), void rootStyle.setProperty("--border-radius", config.borderRadius)) : (settings = null != (ref2 = $localStorage.server.fuelCalc) ? ref2.settings : void 0, v = theme.variables.bgColor, rootStyle.setProperty("--theme-bg-color-opaque", `hsl(${v.h}, ${v.s}%, ${v.l}%)`), settings.isTransparent && ($element.addClass("transparent"), rootStyle.setProperty("--border-radius", config.borderRadius)), appWindow.on("focus", onAppWindowFocus = function () {
                $element.toggleClass("focus", !0)
            }), appWindow.on("blur", onAppWindowBlur = function () {
                $element.toggleClass("focus", !1)
            }), checkWindowFocused = async function () {
                return await appWindow.isFocused() ? onAppWindowFocus() : onAppWindowBlur()
            }, setInterval(checkWindowFocused, 1e3), setTimeout(checkWindowFocused, 1), $scope.minimizeApp = function () {
                return appWindow.minimize()
            }, $scope.maximizeApp = function () {
                return appWindow.toggleMaximize()
            }, $scope.closeApp = function () {
                return appWindow.close()
            })
        })).controller("FuelCtrl", (function ($scope, $element, $timeout, $interval, config, iRService, iRFastService, FuelCalc, SessionTimeLapService) {
            var appEl, broadcastCustom, broadcastCustomDebounce, brokenBrakeBiasCarIds, changeCustomBy,
                findBrakeBiasFromSetup, fontSize, getSessionInfoTextHeight, incs, ir, irFast, limit, onResize,
                pitIndicatorIndex, rootStyle, rows, sesInfoData, sessionInfoElement, waitForIFrame, wrapEl;
            return ir = $scope.ir, irFast = $scope.irFast, $scope.fuelCalc = FuelCalc, broadcastCustomDebounce = null, appEl = document.querySelector(".app"), wrapEl = document.querySelector(".app > .wrap"), sessionInfoElement = null, rootStyle = document.documentElement.style, sesInfoData = {
                minFontSize: .5,
                maxFontSize: .7,
                currentFontSize: .7
            }, rows = 2, config.showQualy && rows++, config.showLast && rows++, config.showCustom && rows++, fontSize = new Map(config.showInfo ? [[2, .18], [3, .13], [4, .105], [5, .09]] : [[2, .22], [3, .16], [4, .12], [5, .1]]).get(rows), rootStyle.setProperty("--app-font-size", fontSize), config.textShadow && $element.addClass("text-shadow"), getSessionInfoTextHeight = function () {
                var ctx, h, img, isThereSinglePixel, j, l, maxWidth, ref, ref1, styles, txtMetrics, x, y;
                for (ctx = sesInfoData.ctx, sesInfoData.ctx ? ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) : ((ctx = document.createElement("canvas").getContext("2d")).fillStyle = "white", ctx.textBaseline = "top", sesInfoData.ctx = ctx), styles = sesInfoData.styles, ctx.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`, txtMetrics = ctx.measureText("0"), ctx.fillText("0", 0, 0), img = ctx.getImageData(0, 0, txtMetrics.width, Math.min(2 * txtMetrics.width, ctx.canvas.height)), h = 0, maxWidth = Math.min(txtMetrics.width, ctx.canvas.width), y = j = 0, ref = img.height; 0 <= ref ? j < ref : j > ref; y = 0 <= ref ? ++j : --j) {
                    for (isThereSinglePixel = !1, x = l = 0, ref1 = maxWidth; 0 <= ref1 ? l < ref1 : l > ref1; x = 0 <= ref1 ? ++l : --l) if (img.data[4 * (y * img.width + x) + 3]) {
                        h++, isThereSinglePixel = !0;
                        break
                    }
                    if (h && !isThereSinglePixel) break
                }
                return h
            }, window.addEventListener("resize", onResize = async function () {
                var maxfs, minfs, mwh, results, sh, sw;
                if (sw = window.innerWidth, sh = window.innerHeight, mwh = Math.min(sw, sh), rootStyle.setProperty("--app-mwh", mwh), config.showInfo) {
                    null == sessionInfoElement && (sessionInfoElement = await new Promise((function (resolve) {
                        var interval;
                        return interval = setInterval((function () {
                            var el;
                            if (el = document.querySelector(".session-info")) return clearInterval(interval), resolve(el)
                        }), 1)
                    }))), minfs = sesInfoData.minFontSize, maxfs = sesInfoData.maxFontSize, sesInfoData.currentFontSize = maxfs, rootStyle.setProperty("--app-session-info-font-size", `${sesInfoData.currentFontSize}em`), results = [];
                    for (var j = 0; j < 100 && (null == sesInfoData.styles && (sesInfoData.styles = window.getComputedStyle(sessionInfoElement)), rootStyle.setProperty("--app-session-info-icon-size", `${getSessionInfoTextHeight()}px`), sessionInfoElement.clientWidth < (sw = sessionInfoElement.scrollWidth) && sesInfoData.currentFontSize > minfs); j++) sesInfoData.currentFontSize -= .01, results.push(rootStyle.setProperty("--app-session-info-font-size", `${sesInfoData.currentFontSize}em`));
                    return results
                }
            }), requestAnimationFrame(onResize), waitForIFrame = setInterval((function () {
                var ah, ref, ref1, wh;
                if (ah = null != (ref = appEl.getBoundingClientRect()) ? ref.height : void 0, wh = null != (ref1 = wrapEl.getBoundingClientRect()) ? ref1.height : void 0, ah > 0 && wh > 0 && ah !== wh) return clearInterval(waitForIFrame), onResize(), setTimeout(onResize, 10), setTimeout(onResize, 100), setTimeout(onResize, 1e3)
            })), config.test ? (FuelCalc.setTestMode(!0), config.showInfo && (ir.OilTemp = 141.7, ir.WaterTemp = 82.5, ir.AirTemp = 25.4, ir.TrackTempCrew = 38.9, 4 & config.carInfoFlag && ($scope.brakeBias = "56.25%"), 4 & config.trackInfoFlag && ($scope.humidity = config.trackInfoPrecise ? "55.4%" : "55%"), 1 & config.sofFlag && ($scope.sof = 2 & config.sofFlag ? Math.round(1e3 * (2 + 3 * Math.random())) : `${(2 + 3 * Math.random()).toFixed(1)}k`), config.incidentsFlag && (incs = 11 + Math.round(12 * Math.random()), limit = 25, $scope.incs = `${incs}/${limit}`, $scope.incsClass = incs >= limit - 4 ? "danger" : limit > 17 && incs >= limit - 12 || incs >= limit - 8 ? "warning" : null)), ir.DisplayUnits = 1, FuelCalc.fuelLevel = 48.56, FuelCalc.raceLaps = 21, FuelCalc.usageAvg = 4.75, FuelCalc.usageQualy = 4.81, FuelCalc.usageLast = 4.78, FuelCalc.usageCustom = 4.8, FuelCalc.remainAvg = FuelCalc.fuelLevel / FuelCalc.usageAvg, FuelCalc.remainQualy = FuelCalc.fuelLevel / FuelCalc.usageQualy, FuelCalc.remainLast = FuelCalc.fuelLevel / FuelCalc.usageLast, FuelCalc.remainCustom = FuelCalc.fuelLevel / FuelCalc.usageCustom, FuelCalc.refuelAvg = (FuelCalc.raceLaps - FuelCalc.remainAvg - 7) * FuelCalc.usageAvg + .5, FuelCalc.refuelQualy = (FuelCalc.raceLaps - FuelCalc.remainQualy - 7) * FuelCalc.usageQualy + .5, FuelCalc.refuelLast = (FuelCalc.raceLaps - FuelCalc.remainLast - 7) * FuelCalc.usageLast + .5, FuelCalc.refuelCustom = (FuelCalc.raceLaps - FuelCalc.remainCustom - 7) * FuelCalc.usageCustom + .5, FuelCalc.extraMode = 2, FuelCalc.extraAvg = 30 - (FuelCalc.refuelAvg - .5), FuelCalc.extraQualy = 30 - (FuelCalc.refuelQualy - .5), FuelCalc.extraLast = 30 - (FuelCalc.refuelLast - .5), FuelCalc.extraCustom = 30 - (FuelCalc.refuelCustom - .5), FuelCalc.pitWindowOpen = !0, FuelCalc.lowFuelState = 1, pitIndicatorIndex = 0, void $(".pit-indicator").click((function () {
                return pitIndicatorIndex = ++pitIndicatorIndex % 5, FuelCalc.pitWindowOpen = [!0, !0, !1, !0, !1][pitIndicatorIndex], FuelCalc.lowFuelState = [1, 2, 2, 0, 0][pitIndicatorIndex], $scope.$apply()
            }))) : ($scope.$watch("ir.connected", (function (n, o) {
                if (n) return $scope.brakeBias = $scope.humidity = $scope.sof = $scope.incs = null, null != iRService.record ? iRService.playRecord(config.recordStartFrame, config.recordStopFrame, config.recordFPS) : void 0
            })), config.showInfo && ($scope.brakeBiasNull = "––.––%", $scope.humidityNull = config.trackInfoPrecise ? "––.–%" : "––%", $scope.sofNull = config.sofFlag ? 2 & config.sofFlag ? "––––" : "–.–k" : null, $scope.incsNull = config.incidentsFlag ? "––/––" : null, 3 & config.carInfoFlag && $scope.$watch("ir.EngineWarnings", (function () {
                return $scope.oilTempWarning = 64 & ir.EngineWarnings, $scope.waterTempWarning = 1 & ir.EngineWarnings
            })), 4 & config.carInfoFlag && (brokenBrakeBiasCarIds = [78, 83, 84], findBrakeBiasFromSetup = function (setup) {
                var k, key, v, value;
                for (k in setup) if (null != (v = setup[k]) && "object" == typeof v) {
                    if (null != (value = findBrakeBiasFromSetup(v))) return value
                } else if ((key = k.toLowerCase()).includes("brake") && key.includes("bias")) return v
            }, $scope.$watchGroup(["irFast.dcBrakeBias", "ir.DriverInfo", "ir.CarSetup"], (function () {
                var bias, carId, driverCarIdx, precision, setupBias;
                if (null != ir.DriverInfo) if (null != (bias = irFast.dcBrakeBias)) if (driverCarIdx = ir.DriverInfo.DriverCarIdx, carId = ir.DriversByCarIdx[driverCarIdx].CarID, precision = 1, indexOf.call(brokenBrakeBiasCarIds, carId) >= 0) $scope.brakeBias = null; else {
                    switch (carId) {
                        case 71:
                            ir.CarSetup && (bias += parseFloat(ir.CarSetup.DriveBrake.BrakeSystemConfig.BaseBrakeBias), bias = .1 * Math.floor(10 * bias));
                            break;
                        case 33:
                        case 88:
                        case 119:
                        case 143:
                            precision = 2
                    }
                    if (bias <= 10 && ir.CarSetup && null != (setupBias = findBrakeBiasFromSetup(ir.CarSetup)) && (bias += parseFloat(setupBias)), null == $scope.brakeBias || bias) return $scope.brakeBias = `${bias.toFixed(precision)}%`
                } else $scope.brakeBias = null
            }))), 4 & config.trackInfoFlag && $scope.$watch("ir.RelativeHumidity", (function () {
                if (null != ir.RelativeHumidity) return $scope.humidity = config.trackInfoPrecise ? `${((1e3 * ir.RelativeHumidity | 0) / 10).toFixed(1)}%` : (100 * ir.RelativeHumidity | 0) + "%"
            })), 1 & config.sofFlag && $scope.$watch("ir.DriverInfo", (function () {
                var camCarClassId, carIdx, d, j, l, len, len1, numberDrivers, ref, ref1, ref2, ref3, sessions, sof;
                if ($scope.sof = null, ir.DriverInfo && !(null != (ref = ir.WeekendInfo) ? ref.TeamRacing : void 0) && (!(sessions = null != (ref1 = ir.SessionInfo) ? ref1.Sessions : void 0) || "Race" === sessions[sessions.length - 1].SessionType) && -1 !== (carIdx = ir.DriverInfo.DriverCarIdx) && null != carIdx) {
                    for (camCarClassId = null, j = 0, len = (ref2 = ir.DriverInfo.Drivers).length; j < len; j++) if ((d = ref2[j]).CarIdx === carIdx && !d.CarIsPaceCar) {
                        camCarClassId = d.CarClassID;
                        break
                    }
                    if (null != camCarClassId) {
                        for (sof = 0, 1600, numberDrivers = 0, l = 0, len1 = (ref3 = ir.DriverInfo.Drivers).length; l < len1; l++) (d = ref3[l]).CarIsPaceCar || d.IsSpectator || d.CarClassID !== camCarClassId || (numberDrivers++, sof += Math.pow(2, -d.IRating / 1600));
                        return sof && numberDrivers ? (sof = 1600 / Math.log(2) * Math.log(numberDrivers / sof), $scope.sof = 2 & config.sofFlag ? Math.round(sof) : `${((sof / 100 | 0) / 10).toFixed(1)}k`) : void 0
                    }
                }
            })), config.incidentsFlag && $scope.$watchGroup(["ir.PlayerCarTeamIncidentCount", "ir.SessionInfo", "ir.SessionNum", "ir.WeekendInfo"], (function () {
                var isOther, isQual, isRace, ref, sessionType;
                if (ir.SessionInfo && ir.WeekendInfo) if ($scope.incs = null, isRace = "race" === (sessionType = ir.SessionInfo.Sessions[ir.SessionNum].SessionType.toLowerCase()), isQual = sessionType.includes("qual"), isOther = !isRace && !isQual, 4 & config.incidentsFlag && isRace || 2 & config.incidentsFlag && isQual || 1 & config.incidentsFlag && isOther) {
                    if (!(null == (incs = ir.PlayerCarTeamIncidentCount) || incs < 0)) return (limit = parseInt(null != (ref = ir.WeekendInfo) ? ref.WeekendOptions.IncidentLimit : void 0)) > 0 && isRace ? ($scope.incs = `${incs}/${limit}`, $scope.incsClass = incs >= limit - 4 ? "danger" : limit > 17 && incs >= limit - 12 || incs >= limit - 8 ? "warning" : null) : ($scope.incs = `${incs}`, $scope.incsClass = null)
                } else delete $scope.incs
            }))), changeCustomBy = function (value, broadcast = !0) {
                var usage, v;
                if (usage = FuelCalc.normalize(FuelCalc.usageCustom), !((v = value > 0 ? usage < 10 ? (Math.ceil(100 * usage) + .99) / 100 : (Math.ceil(10 * usage) + .99) / 10 : usage < 10 ? (Math.ceil(100 * usage) - 1.01) / 100 : (Math.ceil(10 * usage) - 1.01) / 10) < 0)) return FuelCalc.usageCustom = FuelCalc.reverseNormalize(v), broadcast ? broadcastCustom() : void 0
            }, broadcastCustom = function () {
                return $timeout.cancel(broadcastCustomDebounce), broadcastCustomDebounce = $timeout((function () {
                    try {
                        return iRService.broadcast({fuelCalc: {usageCustom: FuelCalc.usageCustom}})
                    } catch (error) {
                    }
                }), 200)
            }, $scope.setCustomAvg = function () {
                if (config.showCustom && null != FuelCalc.usageAvg) return FuelCalc.usageCustom = FuelCalc.usageAvg, broadcastCustom()
            }, $scope.setCustomQualy = function () {
                if (config.showCustom && null != FuelCalc.usageQualy) return FuelCalc.usageCustom = FuelCalc.usageQualy, broadcastCustom()
            }, $scope.setCustomLast = function () {
                if (config.showCustom && null != FuelCalc.usageLast) return FuelCalc.usageCustom = FuelCalc.usageLast, broadcastCustom()
            }, $scope.increaseCustom = function () {
                return changeCustomBy(1)
            }, $scope.decreaseCustom = function () {
                return changeCustomBy(-1)
            }, $scope.toggleExtraMode = function () {
                FuelCalc.extraMode = ++FuelCalc.extraMode % 3;
                try {
                    return iRService.broadcast({fuelCalc: {extraMode: FuelCalc.extraMode}})
                } catch (error) {
                }
            }, $scope.$on("broadcastMessage", (function (event, data) {
                if (null != data.fuelCalc && config.showCustom && FuelCalc.usageCustom && "adjustCustom" in data.fuelCalc) {
                    switch (data.fuelCalc.adjustCustom) {
                        case"increase":
                            changeCustomBy(1, !1);
                            break;
                        case"decrease":
                            changeCustomBy(-1, !1)
                    }
                    return $scope.$apply()
                }
            })))
        })).directive("appTemp", (function (config) {
            return {
                link: function (scope, element, attrs) {
                    var createdAt, i, j, onResize, precise, ref, ref1, t, tempUnits, temps;
                    for (tempUnits = config.trackTempUnits, precise = config.trackInfoPrecise, "ir.OilTemp" !== (ref = attrs.appTemp) && "ir.WaterTemp" !== ref || (tempUnits = config.carTempUnits, precise = config.carInfoPrecise), createdAt = null, temps = [], i = j = 0, ref1 = 3 === tempUnits ? 2 : 1; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) temps.push(t = {
                        el: document.createElement("span"),
                        text: null,
                        minWidth: null
                    }), t.el.style.display = "inline-block", 1 === i && (t.el.style.marginLeft = "0.5em"), element.append(t.el);
                    return scope.$watchGroup(["ir.DisplayUnits", attrs.appTemp, "ir.connected"], (function (n, o) {
                        var el, elWidth, l, len, len1, letter, newText, p, results, temp, temp2, tempC, tempF, units;
                        if (n[2] || config.test) {
                            if (null != n[0] && n[1]) {
                                for (units = n[0], temp = tempC = n[1], temp2 = tempF = 9 * temp / 5 + 32, units || (temp = tempF, temp2 = tempC), temp = function () {
                                    switch (tempUnits) {
                                        case 0:
                                        case 3:
                                            return temp;
                                        case 1:
                                            return tempC;
                                        case 2:
                                            return tempF
                                    }
                                }(), letter = function () {
                                    switch (tempUnits) {
                                        case 0:
                                            return "FC"[units];
                                        case 1:
                                            return "C";
                                        case 2:
                                            return "F";
                                        case 3:
                                            return ["FC", "CF"][units]
                                    }
                                }(), results = [], i = p = 0, len1 = temps.length; p < len1; i = ++p) t = temps[i], (newText = precise ? `${((10 * [temp, temp2][i] | 0) / 10).toFixed(1)}°${letter[i]}` : `${Math.round([temp, temp2][i])}°${letter[i]}`) !== t.text ? (el = t.el, t.text = el.textContent = newText, elWidth = el.getBoundingClientRect().width, t.minWidth < elWidth && Date.now() - createdAt > 1e3 ? (t.minWidth = elWidth, results.push(el.style.minWidth = `${elWidth}px`)) : results.push(void 0)) : results.push(void 0);
                                return results
                            }
                        } else for (i = l = 0, len = temps.length; l < len; i = ++l) t = temps[i], (newText = `${"––" + (precise ? ".–" : "")}°${(2 === tempUnits ? "FC" : "CF")[i]}`) !== t.text && (el = t.el, t.text = el.textContent = newText)
                    })), (onResize = function () {
                        var l, len, results;
                        for (createdAt = Date.now(), results = [], l = 0, len = temps.length; l < len; l++) (t = temps[l]).text = t.minWidth = null, results.push(t.el.style.minWidth = "inherit");
                        return results
                    })(), window.addEventListener("resize", onResize), scope.$on("destroy", (function () {
                        return window.removeEventListener("resize", onResize)
                    }))
                }
            }
        })).directive("appClickHold", (function ($parse, $interval, config, FuelCalc) {
            return {
                link: function (scope, element, attrs) {
                    var clickHoldFunc, firstTime, intervalHandler;
                    if (!config.test) return clickHoldFunc = $parse(attrs.appClickHold), intervalHandler = null, firstTime = !0, element.on("mousedown", (function (event) {
                        var clicksCount;
                        return firstTime = !0, clicksCount = 0, $interval.cancel(intervalHandler), intervalHandler = $interval((function () {
                            var results;
                            if (firstTime = !1, ++clicksCount > 20) {
                                results = [];
                                for (var j = 0; j < 10; j++) results.push(clickHoldFunc(scope, {$event: event}));
                                return results
                            }
                            return clickHoldFunc(scope, {$event: event})
                        }), 100)
                    })), element.on("mouseup", (function (event) {
                        if (firstTime) return clickHoldFunc(scope, {$event: event}), scope.$apply()
                    })), element.on("mouseup mouseleave", (function () {
                        return $interval.cancel(intervalHandler)
                    }))
                }
            }
        })).directive("appClock", (function ($timeout, config) {
            return {
                link: function (scope, element, attrs) {
                    var headerEl, updateTimeout, valueEl;
                    if (config.showClock) return headerEl = element.find(".header"), valueEl = element.find(".value"), updateTimeout = null, function () {
                        var h, m, now, s;
                        if (now = new Date, h = now.getHours(), m = now.getMinutes(), s = now.getSeconds(), config.test && (h = 19, m = 45), m < 10 && (m = `0${m}`), valueEl.text("12" === config.clockStyle ? `${h % 12 || 12}:${m}` : `${h}:${m}`), headerEl.text("12" === config.clockStyle ? "Clock " + (h < 12 ? "AM" : "PM") : "Clock 24h"), !config.test) updateTimeout = $timeout(arguments.callee, 1e3 * Math.max(1, 60 - s))
                    }(), scope.$on("$destroy", (function () {
                        return $timeout.cancel(updateTimeout)
                    }))
                }
            }
        })), angular.element((function () {
            if (angular.bootstrap(document, [app.name]), !isWeb) return ipcRenderer.send("fuel-calc-ready-to-show")
        }))
    }, {
        "../../../js/angular-is-app-maximized": 5,
        "../../../js/camel-case-to-dashed": 6,
        "../../../js/ir-fuel-calc": 7,
        "../racing-overlay/overlays-data": 4,
        "./color-themes": 1,
        "./font-sizes": 2
    }], 4: [function (require, module, exports) {
        var data;
        data = [{
            id: "standings",
            title: "Standings",
            testable: !0,
            defaultSettings: {
                hostPort: 8182,
                colorTheme: "default",
                colorThemeBgSaturation: 100,
                colorThemeBgBrightness: 100,
                bgOpacity: 60,
                textShadow: !1,
                topRows: 5,
                bottomRows: 5,
                fontFamily: "roboto",
                fontSize2: "default",
                multiclass: !1,
                multiclassRows: 3,
                multiclassLimit: 3,
                multiclassColor: "0",
                multiclassBgSaturation: 100,
                multiclassBgBrightness: 100,
                showCarNumber: !0,
                showCarNumberMulticlass: !0,
                driverNameStyle: "0",
                driverNameFontStyle: "0",
                driverNameWidth: 100,
                showManufactureLogo: "1",
                showSRiRBadges: !0,
                srirStyle: "0",
                showIRatingGain: !1,
                showGapIntFlag: 3,
                timePrecisionFlag: 1,
                showPit: !0,
                showPitTime: !1,
                showLastLapTime: !0,
                lastLapTimeTimeout: 10,
                gainHistoryLimit: 3,
                colorBlindEnabled: !1,
                colorBlindMode: null
            },
            urlKeys: ["host", "colorTheme", "colorThemeBgSaturation", "colorThemeBgBrightness", "bgOpacity", "textShadow", "fontFamily", "fontSize2", "topRows", "bottomRows", "multiclass", "multiclassRows", "multiclassLimit", "multiclassColor", "multiclassBgSaturation", "multiclassBgBrightness", "showCarNumber", "showCarNumberMulticlass", "driverNameStyle", "driverNameFontStyle", "driverNameWidth", "showManufactureLogo", "showSRiRBadges", "srirStyle", "showIRatingGain", "showGapIntFlag", "timePrecisionFlag", "showPit", "showPitTime", "showLastLapTime", "lastLapTimeTimeout", "gainHistoryLimit", "colorBlindMode"]
        }, {
            id: "standings2", title: "Standings 2", testable: !0, bounds: {minWidth: 160}, defaultSettings: {
                hostPort: 8182, settings: {
                    liveStandings: !1,
                    showHeaders: !0,
                    topRows: 5,
                    bottomRows: 9,
                    numClasses: 3,
                    multiclassRows: 3,
                    font: "exo",
                    condensed: !0,
                    align: "top",
                    colors: {
                        bgOpacity: 80,
                        bgLightness: {header: 0, odd: 0, even: 0},
                        currentHue: 180,
                        gainUp: "#52e052",
                        gainDown: "#ff7f66"
                    },
                    animation: {inCar: "normal", inReplay: "disable"},
                    header: {
                        size: "l",
                        columns: ["name", "session-laps", "session-time", "track-temp", "sof", "drivers"],
                        name: {maxWidth: 140},
                        airTemp: {format: "celsius", precision: "round"},
                        trackTemp: {format: "celsius", precision: "round"},
                        humidity: {precision: "round"},
                        sof: {format: "full"}
                    },
                    driver: {
                        size: "m",
                        columns: ["gain", "car-number", "name", "car-manufacture", "ratings", "gap", "int", "lap-time", "tyre-compound", "joker", "pit", "gain-history"],
                        carNumber: {font: "orbitron"},
                        name: {maxWidth: 160, format: "full", style: "normal"},
                        ratings: {srating: "full", erating: "full", eratingGain: "show"},
                        gap: {pandq: {precision: "fractions-3"}, race: {precision: "fractions-1"}},
                        int: {pandq: {precision: "fractions-3"}, race: {precision: "fractions-1"}},
                        lapTime: {pandq: {precision: "fractions-3"}, race: {precision: "fractions-1"}},
                        pit: {style: "pit-time"},
                        gainHistory: {limit: 3}
                    }
                }
            }, urlKeys: ["host", "settings"]
        }, {
            id: "relatives",
            title: "Relatives",
            testable: !0,
            bounds: {width: 420, height: 220, minWidth: 240, minHeight: 100},
            defaultSettings: {
                hostPort: 8182,
                colorTheme: "default",
                colorThemeBgSaturation: 100,
                colorThemeBgBrightness: 100,
                bgOpacity: 70,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                textShadow: !1,
                fontFamily: "roboto",
                fontSize2: "default",
                carLeftRight: !1,
                rows: 7,
                rowsStyle: "0",
                multiclassColor: "0",
                multiclassBgSaturation: 100,
                multiclassBgBrightness: 100,
                showInfo: !0,
                carInfoFlag: 1,
                carInfoPrecise: !1,
                carTempUnits: "0",
                trackInfoFlag: 2,
                trackInfoPrecise: !1,
                trackTempUnits: "0",
                sofFlag: 1,
                incidentsFlag: 4,
                showClock: !0,
                clockStyle: "24",
                showCarNumber: !0,
                showCarNumberMulticlass: !0,
                driverNameStyle: "0",
                driverNameFontStyle: "0",
                showPitBadge: !0,
                showSRiRBadges: !0,
                srirStyle: "0",
                showIRatingGain: !1,
                showManufactureLogo: "0",
                showSessionClock: !1,
                sessionClockStyle: "24",
                colorBlindEnabled: !1,
                colorBlindMode: null,
                renderFPS: 30
            },
            urlKeys: ["host", "colorTheme", "colorThemeBgSaturation", "colorThemeBgBrightness", "bgOpacity", "borderRadius", "textShadow", "fontFamily", "fontSize2", "carLeftRight", "rows", "rowsStyle", "multiclassColor", "multiclassBgSaturation", "multiclassBgBrightness", "showInfo", "carInfoFlag", "carInfoPrecise", "carTempUnits", "trackInfoFlag", "trackInfoPrecise", "trackTempUnits", "sofFlag", "incidentsFlag", "showClock", "clockStyle", "showCarNumber", "showCarNumberMulticlass", "driverNameStyle", "driverNameFontStyle", "showPitBadge", "showSRiRBadges", "srirStyle", "showIRatingGain", "showManufactureLogo", "showSessionClock", "sessionClockStyle", "colorBlindMode", "renderFPS"]
        }, {
            id: "fuelCalc",
            title: "Fuel Calc",
            testable: !0,
            bounds: {width: 280, height: 120, minWidth: 160, minHeight: 50},
            defaultSettings: {
                hostPort: 8182,
                colorTheme: "default",
                colorThemeBgSaturation: 100,
                colorThemeBgBrightness: 100,
                bgOpacity: 70,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                textShadow: !1,
                fontFamily: "roboto",
                showInfo: !1,
                carInfoFlag: 0,
                carInfoPrecise: !1,
                carTempUnits: "0",
                trackInfoFlag: 2,
                trackInfoPrecise: !1,
                trackTempUnits: "0",
                sofFlag: 1,
                incidentsFlag: 4,
                showQualy: !0,
                showLast: !0,
                showCustom: !1,
                showClock: !1,
                clockStyle: "24",
                hideClockWhenInMulticlass: !0
            },
            urlKeys: ["overlay", "host", "colorTheme", "colorThemeBgSaturation", "colorThemeBgBrightness", "bgOpacity", "borderRadius", "textShadow", "fontFamily", "showInfo", "carInfoFlag", "carInfoPrecise", "carTempUnits", "trackInfoFlag", "trackInfoPrecise", "trackTempUnits", "sofFlag", "incidentsFlag", "showQualy", "showLast", "showCustom", "showClock", "clockStyle", "hideClockWhenInMulticlass"]
        }, {
            id: "pitHelper",
            title: "Pit Stop Helper",
            testable: !0,
            bounds: {width: 230, height: 400, minWidth: 110, minHeight: 80},
            defaultSettings: {hostPort: 8182, pitHelper: !0, pitLimiter: !0, startHelper: !0, fps: 30},
            urlKeys: ["host", "pitHelper", "pitLimiter", "startHelper", "fps"]
        }, {
            id: "tyres",
            title: "Tyres",
            testable: !0,
            bounds: {width: 240, height: 120, minWidth: 160, minHeight: 100},
            defaultSettings: {
                hostPort: 8182,
                bgColor: "#000000",
                bgOpacity: 70,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                textShadow: !1,
                mode: "1",
                renderFPS: 30
            },
            urlKeys: ["host", "bgColor", "bgOpacity", "borderRadius", "textShadow", "mode", "renderFPS"]
        }, {
            id: "mgu",
            title: "MGU",
            testable: !0,
            bounds: {width: 300, height: 40, minWidth: 90, minHeight: 20},
            defaultSettings: {
                hostPort: 8182,
                bgColor: "#000000",
                bgOpacity: 70,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                textShadow: !1,
                precision: !1,
                flashBatteryBorder: !0,
                showDeployBar: !0,
                fps: 15
            },
            urlKeys: ["host", "bgColor", "bgOpacity", "borderRadius", "textShadow", "precision", "flashBatteryBorder", "showDeployBar", "fps"]
        }, {
            id: "pedals",
            title: "Pedals",
            testable: !0,
            bounds: {width: 186, height: 64, minWidth: 20, minHeight: 20},
            defaultSettings: {
                hostPort: 8182,
                bgColor: "#000000",
                bgOpacity: 70,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius2Full: !1,
                borderRadius3: 6,
                borderRadius3Full: !1,
                borderRadius4: 6,
                borderRadius: "6",
                textShadow: !1,
                showGear: !0,
                showSpeed: !0,
                showPedals: !0,
                showWheel: !0,
                showPedalsInput: !1,
                pedalsInputPlacement: "1",
                throttleRaw: !1,
                brakeRaw: !1,
                showClutch: !0,
                fps: 30
            },
            urlKeys: ["host", "bgColor", "bgOpacity", "borderRadius", "textShadow", "showGear", "showSpeed", "showPedals", "showWheel", "showPedalsInput", "pedalsInputPlacement", "throttleRaw", "brakeRaw", "showClutch", "fps"]
        }, {
            id: "inputsGraph",
            title: "Inputs Graph",
            testable: !0,
            bounds: {width: 186, height: 64, minWidth: 20, minHeight: 20},
            defaultSettings: {
                hostPort: 8182,
                borderSize: 4,
                borderColor: "#000000",
                borderOpacity: 80,
                bgColor: "#000000",
                bgOpacity: 80,
                gridLines: 5,
                gridLinesAtBorder: !0,
                gridColor: "#262626",
                gridOpacity: 100,
                borderRadiusEach: !1,
                borderRadius1: 4,
                borderRadius2: 4,
                borderRadius3: 4,
                borderRadius4: 4,
                borderRadius: "4",
                throttleRaw: !1,
                brakeRaw: !1,
                showClutch: !0,
                thickness: 150,
                text: "",
                textOnGridLine: !0,
                textScale: 100
            },
            urlKeys: ["host", "borderSize", "borderColor", "borderOpacity", "bgColor", "bgOpacity", "gridLines", "gridLinesAtBorder", "gridColor", "gridOpacity", "borderRadius", "throttleRaw", "brakeRaw", "showClutch", "thickness", "text", "textOnGridLine", "textScale"]
        }, {
            id: "carLeftRight",
            title: "Car Left Right",
            testable: !0,
            bounds: {width: 728, height: 128, minWidth: 20, minHeight: 20},
            defaultSettings: {
                hostPort: 8182,
                fps: 15,
                bgColor: "#000000",
                bgOpacity: 70,
                bgWidth: 20,
                lineColor: "#ffb624",
                lineOpacity: 100,
                lineWidth: 10,
                curvature: 0,
                capStyle: "square",
                transition: !0,
                distAhead: 4,
                distBehind: 4
            },
            urlKeys: ["host", "fps", "bgColor", "bgOpacity", "bgWidth", "lineColor", "lineOpacity", "lineWidth", "curvature", "capStyle", "transition", "distAhead", "distBehind"]
        }, {
            id: "trackMap",
            title: "Track Map",
            bounds: {width: 420, height: 324, minWidth: 80, minHeight: 40},
            defaultSettings: {
                hostPort: 8182,
                fps: 30,
                trackColor: "#000000",
                trackWidth: 10,
                trackOutlineColor: "#ffffff",
                trackAlignment: "center",
                startFinishColor: "#ff0000",
                sectorColor: "#ffda59",
                showSectors: !1,
                driverCircle: 12,
                circleColorEnabled: !1,
                circleColor: "",
                playerHighlightEnabled: !1,
                playerHighlight: "",
                driverHighlightWidth: 4,
                driverHighlightCam: "#4dff51",
                driverHighlightOfftrack: "#ff0000",
                driverPosNum: "#000000",
                highlightNum: "#ffffff",
                driverGroups: []
            },
            urlKeys: ["host", "fps", "trackColor", "trackWidth", "trackOutlineColor", "trackAlignment", "startFinishColor", "sectorColor", "showSectors", "driverCircle", "circleColor", "driverHighlightWidth", "driverHighlightCam", "driverHighlightOfftrack", "driverPosNum", "highlightNum", "playerHighlight"]
        }, {
            id: "twitchChat",
            title: "Twitch Chat",
            bounds: {width: 420, height: 240, minWidth: 100, minHeight: 80},
            defaultSettings: {
                hostPort: 8184,
                channel_id: "",
                bgColor: "#000000",
                bgOpacity: 30,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                boldText: !0,
                textShadow: !1,
                zoom: 100,
                margin1: 2,
                margin2: 4,
                margin: "2.4",
                filterBetBot: "BatManCave",
                filterBots: ["MooBot", "NightBot"],
                smoothScrolling: !0,
                strikeOutMessages: !1,
                showIRatings: !1,
                highlightWords: [],
                reversedMessages: !1,
                hideMessageAfter: 0
            },
            urlKeys: ["host", "channel_id", "bgColor", "bgOpacity", "borderRadius", "boldText", "textShadow", "zoom", "margin", "filterBetBot", "filterBots", "smoothScrolling", "strikeOutMessages", "highlightWords", "showIRatings", "reversedMessages", "hideMessageAfter"]
        }, {
            id: "followers",
            title: "Followers Notification",
            testable: !0,
            bounds: {width: 380, height: 180, minWidth: 300, minHeight: 86},
            defaultSettings: {channel: "", animation: "left", timeout: 30},
            urlKeys: ["channel", "animation", "timeout"]
        }, {
            id: "counters",
            title: "Counters",
            testable: !0,
            bounds: {width: 200, height: 34, minWidth: 200, minHeight: 30},
            defaultSettings: {
                channel_id: "",
                showViewers: !0,
                showFollowers: !0,
                bgColor: "#000000",
                bgOpacity: 70,
                textShadow: !1,
                borderRadiusEach: !1,
                borderRadius1: 6,
                borderRadius2: 6,
                borderRadius3: 6,
                borderRadius4: 6,
                borderRadius: "6",
                align: "right"
            },
            urlKeys: ["channel_id", "showViewers", "showFollowers", "bgColor", "bgOpacity", "textShadow", "borderRadius", "align"]
        }], module.exports = {
            list: data, getById: function (id) {
                return data.find((function (o) {
                    return o.id === id
                }))
            }, isTestable: function (id) {
                return data.find((function (o) {
                    return o.testable && o.id === id
                }))
            }, getDefaultScreenPosition: function (id, sw, sh) {
                switch (id) {
                    case"standings":
                        return {x: 0, y: 0};
                    case"standings2":
                        return {x: 20, y: 20};
                    case"relatives":
                        return {x: Math.max(0, sw - 10 - 420), y: Math.max(0, sh - 10 - 220)};
                    case"fuelCalc":
                        return {x: 206, y: Math.max(0, sh - 10 - 120)};
                    case"pitHelper":
                        return {x: 206, y: Math.max(0, sh - 10 - 120 - 10 - 400)};
                    case"tyres":
                        return {x: Math.max(0, sw - 10 - 420 - 10 - 240), y: Math.max(0, sh - 10 - 120)};
                    case"mgu":
                        return {x: Math.max(0, sw - 10 - 420 - 10 - 240 - 10 - 300), y: Math.max(0, sh - 10 - 40)};
                    case"pedals":
                        return {x: 10, y: Math.max(0, sh - 10 - 64)};
                    case"inputsGraph":
                        return {x: 10, y: Math.max(0, sh - 10 - 64 - 10 - 64)};
                    case"carLeftRight":
                        return {x: sw - 728 >> 1, y: 26};
                    case"trackMap":
                        return {x: Math.max(0, sw - 10 - 420), y: 54};
                    case"twitchChat":
                        return {x: Math.max(0, sw - 10 - 420), y: Math.max(0, sh - 10 - 220 - 10 - 240)};
                    case"followers":
                        return {x: Math.max(0, sw - 380), y: Math.max(0, sh - 240 - 240 - 180 - 10)};
                    case"counters":
                        return {x: Math.max(0, sw - 200 - 10), y: 10}
                }
            }
        }
    }, {}], 5: [function (require, module, exports) {
        var appWindow, isWeb;
        window.electron ? appWindow = electron.appWindow : isWeb = !0, angular.module("is-app-maximized", []).directive("appIsMaximized", (function () {
            return {
                link: function (scope, element, attrs) {
                    var appWindowListeners, destroy, e, update;
                    if (!isWeb) return update = async function () {
                        element.toggleClass("maximized", await appWindow.isMaximized()), scope.$apply()
                    }, appWindowListeners = function () {
                        var i, len, ref, results;
                        for (results = [], i = 0, len = (ref = ["maximize", "unmaximize"]).length; i < len; i++) e = ref[i], results.push(appWindow.on(e, update));
                        return results
                    }(), update(), destroy = function () {
                        var i, l, len, results;
                        for (results = [], i = 0, len = appWindowListeners.length; i < len; i++) l = appWindowListeners[i], results.push(l());
                        return results
                    }, window.addEventListener("unload", destroy), scope.$on("$destroy", destroy)
                }
            }
        }))
    }, {}], 6: [function (require, module, exports) {
        module.exports = function (key) {
            return key.match(/([A-Z0-9]+|[A-Z0-9]?[a-z0-9]+)(?=[A-Z0-9]|\b)/g).join("-").toLowerCase()
        }
    }, {}], 7: [function (require, module, exports) {
        var avoidPitEntryGlitchByTrack;
        avoidPitEntryGlitchByTrack = require("./pit-entry-glitch-data"), angular.module("ir.fuel-calc", ["ngStorage", "ir.service", "ir.session-time-lap", "ir.filters"]).config((function (iRServiceProvider) {
            return iRServiceProvider.addOptions({
                requestParams: ["DisplayUnits", "IsInGarage", "IsOnTrack", "IsReplayPlaying", "LapDistPct", "LFwearR", "OnPitRoad", "PlayerTrackSurface", "SessionFlags", "SessionInfo", "SessionNum", "SessionState"],
                requestParamsOnce: ["DriverInfo", "WeekendInfo"]
            })
        })).config((function (iRFastServiceProvider) {
            return iRFastServiceProvider.addOptions({requestParams: ["FuelLevel", "PitSvFlags", "PitSvFuel"]})
        })).service("FuelCalc", (function ($rootScope, $localStorage, iRService, iRFastService, SessionTimeLapService) {
            var avoidPitEntryGlitch, calcRefuel, checkFlags, dataEmpty, fuelCalcStorage, fuels, inTestMode, ir, irFast,
                lapStarted, lapsComplete, lapsLeft, lastDist, lastFuelLevel, leaderLapsComplete, scope,
                startMidRaceWatcher, updateCarFuelCalc, usageQualy, usageStorage, useImpGal, useKg, wasOnPitLane;
            return scope = $rootScope.$new(), ir = scope.ir, irFast = scope.irFast, dataEmpty = {
                fuelLevel: null,
                raceLaps: null,
                leaderRaceLaps: null,
                usageAvg: null,
                usageQualy: null,
                usageLast: null,
                usageCustom: null,
                remainAvg: null,
                remainQualy: null,
                remainLast: null,
                remainCustom: null,
                refuelAvg: null,
                refuelQualy: null,
                refuelLast: null,
                refuelCustom: null,
                extraMode: 2,
                extraAvg: null,
                extraQualy: null,
                extraLast: null,
                extraCustom: null,
                pitWindowOpen: !1,
                gridFuelWarning: !1,
                lowFuelState: 0
            }, $localStorage.$default({
                fuelCalc: {
                    extraMode: 2,
                    usage: {}
                }
            }), fuelCalcStorage = $localStorage.fuelCalc, usageStorage = null, dataEmpty.extraMode = fuelCalcStorage.extraMode, angular.extend(scope, dataEmpty), useKg = useImpGal = !1, 5, fuels = [], lastDist = null, lapStarted = !1, leaderLapsComplete = null, lapsComplete = 0, lastFuelLevel = null, usageQualy = null, lapsLeft = null, wasOnPitLane = !1, inTestMode = !1, avoidPitEntryGlitch = null, scope.setTestMode = function (value) {
                return inTestMode = value
            }, scope.normalize = function (fuel) {
                return inTestMode && (ir.DisplayUnits = 1), useKg && (fuel *= ir.DriverInfo.DriverCarFuelKgPerLtr || .75), ir.DisplayUnits || (fuel *= useImpGal ? .21996924829909 : useKg ? 2.20462262 : .264172052), fuel
            }, scope.reverseNormalize = function (fuel) {
                return useKg && (fuel /= ir.DriverInfo.DriverCarFuelKgPerLtr || .75), ir.DisplayUnits || (fuel /= useImpGal ? .21996924829909 : useKg ? 2.20462262 : .264172052), fuel
            }, scope.$watch("ir.connected", (function (n, o) {
                var usageStorageWaiter;
                if (!inTestMode && n) return angular.extend(scope, dataEmpty), usageStorage = null, useKg = useImpGal = !1, fuels = [], lastDist = null, lapStarted = !1, leaderLapsComplete = null, lapsComplete = 0, lastFuelLevel = null, usageQualy = null, lapsLeft = null, wasOnPitLane = !1, avoidPitEntryGlitch = null, usageStorageWaiter = scope.$watchGroup(["ir.WeekendInfo", "ir.DriverInfo"], (function () {
                    var base, base1, carId, name, name1, trackId;
                    if (ir.WeekendInfo && ir.DriverInfo) return usageStorageWaiter(), carId = ir.DriversByCarIdx[ir.DriverInfo.DriverCarIdx].CarID, trackId = ir.WeekendInfo.TrackID, avoidPitEntryGlitch = avoidPitEntryGlitchByTrack[trackId], null == (base = fuelCalcStorage.usage)[name = carId.toString()] && (base[name] = {}), null == (base1 = fuelCalcStorage.usage[carId])[name1 = trackId.toString()] && (base1[name1] = {}), usageStorage = fuelCalcStorage.usage[carId][trackId], scope.usageAvg = usageStorage.avg, scope.usageQualy = usageStorage.qualy, scope.usageCustom = usageStorage.custom, updateCarFuelCalc(!0)
                }))
            })), scope.$watch("ir.DriverInfo", (function (n, o) {
                var carId;
                if (null != n) return carId = ir.DriversByCarIdx[ir.DriverInfo.DriverCarIdx].CarID, useKg = 33 === carId || 39 === carId || 71 === carId || 77 === carId || 145 === carId, useImpGal = 25 === carId || 42 === carId
            })), scope.$watch("ir.SessionNum", (function (n, o) {
                if (!SessionTimeLapService.isSessionEnds) return n > o ? (leaderLapsComplete = 0, lapsComplete = 0) : void 0
            })), scope.$watch("ir.PlayerTrackSurface", (function (n, o) {
                var ref;
                if ((-1 === n || 3 === o && 1 === n || 1 === o && 3 === n) && (lastDist = null, lastFuelLevel = null, lapStarted = !1), -1 === o && 3 === n && ir.SessionState < 4 && (updateCarFuelCalc(!0), wasOnPitLane = !1), 1 !== n && 2 !== n || avoidPitEntryGlitch && !(avoidPitEntryGlitch[0] > (ref = ir.LapDistPct) && ref > avoidPitEntryGlitch[1]) || (lapStarted = !1, wasOnPitLane = ir.LapDistPct > .5), 2 === o && 1 === n) return SessionTimeLapService.isRaceStartCoolDownEnds && ir.LapDistPct > .5 && lapsLeft--, updateCarFuelCalc(!0)
            })), scope.$watch("ir.LFwearR", (function (n, o) {
                return lapStarted = !1
            })), scope.$watch("ir.SessionFlags", checkFlags = function () {
                var flags, ref;
                return null != (flags = ir.SessionFlags) && -1 !== flags && (!(512 & flags && !(1 & flags) && "Test" !== (null != (ref = ir.WeekendInfo) ? ref.EventType : void 0) || 574464 & flags) || (lapStarted = !1, wasOnPitLane = !1, !1))
            }), scope.$watch("irFast.FuelLevel", (function (n, o) {
                if (!inTestMode && null != n) return n > 0 && (scope.fuelLevel = n, ir.IsInGarage || ir.OnPitRoad && 1 === ir.PlayerTrackSurface || ir.IsReplayPlaying && -1 === ir.PlayerTrackSurface || 1 === ir.SessionState && 3 === ir.PlayerTrackSurface) ? updateCarFuelCalc(!0) : void 0
            })), updateCarFuelCalc = function (updateDisplayOnly = !1) {
                var curFuelLevel, dist, f, isCheckFlags, lapChanged, legitLap, pos, ref, total, usage;
                if (!inTestMode) {
                    if (dist = -1 !== ir.LapDistPct ? ir.LapDistPct : null, curFuelLevel = irFast.FuelLevel, lapChanged = !1, ir.IsOnTrack && (null != lastFuelLevel && curFuelLevel > lastFuelLevel && (lapStarted = !1), null != dist && (dist < .1 && null != lastDist && lastDist > .9 && ((isCheckFlags = checkFlags()) && lapStarted || (updateDisplayOnly = !0, lastFuelLevel = curFuelLevel, delete scope.usageLast, delete scope.remainLast, delete scope.refuelLast, delete scope.extraLast), isCheckFlags && (lapChanged = lapStarted, lapStarted = !wasOnPitLane, wasOnPitLane = !1), SessionTimeLapService.isRace && (pos = null != (ref = ir.PositionsByCarIdx[ir.SessionNum]) ? ref[ir.DriverInfo.DriverCarIdx] : void 0, leaderLapsComplete = SessionTimeLapService.leaderLap - 1, lapsComplete = 0, pos && SessionTimeLapService.isRaceStartCoolDownEnds && (lapsComplete = pos.LapsComplete + 1), lapsLeft = Math.ceil(SessionTimeLapService.driverRaceLaps) - Math.max(0, leaderLapsComplete, lapsComplete)), SessionTimeLapService.isFinish && SessionTimeLapService.isRaceStartCoolDownEnds && (lapsLeft = 0)), lastDist = dist)), lapChanged) {
                        if (4 === ir.SessionState) if (legitLap = !(ir.OnPitRoad || 49152 & ir.SessionFlags), SessionTimeLapService.isRace && !SessionTimeLapService.isDriverSpectating && (legitLap = legitLap && SessionTimeLapService.currentCarLap >= 2), legitLap && null != curFuelLevel && curFuelLevel >= 0 && null != lastFuelLevel && lastFuelLevel > curFuelLevel) {
                            usage = lastFuelLevel - curFuelLevel, fuels.push(usage);
                            try {
                                -1 !== ir.SessionInfo.Sessions[ir.SessionNum].SessionType.search(/qual/i) && (usageQualy = usage)
                            } catch (error) {
                            }
                            for (scope.usageLast = usage; fuels.length > 5;) fuels.shift()
                        } else delete scope.usageLast, delete scope.remainLast, delete scope.refuelLast, delete scope.extraLast;
                        lastFuelLevel = curFuelLevel
                    }
                    return (lapChanged || updateDisplayOnly) && (fuels.length || null != scope.usageAvg) && (fuels.length && ((f = fuels.slice()).length >= 3 && (f = f.sort().slice(1, -1)), total = f.reduce((function (a, b) {
                        return a + b
                    })), scope.usageAvg = total / f.length), scope.remainAvg = curFuelLevel / scope.usageAvg, null != scope.usageQualy && (scope.remainQualy = curFuelLevel / scope.usageQualy), null != scope.usageLast && (scope.remainLast = curFuelLevel / scope.usageLast), null != scope.usageCustom && (scope.remainCustom = curFuelLevel / scope.usageCustom), calcRefuel(), lapChanged && null != usageStorage) ? usageStorage.avg = Math.ceil(1e3 * scope.usageAvg) / 1e3 : void 0
                }
            }, scope.$watch("ir.LapDistPct", (function () {
                return updateCarFuelCalc()
            })), calcRefuel = function () {
                var fuelOnPit;
                if (!inTestMode && lapsLeft > 0) switch (null != scope.usageAvg && (scope.refuelAvg = (lapsLeft - scope.remainAvg) * scope.usageAvg, scope.refuelAvg >= 1 && (scope.refuelAvg += .5)), null != scope.usageQualy && (scope.refuelQualy = (lapsLeft - scope.remainQualy) * scope.usageQualy, scope.refuelQualy >= 1 && (scope.refuelQualy += .5)), null != scope.usageLast && (scope.refuelLast = (lapsLeft - scope.remainLast) * scope.usageLast, scope.refuelLast >= 1 && (scope.refuelLast += .5)), null != scope.usageCustom && (scope.refuelCustom = (lapsLeft - scope.remainCustom) * scope.usageCustom, scope.refuelCustom >= 1 && (scope.refuelCustom += .5)), scope.extraMode) {
                    case 0:
                        if (null != scope.usageAvg && (scope.extraAvg = scope.refuelAvg - scope.usageAvg), null != scope.usageQualy && (scope.extraQualy = scope.refuelQualy - scope.usageQualy), null != scope.usageLast && (scope.extraLast = scope.refuelLast - scope.usageLast), null != scope.usageCustom) return scope.extraCustom = scope.refuelCustom - scope.usageCustom;
                        break;
                    case 1:
                        if (null != scope.usageAvg && (scope.extraAvg = scope.refuelAvg + scope.usageAvg), null != scope.usageQualy && (scope.extraQualy = scope.refuelQualy + scope.usageQualy), null != scope.usageLast && (scope.extraLast = scope.refuelLast + scope.usageLast), null != scope.usageCustom) return scope.extraCustom = scope.refuelCustom + scope.usageCustom;
                        break;
                    case 2:
                        if (1 !== ir.PlayerTrackSurface && (fuelOnPit = 16 & irFast.PitSvFlags ? irFast.PitSvFuel : 0, null != scope.usageAvg && (scope.extraAvg = (scope.remainAvg - lapsLeft) * scope.usageAvg, scope.extraAvg >= -2 && (fuelOnPit = 0), scope.extraAvg = Math.max(0, scope.extraAvg + fuelOnPit)), null != scope.usageQualy && (scope.extraQualy = Math.max(0, (scope.remainQualy - lapsLeft) * scope.usageQualy + fuelOnPit)), null != scope.usageLast && (scope.extraLast = Math.max(0, (scope.remainLast - lapsLeft) * scope.usageLast + fuelOnPit)), null != scope.usageCustom)) return scope.extraCustom = Math.max(0, (scope.remainCustom - lapsLeft) * scope.usageCustom + fuelOnPit)
                }
            }, scope.$watch("ir.SessionInfo", (function (n, o) {
                var i, j, len, len1, r, ref, ref1, results, s, session;
                if (null != usageQualy) {
                    for (i = 0, len = (ref = ir.SessionInfo.Sessions).length; i < len; i++) if (-1 !== (s = ref[i]).SessionType.search(/qual/i)) {
                        session = s;
                        break
                    }
                    if (null != session) {
                        for (results = [], j = 0, len1 = (ref1 = session.ResultsPositions).length; j < len1; j++) if ((r = ref1[j]).CarIdx === ir.DriverInfo.DriverCarIdx) {
                            r.LapsComplete === r.FastestLap && (scope.usageQualy = usageQualy, scope.remainQualy = lastFuelLevel / usageQualy, usageStorage.qualy = Math.ceil(1e3 * scope.usageQualy) / 1e3, usageQualy = null, calcRefuel());
                            break
                        }
                        return results
                    }
                }
            })), scope.$watch((function () {
                return SessionTimeLapService.driverRaceLaps
            }), (function (n, o) {
                if (!inTestMode && null != n && n > 0) return scope.raceLaps = n, SessionTimeLapService.isRace ? SessionTimeLapService.isFinish || SessionTimeLapService.isSessionEnds || (lapsLeft = Math.ceil(n) - Math.max(0, leaderLapsComplete, lapsComplete)) : lapsLeft = Math.ceil(n), calcRefuel()
            })), scope.$watch((function () {
                return SessionTimeLapService.leaderRaceLaps
            }), (function (n, o) {
                if (!inTestMode) return scope.leaderRaceLaps = n
            })), scope.$watch((function () {
                return SessionTimeLapService.leaderLap
            }), (function (n, o) {
                if (null != n && n > 0 && SessionTimeLapService.isRace && !SessionTimeLapService.isFinish && !SessionTimeLapService.isSessionEnds && 1 === ir.PlayerTrackSurface) return leaderLapsComplete = SessionTimeLapService.leaderLap - 1, lapsLeft = Math.ceil(scope.raceLaps) - Math.max(0, leaderLapsComplete, lapsComplete), calcRefuel()
            })), startMidRaceWatcher = scope.$watchGroup([function () {
                return SessionTimeLapService.isRace
            }, "ir.DriverInfo"], (function () {
                var ref;
                if (null != ir.DriverInfo && null != SessionTimeLapService.isRace) return SessionTimeLapService.isRace && SessionTimeLapService.isRaceStartCoolDownEnds && (null != (ref = ir.PositionsByCarIdx[ir.SessionNum]) ? ref[ir.DriverInfo.DriverCarIdx] : void 0) && (leaderLapsComplete = SessionTimeLapService.leaderLap - 1, lapsComplete = SessionTimeLapService.currentCarLap - 1, lapsLeft = Math.ceil(SessionTimeLapService.driverRaceLaps) - Math.max(0, leaderLapsComplete, lapsComplete), lapsLeft -= ir.LapDistPct, updateCarFuelCalc(!0)), startMidRaceWatcher()
            })), scope.$watch("usageCustom", (function (n, o) {
                var fuel;
                if (null != n && (null != usageStorage && (usageStorage.custom = Math.ceil(1e3 * n) / 1e3), fuel = lastFuelLevel || scope.fuelLevel, ir.IsOnTrack || (fuel = scope.fuelLevel), null != fuel)) return scope.remainCustom = fuel / scope.usageCustom, calcRefuel()
            })), scope.$watch("extraMode", (function () {
                return calcRefuel(), fuelCalcStorage.extraMode = dataEmpty.extraMode = scope.extraMode
            })), scope.$on("broadcastMessage", (function (event, data) {
                var refuel, usage;
                if (null != data.fuelCalc) {
                    if ("extraMode" in data.fuelCalc && (scope.extraMode = data.fuelCalc.extraMode), "usageCustom" in data.fuelCalc && (scope.usageCustom = data.fuelCalc.usageCustom), "usageCustomFrom" in data.fuelCalc && (usage = function () {
                        switch (data.fuelCalc.usageCustomFrom) {
                            case"average":
                                return scope.usageAvg;
                            case"qualy":
                                return scope.usageQualy;
                            case"last":
                                return scope.usageLast
                        }
                    }()) && (scope.usageCustom = usage), "requestRefuelFrom" in data.fuelCalc) {
                        refuel = function () {
                            switch (data.fuelCalc.requestRefuelFrom) {
                                case"average":
                                    return scope.refuelAvg;
                                case"qualy":
                                    return scope.refuelQualy;
                                case"last":
                                    return scope.refuelLast;
                                case"custom":
                                    return scope.refuelCustom
                            }
                        }();
                        try {
                            iRService.broadcast({fuelCalc: {responseRefuel: refuel}})
                        } catch (error) {
                        }
                    }
                    return scope.$apply()
                }
            })), scope.$watchGroup(["irFast.PitSvFlags", "irFast.PitSvFuel"], (function () {
                return calcRefuel()
            })), scope.$watchGroup(["irFast.FuelLevel", "IsOnTrack", "ir.IsInGarage", "ir.OnPitRoad"], (function () {
                var tank;
                if (!inTestMode && null != scope.fuelLevel && null != ir.DriverInfo) return !SessionTimeLapService.isRace || SessionTimeLapService.isSessionEnds || scope.refuelAvg < 1 || !ir.IsOnTrack || ir.IsInGarage || ir.OnPitRoad ? (scope.pitWindowOpen = !1, void (scope.lowFuelState = 0)) : (scope.lowFuelState = scope.remainAvg < 2 ? 2 : scope.remainAvg < 3 ? 1 : 0, tank = ir.DriverInfo.DriverCarFuelMaxLtr * ir.DriverInfo.DriverCarMaxFuelPct, scope.pitWindowOpen = scope.fuelLevel + scope.refuelAvg <= tank)
            })), scope.$watchGroup(["irFast.FuelLevel", "ir.SessionState"], (function () {
                var minLaps, raceLaps, tank;
                if (scope.gridFuelWarning = !1, SessionTimeLapService.isRace && ir.SessionState < 2 && scope.raceLaps > 0 && scope.usageAvg > 0 && irFast.FuelLevel > 0) {
                    if (tank = ir.DriverInfo.DriverCarFuelMaxLtr * ir.DriverInfo.DriverCarMaxFuelPct, raceLaps = Math.ceil(scope.raceLaps), minLaps = Math.min(5, raceLaps), tank > 0 && tank > raceLaps * scope.usageAvg && irFast.FuelLevel / scope.usageAvg < raceLaps) return scope.gridFuelWarning = !0;
                    if (tank / scope.usageAvg > minLaps && irFast.FuelLevel / scope.usageAvg < minLaps) return scope.gridFuelWarning = !0;
                    if (tank < raceLaps * scope.usageAvg && irFast.FuelLevel < tank - 2) return scope.gridFuelWarning = !0
                }
            })), scope
        })).directive("fuelCalcValue", (function ($filter, FuelCalc) {
            return {
                link: function (scope, element, attrs) {
                    var isExtra, isFuelLevel, isRemain, isUsageCustom, numberFormat, valueName;
                    return valueName = attrs.fuelCalcValue, numberFormat = $filter("numberFormat"), isFuelLevel = "fuelLevel" === valueName, isRemain = valueName.startsWith("remain"), isExtra = valueName.startsWith("extra"), isUsageCustom = "usageCustom" === valueName, scope.$watchGroup(["ir.DisplayUnits", `fuelCalc.${valueName}`], (function () {
                        var useCeil, value;
                        if (null != (value = scope.fuelCalc[valueName]) && !isNaN(value)) return isRemain || (value = Math.max(0, FuelCalc.normalize(value))), useCeil = !0, isFuelLevel && (useCeil = !1), 2 === FuelCalc.extraMode && isExtra && (useCeil = !1), isUsageCustom ? element.text(numberFormat(value, 10, 2, useCeil)) : element.text(numberFormat(value, 100, 2, useCeil));
                        element.text("--.--")
                    }))
                }
            }
        })).directive("fuelCalcLapsInRace", (function ($filter, SessionTimeLapService) {
            return {
                link: function (scope, element, attrs) {
                    var numberFormat, valueName;
                    return valueName = attrs.fuelCalcLapsInRace, numberFormat = $filter("numberFormat"), scope.$watch(`fuelCalc.${valueName}`, (function (n, o) {
                        if (null != n) return SessionTimeLapService.driverRaceLapsFraction ? element.text(numberFormat(n)) : element.text(n);
                        element.text("--.--")
                    }))
                }
            }
        }))
    }, {"./pit-entry-glitch-data": 8}], 8: [function (require, module, exports) {
        module.exports = {
            8: [.96, .99],
            95: [.42, .53],
            163: [.9, .92],
            164: [.78, .8],
            165: [.9, .92],
            202: [.92, .98],
            208: [.87, .97],
            219: [.53, .57]
        }
    }, {}]
}, {}, [3]);