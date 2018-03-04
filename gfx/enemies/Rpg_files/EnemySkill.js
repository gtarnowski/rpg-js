class EnemySkill extends Phaser.Sprite {
    constructor (game, x, y, spriteName) {
        super (game, x, y, spriteName)

        this.game.physics.enable(this);
        this.body.outOfBoundsKill = true;
        this.body.checkWorldBounds = true;
        this.body.setSize(20, 20);
        this.range = 500;
        this.isFollowing = false;
    }

    update () {
        if (this.isFollowing) {
            this.followCharacter()
        }
        game.physics.arcade.collide(this, game.player, (shoot, player) => {

            if (!shoot.missed) {
                setPlayerHealthBarSize(shoot.dmg);
                game.player.setDamageTextInfo(shoot.dmg, game.player.x, game.player.y);
                player.hp -= shoot.dmg;
                recalculatePlayerHpInfo()
            } else {
                game.player.setDamageTextInfo('Missed', game.player.x, game.player.y);
            }

            this.kill();
            this.destroy()
        })
    }

    followCharacter () {
        this.isFollowing = true;
        game.physics.arcade.moveToObject(this, game.player, this.range)
    }
}