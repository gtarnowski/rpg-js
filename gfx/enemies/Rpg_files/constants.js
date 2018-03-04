const ARCADE_PHYSICS = Phaser.Physics.ARCADE;

const NECRO_SKILLS = {
    FIRE_BALL: {
        dmg: 10,
        mana: 20,
        skillPointRequired: 1,
        type: 'fire_ball',
        range: 300,
        sprite: 'shootTest',
        destroySprite: 'shoot_onDestroy',
    },
    DECAY_BALL: {
        dmg: 30,
        mana: 50,
        skillPointRequired: 1,
        type: 'decay_ball',
        range: 500,
    },
    FROST_BALL: {
        dmg: 30,
        mana: 50,
        skillPointRequired: 1,
        type: 'frost_ball',
        range: 1500,
    },
    HATE_WAVE: {
        dmg: 30,
        mana: 50,
        skillPointRequired: 1,
        type: 'hate_wave',
        range: 300
    },
    HELL_BALL: {
        dmg: 30,
        mana: 50,
        skillPointRequired: 1,
        type: 'hell_ball',
        range: 700
    },
    METEOR_BALL: {
        dmg: 30,
        mana: 50,
        skillPointRequired: 1,
        type: 'meteor_ball',
        range: 600
    }
};

const PLAYER = {
    _name: 'player',
    _image: 'gfx/player.png',
    _animations: {
        _name: ''
    },
    _x: 250,
    _y: 350
};

let mageSkills = [
    {type: 'fire_ball', x: 120, y: 515},
    {type: 'decay_ball', x: 215, y: 515},
    {type: 'frost_ball', x: 313, y: 515},
    {type: 'hate_wave', x: 410, y: 515},
    {type: 'hell_ball', x: 510, y: 515},
    {type: 'meteor_ball', x: 610, y: 515}
];
const ENEMY_TYPES = {
    RANGE: 'range',
    MELEE: 'melee'
};

const SPRITE_CALLS = [
    'player',
    // 'shoot',
    'aura',
    'enemy_shoot',
    'main_bar',
    'skill_lock',
    'skull',
    'shoot_onDestroy'
];

const COLORS = {
    red_bright:      0x852F2B,
    red_dark:        0xEF4747,
    skill_yellow:    0xEBB033,
    health_digits:   0xEBB033,
    damage_received: 0x222222,
};

const HEALTH = {
    x: 605,
    y: 635,
    color_inner: COLORS.red_bright,
    color_outer: COLORS.red_dark,
    color_text:  '#EBB033',
    startValue: 6.3,
    rotation: 4.705
};

const MAIN_BAR = {
    skill_x: 308,
    skill_y: 629,
    fill: COLORS.skill_yellow
};

const SKILL_LOCKS =  [380, 470, 699, 790, 881];

const STANDARD_TEXT_STYLE = {
    font: 'Lato',
    fontSize: 24,
    fill: HEALTH.color_text,
    align: "center"
};

const SOULS_CONTER_TEXT_STYLE = {
    font: 'Lato',
    fontSize: 24,
    fill: HEALTH.color_text,
    align: "center"
};

const PLAYER_LEVEL_PROGRESS = [
    {
        level: 1,
        xpMin: 0,
        xpMax: 99,
    },
    {
        level: 2,
        xpMin: 100,
        xpMax: 299,
    },
    {
        level: 3,
        xpMin: 300,
        xpMax: 599,
    },
    {
        level: 4,
        xpMin: 600,
        xpMax: 999,
    }
];

// const ENEMY_STATES = {
//     MOVING: 'moving',
//     ROTATING: 'rotating',
//     STANDING
// };