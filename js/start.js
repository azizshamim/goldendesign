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
function arc(centerx, centery, area, theta) {
  var radius = Math.sqrt(area)*100;
  
  var point2='';
  switch(theta)
  {
  case 45:
    point2 = ""+radius+",-"+radius;
    break;
  case 135:
    point2 = "-"+radius+",-"+radius;
    break;
  case 225:
    point2 = "-"+radius+","+radius;
    break;
  case 315:
    point2 = ""+radius+","+radius;
    break;
  default:
    point2 = '';
  }
    
  var svg = "M"+centerx+','+centery+" a"+radius+","+radius+" 0 0,0 "+point2;
  return svg;
}

$().ready(function() {
  var paper = Raphael('canvas',400,400);
  var gold_arc = arc(200,200, 1, 45);
  console.log(gold_arc);
  var draw = paper.path(gold_arc);
  draw.attr("stroke", "#0f0");
});
