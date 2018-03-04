let map, layer;
const create = () => {
    onWorldCreate();
    onSkillsAndAggroBarInterface();
    onPlayerCreate();
    onCreateCircleHealthInterface();
    onEnemyCreate();
    onSetXpBar();

    game.skillShoot = {};
};

const onWorldCreate = () => {
    game.stage.backgroundColor = '#333';
    game.world.setBounds(0, 0, 4800, 4800);
    game.physics.startSystem(ARCADE_PHYSICS);
};