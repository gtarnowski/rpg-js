class Player extends Phaser.Sprite {
  constructor (data) {
    super(game, 96, 96, 'player')
    this.preparePlayerStats(data)
    this.preparePlayerEquipment()
    this.preparePlayerPerformance()
  }
  preparePlayerPerformance () {
    game.add.existing(this)
    game.physics.arcade.enable(this)
  }

  preparePlayerStats ({ NAME, ATTRIBUTE }) {
    // Set player class
    this.class = NAME
    this.attributeName = ATTRIBUTE

    // Base stats
    this.hp = 30
    this.defense = 10
    this.speed = 1

    // Light range
    this.range = 1

    // Specified class stats
    this[ATTRIBUTE] = 10
  }

  preparePlayerEquipment () {
    this.equipment = {
      head: null,
      armor: null,
      weapon: null,
      secondaryWeapon: null,
      potion: null

    }
    this.inventory = []
  }

  move ({ x, y }) {
    this.body.velocity.x = x / scaleRatio
    this.body.velocity.y = y / scaleRatio
  }
  update () {

  }

  equipSelectedItem (itemId, slot) {
    if (this.equipment[slot]) {
      if (this.inventory.length < INVENTORY_SIZE) {
        this.pickItemToInventory(this.equipment[slot])
        this.equipment[slot] = itemId
      } else {
        this.unEquipSelectedItem(this.equipment[slot], slot)
      }
    } else {
      this.equipment[slot] = itemId
    }
  }

  unEquipSelectedItem (itemId, slot) {
    this.inventory[slot] = null
    this.throwFromBackpack(itemId)
  }

  pickItemToInventory (itemId, itemName) {
    if (Array.isArray(this.inventory)) {
      if (this.inventory.length < INVENTORY_SIZE) {
        this.inventory.push(itemId)
        game.items[itemName].visible = false
      } else {
        console.error('Inventory is full')
      }
    } else {
      console.error('Inventory is not an array')
    }
    console.log(this.inventory)
  }

  dropItemFromInventory (itemId) {
    if (Array.isArray(this.inventory)) {
      const itemIndex = this.inventory.indexOf(itemId)

      if (itemIndex > -1) {
        this.inventory.splice(itemIndex, 1)
        this.throwFromBackpack(itemId)
      }
    } else {
      console.error('inventory is not an array')
    }
  }

  throwFromBackpack (itemId) {
    // TODO:  Some graphic stuff about throwing item

  }
}
