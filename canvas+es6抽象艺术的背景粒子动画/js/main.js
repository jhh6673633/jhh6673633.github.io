// 粒子数组
let particles = [];
// 粒子频率
let frequency = 50;

let canvas = document.createElement("canvas");
canvas.width = $(window).width();
canvas.height = $(window).height();
$("body").append(canvas);

let ctx = canvas.getContext("2d");
/** @type {HTMLCanvasElement} */

// 粒子构造器
class Particle {
	constructor(obj) {
		let random = Math.random();

		this.x = obj.x;
		this.y = obj.y;
		this.a = 0;
		this.s = 0.5 + random;
		this.w = $(window).width();
		this.h = $(window).height();
		this.r = obj.r || 0.5 + random * 10;
		this.color = obj.color || "#E5483F";

		// 每三秒再生成一个粒子
		setTimeout(
			function() {
				if (this.r > 0.5) {
					particles.push(
						new Particle({
							x: this.x,
							y: this.y,
							color: this.r / 2 > 1 ? "#d6433b" : "#FFFFFF",
							r: this.r / 2.2
						})
					);
				}
			}.bind(this),
			3000
		);
	}
	// 画出碎片
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		canvas.lineWidth = 2;
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	swapColor() {
		if (this.x < this.w / 2) {
			this.color = "lightseagreen";
		} else {
			this.color = "lightsalmon";
		}
	}
	// 移动碎片
	move() {
		this.swapColor();
		this.x += Math.cos(this.a) * this.s;
		this.y += Math.sin(this.a) * this.s;
		this.a += Math.random() * 0.8 - 0.4;

		if (this.x < 0 || this.x > this.w - this.r) {
			return false;
		}
		if (this.y < 0 || this.y > this.h - this.r) {
			return false;
		}
		this.draw();
		return true;
	}
}

// var aa = new Particle({ x: 300, y: 300, r: 10 });

// 初始化
function popolate() {
	particles.push(
		new Particle({
			x: $(window).width() / 2,
			y: $(window).height() / 2
		})
	);

	return particles.length;
}

// 清除画布
function clear() {
	ctx.globalAlpha = 0.04;
	ctx.fillStyle = "#000042";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
}

function update() {
	particles = particles.filter(function(element) {
		return element.move();
	});
	clear();
	requestAnimationFrame(update.bind(this));
}

setInterval(
	function() {
		popolate();
	}.bind(this),
	frequency
);
// var aa=new Particle({
// 	x: $(window).width() / 2,
// 	y: $(window).height() / 2
// });
// setInterval(
// 	function() {
// 		update();
// 	}.bind(this),
// 	50
// );
update();
