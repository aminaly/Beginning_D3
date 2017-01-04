
var data = [20, 40, 50, 60];
var width = 500;
var height = 500;

var widthScale = d3.scale.linear()
                  .domain([0, 60])
                  .range([0, width]);

var heightScale = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, height]);

var colorScale = d3.scale.linear()
                  .domain([0, 60])
                  .range(["blue", "purple"]);

var canvas = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

var bars = canvas.selectAll("rect")
            .data(data) // bind data to our empty selection
            .enter()
              .append("rect")
              .attr("width", function(d) {return widthScale(d);})
              .attr("height", 50)
              .attr("fill", function(d) {return colorScale(d)})
              .attr("y", function(d, i) {return heightScale(i);})
