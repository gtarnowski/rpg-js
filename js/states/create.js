const create = () => {
  game.level = new MapGenerator()
  game.cache.addTilemap('map', null, game.level.arena, Phaser.Tilemap.CSV)

  game.map = game.add.tilemap('map', 32 * scaleRatio, 32 * scaleRatio)

  game.map.addTilesetImage('tiles')

  game.layer = game.map.createLayer(0)
  game.layer.scale.set(scaleRatio)
  game.layer.resizeWorld()

  // game.player = new Player(CLASSES.NECROMANZZER)

  game.input.onTap.add(pointer => this.inputEvent(pointer), this)

  game.marker = game.add.graphics()
  game.marker.lineStyle(2 * scaleRatio, 0xffffff, 1)
  game.marker.drawRect(0, 0, 32 * scaleRatio, 32 * scaleRatio)

  game.items = []
  const coords = []
  game.map.layers[0].data.forEach(row => row.forEach(({ index, worldX, worldY }) => {
    if (index === 1) {
      const tree = `tree${Math.floor(Math.random() * 3) + 1}`
      let sprite = game.add.sprite(worldX, worldY, 't')
      sprite.scale.set(1 + Math.random())

      sprite.rotation = Math.random() / (Math.floor(Math.random() * 2) ? -4 : 4)
    }
  }))
  console.log(coords)

  let x = 20
  let y = 160

  // ITEMS_LIB.map(item => {
  //   const newItem = game.add.sprite(x += 100, y, item.name)
  //   newItem._DATA = item
  //   newItem.inputEnabled = true
  //   // newItem.events.onInputDown.add(() => game.player.pickItemToInventory(item.id, item.name), game.player)
  //   newItem.scale.setTo(scaleRatio, scaleRatio)
  //
  //   game.items[item.name] = newItem
  // })

  this.inputEvent = (pointer) => {
    game.marker.x = game.layer.getTileX(game.input.activePointer.worldX / scaleRatio) * 16 * scaleRatio
    game.marker.y = game.layer.getTileY(game.input.activePointer.worldY / scaleRatio) * 16 * scaleRatio
  }
}
