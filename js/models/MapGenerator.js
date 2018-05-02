class MapGenerator {
  constructor (
    worldWidth = 10,
    worldHeight = 50,
    tileWidth = 32,
    tileHeight = 32,
    deathLimit = 3,
    birthLimit = 4,
    numberOfSteps = 3
  ) {
    this.chanceToStartAlive = 0.4
    this.worldWidth = worldWidth
    this.worldHeight = worldHeight
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.deathLimit = deathLimit
    this.birthLimit = birthLimit
    this.numberOfSteps = numberOfSteps

    this.arena = this.generateMap()
    this.arena = this.doSimulationStep(this.arena)
    this.arena = this.doSimulationStep(this.arena)
    this.arena = this.doSimulationStep(this.arena)
    this.arena = this.doSimulationStep(this.arena)
    this.arena = this.doSimulationStep(this.arena)
    this.arena = this.prepareArray(this.arena)
  }

  generateMap () {
    // So, first we make the map
    let map = [[]]
    // And randomly scatter solid blocks
    this.initialiseMap(map)

    // Then, for a number of steps
    for (let i = 0; i < this.numberOfSteps; i++) {
      // We apply our simulation rules!
      map = this.doSimulationStep(map)
    }

    // And we're done!

    return map
  }

  initialiseMap (map) {
    for (let x = 0; x < this.worldWidth; x++) {
      map[x] = []
      for (let y = 0; y < this.worldHeight; y++) {
        map[x][y] = 0
      }
    }

    for (let x = 0; x < this.worldWidth; x++) {
      for (let y = 0; y < this.worldHeight; y++) {
        // Here we use our chanceToStartAlive variable
        if (Math.random() < this.chanceToStartAlive) {
          map[x][y] = 1
        }
      }
    }

    return map
  }

  doSimulationStep (map) {
    // Here's the new map we're going to copy our data into
    let newmap = [[]]
    for (let x = 0; x < map.length; x++) {
      newmap[x] = []
      for (let y = 0; y < map[0].length; y++) {
        // Count up the neighbours
        let nbs = this.countAliveNeighbours(map, x, y)
        // If the tile is currently solid
        if (map[x][y] > 0) {
          // See if it should die
          if (nbs < this.deathLimit) {
            newmap[x][y] = 0
          }
          // Otherwise keep it solid
          else {
            newmap[x][y] = 1
          }
        }
        // If the tile is currently empty
        else {
          // See if it should become solid
          if (nbs > this.birthLimit) {
            newmap[x][y] = 1
          } else {
            newmap[x][y] = 0
          }
        }
      }
    }

    return newmap
  }

  countAliveNeighbours (map, x, y) {
    let count = 0
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let nbX = i + x
        let nbY = j + y
        if (i === 0 && j === 0) { }
        // If it's at the edges, consider it to be solid (you can try removing the count = count + 1)
        else if (nbX < 0 || nbY < 0 || nbX >= map.length || nbY >= map[0].length) {
          count = count + 1
        } else if (map[nbX][nbY] === 1) {
          count = count + 1
        }
      }
    }
    return count
  }

  prepareArray (mapArray) {
    let mapString = null

    mapArray.forEach(w => w.forEach((value, index) => {
      if (index + 1 === this.worldHeight) {
        mapString += value + '\n'
      } else {
        mapString ? mapString += value + ',' : mapString = value + ','
      }
    }))
    return mapString
  }

  placeTreasure (map) {
    // How hidden does a spot need to be for treasure?
    // I find 5 or 6 is good. 6 for very rare treasure.
    let treasureHiddenLimit = 5
    for (let x = 0; x < this.worldWidth; x++) {
      for (let y = 0; y < this.worldHeight; y++) {
        if (map[x][y] === 0) {
          let nbs = this.countAliveNeighbours(map, x, y)
          if (nbs >= treasureHiddenLimit) {
            map[x][y] = 2
          }
        }
      }
    }
  }
}
