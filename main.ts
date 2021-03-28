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
//% block="move $leftrightupdown left/right/up/down by $steps"
//% group="Moving"
//% steps.min=0 steps.max=108
export function move (leftrightupdown: LeftRightUpDown, steps: number) {
    if (leftrightupdown = 1) {
        leftright_difference += steps
    } else if (leftrightupdown = 2) {
        leftright_difference += 0 - steps
    } else if (leftrightupdown = 3) {
        updown_difference += steps
    } else if (leftrightupdown = 4) {
        updown_difference += 0 - steps
    }
    show()
}
//% block="move $leftrightupdown and $leftrightupdown2 by $steps"
//% group="Moving"
//% steps.min=0 steps.max=108
export function move_ (leftrightupdown: LeftRightUpDown, leftrightupdown2: LeftRightUpDown, steps: number) {
    move(leftrightupdown, steps)
    move(leftrightupdown2, steps)
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
//% block="spawnpoint myself at the current position"
//% group="Position"
export function spawnpoint () {
    spawn_x = x_pos()
    spawn_y = y_pos()
}
//% block="set spawnpoint to x: $x y: $y"
//% group="Position"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
export function spawnpoint_at_pos (x: number, y: number) {
    spawn_x = x
    spawn_y = y
}
//% block="Destroy all blocks"
//% group="Creating&Destroying"
export function destroy_all() {
    for(let i = 0; i < world.length; i++) {
        world.pop()
    }
}
//% block="add $details via $xy, at $at_xy"
//% group="Creating & Destroying"
//% details.defl="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
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
            if (xy = 1) {
                add(i3, at_xy)
            } else if (xy = 2)  {
                add(at_xy, i3)
            }
        }
    }
}
//% block="destroy block at x: $x y: $y"
//% group="Creating & Destroying"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
export function destroy (x: number, y: number) {
    if (block_detect(parseFloat(encode(x)), parseFloat(encode(y)))) {
        world.removeAt(find(x, y))
    }
}
//% block="which block is the block at x: $x y: $y"
//% group="Position"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
export function find (x: number, y: number) {
    return world.indexOf("" + encode(x) + encode(y))
}
//% block="go to spawnpoint"
//% group="Position"
export function spawn () {
    goto(spawn_x, spawn_y)
}
//% block="go to x: $x y: $y"
//% group="Position"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
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
//% block="is there a block at x: $x_pos y: $y_pos"
//% group="Detect"
//% x_pos.min=-9 x_pos.max=99
//% y_pos.min=-9 y_pos.max=99
export function block_detect (x_pos: number, y_pos: number) {
    return find(x_pos, y_pos) != -1
}
//% block="world $xy coordinate at item $place (min=1)"
//% group="Position"
//% place.min=1 place.max=11881
export function world_blocks (xy: XY, place: number) {
    if (xy = 1) {
        return parseFloat(world[place - 1].substr(0, 2))
    } else if (xy = 2) {
        return parseFloat(world[place - 1].substr(2, 2)) 
    }  
    return -13
}
//% block="world (array)"
//% group="Position"
export function all_world_blocks () {
    return world
}
//% block="destroy by $columnrow at $xy from $from_xy to $to_xy "
//% group="Creating & Destroying"
//% xy.min=-9 xy.max=99
//% from_xy.min=-9 from_xy.max=99
//% to_xy.min=-9 to_xy.max=99
export function destroy_by (columnrow: ColumnRow, from_xy: number, to_xy: number, xy: number) {
    if (columnrow = 1) {
        for (let index2 = from_xy; index2 <= to_xy; index2++) {
            destroy(xy, index2)
        }
    } else if (columnrow = 2) {
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
export function add_by (columnrow: ColumnRow, from_xy: number, to_xy: number, xy: number) {
    if (columnrow = 1) {
        for (let index2 = from_xy; index2 <= to_xy; index2++) {
            add(xy, index2)
        }
    } else if (columnrow = 2) {
        for (let index3 = from_xy; index3 <= to_xy; index3++) {
            add(index3, xy)
        }
    }
}
//% block="add x $x and y $y to the world"
//% group="Creating & Destroying"
//% x.min=-9 x.max=99
//% y.min=-9 y.max=99
export function add (x: number, y: number) {
    if (!(block_detect(parseFloat(encode(x)), parseFloat(encode(y))))) {
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
goto(spawn_x, spawn_y)
}