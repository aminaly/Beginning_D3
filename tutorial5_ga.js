
var data = [20, 40, 50, 60];
var width = 500;
var height = 500;

var widthScale = d3.scale.linear()
                  .domain([0, 60])
                  .range([0, width]);

var heightScale = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, height - 50]);

var colorScale = d3.scale.linear()
                  .domain([0, 60])
                  .range(["blue", "purple"]);

var axis = d3.svg.axis()
            .scale(widthScale)
            .ticks(10);

var canvas = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(20, 0)") // move the canvas

var bars = canvas.selectAll("rect")
            .data(data) // bind data to our empty selection
            .enter()
              .append("rect")
              .attr("width", function(d) {return widthScale(d);})
              .attr("height", 50)
              .attr("fill", function(d) {return colorScale(d)})
              .attr("y", function(d, i) {return heightScale(i);})

// create a new group for the axis
canvas.append("g")
      .attr("transform", "translate(0, 400)")
      .call(axis);
