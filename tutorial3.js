
var data = [20, 40, 50];

var canvas = d3.select("body")
              .append("svg")
              .attr("width", 500)
              .attr("height", 500);

var bars = canvas.selectAll("rect")
            .data(data) // bind data to our empty selection
            .enter()
              .append("rect")
              .attr("width", function(d) {return d * 10;})
              .attr("height", 50)
              .attr("y", function(d, i) {return i * 75;})
