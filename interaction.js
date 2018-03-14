// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    this.xBegin = 0;
    this.yBegin = 0;
    this.xEnd = 0;
    this.yEnd = 0;
    var click = false;
    this.pressure = function (evt) {
        click = true;
        var position = getMousePosition(canvas, evt);
        this.xBegin = this.xEnd = position.x;
        this.yBegin = this.yEnd = position.y;
        interactor.onInteractionStart(this);
    }.bind(this);
    this.moove = function (evt) {
        if (click) {
            var position = getMousePosition(canvas, evt);
            this.xBegin = position.x;
            this.yBegin = position.y;
            interactor.onInteractionUpdate(this);
        }

    }.bind(this);
    this.release = function (evt) {
        if (click) {
            interactor.onInteractionEnd(this);
            click = false;
        }

    }.bind(this);
    canvas.addEventListener('mousedown', this.pressure, false);
    canvas.addEventListener('mousemove', this.moove, false);
    canvas.addEventListener('mouseup', this.release, false);
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

