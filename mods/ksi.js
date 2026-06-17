// big_guy_forehead.js

// --- BIG GUY BODY ---
elements.big_guy = {
    name: "Big Guy",
    color: "#c48c5a",
    category: "special",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    tick: function(pixel) {
        // Spawn his giant forehead once
        if (!pixel.spawnedForehead) {
            pixel.spawnedForehead = true;

            // forehead is 10x bigger than him
            for (let dx = -5; dx <= 5; dx++) {
                for (let dy = -5; dy <= 5; dy++) {
                    if (Math.random() < 0.8) { // fill density
                        createPixel("big_forehead", pixel.x + dx, pixel.y + dy - 6);
                    }
                }
            }
        }
    }
};

// --- GIANT FOREHEAD ---
elements.big_forehead = {
    name: "Giant Forehead",
    color: "#f5d6b3",
    category: "special",
    state: "solid",
    density: 2000,
    shinynessRadius: 7,

    tick: function(pixel) {
        if (pixel.del) return;

        let r = elements.big_forehead.shinynessRadius;

        for (let dx = -r; dx <= r; dx++) {
            for (let dy = -r; dy <= r; dy++) {
                if (dx*dx + dy*dy > r*r) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (!isEmpty(x, y, true)) {
                    let target = pixelMap[x]?.[y];
                    if (!target || target.del) continue;

                    // killable human-like elements
                    const killable = [
                        "human",
                        "body",
                        "head",
                        "torso",
                        "arm",
                        "leg"
                    ];

                    if (killable.includes(target.element)) {
                        // burn them
                        if (elements.fire) {
                            changePixel(target, "fire");
                        } else {
                            deletePixel(target.x, target.y);
                        }
                    }
                }
            }
        }
    }
};
