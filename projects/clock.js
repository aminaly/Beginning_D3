// set global vars
var w = window.innerWidth,
	h = window.innerHeight,
	cRadius = Math.max(w, h) / 8,
	i = 0;

var svg = d3.select("body")
	.append("svg")
	.attr({
		width: w,
		height: h
	});

// import data
d3.csv("projects/heart_rate_time_series.csv", function (data) {

	var dom = [d3.min(data), d3.max(data)];
	var dSize = data.length;

	console.log();

	// set up scale
	var innerScale = d3.scale.linear()
		.domain(dom)
		.range([0, cRadius]);

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

		var newVal = data[i % dSize];

		svg.selectAll("circle")
			.transition()
			.duration(1000)
			.attr({
				cx: w / 2,
				cy: h / 2,
				fill: function (d) {
					return colorScale(newVal.beat);
				},
				r: function (d) {
					return innerScale(newVal.beat);
				}
			})
		i++;
	};

	// set up timer

	var beatInterval = setInterval(function () {
		beat();
	}, 5000);

	// set up mouse handlers

	var handleMouseOver = function () {
		clearInterval(beatInterval);
	};

	var handleMouseOut = function () {
		beatInterval = setInterval(function () {
			beat();
		}, 5000);
	};

});
