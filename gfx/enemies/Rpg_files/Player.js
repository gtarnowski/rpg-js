/*
 * Player class
 */
class Player extends Phaser.Sprite {
    constructor (game) {
        super (
            game,
            PLAYER._x,
            PLAYER._y,
            PLAYER._name
        );

        this.parameters(PLAYER._name);
        this.states();
        this.buildSkills();
    }

    parameters () {
        game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.name = name;
        this.body.immovable = true;
        this.body.setCircle(16);
        this.anchor.set(0.5);
        this.level = 1;
        this.xp = 0;
        this.ene = 10;
        this.body.collideWorldBounds = true;
        this.hp = 500;
        this.moveSpeed = 100;
        this.hpInfo = this.hp;
        this.isAlive = true;
        this.soulsFragments = 0;
        this.availableSkills = {
            slot1: true,
            slot2: false,
            slot3: false,
            slot4: false,
            slot5: false,
            slot6: false
        };
    }

    states () {
        this.followingEnemies = [];
        this.activeSkill = NECRO_SKILLS.FIRE_BALL;
    }

    buildSkills () {
        this.playerHit = game.add.group();
        this.playerHit.enableBody = true;
        this.playerHit.physicsBodyType = Phaser.Physics.ARCADE;
    }

    update () {
        //stop update loop if player is dead
        if (!this.isAlive) return;

        //collision flag between enemy and player
        this.isOverlapingEnemy = game.physics.arcade.overlap(this, game.enemy);

        //setting different speed if player collides with enemy
        if (this.isOverlapingEnemy) this.moveSpeed = 1;
        else this.moveSpeed = 200;

        //hiding aggro bar if player isn't fighting
        game.aggroBar.visible = !!this.followingEnemies.length;

        //run methods and states if player is DEAD
        if (this.hp <= 0) return this.deadProcess()

        //separate moving, rotating and other methods
        this.velocityEvents();
    }

    move (direction, speed) {
        return direction == 'x'
            ? this.body.velocity.x = speed * this.moveSpeed
            : this.body.velocity.y = speed * this.moveSpeed
            ;
    }

    hit () {
        if (game.time.now > game.nextFire && !game.skillShoot.isAlive) {
            game.skillShoot = new Skill(
                game,
                this.x ,
                this.y ,
                this.activeSkill.sprite,
                this.activeSkill.destroySprite
            );
            game.skillShoot.dmg = this.calcDamage();
            game.nextFire = game.time.now + this.activeSkill.range;
            game.add.existing(game.skillShoot);
            game.physics.arcade.moveToPointer(game.skillShoot, 700);
        }
    }

    /**
     * Calculate damage by player energy
     * @return {number} calculated damage
     */
    calcDamage () {
        return Math.floor(Math.random()
                * (this.ene / 4 - this.ene / 9)
                + this.ene / 4 - 1) + 1
            ;
    }

    velocityEvents () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.rotation = game.physics.arcade.angleToPointer(this);

        if (game.input.activePointer.isDown) {
            this.hit()
        }

        if (game.keys.left.isDown || game.keys.wLeft.isDown) {
            this.move('x', -1)
        }

        if (game.keys.right.isDown || game.keys.wRight.isDown) {
            this.move('x', 1)
        }

        if (game.keys.down.isDown || game.keys.wDown.isDown) {
            this.move('y', 1)
        }

        if (game.keys.up.isDown || game.keys.wUp.isDown) {
            this.move('y', -1)
        }
    }

    setDamageTextInfo (dmg) {
        const x = 660,
            y = 580
            ;
        const time = 1000;
        const textString = `- ${dmg}`;
        const text = game.add.text(x, y, textString, {
            font: 'Lato',
            fontSize: 16,
            fill: HEALTH.color_text,
            align: "center"
        });
        text.fontSize = 30;
        text.fixedToCamera = true;
        game.add.tween(text).to({x: x + 1000}, time, Phaser.Easing.InOut, true);
        game.add.tween(text).to({alpha: 0}, 1000, "Linear", true);
        game.add.tween(text).to({fontSize: 20}, 100, "Linear", true);
        setTimeout(() => text.kill(), time);
    }

    addToFollowingList (enemy) {
        if (!this.followingEnemies.find(ene => ene._id === enemy._id)) {
            this.followingEnemies.push(enemy);
        }
        if (!enemy.target) enemy.target = this
    }
    updateCollectedSouls (droppedSouls) {
        this.soulsFragments += droppedSouls;
        game.soulsCounter.setText(this.soulsFragments)
    }

    setXpPoints (points) {
        this.xp += points;
        const progress = PLAYER_LEVEL_PROGRESS.find(({xpMax, xpMin, level}) =>
            this.xp >= xpMin && this.xp < xpMax)
            ;

        if (this.level != progress.level)
            this.level = progress.level
            ;

        game.xpInfo.setText(this.xp);
        game.levelInfo.setText(this.level);
    }

    deadProcess () {
        this.followingEnemies.forEach(enemy => {
            enemy.target = null;
        });

        game.skull.visible = true;
        game.aggroBar.visible = false;
        this.isAlive = false;
        this.kill();
        this.destroy()
    }
}


function onPlayerCreate() {
    //Player instance
    game.player = new Player(game);

    //Add following camera by player walk
    game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //Souls counter text
    game.soulsCounter = game.add.text(230, 645, '0', SOULS_CONTER_TEXT_STYLE);
    game.soulsCounter.fixedToCamera = true;

    //Xp text info
    game.xpInfo = game.add.text(10, 10, 'XP', STANDARD_TEXT_STYLE);
    game.xpInfo.fixedToCamera = true;

    //Level text info
    game.levelInfo = game.add.text(10, 30, '1', STANDARD_TEXT_STYLE);
    game.levelInfo.fixedToCamera = true;
}