var canvas = d3.select("body")
	.append("svg")
	.attr("width", 1500)
	.attr("height", 1500);

var circleSizes = [10, 25, 35, 50];

canvas.selectAll("circle")
	.data(circleSizes)
	.enter()
	.append("circle")
	.attr("r", function (x) {
		return x;
	})
	.attr("cx", function (x) {
		return x * 10;
	})
	.attr("cy", function (x) {
		return x * 10;
	})

var trans = function () {
	canvas.selectAll("circle")
		.transition()
		.duration(6000)
		.delay(2000)
		.attr("cx", 1300)
		.transition()
		.attr("cy", 500)
		.transition()
		.delay(8000)
		.attr("cx", 50)
		.transition()
		.attr("cy", 50);
}

setInterval(function () {
	trans();
}, 10000);
