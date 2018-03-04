class Skill extends Phaser.Sprite {
    constructor (game, x, y, sprite, onDestroySpriteName) {
        super (game, x, y, 'shoot');

        this.anchor.setTo(0.5);
        this.scale.setTo(0.3);
        game.add.existing(this);

        this.game.physics.enable(this);
        // this.body.setSize(30, 30);
        this.body.outOfBoundsKill = true;
        this.body.checkWorldBounds = true;

        this.onDestroySprite = onDestroySpriteName;

        this._id = Math.floor(Math.random() * 9000) + 1000;
        this.isAlive = true;

        this.animations.add('shootAnimation');
        this.animations.play('shootAnimation', 300, false);

    }

    update () {
        const isOverlapping = game.physics.arcade.overlap(this, game.enemy, (shoot, enemy) => {
            game.player.isFighting = true;
            enemy.hp -= shoot.dmg;
            enemy.setDamageTextInfo(shoot);
            game.player.addToFollowingList(enemy);
        });
        this.distance = game.physics.arcade.distanceBetween(this, game.player);

        if (isOverlapping) {
            this.destroySkill(this)
        } else {
            if (this.distance > game.player.activeSkill.range) {
                this.destroySkill(this)
            }
        }
    }

    destroySkill (skill) {
        if (skill.isAlive) {
            skill.isAlive = false;
            skill.kill();
            skill.body = null;
            skill.destroy(true)
        }
    }

}