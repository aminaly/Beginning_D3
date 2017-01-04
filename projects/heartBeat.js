// set global vars
var w = window.innerWidth,
	h = window.innerHeight,
	cRadius = Math.max(w, h) / 8,
	i = 1;

var svg = d3.select("body")
	.append("svg")
	.attr({
		width: w,
		height: h
	});

// import data
d3.csv("projects/heart_rate_time_series.csv", function (data) {

	var dom = [80, 105];
	var dSize = data.length;

	console.log();

	// set up scale
	var innerScale = d3.scale.linear()
		.domain(dom)
		.range([25, cRadius]);

	var colorScale = d3.scale.linear()
		.domain(dom)
		.range(["blue", "red"]);

	var dat = data;
	console.log(data[0].beat);

	svg.append("circle")
		.attr({
			r: data[0].beat,
			fill: "red",
			cx: w / 2,
			cy: h / 2
		})
		.on({
			mouseover: handleMouseOver,
			mouseout: handleMouseOut
		});

	var beat = function () {

		var val = data[i % dSize];

		svg.selectAll("circle")
			.transition()
			.duration(100)
			.attr({
				fill: function (d) {
					return colorScale(val.beat);
				},
				r: function (d) {
					return innerScale(val.beat);
				}
			})
		i++
	};

	// set up timer

	var beatInterval = setInterval(function () {
		beat();
	}, 100);

	// set up mouse handlers

	var handleMouseOver = function () {
		clearInterval(beatInterval);
		svg.selectAll("circle")
			.attr("fill", "black")
	};

	var handleMouseOut = function () {
		beatInterval = setInterval(function () {
			beat();
		}, 100);
	};

});
