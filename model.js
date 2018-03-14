// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Draw(){
    this.shapes = [];
    this.addShape = function(shape) { this.shapes.push(shape);}.bind(this);
    this.removeShape = function(id) { this.shapes.splice(id,1); }.bind(this);
}

function Shape(color, thickness){
    this.color = color;
    this.thickness = thickness;
}

function Line(x1,y1,x2,y2,color,thickness){
    Shape.call(this,color,thickness);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}
Line.prototype = new Shape();

function Rectangle(x1,y1,width,height,color,thickness){
    Shape.call(this,color,thickness);
    this.x1 = x1;
    this.y1 = y1;
    this.height = height;
    this.width = width;
}
Rectangle.prototype = new Shape();
