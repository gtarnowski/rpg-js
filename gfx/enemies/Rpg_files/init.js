const init = () => {
    game.keys = game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP,
        down: Phaser.KeyCode.DOWN,

        wLeft: Phaser.KeyCode.A,
        wRight: Phaser.KeyCode.D,
        wUp: Phaser.KeyCode.W,
        wDown: Phaser.KeyCode.S,

        slot1: Phaser.KeyCode.ONE,
        slot2: Phaser.KeyCode.TWO,
        slot3: Phaser.KeyCode.THREE,
        slot4: Phaser.KeyCode.FOUR,
        slot5: Phaser.KeyCode.FIVE,
        slot6: Phaser.KeyCode.SIX,
    });
};