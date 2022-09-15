let game = {
    maxXY: 350,
    waitingDraw: false,
    canDraw: false,
    valid: false,
    lineWidth: 5,
    oob: [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 18, 19, 20, 29, 30, 39, 60, 69, 70, 79, 80, 81, 88, 89, 90, 91, 92, 93, 96, 97, 98, 99],
    offset: {
        '03': [5,0],
        '06': [5,0],
        '12': [-5,0],
        '17': [-5,0],
        '21': [-5,-5],
        '28': [-5,5],
        '30': [0,5],
        '39': [0,-5],
        '60': [0,5],
        '69': [0,-5],
        '71': [5,-5],
        '78': [5,5],
        '82': [5,0],
        '87': [5,0],
        '93': [-5,0],
        '96': [-5,0]
    },
    colors: ['ff0000', '00ff00', '0000ff', 'ffff00'],
    levels: [
        [
            ['2187', '7166', '2382'],
            ['2187', '0566', '0328'],
            ['1259', '5278', '6057'],
            ['2460', '0657', '1274'],
            ['1269', '2687', '2157'],
            ['4036', '3378', '1274'],
            ['2193', '2460', '4057'],
            ['2124', '2872', '0547'],
        ],
        [
            ['0454', '4078', '2135','2876'],
            ['2125', '0647', '2873', '6075'],
            ['2146', '1764', '2594', '3378'],
            ['1244', '2833', '4294', '4660'],
            ['3073', '0565', '3693', '3459'],
            ['0334', '2659', '4296', '6671'],
            ['2176', '0432', '4694', '2359'],
            ['1734', '1369', '5295', '6671'],
        ],
        [
            ['3056', '0537', '3593', '2852'],
            ['0575', '4249', '2595', '4047'],
            ['4387', '1256', '3693', '1763'],
            ['0474', '1776', '5471', '8226'],
        ],
    ],
    done: [],
    paths: [],
    levelCompleted: [],
    currentLevel: '00',
    currentTarget: '',
    startX: 0,
    startY: 0,
};
(function ($) {
    let wc = $('#welcome'),
        gm = $('#game_menu'),
        gw = $('#game_wrapper'),
        gs = $('#game'),
        ps = $('#path'),
        ln = $('#level_name'),
        settings = $('#settings'),
        ctx = gs[0].getContext('2d'),
        ptx = ps[0].getContext('2d'),
        chtx = $('#check')[0].getContext('2d'),
        x = 0,
        y = 0,
        path = [],
        canvas = document.getElementById('game');

    const init = () => {
        if ($(window).width() < game.maxXY) game.maxXY = $(window).width();
        gw.css({
            width: game.maxXY + 'px',
            height: game.maxXY + 'px',
        });
        ptx.canvas.height = ctx.canvas.height = chtx.canvas.height = game.maxXY;
        ptx.canvas.width = ctx.canvas.width = chtx.canvas.width = game.maxXY;
        ptx.lineCap = ctx.lineCap = chtx.lineCap = 'round';
        ptx.lineWidth = ctx.lineWidth = chtx.lineWidth = game.lineWidth;

        getData();
        goLevel();
    }

    const updateData = () => {
        const data = {
            levelCompleted: game.levelCompleted
        };
        localStorage.setItem('twodots', JSON.stringify(data));
    }
    const getData = () => {
        const data = JSON.parse(localStorage.getItem('twodots'));
        if (data) {
            game.levelCompleted = data.levelCompleted ? data.levelCompleted : [];
        }
    }
    const drawGame = () => {
        ptx.fillStyle = 'white';
        ctx.clearRect(0, 0, gs[0].width, gs[0].height);
        ptx.fillRect(0, 0, gs[0].width, gs[0].height);
        ctx.strokeStyle = '#000';

        drawCircle();

        if(game.paths.length) {
            ctx.lineWidth = game.lineWidth;
            for(i in game.paths) {
                ctx.strokeStyle = game.paths[i].color;
                ctx.stroke(game.paths[i].path);
            }
        }

        [a, b] = game.currentLevel.split('');
        let nodes = game.levels[a][b];
        for (i in nodes) {
            [a, b, c, d] = nodes[i].toString().split('');
            placeNode(a, b, c, d, i);
            placeNode(c, d, a, b, i);
        }

        // showGrid();
    }
    const goLevel = () => {
        game.paths = [];
        game.done = [];
        game.paths = [];
        game.currentTarget = '';
        drawGame();
    }
    const placeNode = (x, y, a, b, c) => {
        const step = game.maxXY / 10,
            w = step * 0.8,
            h = step / 2,
            offset = game.offset[x+''+y];

        let t = (y * step) + h,
            l = (x * step) + h;

        if(offset) {
            l += offset[0];
            t += offset[1];
        }

        const p = new Path2D();
        ctx.beginPath();
        p.arc(l, t, h, 0, 2 * Math.PI);
        ptx.fillStyle = ctx.fillStyle = '#' + game.colors[c];
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.fill(p);
        ctx.stroke(p);
        ptx.fill(p);
    }

    const drawCircle = () => {
        const p = new Path2D();
        ctx.lineWidth = 3;
        p.arc((game.maxXY / 2), (game.maxXY / 2), ((game.maxXY / 2) - 15), 0, 2 * Math.PI);
        gw.find('img').css({
            width: (game.maxXY-30) + 'px',
            height: (game.maxXY-30) + 'px'
        });
        ctx.stroke(p);
    }

    const drawNode = (x, y) => {
        const step = game.maxXY / 10,
            h = step / 2,
            offset = game.offset[x+''+y];

        let t = (y * step) + h,
            l = (x * step) + h;
        if(offset) {
            l += offset[0];
            t += offset[1];
        }

        chtx.beginPath();
        chtx.arc(l, t, (h * 0.8), 0, 2 * Math.PI);
        chtx.fillStyle = '#fff';
        chtx.fill();
        chtx.fillStyle = 'rgba(0,0,0,0.2)';
        chtx.fill();
    }

    const showGrid = () => {
        let w = game.maxXY,
            h = game.maxXY,
            s = game.maxXY / 10;
        ctx.lineWidth = 1;
        for (x = 0; x <= w; x += s) {
            for (y = 0; y <= h; y += s) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
                showNodeID(x, y, s);
            }
        }

    }

    const showNodeID = (x, y, s) => {
        if ((y / s) > 9 || (x / s) > 9) return;
        gw.append('<b style="display: block; position: absolute; z-index: 9999; text-align: center; font-size: 16px; ' +
            'width: ' + s + 'px;' +
            'line-height: ' + s + 'px;' +
            'height: ' + s + 'px;' +
            'top:' + (y) + 'px;' +
            'left:' + (x) + 'px;' + '" ' +
            '>' + (x / s) + '-' + (y / s) + '</b>');
    }

    const checkPath = () => {
        let valid = true,
            pt = new Path2D(),
            step = game.lineWidth;
        chtx.strokeStyle = 'rgba(0,0,0,0.2)';
        chtx.fillStyle = "white";
        chtx.fillRect(0, 0, gs[0].width, gs[0].height);

        pt = new Path2D();
        chtx.lineWidth = 5;
        pt.arc((game.maxXY / 2), (game.maxXY / 2), ((game.maxXY / 2) - 15), 0, 2 * Math.PI);
        chtx.stroke(pt);

        [a, b] = game.currentLevel.split('');
        let nodes = game.levels[a][b];
        for (i in nodes) {
            [a, b, c, d] = nodes[i].toString().split('');
            drawNode(a, b);
            drawNode(c, d);
        }

        pt = new Path2D();
        for (i in game.paths) {
            chtx.lineWidth = game.lineWidth;
            chtx.stroke(game.paths[i].path);
        }
        for (i in path) {
            let c = path[i].split(',');
            if (i > 0) {
                pt.lineTo(c[0], c[1]);
                pt.moveTo(c[0], c[1]);
            } else {
                pt.moveTo(c[0], c[1]);
            }
        }
        chtx.stroke(pt);

        let pixel;
        for (let i = 30; i <= (game.maxXY-30); i += step) {
            for (let h = 30; h <= (game.maxXY-30); h += step) {
                pixel = chtx.getImageData(i, h, 1, 1).data;
                if ((
                    pixel[0] > 0 ||
                    pixel[1] > 0 ||
                    pixel[2] > 0
                ) && (
                    pixel[0] < 200 ||
                    pixel[1] < 200 ||
                    pixel[2] < 200
                )) {
                    valid = false;
                }
                if (!valid) {
                    break;
                }
            }
            if (!valid) break;
        }
        if (valid) {
            registerPath();
            return true;
        }
        alert('invalid move!');

        path = [];
        drawGame();
        return false;
    }
    const registerPath = () => {
        const p = new Path2D();
        ctx.lineWidth = game.lineWidth;
        for (i in path) {
            let c = path[i].split(',');
            if (i > 0) {
                p.lineTo(c[0], c[1]);
                p.moveTo(c[0], c[1]);
            } else {
                p.moveTo(c[0], c[1]);
            }
        }
        [r,g,b]  = game.currentTarget.split(',');
        game.paths.push({
            color: '#' + rgbToHex(parseInt(r),parseInt(g),parseInt(b)),
            path: p,
        });
        game.done.push(game.currentTarget);
        game.currentTarget = '';
        path = [];
        drawGame();
    }
    const stopDraw = () => {
        if (game.waitingDraw) {
            game.waitingDraw = false;
            game.currentTarget = '';
            return;
        }
        if (!game.canDraw) return;
        game.canDraw = false;
        if (!game.valid) {
            drawGame();
            return path = [];
        }
        if (checkPath()) {
            checkWinner();
        }
        game.valid = false;
    }
    const checkWinner = () => {
        [a, b] = game.currentLevel.split('');
        let nodes = game.levels[a][b];
        if (game.done.length >= nodes.length) {
            if (!game.levelCompleted.includes(game.currentLevel)) {
                game.levelCompleted.push(game.currentLevel);
            }
            updateData();
            alert('Well done!');
            gm.removeClass('d-none');
            ln.addClass('d-none');
            gw.addClass('d-none');
            settings.addClass('d-none');
            gameMenu(game.currentLevel.substring(0, 1));
        }
    }
    const drawPath = (newX, newY) => {
        const pixel = getPixel(newX,newY);
        const currentColor = pixel[0]+','+pixel[1]+','+pixel[2];
        if(game.waitingDraw) {
            if(currentColor === '255,255,255') {
                game.waitingDraw = false;
                game.canDraw = true;
                [r,g,b]  = game.currentTarget.split(',');
                ctx.strokeStyle = '#' + rgbToHex(parseInt(r),parseInt(g),parseInt(b));
                game.startX = x = newX;
                game.startY = y = newY;
            }
        }
        if (game.canDraw) {
            if(currentColor === game.currentTarget) {
                if((Math.abs(game.startX - x) > 20) && Math.abs(game.startY - y) > 20) {
                    game.valid = true;
                }
                stopDraw();
            } else {
                ctx.lineWidth = game.lineWidth;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(newX, newY);
                ctx.stroke();
                x = newX;
                y = newY;
                path.push(x + ',' + y);
            }
        }
    }
    const prepareDraw = (x, y) => {
        // check game state
        if(!game.waitingDraw) {
            const pixel = getPixel(x,y);
            if((pixel[0]+pixel[1]+pixel[2] < 765) && !game.done.includes(pixel[0]+','+pixel[1]+','+pixel[2])) {
                game.waitingDraw = true;
                game.currentTarget = pixel[0]+','+pixel[1]+','+pixel[2];
            }
        }
    }
    const gameMenu = (item) => {
        if (item < 0) return false;
        let n = ['BEGINNER', 'INTERMEDIATE', 'EXPERT'];
        gm.html('');
        if (item.length === 1) {
            let current = 0,
                m = $('<div class="row lvl-select"></div>');
            $('<h2>'+ n[item] +'</h2>').appendTo(gm);
            for (let i = 0; i < game.levels[item].length; i++) {
                let node = $('<div class="col-4"></div>');
                if (!game.levelCompleted.includes(item + '' + i)) {
                    if(!current) {
                        current = 1;
                        $('<div class="lvl-node"><button class="current" data-level="' + item + '' + i + '"><span>' + (i + 1) + '</span></button></div>').appendTo(node);
                    } else {
                        $('<div class="lvl-node"><button class="disabled" data-level="-1"><span>' + (i + 1) + '</span></button></div>').appendTo(node);
                    }
                } else {
                    $('<div class="lvl-node"><button data-level="' + item + '' + i + '"><span>' + (i + 1) + '</span></button></div>').appendTo(node);
                }
                node.appendTo(m);
            }
            m.appendTo(gm);
            $('<div class="col-12 text-center"><button data-level="main">BACK</button></div>').appendTo(gm);
        } else if (item.length === 2) {
            game.currentLevel = item;
            $('.viewport').addClass('in-game');
            gm.addClass('d-none');
            ln.removeClass('d-none');
            gw.removeClass('d-none');
            settings.removeClass('d-none');
            ln.find('h2').text(n[item.substring(0, 1)] + ' ' + (parseInt(item.substring(1)) + 1));
            goLevel();
        } else {
            $('<h2>CHOOSE<br>DIFFICULTY</h2>').appendTo(gm);
            for (let i = 0; i < game.levels.length; i++) {
                $('<button data-level="' + i + '">' + n[i] + '</button>').appendTo(gm);
            }
        }
    }
    const getPixel = (x, y) => {
        const pixel = ptx.getImageData(x, y, 1, 1).data;
        return [pixel[0],pixel[1],pixel[2]];
    };
    const rgbToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return (
            ('0'+r.toString(16)).slice(-2) + '' +
            ('0'+g.toString(16)).slice(-2) + '' +
            ('0'+b.toString(16)).slice(-2)
        );
    }
    const getColor = (color) => {
        const r = parseInt(color.substring(0, 2), 16),
            g = parseInt(color.substring(2, 4), 16),
            b = parseInt(color.substring(4), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',0.5)';
    }
    const goMain = () => {
        $('.viewport').removeClass('in-game');
        gm.removeClass('d-none');
        ln.addClass('d-none');
        wc.addClass('d-none');
        gw.addClass('d-none');
        settings.addClass('d-none');
        gameMenu('main');
    };
    gm
        .on('click', 'button', function (e) {
            gameMenu($(this).data('level').toString());
        });

    wc
        .on('click', '.go_main', function(e) {
            goMain();
        });
    settings
        .on('click', '.go_main', function (e) {
            goMain();
        })
        .on('click', '#reset', function (e) {
            goLevel();
        });

    gw
        .on('touchstart', function(e) {
            if (e.target == canvas) {
                e.preventDefault();
                prepareDraw(e.touches[0].clientX - gw.offset().left, e.touches[0].clientY - gw.offset().top);
            }
        })
        .on('touchmove', function(e) {
            if(
                e.touches[0].clientX - gw.offset().left < 0 ||
                e.touches[0].clientX > gw.width() ||
                e.touches[0].clientY < gw.offset().top ||
                e.touches[0].clientY > (gw.offset().top + gw.height())
            ) {
                stopDraw();
            } else {
                drawPath(e.touches[0].clientX - gw.offset().left, e.touches[0].clientY - gw.offset().top);
            }
        })
        .on('touchend', stopDraw)
        .on('mousedown',function (e) {
            e.preventDefault();
            prepareDraw(e.offsetX, e.offsetY);
        })
        .on('mousemove', function(e) {
            drawPath(e.offsetX, e.offsetY);
        })
        .on('mouseup', stopDraw)
        .on('mouseleave', stopDraw);
    init();
})(jQuery);
