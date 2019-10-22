console.log('main master')

var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');
var gIsMouseDown = false;
var gMouseSpeed;
var gPrevX;
var gPrevY;

function init() {
    var timestamp = null;
    var lastMouseX = null;
    var lastMouseY = null;
    document.body.addEventListener("mousemove", function (e) {
        if (timestamp === null) {
            timestamp = Date.now();
            lastMouseX = e.screenX;
            lastMouseY = e.screenY;
            return;
        }
        var now = Date.now();
        var dt = now - timestamp;
        var dx = e.screenX - lastMouseX;
        var dy = e.screenY - lastMouseY;
        var speedX = Math.round(dx / dt * 100);
        var speedY = Math.round(dy / dt * 100);

        timestamp = now;
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        // getSpeed(speedX, speedY)
    });
}

function onMouseDown(ev) {
    console.log('x = ', ev.clientX, 'y = ', ev.clientY)
    onCanvasDraw(ev)
    gIsMouseDown = true;
}

function onMouseUp() {
    gIsMouseDown = false;
}

function onCanvasDraw(ev) {
    if (gIsMouseDown === false) return;
    let x = ev.clientX;
    let y = ev.clientY;
    adjustXY(x, y)
}

function onUpdategShape(val) {
    updategShape(val)
}

function onUpdategColor(val) {
    updategColrs(val)
}

function adjustXY(x, y) {
    x = x - 10;
    y = y - 251;
    console.log('x = ', x, 'y = ', y)
    draw(x, y);
}

function draw(x, y) {
    if (gShape === "rect") {
        drawRect(x, y)
    }
    if (gShape === "line") {
        drawLine(x, y)
    }
    if (gShape === "triangle") {
        drawTriangle(x, y)
    }
    if (gShape === "circle") {
        drawCircle(x, y)
    }
}

function drawRect(x, y) {
    gCtx.rect(x, y, 150, 150)
    gCtx.strokeStyle = gColor
    gCtx.stroke()
}

function drawLine(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(gPrevX, gPrevY);
    gCtx.closePath()
    gCtx.strokeStyle = gColor;
    gCtx.stroke();
    gCtx.fillStyle = gColor;
    gCtx.fill()
    gPrevY = y;
    gPrevX = x
}

function drawTriangle(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x + 70, y + 70);
    gCtx.lineTo(x - 70, 100);
    gCtx.closePath()
    gCtx.strokeStyle = gColor
    gCtx.stroke();
}

function drawCircle(x, y) {
    gCtx.arc(x, y, 50, 0, 2 * Math.PI);
    // gCtx.stroke();
    gCtx.strokeStyle = gColor
    gCtx.stroke()

}

function onClearCanvas() {
    gCtx.rect(0, 0, 500, 500)
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, 500, 500)
}

function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
    console.log(imgContent)
    getImg(imgContent)
}

function getImg(imgContent) {
    var elImg = document.querySelector('.img')
    elImg.setAttribute('src', `${imgContent}`)
    console.log(elImg)
}


