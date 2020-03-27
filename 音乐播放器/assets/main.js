$(".stage input[type=range]").on("input", function(e) {
	e.preventDefault();
	console.log($(this).val());
	$(".stage .progress").css(
		"width",
		(100 / $(this).attr("max")) * $(this).val() + "%"
	);
	audio.currentTime = ($(this).val() / 100) * audio.duration;
});

var playlist = [
	{
		file: "assets/01.mp3",
		thumb: "assets/01.jpg",
		trackName: "Dusk",
		trackArtist: "Tobu & Syndec",
		trackAlbum: "Single"
	},
	{
		file: "assets/02.mp3",
		thumb: "assets/02.jpg",
		trackName: "Blank",
		trackArtist: "Disfigure",
		trackAlbum: "Single"
	},
	{
		file: "assets/03.mp3",
		thumb: "assets/03.jpg",
		trackName: "Fade",
		trackArtist: "Alan Walker",
		trackAlbum: "Single"
	}
];
function play() {
	$(".playlist li")
		.eq(current)
		.addClass("playing")
		.siblings()
		.removeClass("playing");
	$(".playlist .playing").removeClass("paused");
}
// 添加节点
$.each(playlist, function(i, e) {
	$("ul.playlist").append(
		' <li><div class="thumb"><img src="' +
			e.thumb +
			'" alt=""/></div><div class="text"><h5>' +
			e.trackName +
			"</h5><p>" +
			e.trackArtist +
			"</p></div></li>"
	);
});

var audio = $("audio")[0];
var current = 0;

// 初始化 播放第一首
$("audio").attr("src", playlist[current].file);
$(".stage .ui").css(
	"background-image",
	" url(" + playlist[current].thumb + ")"
);
$(".playlist li")
	.eq(current)
	.addClass("playing paused");


// 事件监听
audio.oncanplay = function() {
	console.log("可以播放了");
};
audio.onloadedmetadata = function() {
	console.log("加载到了");
	audio.play();
};

// 播放
$(".controls .fa-play").click(function(e) {
	// e.preventDefault();
	$(".stage .ui").css(
		"background-image",
		" url(" + playlist[current].thumb + ")"
	);
	play();
	audio.play();
	$(this).fadeOut();
	$(".controls .fa-pause").fadeIn();
});

// 暂停
$(".controls .fa-pause")
	.click(function(e) {
		audio.pause();
		$(".playlist .playing").addClass("paused");
		$(this).fadeOut();
		$(".controls .fa-play").fadeIn();
	})
	.fadeOut();

// 下一曲
$(".controls .fa-forward").click(function() {
	current++;
	$("audio").attr("src", playlist[current].file);
	$(".ui").css("background-image", "url(" + playlist[current].thumb + ")");
	play();
});

audio.ontimeupdate = function() {
	console.log((audio.currentTime / audio.duration) * 100 + "%");
	$(".stage .progress").css(
		"width",
		(audio.currentTime / audio.duration) * 100 + "%"
	);

	if (audio.currentTime < 10) {
		$("span.current").text("0:0" + parseInt(audio.currentTime));
	} else {
		$("span.current").text("0:" + parseInt(audio.currentTime));
	}
};

// 点击歌单
$(".playlist li").click(function(e) {
	e.preventDefault();
	current = $(this).index();
	console.log(current);
	$("audio").attr("src", playlist[current].file);
	$(".controls .fa-play").fadeOut();
	$(".controls .fa-pause").fadeIn();
	play();
	$(".stage .ui").css(
		"background-image",
		" url(" + playlist[current].thumb + ")"
	);
});
