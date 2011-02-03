function fibonacci(count) {
  return [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269 ];
}

// SVG templates for creating a quarter circle
//
// M(x,y)origin aradius,radius 0 0,0 -radius,-radius northeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,radius   southwest-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,-radius  southeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 -radius,radius  northwest-quartercircle

// draw a quartercircle arc
// given a box origin (x0,y0), area (a), and vector (v degrees) 
// calculate the hypotenuse and return second point
// eg (0,0) , 1 , 45
//
// return the hypotenuse and second point
function vector(radius, theta) {
  var point2='';
  switch(theta)
  {
  case 45:
    point2 = { x: radius, y: -radius };
    break;
  case 135:
    point2 = { x: -radius, y: -radius };
    break;
  case 225:
    point2 = { x: -radius, y: radius };
    break;
  case 315:
    point2 = { x: radius, y: radius };
    break;
  default:
    point2 = {};
  }
  return point2;
}


function arc(start, area, theta) {
  var radius = Math.sqrt(area)*10;
  var end = vector(radius, theta);
  return {origin: start, radius: radius, endpoint: end};
}

function svg(arc) {
	return "M"+arc.origin.x+','+arc.origin.y+" a"+arc.radius+","+arc.radius+" 0 0,0 "+arc.endpoint.x+","+arc.endpoint.y;
}


$().ready(function() {
  var paper = Raphael('canvas',400,400);

  var gold_arc = arc({ x:200,y:200}, 1, 45);
  var svg1 = svg(gold_arc);
  console.log(svg1);
  var draw = paper.path(svg1);
  draw.attr("stroke", "#0f0");

  var gold_arc2 = arc({x: gold_arc.origin.x+gold_arc.endpoint.x, y: gold_arc.origin.y+gold_arc.endpoint.y}, 2, 135);
  svg2 = svg(gold_arc2);
  console.log(svg2);
  var draw2 = paper.path(svg2);
  draw2.attr("stroke", "#00f");
});
