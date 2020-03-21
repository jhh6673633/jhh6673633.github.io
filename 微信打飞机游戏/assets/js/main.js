var stage = document.querySelector(".stage");
var buttonStart = document.querySelector(".stage .game-start button.start");
var scenceGame = document.querySelector(".stage .game");
var contentGame = document.querySelector(".stage .game .content");
var ranking = document.querySelector(".ranking");
var resurgence = document.querySelector(".resurgence");
var restart = document.querySelector(".restart");
var dead = document.querySelector(".dead");
// var scenceGame = document.querySelector('.stage .game-start button.start')

var typeOurPlane = {
	path: "our-plane.gif",
	boom: "our-plane-boom.gif",
	w: 66,
	h: 80,
	blood: 3,
	delay: 30
};
var typeOurBullet = {
	path: "our-bullet.png",
	w: 6,
	h: 14,
	speed: -5,
	blood: 1
};
var typeEnemyPlaneS = {
	path: "enemy-plane-s.png",
	boom: "enemy-plane-s-boom.gif",
	w: 34,
	h: 24,
	speed: 4,
	blood: 1,
	delay: 10
};
var typeEnemyPlaneM = {
	path: "enemy-plane-m.png",
	hit: "enemy-plane-m-hit.png",
	boom: "enemy-plane-m-boom.gif",
	w: 46,
	h: 60,
	speed: 3,
	blood: 3,
	delay: 30
};
var typeEnemyPlaneL = {
	path: "enemy-plane-l.png",
	hit: "enemy-plane-l-hit.png",
	boom: "enemy-plane-l-boom.gif",
	w: 110,
	h: 164,
	speed: 2,
	blood: 5,
	delay: 50
};

// 元素构造器 型号对象图片尺寸  位置x y
// w宽度 h高度 s速度 xy坐标点
function Element(type, x, y) {
	this.path = type.path;
	this.x = x;
	this.y = y;
	this.w = type.w;
	this.h = type.h;
	this.s = type.speed;
	this.bullets = [];
	this.buff = [];
	this.b = type.blood; // 原始血条
	this.blood = type.blood;
	this.hit = type.hit;
	this.boom = type.boom;
	this.delay = type.delay;
	this.d = type.delay;
}

// 根据 元素自身的位置信息 更新视图
Element.prototype.updataView = function() {
	this.node.style.left = this.x - this.w / 2 + "px";
	this.node.style.top = this.y - this.h / 2 + "px";
	// 修正偏移 点中心点
};

// 创建节点 画出某个元素
Element.prototype.draw = function() {
	this.node = document.createElement("img");
	this.node.src = game.srcPath + this.path;
	contentGame.appendChild(this.node);

	this.updataView();
};

// 移动元素 更新位置 更新视图
Element.prototype.move = function() {
	this.y += this.s;
	this.updataView();
};

// 创建 我方飞机 子弹 的方法
// var b1 = new Element(typeOurBullet, ourPlane.x, ourPlane.y);
Element.prototype.createBullet = function() {
	game.players.forEach(function(player, index, players) {
		if (player.buff == true) {
			var newBullet = new Element(typeOurBullet, player.x, player.y);
			var left = new Element(typeOurBullet, player.x - 20, player.y);
			var right = new Element(typeOurBullet, player.x + 20, player.y);
			left.draw();
			right.draw();
			newBullet.draw();
			player.bullets.push(left, right, newBullet);
		} else {
			var newBullet = new Element(typeOurBullet, player.x, player.y);
			newBullet.draw();
			player.bullets.push(newBullet);
		}
	});
};

// 移动所有子弹的位置
Element.prototype.moveAllBullets = function() {
	this.bullets.forEach(function(bullet, index, bullets) {
		// console.log(this); forEach this指向window

		// 移动当前遍历的子弹
		bullet.move();
		// 判断当前遍历的子弹 是否超出
		if (bullet.checkTopOver()) {
			// 如果超出就删除dom节点
			contentGame.removeChild(bullet.node);
			// 还需要删除 数组里面的项
			bullets.splice(index, 1);
		}
	});
};

// 判断元素是否超出画布 返回布尔值
Element.prototype.checkBottomOver = function() {
	if (this.y > this.h / 2 + game.scenceH) {
		return true;
	}
};

// 判断元素是否超出画布 返回布尔值
Element.prototype.checkTopOver = function() {
	if (this.y < -this.h / 2) {
		return true;
	}
};
// 判断两个元素是否碰撞 返回布尔值
Element.prototype.checkCrash = function(other) {
	if (this.blood > 0) {
		// 如果敌机死亡 就不档子弹
		var hCrash = Math.abs(this.x - other.x) < (this.w + other.w) / 2; // x轴碰撞
		var vCrash = Math.abs(this.y - other.y) < (this.h + other.h) / 2; // y轴碰撞

		return hCrash && vCrash ? true : false;
	}
};

