function onEnemyCreate() {
    game.enemy = game.add.group();
    enemies2.forEach(enemy => new Enemy(game, enemy.x, enemy.y, enemy.properties.type));
}

class Enemy extends Phaser.Sprite {
    constructor (game, x, y, type) {

        let spriteType;
        if (type == ENEMY_TYPES.MELEE) {
            spriteType = 'enemy_worm';
        } else {
            spriteType = 'enemy_mage';
        }

        super (game, x, y, spriteType);

        this.gameProperties();
        this.enemyProperties(type, x, y);
        this.createHealthInterface();
        this.simulateEnemyRotation();
        game.enemy.add(this);
        this.anchor.set(0.5)
    }

    gameProperties () {
        this.game.physics.enable(this);
        this.body.setCircle(16);
        this.body.collideWorldBounds = true;

    }

    enemyProperties (type, x, y) {
        this.nextFire = 0;
        this.startPosition = {x, y};
        this.level = 1;
        this.hp = 50;
        this.type = type;
        this.hpInfo = this.hp;
        this.skillRange = 300;

        // this.pivot.x = 16;
        // this.pivot.y = 16;

        //States set
        this.isAlive = true;
        this.isRotating = true;
        this.isMoving = false;
        this.isStanding = true;

    }

    createHealthInterface () {
        if (this.type === ENEMY_TYPES.RANGE) {
            this.addChild(this.aura = game.add.sprite(0,0, 'aura'));
            this.aura.pivot.x = -20;
            this.aura.pivot.y = -20;
            this.aura.rotation += Math.floor((Math.random() * 10) + 1);
        }

        this.addChild(this.health = game.add.sprite(- 16, - 25, 'hp_small_empty'));
        this.addChild(this.fullHealth = game.add.sprite(- 16, - 25, 'hp_small'))
        this.addChild(this.text = game.add.text(11, -23, '', {
            fill: "#fff",
            fontSize: 14
        }));
        this.fullHealth.visible = false;
        this.fullHealth.width = 32;
        this.health.visible = false;
        this.health.width = 32;

    }

    update () {
        if (!this.isAlive) return;

        if (this.aura) {
            this.aura.rotation += 0.03;
        }

        //verify distance between player and enemy
        this.distance = game.physics.arcade.distanceBetween(game.player, this);

        //add collision between player and enemy
        game.physics.arcade.collide(this, game.player);
        game.physics.arcade.collide(this, game.enemy);

        //add player as target to this enemy, add this enemy to one of aggro enemies
        if (this.distance <= 100) {
            game.player.addToFollowingList(this);
            this.target = game.player;
            this.isRotating = false;
            this.resetVelocity()
        }

        //this enemy loose player targed after selected distance (400 px)
        if (this.distance >= 300 && this.target) {
            this.target = null;
            this.reject();
        }


        if (this.target) {
            this.rotation = 0;
            this.isRotating = false;
            if (this.distance > 60 ) {
                //move this enemy to player target in every update loop
                game.physics.arcade.moveToObject(this, game.player);
            }

            //this enemy attacks player if he is in selected distance
            if (this.distance <= 300) this.hit()

        } else {
            if (this.calculatePositionFromStart() > 10) {
                //'back to start' if this enemy loose player target
                this.moveToStart();
            } else {
                if (!this.isRotating) {
                    this.isRotating = true;
                    this.simulateEnemyRotation()
                }

                this.resetVelocity();
            }
        }

        if (this.hp <= 0) {
            //kill enemy
            this.die()
        }
    }

    calculateSoulsDrop () {
        return Math.floor(Math.random() * 30)
    }

    calculateXpPoints () {
        return this.level * 100
    }

    die () {
        game.player.updateCollectedSouls(this.calculateSoulsDrop());
        game.player.setXpPoints(this.calculateXpPoints());
        this.isAlive = false;
        this.reject();
        this.kill();
        this.destroy();
    }

    reject () {
        game.player.followingEnemies =
            _.reject(game.player.followingEnemies, ene => ene._id == this._id)
        ;
    }

    hit () {
        if (game.time.now > this.nextFire && game.player.isAlive) {
            game.enemySkillShoot = new EnemySkill(game, this.x, this.y, 'enemy_shoot');

            game.enemySkillShoot.dmg = Math.floor(Math.random() * 9) + 10;
            game.enemySkillShoot.missed = Math.random() > 0.8;
            this.nextFire = game.time.now + 1000;
            game.add.existing(game.enemySkillShoot);
            game.enemySkillShoot.followCharacter()
        }
    }

    setDamageTextInfo (playerShoot) {
        this.health.visible = true;
        this.fullHealth.visible = true;
        this.fullHealth.width -= playerShoot.dmg / (this.hpInfo / 32);

        const x = this.x,
              y = this.y
        ;

        const time = 1000;
        const text = game.add.text(x + 5, y - 37, playerShoot.dmg, {
            font: 'Lato',
            fontSize: 12,
            fill: HEALTH.color_text,
            align: "center"
        });

        game.add.tween(text).to({alpha: 0}, 600, "Linear", true);
        game.add.tween(text).to({fontSize: 23}, 100, "Linear", true);
        setTimeout(() => text.kill(), time);
    }

    calculatePositionFromStart () {
        return Phaser.Math.distance(
            this.x,
            this.y,
            this.startPosition.x,
            this.startPosition.y
        )
    }

    moveToStart () {
        game.physics.arcade.moveToXY(this, this.startPosition.x, this.startPosition.y)
    }

    resetVelocity () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    simulateEnemyRotation () {

        if (this.target || this.calculatePositionFromStart() > 10) {
            return;
        }

        const time = Math.floor(Math.random() * 10) * 1000;
        const rotation = Math.random();
        const randomizeRotateDirection = Math;
        setTimeout(() => {
            this.rotation += rotation;
            this.simulateEnemyRotation();
        }, time)
    }


}
