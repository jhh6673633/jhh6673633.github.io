var calculator = document.querySelector(".calculator");
var viewer = document.querySelector(".view");
var nums = document.querySelectorAll(".num");
var ops = document.querySelectorAll(".ops");
var equals = document.querySelector(".equals");
var reset = document.querySelector(".reset");
var clear = document.querySelector(".clear");

var theNum = "";
var oldNum = "";
var resultNum;
var operator;

// 设置视图里的数字
var setNum = function() {
	if (resultNum) {
		theNum = this.getAttribute("data-num");
		resultNum = "";
	} else {
		theNum += this.getAttribute("data-num");
	}
	viewer.innerHTML = theNum;
	console.log(this);
};
// 算法操作
var moveNum = function() {
	oldNum = theNum;
	theNum = "";
	operator = this.getAttribute("data-opa");
	equals.setAttribute("data-result", "");
};
// 计算结果
var displayNum = function() {
	oldNum = parseFloat(oldNum);
	theNum = parseFloat(theNum);
	switch (operator) {
		case "加上":
			resultNum = oldNum + theNum;
			break;
		case "减去":
			resultNum = oldNum - theNum;
			break;
		case "乘以":
			resultNum = oldNum * theNum;
			break;
		case "除以":
			resultNum = oldNum / theNum;
			break;
		default:
			resultNum = theNum;
	}
	// 结果出错的时候
	if (!isFinite(resultNum)) {
		if (isNaN(resultNum)) {
			// 结果是非数的时候 例如3+  =>
			resultNum = "You broke it";
		} else {
			//除0操作的时候
			resultNum = "Look at what you've done";
			calculator.classList.add("broken");
			reset.classList.add("show");
		}
	}
	viewer.innerHTML = resultNum;
	equals.setAttribute("data-result", resultNum);
	oldNum = 0;
	theNum = resultNum;
};
var clearAll = function() {
	oldNum = "";
	theNum = "";
	viewer.innerHTML = "0";
	equals.setAttribute("data-result", resultNum);
};
for (var i = 0; i < nums.length; i++) {
	nums[i].onclick = setNum;
}

for (var i = 0; i < ops.length; i++) {
	ops[i].onclick = moveNum;
}
equals.onclick = displayNum;
clear.onclick = clearAll;
reset.onclick = function() {
	location.reload();
};
