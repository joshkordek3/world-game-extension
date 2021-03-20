//% color=#088530 weight=50 icon="\uf11b" block="World"
namespace World {
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
//% block="move $leftrightupdown and $leftrightupdown by $steps"
//% group="Moving"
export function move_ (leftrightupdown: string, leftrightupdown2: string, steps: number) {
    if (leftrightupdown == "left") {
        leftright_difference += steps
    } else if (leftrightupdown == "right") {
        leftright_difference += 0 - steps
    } else if (leftrightupdown == "up") {
        updown_difference += steps
    } else if (leftrightupdown == "down") {
        updown_difference += 0 - steps
    }
        if (leftrightupdown2 == "left") {
        leftright_difference += steps
    } else if (leftrightupdown2 == "right") {
        leftright_difference += 0 - steps
    } else if (leftrightupdown2 == "up") {
        updown_difference += steps
    } else if (leftrightupdown2 == "down") {
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
//% block="number of blocks in the world"
//% group="Position"
export function world_blocks_detect () {
    return world.length
}
//% block="is there a block at x: $x_pos y: y_pos"
//% group="Detect"
export function block_detect (x_pos: number, y_pos: number) {
    temp_txt = convertToText(x_pos)
    temp_txt2 = convertToText(y_pos)
    for (let index6 = 0; index6 < 2 - temp_txt.length; index6++) {
        temp_txt = "0" + temp_txt
    }
    for (let index7 = 0; index7 < 2 - temp_txt2.length; index7++) {
        temp_txt2 = "0" + temp_txt2
    }
    return world.indexOf("" + temp_txt + temp_txt2) != -1
}
//% block="world $xy (x/y) coordinate at item $place (min=1)"
//% group="Position"
export function world_blocks (xy: string, place: number) {
    if (xy = "x") {
        return parseFloat(world[place - 1 ].substr(0, 2))
    } else if (xy = "y") {
        return parseFloat(world[place - 1].substr(2, 2)) 
    }
    return 0
}
//% block="world (array)"
//% group="Position"
export function all_world_blocks () {
    return world
}
//% block="add by $columnrow (column/row) from $from_xy to $to_xy on $xy"
//% group="Creating"
export function add_by (columnrow: string, from_xy: number, to_xy: number, xy: number) {
    if (columnrow == "column") {
        for (let index2 = 0; index2 <= to_xy - from_xy; index2++) {
            add(xy, index2 + from_xy)
        }
    } else if (columnrow == "row") {
        for (let index3 = 0; index3 <= to_xy - from_xy; index3++) {
            add(index3 + from_xy, xy)
        }
    }
}
//% block="add x $x and y $y to the world"
//% group="Creating"
export function add (x: number, y: number) {
    temp_txt = convertToText(x)
    temp_txt2 = convertToText(y)
    for (let index4 = 0; index4 < 2 - temp_txt.length; index4++) {
        temp_txt = "0" + temp_txt
    }
    for (let index5 = 0; index5 < 2 - temp_txt2.length; index5++) {
        temp_txt2 = "0" + temp_txt2
    }
    world.push("" + temp_txt + temp_txt2)
}
let temp_txt2 = ""
let temp_txt = ""
let world: string[] = []
//let world2: boolean[][] = [[]];
let updown_difference = 0
let leftright_difference = 0
}