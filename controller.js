var editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;

    this.DnD = new DnD(canvas, this);

    this.getAttribute = function () {
        this.currLineWidth = document.getElementById('spinnerWidth').value;
        this.currColour = document.getElementById('colour').value;
        if (document.getElementById('butRect').checked) {
            this.currEditingMode = editingMode.rect;
        } else if (document.getElementById('butLine').checked) {
            this.currEditingMode = editingMode.line;
        }
    }
    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
    this.onInteractionStart = function () {
        this.getAttribute();
        if (this.currEditingMode == editingMode.line) {
            this.currentShape = new Line(this.DnD.xBegin, this.DnD.yBegin, this.DnD.xBegin, this.DnD.yBegin, this.currColour, this.currLineWidth);
        } else if (this.currEditingMode == editingMode.rect) {
            this.currentShape = new Rectangle(this.DnD.xBegin, this.DnD.yBegin, 0, 0, this.currColour, this.currLineWidth);
        }

        this.currentShape.paint(ctx, canvas);
    }.bind(this);
    this.onInteractionUpdate = function () {

        if (this.currEditingMode == editingMode.line) {
            this.currentShape = new Line(this.DnD.xBegin, this.DnD.yBegin, this.DnD.xEnd, this.DnD.yEnd, this.currColour, this.currLineWidth);
        } else if (this.currEditingMode == editingMode.rect) {
            this.currentShape = new Rectangle(this.DnD.xBegin, this.DnD.yBegin, this.DnD.xEnd - this.DnD.xBegin, this.DnD.yEnd - this.DnD.yBegin, this.currColour, this.currLineWidth);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionEnd = function () {

        if (this.currEditingMode == editingMode.line) {
            this.currentShape = new Line(this.DnD.xBegin, this.DnD.yBegin, this.DnD.xEnd, this.DnD.yEnd, this.currColour, this.currLineWidth);
        } else if (this.currEditingMode == editingMode.rect) {
            this.currentShape = new Rectangle(this.DnD.xBegin, this.DnD.yBegin, this.DnD.xEnd - this.DnD.xBegin, this.DnD.yEnd - this.DnD.yBegin, this.currColour, this.currLineWidth);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.addShape(this.currentShape);
        drawing.paint(ctx, canvas);
        this.currentShape = 0;
        drawing.updateShapeList();

    }.bind(this);

}