// 游戏配置,可变成构造器
// var game = {
// 	gameBgPosY: 0,
// 	srcPath: "./assets/images/",
// 	scenceW: window.innerWidth,
// 	scenceH: window.innerHeight,
// 	framesFade: 0,
// 	enemys: [],
// 	moveAllEnemys: function() {
// 		this.enemys.forEach(function(enemy, index, enemys) {
// 			enemy.move(); // enemys是通过Element构造出来，所以也有move方法

// 			// 判断当前遍历的敌机 是否超出
// 			if (enemy.checkBottomOver()) {
// 				// 如果超出就删除dom节点
// 				scenceGame.removeChild(enemy.node);
// 				// 还需要删除 数组里面的项
// 				enemys.splice(index, 1);
// 			}
// 		});
// 	}
// };

// 将游戏配置game变成一个构造器
function Game() {
	this.framesFade = 0;
	this.gameBgPosY = 0;
	this.srcPath = "./assets/images/";
	(this.scenceW = window.innerWidth),
		(this.scenceH = window.innerHeight),
		(this.enemys = []);
	this.players = [];
	this.bulletThick = 10;
	this.enemyThick = 30;
}

Game.prototype.moveAllEnemys = function() {
	this.enemys.forEach(function(enemy, index, enemys) {
		enemy.move(); // enemys是通过Element构造出来，所以也有move方法

		// 判断当前遍历的敌机 是否超出
		if (enemy.checkBottomOver()) {
			// 如果超出就删除dom节点
			contentGame.removeChild(enemy.node);
			// 还需要删除 数组里面的项
			enemys.splice(index, 1);
		}
	});
};

// 游戏背景更新
Game.prototype.gbUpdata = function() {
	this.gameBgPosY++;
	scenceGame.style.backgroundPositionY = this.gameBgPosY + "px";
};
// 创建敌机函数 把type带进去就可以创建不同类型的敌机了
Game.prototype.createEnemys = function(type) {
	var randomNum = Math.floor(Math.random() * this.scenceW);
	var newenemy = new Element(type, randomNum, -type.h / 2);
	this.enemys.push(newenemy);
	newenemy.draw();
};
// 创建我方飞机/玩家
Game.prototype.createPlayer = function() {
	// 我方飞机对象 以前的outplane
	var newPlayer = new Element(
		typeOurPlane,
		game.scenceW / 2,
		game.scenceH - typeOurPlane.h / 2
	);
	newPlayer.score = 0;
	this.players.push(newPlayer);
	newPlayer.draw();
	// 显示玩家分数
	document.querySelector(".game .sorce .player1").style.display = "block";
};

Game.prototype.moveAllBullets = function() {
	this.players.forEach(function(player) {
		player.bullets.forEach(function(bullet, index, bullets) {
			bullet.move();
			// 判断当前遍历的子弹 是否超出
			if (bullet.checkTopOver()) {
				// 如果超出就删除dom节点
				contentGame.removeChild(bullet.node);
				// 还需要删除 数组里面的项
				bullets.splice(index, 1);
			}
		});
	});
};

// 遍历所有敌机 和 我方子弹 检测碰撞
Game.prototype.checkAllCrash = function(other) {
	game.enemys.forEach(function(enemy, ie, enemys) {
		game.players.forEach(function(player, ip, players) {
			// 玩家的子弹 和 敌机
			player.bullets.forEach(function(bullet, ib, bullets) {
				if (enemy.checkCrash(bullet)) {
					// console.log("撞上了");
					enemy.blood--;
					bullet.blood--;
				}
			});
			// 我方飞机 与 敌机
			if (enemy.checkCrash(player) && !player.die) {
				// console.log("撞上了");
				enemy.blood = 0;
				player.blood--;

				player.die = true;
				// 爆炸
				player.node.src = game.srcPath + player.boom;
			}
		});
	});
};
// 遍历所有敌机 和 我方子弹 检测血条
Game.prototype.checkAllBlood = function(other) {
	// 敌机
	game.enemys.forEach(function(enemy, ie, enemys) {
		if (enemy.blood < enemy.b && enemy.blood > 0) {
			// 挨打
			// enemy.node.style.background = "blue";
			enemy.node.src = game.srcPath + enemy.hit;
		} else if (enemy.blood <= 0 && !enemy.die) {
			enemy.die = true;
			// 爆炸
			// enemy.node.style.background = "red";
			enemy.node.src = game.srcPath + enemy.boom;
		}
	});
	// 玩家
	game.players.forEach(function(player, ip) {
		player.bullets.forEach(function(bullet, index, bullets) {
			if (bullet.blood <= 0) {
				// 子弹死亡
				contentGame.removeChild(bullet.node);
				bullets.splice(index, 1);

				// 得分
				player.score++;
				// console.log(player.score);
				document.querySelectorAll(".game .sorce span")[ip].innerText =
					player.score;
			}
		});
	});
};

