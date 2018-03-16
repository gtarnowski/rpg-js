const create = () => {
  const rectangle = new Phaser.Rectangle(100, game.world.centerY, 100, 100000)

  const bitmapData = game.add.bitmapData(game.height, game.width)
  bitmapData.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#2d2d2d')

  // game.input.addPointer()
  // game.input.addPointer()

  game.player = new Player(CLASSES.NECROMANZZER)

  game.button = game.add.button(game.world.centerX - 95, 400, 'button', () => game.player.addInventoryItem(1), this, 2, 1, 0)
  game.button2 = game.add.button(game.world.centerX - 195, 400, 'button', () => game.player.removeItemFromEquipment(), this, 2, 1, 0)

  game.button.scale.setTo(scaleRatio, scaleRatio)
  game.button2.scale.setTo(scaleRatio, scaleRatio)
  game.items = []
  let x = 20,
    y = 160

  ITEMS_LIB.map(item => {
    const newItem = game.add.sprite(x += 100, y, item.name)
    newItem._DATA = item
    newItem.inputEnabled = true
    newItem.events.onInputDown.add(() => game.player.addInventoryItem(item.id, item.name), this)
    newItem.scale.setTo(scaleRatio, scaleRatio)

    game.items[item.name] = newItem
  })
}
