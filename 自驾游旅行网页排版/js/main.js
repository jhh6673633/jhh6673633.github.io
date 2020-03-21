var current;
$(".gallerybox").click(function(e) {
	// e.preventDefault();
	$("#myModal").modal("show");
	$("#myModal")
		.find(".modal-body img")
		.attr(
			"src",
			$(this)
				.children("img")
				.attr("src")
		);
	current = $(this).children("img");
});

$(".modal-body span")
	.eq(1)
	.click(function(e) {
		e.preventDefault();
		if (
			current
				.parent()
				.parent()
				.next()
				.find("img")[0]
		) {
			current = current
				.parent()
				.parent()
				.next()
				.find("img");
		}
		console.log(current);
		$("#myModal")
			.find(".modal-body img")
			.attr("src", current.attr("src"));
	});
$(".modal-body span")
	.eq(0)
	.click(function(e) {
		e.preventDefault();
		if (
			current
				.parent()
				.parent()
				.prev()
				.find("img")[0]
		) {
			current = current
				.parent()
				.parent()
				.prev()
				.find("img");
		}
		console.log(current);
		$("#myModal")
			.find(".modal-body img")
			.attr("src", current.attr("src"));
	});

var mySwiper = new Swiper(".swiper-container", {
	direction: "horizontal", // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:true,

	// 如果需要分页器
	pagination: {
        el: ".swiper-pagination",
        clickable :true
	},

	// 如果需要前进后退按钮
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// 如果需要滚动条
	scrollbar: {
		el: ".swiper-scrollbar"
	}
});