Game.prototype.clearAllDead = function(params) {
	game.enemys.forEach(function(enemy, index, enemys) {
		// 检测飞机死亡状态，延迟 清理已经死亡的飞机
		if (enemy.die) {
			if (enemy.delay > 0) {
				// 刚死亡 刚换了爆炸图 gif延时还没到
				enemy.delay--;
			} else {
				// 敌机已经炸完了 要清理DOM 删数组
				contentGame.removeChild(enemy.node);
				enemys.splice(index, 1);
			}
		}
	});
	game.players.forEach(function(player, index, players) {
		if (player.die) {
			if (player.blood > 0) {
				if (player.delay > 0) {
					player.delay--;
				} else {
					player.node.src = game.srcPath + player.path;
					player.die = false;
					player.delay = player.d;
				}
			} else {
				// 死了 没生命值了
				game.gameOVer();
			}
		}
	});
};

Game.prototype.start = function() {
	// this.createPlayer();
	// var game = this;
	// 游戏主逻辑
	// 创建定时器
	this.setIntervalId = window.setInterval(function() {
		// 每一帧都更新一下 帧数
		game.framesFade++;

		// 每一帧都更新一下游戏背景
		game.gbUpdata();

		// 每一帧都更新一下所有子弹的位置
		game.moveAllBullets();

		// 每一帧都更新一下所有敌机的位置
		game.moveAllEnemys();
		// 每一帧检测所有的碰撞
		game.checkAllCrash();
		// 检测血条
		game.checkAllBlood();
		// 清理死亡
		game.clearAllDead();

		// 判断帧数 如果是 ？ 的倍数 就生成子弹
		if (game.framesFade % game.bulletThick === 0) {
			// ourPlane.createBullet();
			game.players.forEach(function(player) {
				player.createBullet();
			});
		}

		// 判断帧数 如果是 ？ 的倍数 就生成一个敌方飞机,飞机的密度
		if (game.framesFade % game.enemyThick === 0) {
			// 80%小飞机 15%中飞机 5%打飞机
			var randomNum = Math.floor(Math.random() * 100);
			if (randomNum < 5) {
				game.createEnemys(typeEnemyPlaneL);
			} else if (randomNum < 20) {
				game.createEnemys(typeEnemyPlaneM);
			} else {
				game.createEnemys(typeEnemyPlaneS);
			}
		}
	}, 30);
	this.state = 1;
	ranking.style.marginTop = -ranking.offsetHeight + "px";
	dead.style.bottom = -dead.offsetHeight + "px";
};

// 游戏暂停
Game.prototype.pause = function() {
	clearInterval(this.setIntervalId);
	this.state = 0;
	ranking.style.marginTop = "100px";
};
Game.prototype.gameOVer = function() {
	this.pause();
	dead.style.bottom = "100px";
};

var game;

buttonStart.onclick = function() {
	// 切换到游戏场景
	stage.style.marginLeft = "-100%";
	// 实例化游戏对象
	game = new Game();
	// 创建玩家
	game.createPlayer();
	// 游戏开始
	game.start();
};

// 手指拖动的时候 更新我方飞机位置
scenceGame.ontouchmove = function(event) {
	// console.log(event.touches[0].pageX, event.touches[0].pageY);
	game.players[0].x = event.touches[0].pageX;
	game.players[0].y = event.touches[0].pageY;

	// 我方飞机移动  根据自身对象的xy重设定位
	// ourPlane.updataView(); 已经没有ourplane 它保存在players数组里,即每一个玩家的飞机都要改变位置
	game.players.forEach(function(player) {
		player.updataView();
	});
};

// 点击游戏场景 暂停开始游戏
scenceGame.ontouchstart = function(start) {
	// console.log(start.touches[0].clientX,start.touches[0].clientY);
	var startX = start.touches[0].clientX;
	var startY = start.touches[0].clientY;
	document.ontouchend = function(end) {
		// console.log(end.changedTouches[0].clientX,end.changedTouches[0].clientY);
		var endX = end.changedTouches[0].clientX;
		var endY = end.changedTouches[0].clientY;

		if (startX === endX && startY === endY) {
			if (game.state === 0) {
				game.start();
			} else {
				game.pause();
			}
		}
	};
};

// 重新开始
restart.onclick = function() {
	window.location.reload();
};
// 花钱买命
resurgence.onclick = function() {
	game.players.forEach(function(player, index, players) {
		players[index].blood = 3;
	});
	dead.style.bottom = -dead.offsetHeight + "px";
};
// // 创建一个飞机
// var e1 = new Element(typeEnemyPlanes, 0, 0);
