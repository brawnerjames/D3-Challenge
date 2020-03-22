// set svg height/ width

var svgHeight = 600;
var svgWidth = 900;

// set chart margins

var chartMargin = {
    top: 30,
    bottom: 30,
    right: 30,
    left: 30
}

// set dimensions of chart area

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// create svg element

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")

  svg.append("g").attr("class", "xText")
  var xText = d3.select(".xText")
  xText.attr("transform","translate("+chartWidth/2+","+chartHeight+")")
  xText.append("text").attr("y", 30).text("In Poverty %")

// load data from data.csv

d3.csv("data.csv").then(function(data) {
    console.log(data)
    
    // data.forEach(function(data) {
    //     data.id = +data.id;
    //     data.poverty = +data.poverty;
    //     data.povertyMoe = +data.povertyMoe;
    //     data.age = +data.age;
    //     data.ageMoe = +data.ageMoe;
    //     data.income = +data.income;
    //     data.incomeMoe = +data.incomeMoe;
    //     data.healthcare = +data.healthcare;
    //     data.healthcareLow = +data.healthcareLow;
    //     data.healthcareHigh = +data.healthcareHigh;
    //     data.obesity = +data.obesity;
    //     data.obesityLow = +data.obesityLow;
    //     data.obesityHigh = +data.obesityHigh;
    //     data.smokes = +data.smokes;
    //     data.smokesLow = +data.smokesLow;
    //     data.smokesHigh = +data.smokesHigh;
    // })


    // create svg area


// add x-axis

var xMin = d3.min(data,function(d){
  return parseFloat(d.poverty)*0.9;
});

var xMax = d3.max(data,function(d){
  return parseFloat(d.poverty)*1.1;
});

var yMin = d3.min(data,function(d){
  return parseFloat(d.healthcare)*0.9;
});

var yMax = d3.max(data,function(d){
  return parseFloat(d.healthcare)*1.1;
});

var xScale = d3.scaleLinear()
  .domain([xMin, xMax])
  .range([0, chartWidth]);

var yScale = d3.scaleLinear()
  .domain([yMin, yMax])
  .range([chartHeight, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);



chartGroup.append("g")
  .attr("transform", `translate(${0}, ${chartHeight})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);

var circles = chartGroup.selectAll("circle").data(data).enter()

circles
  .append("circle")
  .classed("scatter", true)
  .attr("cx", (d, i) => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "grey");
    circles.append("text").text(function(d){
      return d.abbr
    }).attr("dx", (d, i) => xScale(d.poverty)-11/2.5)
    .attr("dy", d => yScale(d.healthcare)+10/2.5)
    .attr("font-size", "10")
    .attr("fill", "white")

console.log("hello")


});


