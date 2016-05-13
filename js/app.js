$(document).foundation();
$("#carousel").slick({
  dots: true,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
});

var costPlot = new r2d3.plot(Document.getElementById("costplot"),{top:10,left:10,right:10,bottom:10});
d3.json("data/costBar.json", function(error, json){
  console.log(json);
  costPlot.update(json);
});