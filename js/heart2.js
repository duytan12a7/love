var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 400,
    cx = cw / 2;
var ch = c.height = 400,
    cy = ch / 2;
var frames = 0;
var R = 100;// for the heart path
var howMany = 150;// how many particles
var p = []; // particles array
var D = 25;
/*var colors = [170, 180, 190, 200, 210];*/
var colors = [340, 350, 360, 0, 10, 20];

ctx.fillStyle = "rgba(0,0,0,.05)";
var cx = [cw / 2, cw / 2 + R, cw / 2 - R];
var cy = [ch / 2, R, R];

function Particle() {
    var a = (Math.random() * 2 * Math.PI);
    var r = ~~(Math.random() * R);
    var index = Math.floor(Math.random() * 3)
    this.x = cx[index] + r * Math.cos(a);
    this.y = cy[index] + r * Math.sin(a);
    this.ix = (Math.random()) * (Math.random() < 0.5 ? -1 : 1); //positive or negative
    this.iy = (Math.random()) * (Math.random() < 0.5 ? -1 : 1); //positive or negative
    this.hue = colors[Math.round(Math.random() * colors.length) + 1]
}

function createParticle() {
    var particle = new Particle();
    p.push(particle);
}

for (var i = 0; i < howMany / 2; i++) {
    createParticle();
}

function Draw() {
    frames++
    if (frames % 2 == 0 && p.length < howMany) {
        createParticle();
    }

    ctx.fillRect(0, 0, cw, ch);
    thePath(R, 1);// the current path for isPointInPath
    ctx.strokeStyle = "hsla(10%,20%,.3)";
    ctx.stroke();
    for (var i = 0; i < p.length; i++) {
        ctx.fillStyle = p[i].c;
        if (ctx.isPointInPath(p[i].x, p[i].y)) {
            p[i].x += p[i].ix;
            p[i].y += p[i].iy;

        } else {
            p[i].ix = -1 * p[i].ix;
            p[i].iy = -1 * p[i].iy;
            p[i].x += p[i].ix;
            p[i].y += p[i].iy;
        }
    }

    compare();

    window.requestAnimationFrame(Draw);
}

window.requestAnimationFrame(Draw);

function compare() {
    for (var i = 0; i < p.length; i++) {
        var a = p[i];
        for (var j = i + 1; j < p.length; j++) {

            var b = p[j];
            var dist = distance(a, b);
            if (dist < D) {
                var c = {};
                var alp = (D - dist) / D;
                var hue = a.hue;
                ctx.strokeStyle = "hsla(" + hue + ",87%, 44%," + alp + ")";
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
}

function distance(a, b) {
    var ac = b.y - a.y;
    var bc = b.x - a.x;
    var ab = Math.sqrt(ac * ac + bc * bc);
    return ab;
}

function thePath(R, r) {//draw a heart
    ctx.beginPath();
    ctx.moveTo(200, R);
    ctx.arc(300, R, R - r, Math.PI, Math.PI * 0.23);
    ctx.lineTo(200, 350);
    ctx.arc(100, R, R - r, Math.PI * 0.77, 0);// NO stroke!!!
}

function randomIntFromInterval(mn, mx) {
    return ~~(Math.random() * (mx - mn + 1) + mn);
}