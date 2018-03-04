const keyboardHandler = () =>  {
    if (game.keys.slot1.isDown && game.player.availableSkills.slot1) {
        setSkillPointPosition(1);
        game.player.activeSkill = NECRO_SKILLS.FIRE_BALL;
    }
    if (game.keys.slot2.isDown && game.player.availableSkills.slot2) {
        setSkillPointPosition(2);
        game.player.activeSkill = NECRO_SKILLS.DECAY_BALL;
    }
    if (game.keys.slot3.isDown && game.player.availableSkills.slot3) {
        setSkillPointPosition(3);
        game.player.activeSkill = NECRO_SKILLS.FROST_BALL;
    }
    if (game.keys.slot4.isDown && game.player.availableSkills.slot4) {
        setSkillPointPosition(4);
        game.player.activeSkill = NECRO_SKILLS.HATE_WAVE;
    }
    if (game.keys.slot5.isDown && game.player.availableSkills.slot5) {
        setSkillPointPosition(5);
        game.player.activeSkill = NECRO_SKILLS.HELL_BALL;
    }
    if (game.keys.slot6.isDown && game.player.availableSkills.slot6) {
        setSkillPointPosition(6);
        game.player.activeSkill = NECRO_SKILLS.METEOR_BALL;
    }
};

const loadSpriteImage = (name, path) => {
    game.load.image(name, `gfx/${path}.png`);
};