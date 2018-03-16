const ARCADE_PHYSICS = Phaser.Physics.ARCADE

const EQIPMENT_SIZE = 4
const INVENTORY_SIZE = 20

const CLASSES = {
  MAGE: {
    NAME: 'MAGE',
    ATTRIBUTE: 'ene'
  },
  KNIGHT: {
    NAME: 'MAGE',
    ATTRIBUTE: 'str'
  },
  ARCHER: {
    NAME: 'MAGE',
    ATTRIBUTE: 'agi'
  },
  NECROMANZZER: {
    NAME: 'MAGE',
    ATTRIBUTE: 'decay'
  }
}

const ITEM_TYPES = {
  WEAPON: 'WEAPON',
  SHIELD: 'SHIELD',
  SCROLL: 'SCROLL',
  POTION: 'POTION',
  ARMOR: 'ARMOR',
  QUEST: 'QUEST'
}

scaleRatio = window.devicePixelRatio
