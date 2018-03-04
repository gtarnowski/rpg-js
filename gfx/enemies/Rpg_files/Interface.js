//Interface class declaration
class Interface extends Phaser.Sprite {

    constructor (game, x, y, name) {
        super (game, x, y, name);
        this.enableBody = true;
        this.fixedToCamera = true;
        game.add.existing(this);
    }

    setSize (height, width) {
        return this.scale.setTo(height, width)
    }
}

//Skills and main bar interface
const onSkillsAndAggroBarInterface = () => {
    //add main bar
    game.mainBar = new Interface(game, 200, 610, 'main_bar');

    //add aggro bar
    game.aggroBar = game.add.bitmapData(GAME.width);
    game.aggroBar.rect(0, 0, GAME.width, 10, '#b71727');
    game.aggroBar = new Interface(game, 0, 0, game.aggroBar);
    game.aggroBar.visible = false;

    //add skills bar
    game.skillLock = game.add.group();
    SKILL_LOCKS.map(x => {
        game.skillLock = new Interface(game, x, 645, 'skill_lock');
    });

    //add skill 'jumping point'
    game.activeSkillPoint = game.add.graphics(0, 0);
    game.activeSkillPoint.beginFill(COLORS.skill_yellow);
    game.activeSkillPoint.drawCircle(MAIN_BAR.skill_x, MAIN_BAR.skill_y , 7);
    game.activeSkillPoint.fixedToCamera = true;
};

const onCreateCircleHealthInterface = () => {

    //add health bar/ball
    game.circleHealth = game.add.graphics(HEALTH.x, HEALTH.y);
    game.circleHealth.lineStyle(10, HEALTH.color_outer);
    game.circleHealth.arc(0, 0, 50, 0, HEALTH.startValue, false);
    game.circleHealth.rotation = HEALTH.rotation;
    game.circleHealth.startValue = HEALTH.startValue;
    game.circleHealth.fixedToCamera = true;

    //add inner red health ball
    game.circleHealthFull = game.add.graphics(HEALTH.x, HEALTH.y);
    game.circleHealthFull.beginFill(HEALTH.color_inner);
    game.circleHealthFull.arc(0, 0, 45, 0, 6.3, false);
    game.circleHealthFull.fixedToCamera = true;

    //add inner text to circle health
    game.circleHealthText = game.add.text(HEALTH.x -22, HEALTH.y - 15, game.player.hp, STANDARD_TEXT_STYLE);
    game.circleHealthText.fixedToCamera = true;

    //add skull 'prepare to death'
    game.skull = new Interface(game, 574.5, 605, 'skull');
    game.skull.setSize(0.6,0.6);
    game.skull.visible = false;
};

const setPlayerHealthBarSize = damage => {
    //modify start value to circle health sprite
    game.circleHealth.startValue -= damage / (game.player.hpInfo /6.3);

    if (game.circleHealth.startValue < 0) {
        game.circleHealth.clear();
        game.circleHealth.lineStyle(10);
        return game.circleHealth.arc(0, 0, 50, 0, 0, true);
    }

    game.circleHealth.clear();
    game.circleHealth.lineStyle(10, 0xEF4747);
    game.circleHealth.arc(0, 0, 50, game.circleHealth.startValue, 0, true);
};

const setCircleHealthText = (hp, x, y) => {
    game.circleHealthText.x = HEALTH.x - x;
    game.circleHealthText.y = HEALTH.y - y;
    game.circleHealthText.setText(hp >= 0 ? hp : '')
    game.circleHealthText.fixedToCamera = true;
};

const setSkillPointPosition = choose => {
    let position = 0;
    switch (choose) {
        case 1:  position = 0; break;
        case 2:  position = 91; break;
        case 3:  position = 182; break;
        case 4:  position = 410; break;
        case 5:  position = 502; break;
        case 6:  position = 592; break;
        default: position = 0;
    }

    game.add.tween(game.activeSkillPoint).to({x: position}, 100, Phaser.Easing.InOut, true)
};

const onSetXpBar = () => {
    const playerXpPoints = game.player.xp;

    //Xp bar background line
    game.xpBarEmpty = game.add.bitmapData(800);
    game.xpBarEmpty.rect(0, 0, 800, 5, '#5f5f5f');
    game.xpBarEmpty = new Interface(game, 200, 605, game.xpBarEmpty);
    game.xpBarEmpty.fixedToCamera = true;

    //Recalculate in every xp reward XP BAR
    game.xpBar = game.add.bitmapData(800);
    game.xpBar.rect(0, 0, playerXpPoints, 5, '#b71727');
    game.xpBar = new Interface(game, 200, 605, game.xpBar);
    game.xpBar.fixedToCamera = true;

};

const recalculatePlayerHpInfo = player => {
    player = game.player;
    if (player.hp <= 0) {
        setCircleHealthText(player.hp, 6, 15)
    } else if (player.hp <= 9){
        setCircleHealthText(player.hp, 7.5, 14.5);
    } else if (player.hp > 9 && player.hp < 100){
        setCircleHealthText(player.hp, 14.5, 15)
    } else if (player.hp >= 100) {
        game.circleHealthText.setText(game.player.hp)
    }
};

const recalulateXpBarProgress = gainedXp =>  {

};
