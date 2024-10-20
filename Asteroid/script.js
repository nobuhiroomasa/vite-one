import { getUserEmail,saveScoreAndEmail,displayDataInHTMLRealtime } from '../firebaseConfig.js'



"use strict";
var ctx, ship, shots = [], rocks = [], level = 1,
    score = 0, clock = 0, timer = NaN, bg, bgX = 0, bgY = 0;

function Rock(x, y, s) {
    this.cx = x;
    this.cy = y;
    this.w = s;
    this.h = s;
    var a = Math.random() * Math.PI * 2;
    this.dx = Math.floor(Math.cos(a) * (128 / s));
    this.dy = Math.floor(Math.sin(a) * (128 / s));
    this.image = document.getElementById('rock');
}

function Shot() {
    this.cx = 0;
    this.cy = 0;
    this.w = 6;
    this.h = 6;
    this.dx = 0;
    this.dy = 0;
    this.count = this.maxCount;
    this.power = 10;
    this.maxCount = 40;
}

function Ship() {
    this.cx = 400;
    this.cy = 400;
    this.w = 90;
    this.h = 60;
    this.dx = 0;
    this.dy = 0;
    this.rotate = 0;
    this.power = 0;
    this.accel = 0;

    this.keyL = false;
    this.keyR = false;
    this.keyF = false;
    this.keyB = false;

    this.image = document.getElementById('ship');
}

Shot.prototype = Ship.prototype = Rock.prototype = {
    getX: function () { return this.cx - this.w / 2; },
    getY: function () { return this.cy - this.h / 2; },
    isHit: function (o) {
        return !(((o.getX() + o.w) < this.getX()) ||
            ((this.getX() + this.w) < o.getX()) ||
            ((o.getY() + o.h) < this.getY()) ||
            ((this.getY() + this.h) < o.getY()));
    },
    update: function () {
        this.cx = (this.cx + this.dx + 800) % 800;
        this.cy = (this.cy + this.dy + 800) % 800;
    }
}

function rand(r) { return Math.floor(Math.random() * r) }

window.init = function() {
    // モーダルを非表示にする
    document.getElementById('modal').style.display = 'none';

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "20pt Arial";

    bg = document.getElementById("bg");
    
    ship = new Ship();

    // 弾丸の初期化
    for (var i = 0 ; i < 7 ; i++) {
        shots.push(new Shot());
    }

    // キーイベントハンドラーの初期化
    window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 37: ship.keyL = true; break;
            case 38: ship.keyF = true; break;
            case 39: ship.keyR = true; break;
            case 40: ship.keyB = true; break;
            case 32: ship.keyH = true; break;
        }
    });
    window.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
            case 37: ship.keyL = false; break;
            case 38: ship.keyF = false; break;
            case 39: ship.keyR = false; break;
            case 40: ship.keyB = false; break;
            case 32: ship.keyH = false; break;
        }
    });

    start();

    if (isNaN(timer)) {
        timer = setInterval(mainLoop, 50);
    }
}




function start() {
    rocks = [];

    // 岩の初期化
    for (var i = 0 ; i < level ; i++) {
        var x = rand(800), y = rand(800);
        while (true) {
            var r = new Rock(x, y, 64);
            if (!r.isHit(ship)) {
                rocks.push(r);
                break;
            }
        }
    }
}

function mainLoop() {
    clock++;

    if (rocks.length == 0) {
        if (clock > 100) {
            level++;
            start();
        }
        return;
    }

    // 船の場所・向きを更新
    if (ship.keyL) { ship.rotate -= 0.1; }
    if (ship.keyR) { ship.rotate += 0.1; }
    if (ship.keyF) { ship.accel = Math.min(+5, ship.accel + 0.2); }
    if (ship.keyB) { ship.accel = Math.max(-5, ship.accel - 0.1); }

    ship.power += ship.accel;
    ship.power *= 0.94;
    ship.accel *= 0.94;
    ship.dx = Math.cos(ship.rotate) * ship.power;
    ship.dy = Math.sin(ship.rotate) * ship.power;
    ship.update();

    bgX = (bgX + ship.dx / 2 + 1600) % 800;
    bgY = (bgY + ship.dy / 2 + 1600) % 800;

    // 弾丸の位置を更新
    var fire = false;
    shots.forEach(function (shot) {
        if (shot.count < shot.maxCount) {
            shot.count++;
            shot.update();

            // 衝突検出
            var hit = -1, r = NaN;
            rocks.forEach(function (rock, i) {
                if (rock.isHit(shot)) {
                    hit = i;
                    r = rock;
                }
            });

            // 弾丸が岩に衝突
            if (hit >= 0) {
                rocks.splice(hit, 1);

                score += (64 / r.w) * 10;
                shot.count = shot.maxCount;

                r.w /= 2;
                if (r.w >= 16) {
                    for (var i = 0 ; i < 2 ; i++) {
                        rocks.push(new Rock(r.cx, r.cy, r.w));
                    }
                }

                // ステージクリア
                if (rocks.length == 0) {
                    clock = 0;
                    draw();
                }
            }
        }
        else if (!fire && ship.keyH) {
            shot.count = 0;
            shot.cx = ship.cx;
            shot.cy = ship.cy;
            shot.r = ship.rotate;
            shot.dx = ship.dx + shot.power * Math.cos(shot.r);
            shot.dy = ship.dy + shot.power * Math.sin(shot.r);
            fire = true;
        }
    });

    // 岩の場所を更新
    rocks.forEach(function (rock) {
        rock.update();

        if (ship.isHit(rock)) {
            clearInterval(timer);
            timer = NaN;
        }
    });

    draw();
}

async function draw() {
    // 背景を描画
    ctx.drawImage(bg, bgX, bgY, 400, 400, 0, 0, 800, 800);

    // 弾丸の描画
    ctx.fillStyle = 'rgb(0,255,255)';
    shots.forEach(function (shot) {
        if (shot.count < shot.maxCount) {
            ctx.fillRect(shot.getX(), shot.getY(), shot.w, shot.h);
        }
    });

    // 岩の描画
    rocks.forEach(function (rock) {
        ctx.drawImage(rock.image, rock.getX(), rock.getY(), rock.w, rock.h);
    });

    // 船の描画
    ctx.save();
    ctx.translate(ship.cx, ship.cy);
    ctx.rotate(ship.rotate);
    ctx.drawImage(ship.image, -ship.w / 2, -ship.h / 2);
    ctx.restore();

    // スコアの描画
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.fillText(('0000000' + score).slice(-7), 670, 30);

    if (rocks.length == 0) {
        ctx.fillText('STAGE CLEAR', 300, 150);
    }

    if (isNaN(timer)) {
        ctx.fillText('GAME OVER', 320, 150);
        ctx.drawImage(bang, ship.getX() - 50, ship.getY() - 50, 200, 200);
        const title = document.title;
        const userEmail = await getUserEmail();
        await saveScoreAndEmail( title, score, userEmail);

    }
}
const title = document.title;

displayDataInHTMLRealtime(title);