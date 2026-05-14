
elements.airplane = {
    color: "#d4d4d4",
    behavior: [
        "XX|CR:smoke|XX",   // Spawns smoke above/behind it
        "XX|XX|M1|M2",      // Moves forward and up diagonally
        "XX|XX|XX"
    ],
    category: "machines",
    state: "solid",
    density: 10,
    hardness: 50
};

// Optional: Make it drop bombs if it hits something
elements.airplane.tick = function(pixel) {
    // If it collides with a structure, transform into an explosion
    if (neighborsCount(pixel, "solid") > 1) {
        changePixel(pixel, "explosion");
    }
};
