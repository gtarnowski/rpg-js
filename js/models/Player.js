class Player {
  constructor (data) {
    this.preparePlayerStats(data)
    this.preparePlayerEquipment()
  }

  preparePlayerStats ({ NAME, ATTRIBUTE }) {
    // Set player class
    this.class = NAME

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

  setEquipment (itemId, slot) {
    if (this.equipment[slot]) {
      if (this.inventory.length < INVENTORY_SIZE) {
        this.addInventoryItem(this.equipment[slot])
        this.equipment[slot] = itemId
      } else {
        this.removeItemFromEquipment(this.equipment[slot], slot)
      }
    } else {
      this.equipment[slot] = itemId
    }
  }

  removeItemFromEquipment (itemId, slot) {
    this.inventory[slot] = null
    this.throwFromBackpack(itemId)
  }

  addInventoryItem (itemId, itemName) {
    console.log(this.inventory)
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
  }

  removeItemFromInventory (itemId) {
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
