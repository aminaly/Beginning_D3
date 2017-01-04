
var width = 500;
var height = 500;
var data = [10, 20, 30];

var canvas = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

var heightScale = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, 20])

var circle = canvas.append("circle")
              .attr("cx", 50)
              .attr("cy", 25)
              .attr("r", 25);

// select all of current circles and add circles for data
var circles = canvas.selectAll("circle")
            .data(data)
            .attr("fill", "purple")
            .enter()
              .append("circle")
              .attr("cx", 50)
              .attr("cy", heightScale)
              .attr("r", 25)
              .attr("fill", "green");


/* Personal note
When you enter, you are operating under the assumption that there are no
objects.

However if you do have object already (say you already have a circle and you
want to add more circles based on the data) the initial data points will be
ignored until it has to start making new elements (circles). It acts as an
update

Exit selections will do something to the remainder of the selection that isn't
covered by the given dataset
*/
