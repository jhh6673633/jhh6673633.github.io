var stage = document.querySelector(".stage");
// document.body.onmousemove = function(event) {
// 	// console.log(event.clientX,event.clientY);
// 	var x = event.clientX - stage.offsetLeft - stage.offsetWidth / 2;
// 	// 鼠标距离中心点x的距离
// 	var y = event.clientY - stage.offsetTop - stage.offsetHeight / 2;
// 	// 鼠标距离中心点y的距离

// 	console.log(x, y);
// 	stage.style.transform =
// 		"rotateY(" + x / 20 + "deg) rotateX(" + y / 20 + "deg)";
// };

document.body.onclick = function() {
	stage.classList.toggle("active");
};
