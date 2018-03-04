const preload = () => {
    SPRITE_CALLS.map(sprite => loadSpriteImage(sprite, sprite));

    game.load.image('enemy_worm', `gfx/enemies/green_worm.png`);
    game.load.image('enemy_mage', `gfx/enemies/mage.png`);

    loadSpriteImage('hp_small',       'hp_small_full');
    loadSpriteImage('hp_small_empty', 'hp_small_empty');

    // game.load.spritesheet('shoot', 'gfx/explosion01_128.png', 128, 128, 102);
    game.nextFire = 0;
    game.enemyNextFire = 0;
};