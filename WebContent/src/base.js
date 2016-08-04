var game = new Phaser.Game(1280, 720, Phaser.CANVAS, "game");
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("titleMenu", titleMenu);
game.state.add("theGame", game);
game.state.start("Boot");