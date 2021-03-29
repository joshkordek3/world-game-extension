## Example Game
(note: this part is not literal code, literal code is below)
```
on start {
    World.add_by("row", 1, -9, 99)
    World.show()
    let gravity_effect = 100
}
forever {
    if button a+b pressed {
        if world detects block on x_pos, y_pos+1 {
            repeat 2 {
                if not world detects block on x_pos, y_pos-1 {
                    World.move("up", 1)
                    pause 50 (ms)
                }
            }
        }
    } elif button b pressed {
        if not world detects block on x_pos+1, y_pos {
            World.move("right", 1)
        }
    } elif button a pressed {
        if not world detects block on x_pos-1, y_pos {
        World.move("left", 1)
        }
    }
    if button a pressed or button b pressed or button a+b pressed {
        led.plot(2, 2)
        pause 200 (ms)
    }
    gravity()
}
function gravity () {
    for index from 0 to 1e+300 {
        if world detects block on x_pos, y_pos+1 {
            break
        }
        World.move("down", 1)
        pause 200-(gravity_effect*(index+1)) (ms)
    }
}
```
literal code:
```
let gravity_effect = 100
let speed = 100
let jump = 100
World.add_by(
ColumnRow.Row,
2,
-2,
2
)
World.add_by(
ColumnRow.Column,
-2,
2,
-2
)
World.add_by(
ColumnRow.Column,
2,
2,
-2
)
World.add_by(
ColumnRow.Row,
-2,
-2,
2
)
World.show()
basic.forever(function () {
    if (World.block_detect(World.xy_pos(XY.X), World.xy_pos(XY.Y))) {
        World.destroy(World.xy_pos(XY.X), World.xy_pos(XY.Y))
    }
    if (!(input.buttonIsPressed(Button.A)) && (input.buttonIsPressed(Button.B) && !(input.buttonIsPressed(Button.AB)))) {
        for (let index = 0; index < Math.floor(speed / 100); index++) {
            if (World.block_detect(World.xy_pos(XY.X) + 1, World.xy_pos(XY.Y))) {
                break
            }
            World.move(LeftRightUpDown.Right, 1)
            led.plot(2, 2)
            basic.pause(100)
        }
        basic.pause(200)
    } else if (input.buttonIsPressed(Button.A) && !(input.buttonIsPressed(Button.B) || input.buttonIsPressed(Button.AB))) {
        for (let index = 0; index < Math.floor(speed / 100); index++) {
            if (World.block_detect(World.xy_pos(XY.X) - 1, World.xy_pos(XY.Y))) {
                break
            }
            World.move(LeftRightUpDown.Left, 1)
            led.plot(2, 2)
            basic.pause(100)
        }
        basic.pause(200)
    }
    basic.pause(50)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        if (World.block_detect(World.xy_pos(XY.X), World.xy_pos(XY.Y) + 1)) {
            for (let index = 0; index < Math.floor(jump / 50); index++) {
                if (World.block_detect(World.xy_pos(XY.X), World.xy_pos(XY.Y) - 1)) {
                    break
                }
                World.move(LeftRightUpDown.Up, 1)
                led.plot(2, 2)
                basic.pause(100)
            }
            basic.pause(100)
        }
    } 
    if (!(World.block_detect(World.xy_pos(XY.X), World.xy_pos(XY.Y) + 1))) {
        for (let index = 0; index < Math.floor(gravity_effect / 100); index++) {
            if (World.block_detect(World.xy_pos(XY.X), World.xy_pos(XY.Y) + 1)) {
                break
            }
            World.move(LeftRightUpDown.Down, 1)
            led.plot(2, 2)
            basic.pause(100)
            if (World.xy_pos(XY.Y) > 2) {
                World.spawn()
                break
            }
        }
    }
})
```
## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/joshkordek3/world-game-extension** and import

## Edit this project ![Build status badge](https://github.com/joshkordek3/world-game-extension/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/joshkordek3/world-game-extension** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/joshkordek3/world-game-extension/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
