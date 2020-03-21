var pass1 = $("#password1");
var pass2 = $("#password2");
var email = $("#email");
var form = $(".main form");
var arrow = $(".main .arrow");

$(".main .row input").val("");
email.on("blur", function() {
	if (!/^\S+@\S+.\S+$/.test(email.val())) {
		email
			.parent()
			.addClass("error")
			.removeClass("success");
	} else {
		email
			.parent()
			.removeClass("error")
			.addClass("success");
	}
});

pass1.complexify({ minimumChars: 6, strengthScaleFactor: 0.7 }, function(
	valid,
	complexity
) {
	if (valid) {
		pass2.removeAttr("disabled");
		pass1
			.parent()
			.removeClass("error")
			.addClass("success");
	} else {
		pass2.attr("disabled", true);
		pass1
			.parent()
			.removeClass("success")
			.addClass("error");
	}

	var calculated = (complexity / 100) * 268 - 134;
	var prop = "rotate(" + calculated + "deg)";

	arrow.css({ transform: prop });
	pass2.on("keydown input", function() {
		if (pass2.val() == pass1.val()) {
			pass2
				.parent()
				.removeClass("error")
				.addClass("success");
		} else {
			pass2
				.parent()
				.removeClass("success")
				.addClass("error");
		}
	});
});

form.on("submit", function(e) {
	if ($(".main .row.success").length == $(".main .row").length) {
		alert("你已经注册成功");
		e.preventDefault();
	} else {
		alert("注册失败");
		e.preventDefault();
	}
});
