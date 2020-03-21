function initInputs() {
	var allInput = document.body.querySelectorAll("input");

	for (var i = 0; i < allInput.length; i++) {
		var input = allInput[i];
		var barId = input.parentNode.id;
		var styleEl = document.head.appendChild(
			document.createElement("style")
		);

		// 最后一个进度条
		if (i == allInput.length - 1) {
			var indicator = document.querySelector(".indicator");
			setBarIndicator(barId, input, styleEl, indicator);
			input.oninput=setBarIndicator.bind(this,barId,input,styleEl,indicator)
			input.onchange=setBarIndicator.bind(this,barId,input,styleEl,indicator)
		} else {
			setBar(barId, input, styleEl);
			input.oninput = setBar.bind(this, barId, input, styleEl);
			input.onchange = setBar.bind(this, barId, input, styleEl);
		}
	}
}

function setBar(barId, input, styleEl) {
	styleEl.innerHTML =
		"#" + barId + " .percentage::before {width: " + input.value + "%;}";
}

function setBarIndicator(barId, input, styleEl, indicatorEl) {
	styleEl.innerHTML =
		"#" + barId + " .percentage::before {width: " + input.value + "%;}";
	indicatorEl.style.marginLeft = (input.value - 10) + "%";
	indicatorEl.innerText = input.value + "%";
}

initInputs()

// var allInput = document.body.querySelectorAll("input");
// for (var i = 0; i < allInput.length; i++) {
// 	var input = allInput[i];
// 	var barId = input.parentNode.id;
// 	var styleEl = document.head.appendChild(document.createElement("style"));
// 	input.oninput = function() {
		
// 		styleEl.innerHTML =
// 			"#" +
// 			barId +
// 			" .bar-face.percentage:before {width:" +
// 			this.value +
// 			"%;}";
// 		console.log(this,barId);
		
// 	};
// }
