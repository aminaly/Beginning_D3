
// add a canvas element & label your circle
var canvas = d3.select("body")
              .append("svg")
              .attr("width", 500)
              .attr("height", 500);

// create some shapes
var circle = canvas.append("circle")
              .attr("cx", 250)
              .attr("cy", 250)
              .attr("r", 50)
              .attr("fill", "red");

var rect = canvas.append("rect")
            .attr("width", 100)
            .attr("height", 50);

var line = canvas.append("line")
            .attr("x1", 0)
            .attr("x2", 500)
            .attr("y1", 0)
            .attr("y2", 500)
            .attr("stroke", "pink")
            .attr("stroke-width", 10);
