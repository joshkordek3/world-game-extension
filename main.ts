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
        if (not(xy_pos(XY.Y) + steps > edge_o_world[3])) {
            updown_difference += steps
        }
    } else if (leftrightupdown == LeftRightUpDown.Down) {
        if (not(xy_pos(XY.Y) - steps < edge_o_world[2])) {
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
    spawn_x = xy_pos(1)
    spawn_y = xy_pos(2)
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
 * finds where the block is in the array (min=0)
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
//% block="set edge of the world to minimum x: $min_x minimum y: $min_y maximum x: $max_x maximum y: $max_y"
//% group="Position"
//% inlineInputMode=inline
/**
 * sets the edge of the world to points
*/
export function edge (min_x: number, min_y: number, max_x: number, max_y: number) {
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
export function destroy_by (columnrow: ColumnRow, from_xy: number, to_xy: number, xy: number) {
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
export function add_by (columnrow: ColumnRow, from_xy: number, to_xy: number, xy: number) {
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
function encode (oof: number) {
    temp_txt = convertToText(oof)
    for (let index4 = 0; index4 < 2 - temp_txt.length; index4++) {
        temp_txt = "0" + temp_txt
    }
    return temp_txt
}
let temp_txt = ""
let world: string[] = []
//let world2: boolean[][] = [[]];
let updown_difference = 0
let leftright_difference = 0
let spawn_x = 0
let spawn_y = 0
let edge_o_world: number[] = [-9, 99, -9, 99]
goto(spawn_x, spawn_y)
}