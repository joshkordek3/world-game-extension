enum LeftRightUpDown {
    //% block="Left"
    Left,

    //% block="Right"
    Right,

    //% block="Up"
    Up,

    //% block="Down"
    Down,
}
enum UpDown {
    //% block="Up"
    Up,

    //% block="Down"
    Down,
}
enum LeftRight {
    //% block="Left"
    Left,

    //% block="Right"
    Right,
}
enum ColumnRow {
    //% block="Column"
    Column,

    //% block="Row"
    Row,
}
enum XY {
    //% block="X"
    X,

    //% block="Y"
    Y,
}
enum FilledUn {
    //% block="Filled"
    Filled,

    //% block="Unfilled"
    Unfilled,
}
enum OneTwo {
    //% block="one way"
    OneWay,

    //% block="two way"
    TwoWay,
}
//% color=#088530 weight=50 icon="\uf11b" block="World"
namespace World {
//% block="move $leftrightupdown by $steps"
//% group="Moving"
/** 
 * moves what blocks you see in the direction you pick
*/
export function move (leftrightupdown: LeftRightUpDown, steps: number) {
    for(let i = 0; i < steps; i++) {
        move_(leftrightupdown, 1)
    }
    if (not(disabled_portal == "")) {
        portals_two_way.push(disabled_portal)
        disabled_portal = ""
    }
    show()
}
function move_ (leftrightupdown: LeftRightUpDown, steps: number) {
    if (leftrightupdown == LeftRightUpDown.Left) {
        if (not(xy_pos(XY.X) - steps < edge_o_world[0])) {
            leftright_difference += steps
        }
    } else if (leftrightupdown == LeftRightUpDown.Right) {
        if (not(xy_pos(XY.X) + steps > edge_o_world[1])) {
            leftright_difference += 0 - steps
        }
    } else if (leftrightupdown == LeftRightUpDown.Up) {
        if (not(xy_pos(XY.Y) - steps < edge_o_world[2])) {
            updown_difference += steps
        }
    } else if (leftrightupdown == LeftRightUpDown.Down) {
        if (not(xy_pos(XY.Y) + steps > edge_o_world[3])) {
            updown_difference += 0 - steps
        }
    }
}
function not (bool: boolean) {
    return (!(bool))
}
//% block="move %leftright and %updown by $steps"
//% group="Moving"
/** 
 * self-explanatory
*/
export function move_diagonally (leftright: LeftRight, updown: UpDown, steps: number) {
    for(let i = 0; i < steps; i++) {
        move__diagonally(leftright, updown, 1)
    }
    if (not(disabled_portal == "")) {
        portals_two_way.push(disabled_portal)
        disabled_portal = ""
    }
    show()
}
function move__diagonally (leftright: LeftRight, updown: UpDown, steps: number) {
    if (leftright == LeftRight.Left) {
        if (not(xy_pos(XY.X) - steps < edge_o_world[0])) {
            leftright_difference += steps
        }
    } else if (leftright == LeftRight.Right) {
        if (not(xy_pos(XY.X) + steps > edge_o_world[1])) {
            leftright_difference += 0 - steps
        }
    } 
    if (updown == UpDown.Up) {
        if (not(xy_pos(XY.Y) + steps > edge_o_world[3])) {
            updown_difference += steps
        }
    } else if (updown == UpDown.Down) {
        if (not(xy_pos(XY.Y) - steps < edge_o_world[2])) {
            updown_difference += 0 - steps
        }
    }
}
//% block="draw the world"
//% group="Diplaying"
/**
 * updates the display of the world so that it moves appropriately
*/
export function show () {
    basic.clearScreen()
    for (let index = 0; index < world.length; index++) {
        led.plot(world_blocks(XY.X, index) + leftright_difference, world_blocks(XY.Y, index) + updown_difference)
    }
}
//% block="add a circle at x: $x y: $y with a radius of $radius $filled"
//% group="Creating & Destroying"
//% radius.fieldOptions.precision=1
//% inlineInputMode=inline
/**
 * adds a circle
*/
export function add_circle (x: number, y: number, radius: number, filled: FilledUn) {
    diam = (radius * 2) + 1
    for(let i = 0; i < diam; i++) {
        add_by(ColumnRow.Row, y + radius - i, 0 - radius + x, radius + x)
    }
    if (filled == FilledUn.Unfilled) {
        destroy_circle(x, y, radius - 1, FilledUn.Filled)
    }
}
//% block="add a portal at x: $x y: $y that goes to x: $tox y: $toy and is $_type"
//% group="Creating & Destroying"
//% inlineInputMode=inline
/**
 * adds a portal
*/
export function add_portal (x: number, y: number, tox: number, toy: number, _type: OneTwo) {
    if (_type == OneTwo.OneWay) {
        portals_one_way.push("" + encode(x) + encode(y) + encode(tox) + encode(toy))
    } else if (_type == OneTwo.TwoWay) {
        portals_two_way.push("" + encode(x) + encode(y) + encode(tox) + encode(toy))
    }
}
//% block="destroy a circle at x: $x y: $y with a radius of $radius $filled"
//% group="Creating & Destroying"
//% radius.fieldOptions.precision=1
//% inlineInputMode=inline
/**
 * destroys a circle
*/
export function destroy_circle (x: number, y: number, radius: number, filled: FilledUn) {
    diam = (radius * 2) + 1
    for(let i = 0; i < diam; i++) {
        destroy_by(ColumnRow.Row, y + radius - i, 0 - radius + x, radius + x)
    }
    if (filled == FilledUn.Unfilled) {
        add_circle(x, y, radius - 1, FilledUn.Filled)
    }
}
//% block="$xy position"
//% group="Position"
/**
 * gives you the x or y position you are at according to what you see
*/
export function xy_pos (xy: XY) {
    if (xy == XY.X) {
        return 2 - leftright_difference
    } else if (xy == XY.Y) {
        return 2 - updown_difference
    }
    return 0
}
//% block="spawnpoint myself at the current position"
//% group="Spawnpoint"
/**
 * sets your spawn point to the position you are at
*/
export function spawnpoint () {
    spawn_x = xy_pos(XY.X)
    spawn_y = xy_pos(XY.Y)
}
//% block="set spawnpoint to x: $x y: $y"
//% group="Spawnpoint"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
/**
 * sets your spawn point to x and y
*/
export function spawnpoint_at_pos (x: number, y: number) {
    spawn_x = x
    spawn_y = y
}
//% block="Destroy all blocks"
//% group="Creating & Destroying"
/**
 * removes all blocks from the world
*/
export function destroy_all() {
    for(let i = 0; i < world.length; i++) {
        world.pop()
    }
}
//% block="add $details via $xy, at $at_xy"
//% group="Creating & Destroying"
//% details.defl="0000000000"
//% inlineInputMode=inline
/**
 * adds stuff led display style (post in issues on github if you do not understand)
*/
export function add_advanced (xy: XY, at_xy: number, details: string) {
    for(let i = 0; i < 109 - details.length; i++) {
        details = details + "0"
    }
    for(let i2 = 0; i2 < world.length; i2++) {
        if (world_blocks(xy, i2) == at_xy) {
            world.removeAt(i2)
            i2--
        }
    }
    for(let i3 = -9; i3 < 100; i3++) {
        if (parseFloat(details.charAt(i3 + 9)) == 1) {
            if (xy == XY.X) {
                add(i3, at_xy)
            } else if (xy == XY.Y)  {
                add(at_xy, i3)
            }
        }
    }
}
//% block="destroy block at x: $x y: $y"
//% group="Creating & Destroying"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
/**
 * destroys the blocks at x and y
*/
export function destroy (x: number, y: number) {
    if (block_detect(parseFloat(encode(x)), parseFloat(encode(y)))) {
        world.removeAt(find(x, y))
    }
}
//% block="which block is at x: $x y: $y"
//% group="Position"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
/**
 * finds where the block is in the array
*/
export function find (x: number, y: number) {
    return world.indexOf("" + encode(x) + encode(y))
}
//% block="go to spawnpoint"
//% group="Position"
/**
 * goes to your spawn point
*/
export function spawn () {
    goto(spawn_x, spawn_y)
    if (not(disabled_portal == "")) {
        portals_two_way.push(disabled_portal)
        disabled_portal = ""
    }
}
//% block="go to x: $x y: $y"
//% group="Position"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
/**
 * goes to x and y
*/
export function goto (x: number, y: number) {
    updown_difference = 2 - y
    leftright_difference = 2 - x
    if (not(disabled_portal == "")) {
        portals_two_way.push(disabled_portal)
        disabled_portal = ""
    }
    show()
}
//% block="number of blocks in the world"
//% group="Position"
/**
 * gives you the length of the array
*/
export function world_blocks_detect () {
    return world.length
}
//% block="is there a block at x: $x_pos y: $y_pos"
//% group="Detect"
//% x_pos.min=-9 x_pos.max=99
//% y_pos.min=-9 y_pos.max=99
/**
 * checks whether or not there is a block at x and y
*/
export function block_detect (x_pos: number, y_pos: number) {
    return find(x_pos, y_pos) != -1
}
//% block="world $xy coordinate at item $place"
//% group="Position"
//% place.min=1 place.max=11881
/**
 * gives you the x or y of an item in the array
*/
export function world_blocks (xy: XY, place: number) {
    if (xy == XY.X) {
        return parseFloat(world[place].substr(0, 2))
    } else if (xy = XY.Y) {
        return parseFloat(world[place].substr(2, 2)) 
    }  
    return -13
}
//% block="set edge of the world to minimum x: $min_x maximum x: $max_x minimum y: $min_y maximum y: $max_y"
//% group="Position"
//% inlineInputMode=inline
/**
 * sets the edge of the world to points
*/
export function edge (min_x: number, max_x: number, min_y: number, max_y: number) {
    edge_o_world = [min_x, max_x, min_y, max_y]
}
//% block="world (array)"
//% group="Position"
/**
 * gives you do the array that you can do whatever you want with
*/
export function all_world_blocks () {
    return world
}
//% block="destroy by $columnrow at $xy from $from_xy to $to_xy "
//% group="Creating & Destroying"
//% xy.min=-9 xy.max=99
//% from_xy.min=-9 from_xy.max=99
//% to_xy.min=-9 to_xy.max=99
//% inlineInputMode=inline
/**
 * self-explanatory
*/
export function destroy_by (columnrow: ColumnRow, xy: number, from_xy: number, to_xy: number) {
    if (columnrow == ColumnRow.Column) {
        for (let index2 = from_xy; index2 <= to_xy; index2++) {
            destroy(xy, index2)
        }
    } else if (columnrow == ColumnRow.Row) {
        for (let index3 = from_xy; index3 <= to_xy; index3++) {
            destroy(index3, xy)
        }
    }
}
//% block="add by $columnrow at $xy from $from_xy to $to_xy "
//% group="Creating & Destroying"
//% xy.min=-9 xy.max=99
//% from_xy.min=-9 from_xy.max=99
//% to_xy.min=-9 to_xy.max=99
//% inlineInputMode=inline
/**
 * self-explanatory
*/
export function add_by (columnrow: ColumnRow, xy: number, from_xy: number, to_xy: number) {
    if (columnrow == ColumnRow.Column) {
        for (let index2 = from_xy; index2 <= to_xy; index2++) {
            add(xy, index2)
        }
    } else if (columnrow == ColumnRow.Row) {
        for (let index3 = from_xy; index3 <= to_xy; index3++) {
            add(index3, xy)
        }
    }
}
//% block="add x $x and y $y to the world"
//% group="Creating & Destroying"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
/**
 * self-explanatory
*/
export function add (x: number, y: number) {
    if (not(block_detect(parseFloat(encode(x)), parseFloat(encode(y))))) {
        world.push("" + encode(x) + encode(y))
    }
}
function decode (txt: string) {
    return parseFloat(txt)
}
function c1 (txt: string) {
    return decode(txt.substr(0, 2)) == xy_pos(XY.X) && decode(txt.substr(2, 2)) == xy_pos(XY.Y)
}
function c21 (txt: string) {
    return decode(txt.substr(0, 2)) == xy_pos(XY.X) && decode(txt.substr(2, 2)) == xy_pos(XY.Y)
}
function c22 (txt: string) {
    return decode(txt.substr(4, 2)) == xy_pos(XY.X) && decode(txt.substr(6, 2)) == xy_pos(XY.Y)
}
function do_ur_magic1 (txt: string) {
    if (c1(txt)) {
        goto(decode(txt.substr(4, 2)), decode(txt.substr(6, 2)))
    }
}
function do_ur_magic2 (txt: string) {
    if (c21(txt)) {
        goto(decode(txt.substr(4, 2)), decode(txt.substr(6, 2)))
    } else if (c22(txt)) {
        goto(decode(txt.substr(0, 2)), decode(txt.substr(2, 2)))
    }
    disabled_portal = txt
    portals_two_way.removeAt(portals_two_way.indexOf(txt))
}
function encode (oof: number) {
    temp_txt = convertToText(oof)
    for (let index4 = 0; index4 < 2 - temp_txt.length; index4++) {
        temp_txt = "0" + temp_txt
    }
    return temp_txt
}
basic.forever(function () {
    for(let i = 0; i < portals_one_way.length; i++) {
        do_ur_magic1(portals_one_way[i])
    }
    for(let i2 = 0; i2 < portals_two_way.length; i2++) {
        do_ur_magic2(portals_two_way[i2])
    }
})
let disabled_portal = ""
let temp_txt = ""
let world: string[] = []
let portals_two_way: string[] = []
let portals_one_way: string[] = []
let updown_difference = 0
let leftright_difference = 0
let spawn_x = 0
let spawn_y = 0
let edge_o_world: number[] = [-9, 99, -9, 99]
let diam = 0
goto(spawn_x, spawn_y)
}