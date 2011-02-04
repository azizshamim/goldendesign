// Golden Spiral 
// requires Raphael and jQuery
//
// SVG templates for creating a quarter circle
// M(x,y)origin aradius,radius 0 0,0 -radius,-radius northeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,radius   southwest-quartercircle
// M(x,y)origin aradius,radius 0 0,0 radius,-radius  southeast-quartercircle
// M(x,y)origin aradius,radius 0 0,0 -radius,radius  northwest-quartercircle
//

function vector(radius, theta) {
  var point2 = '';
  switch (theta) {
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

function arc(start, radius, theta) {
  var v = vector(radius, theta);
  var end = {x: start.x+v.x, y:start.y+v.y};
  var graphic = svg({origin: start, radius: radius, endpoint: end });
  return {svg: graphic, origin: start, endpoint: end};
}

function draw(canvas, start, vector, theta) {
  // pop vector
  if (vector > 1000000) {
    return 0;
  }
  var goldarc = arc(start, vector, theta);
  console.log(goldarc.svg);
  var path = canvas.path(goldarc.svg);
  path.attr("stroke", "#0f0");
  path.attr('stroke-width', '5');

  vector = vector*1.618;
  var theta1 = (theta+90)%360;
  draw(canvas, goldarc.endpoint, vector, theta1);
}

$().ready(function() {
  var angle = 315;
  var start_vector = 1;
  var paper = Raphael('canvas',4000,4000);
  
  $('#canvas').click(function(e) {
      paper.clear();
      draw(paper, {x:e.pageX, y:e.pageY}, start_vector, angle);
  });
});
