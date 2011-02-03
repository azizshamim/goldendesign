// SVG templates for creating a quarter circle
// M(x,y)origin aradius,radius 0 0,0 -radius,-radius northeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,radius   southwest-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,-radius  southeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 -radius,radius  northwest-quartercircle

function fibonacci(count) {
  return [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269 ];
}

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

function svg(arc) {
	return "M"+arc.origin.x+','+arc.origin.y+" A"+arc.radius+","+arc.radius+" 0 0,0 "+arc.endpoint.x+","+arc.endpoint.y;
}

function arc(start, area, theta) {
  var radius = (Math.sqrt(2*area))
  var v = vector(radius, theta);
  var end = {x: start.x+v.x, y:start.y+v.y};
  var graphic = svg({origin: start, radius: radius, endpoint: end });
  return {svg: graphic, origin: start, endpoint: end};
}

function draw(canvas, start, vectors, theta) {
  // pop vector
  v = vectors.shift();
  if (v == undefined) {
    return 0;
  }
  goldarc = arc(start, v, theta);
  console.log(goldarc.svg);
  var path = canvas.path(goldarc.svg);
  path.attr("stroke", "#0f0");

  theta1 = (theta+90)%360;
  draw(canvas, goldarc.endpoint, vectors, theta1);
}

$().ready(function() {
  var paper = Raphael('canvas',4000,4000);
  draw(paper, {x:400,y:400}, fibonacci(10), 45);
  
  //$('#canvas').click(function(e) {
  //});

});
