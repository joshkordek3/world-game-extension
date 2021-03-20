//% color=#088530 weight=50 icon="\uf11b" block="Game"
namespace world {
//% block="move $leftrightupdown left/right/up/down by $steps"
//% group="Moving"
export function move (leftrightupdown: string, steps: number) {
    if (leftrightupdown == "left") {
        leftright_difference += steps
    } else if (leftrightupdown == "right") {
        leftright_difference += 0 - steps
    } else if (leftrightupdown == "up") {
        updown_difference += steps
    } else if (leftrightupdown == "down") {
        updown_difference += 0 - steps
    }
    show()
}
//% block="update the display of the world"
//% group="Diplaying"
export function show () {
    basic.clearScreen()
    for (let index = 0; index <= world.length - 1; index++) {
        led.plot(parseFloat(world[index].substr(0, 2)) + leftright_difference, parseFloat(world[index].substr(2, 2)) + updown_difference)
    }
}
//% block="x position"
//% group="Position"
export function x_pos () {
    return 2 - leftright_difference
}
//% block="y position"
//% group="Position"
export function y_pos () {
    return 2 - updown_difference
}
//% block="go to x: $x y: $y"
//% group="Position"
export function goto (x: number, y: number) {
    updown_difference = 2 - y
    leftright_difference = 2 - x
    show()
}
//% block="add by $columnrow (column/row) from $from_xy to $to_xy on $xy "
//% group="Creating"
export function add_by (columnrow: string, from_xy: number, to_xy: number, xy: number) {
    if (columnrow == "column") {
        for (let index = 0; index <= to_xy - from_xy; index++) {
            add(xy, index + from_xy)
        }
    } else if (columnrow == "row") {
        for (let index = 0; index <= to_xy - from_xy; index++) {
            add(index + from_xy, xy)
        }
    }
}
//% block="add x $x and y $y to the world"
//% group="Creating"
export function add (x: number, y: number) {
    temp_txt = convertToText(x)
    temp_txt2 = convertToText(y)
    for (let index = 0; index < 2 - temp_txt.length; index++) {
        temp_txt = "0" + temp_txt
    }
    for (let index = 0; index < 2 - temp_txt2.length; index++) {
        temp_txt2 = "0" + temp_txt2
    }
    world.push("" + temp_txt + temp_txt2)
}
let temp_txt2 = ""
let temp_txt = ""
let world: string[] = []
let updown_difference = 0
let leftright_difference = 0
}