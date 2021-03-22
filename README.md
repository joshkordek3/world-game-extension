## Example Game
(note: this is not literal code, this will just be an example)
```
on start {
    World.add_by("row", 1, -9, 99)
    World.show()
    let gravity_effect = 100
}
forever {
    if button a+b pressed {
        if not world detects block on x_pos, y_pos-1 {
            repeat 2 {
                World.move("up", 1)
                pause 50 (ms)
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
