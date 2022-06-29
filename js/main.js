let game = {
    maxXY: 500,
    canDraw: false,
    valid: false,
    lineWidth: 5,
    oob: [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 18, 19, 20, 29, 30, 39, 60, 69, 70, 79, 80, 81, 88, 89, 90, 91, 92, 93, 96, 97, 98, 99],
    colors: ['ff0000', '00ff00', '0000ff', 'ffff00'],
    levels: [
        [
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
        ],
        [
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
        ],
        [
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
            [2187, 2382, 7166],
        ],
    ],
    paths: [],
    levelCompleted: [],
    currentLevel: '00',
    currentTarget: 'null',
};
(function ($) {
    let gm = $('#game_menu'),
        gw = $('#game_wrapper'),
        gs = $('#game'),
        p = $('#pad'),
        settings = $('#settings'),
        ctx = gs[0].getContext('2d'),
        ptx = p[0].getContext('2d'),
        chtx = $('#check')[0].getContext('2d'),
        x = 0,
        y = 0,
        path = [];

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
        if(data) {
            game.levelCompleted = data.levelCompleted ?? [];
        }
    }
    const goLevel = () => {
        game.paths = [];
        ctx.clearRect(0, 0, p[0].width, p[0].height);
        ptx.strokeStyle = ctx.strokeStyle = '#000';
        drawCircle();

        gw.find('.node').remove();
        [a, b] = game.currentLevel.split('');
        let nodes = game.levels[a][b];
        for (i in nodes) {
            [a, b, c, d] = nodes[i].toString().split('');
            placeNode(a, b, c, d, i);
            placeNode(c, d, a, b, i);
        }

        // showGrid();
    }

    const placeNode = (x, y, a, b, c) => {
        const step = game.maxXY / 10,
            w = step * 0.8,
            h = step / 2;
        gw.append('<i class="node ' + x + '-' + y + '" style="background-color: #' + game.colors[c] + ';' +
            'width: ' + w + 'px;' +
            'height: ' + w + 'px;' +
            'top:' + ((y * step) + h) + 'px;' +
            'left:' + ((x * step) + h) + 'px;' + '" ' +
            'data-color="' + game.colors[c] + '" ' +
            'data-target="' + a + '-' + b + '"' +
            'data-done="0"' +
            '></i>');

        ctx.beginPath();
        ctx.arc(((x * step) + h), ((y * step) + h), (w / 2), 0, 2 * Math.PI);
        ctx.fillStyle = '#' + game.colors[c];
        ctx.fill();
    }

    const drawCircle = () => {
        const p = new Path2D();
        ctx.lineWidth = 5;
        p.arc((game.maxXY / 2), (game.maxXY / 2), ((game.maxXY / 2) - 30), 0, 2 * Math.PI);
        ctx.stroke(p);
        game.paths.push(p);
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
        chtx.fillRect(0, 0, p[0].width, p[0].height);
        for (i in game.paths) {
            if (i > 0) {
                chtx.lineWidth = game.lineWidth;
                chtx.stroke(game.paths[i]);
            }
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
        chtx.lineWidth = 5;
        chtx.stroke(game.paths[0]);

        let pixel;
        for (let i = 1; i <= game.maxXY; i += step) {
            for (let h = 1; h <= game.maxXY; h += step) {
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
                if (!valid) break;
            }
            if (!valid) break;
        }
        chtx.strokeStyle = 'rgba(0,0,0,0.2)';
        if (valid) {
            registerPath();
            return true;
        }
        alert('invalid move!');
        path = [];
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
        ctx.stroke(p);
        game.paths.push(p);
        path = [];
    }
    const stopDraw = (obj) => {
        if (!game.canDraw) return;
        game.canDraw = false;
        ptx.clearRect(0, 0, p[0].width, p[0].height);
        if (!game.valid) return path = [];
        if (checkPath()) {
            $(obj).data('done', 1);
            $('.' + $(obj).data('target')).data('done', 1);
            checkWinner();
        }
        game.valid = false;
    }
    const startDraw = e => {
        game.canDraw = true;
        path.push(x + ',' + y);
    }
    const drawPath = e => {
        if (game.canDraw) {
            const newX = e.offsetX;
            const newY = e.offsetY;
            ptx.beginPath();
            ptx.moveTo(x, y);
            ptx.lineTo(newX, newY);
            ptx.stroke();
            x = newX;
            y = newY;
            path.push(x + ',' + y);
        }
    }
    const checkWinner = () => {
        let win = true;
        gw.find('.node').each(function () {
            if ($(this).data('done') === 0) {
                win = false;
            }
        });
        if (win) {
            if(!game.currentLevel.includes(game.currentLevel)) {
                game.levelCompleted.push(game.currentLevel);
            }
            updateData();
            alert('Well done!');
            gm.removeClass('d-none');
            gw.addClass('d-none');
            settings.addClass('d-none');
            gameMenu(game.currentLevel.substring(0,1));
        }
    }
    const rgbToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
    const getColor = (color) => {
        const r = parseInt(color.substring(0, 2), 16),
            g = parseInt(color.substring(2, 4), 16),
            b = parseInt(color.substring(4), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',0.5)';
    }
    const gameMenu = (item) => {
        let n = ['EASY', 'INTERMEDIATE', 'EXPERT'];
        gm.html('');
        if (item.length === 1) {
            $('<button data-level="main">Back</button>').appendTo(gm);
            for (let i = 0; i < game.levels[item].length; i++) {
                $('<button data-level="'+ x + '' + i + '">' + n[item] + ' - '+ (i+1) +'</button>').appendTo(gm);
                if(!game.levelCompleted.includes(item + '' + i)) break;
            }
        } else if(item.length === 2) {
            game.currentLevel = item;
            gm.addClass('d-none');
            gw.removeClass('d-none');
            settings.removeClass('d-none');
            goLevel();
        } else {
            for (let i = 0; i < game.levels.length; i++) {
                $('<button data-level="' + i + '">' + n[i] + '</button>').appendTo(gm);
            }
        }
    }

    gm
        .on('click', 'button', function (e) {
            gameMenu($(this).data('level').toString());
        });
    settings
        .on('click', '#go_main', function(e) {
            gm.removeClass('d-none');
            gw.addClass('d-none');
            settings.addClass('d-none');
            gameMenu('main');
        })
        .on('click', '#reset', function (e) {
            goLevel();
        });

    p
        .on('mousemove', drawPath)
        .on('mouseup', stopDraw);

    gw
        .on('mousedown', '.node', function (e) {
            e.preventDefault();
            if ($(this).data('done') === 1) return;

            x = $(this).css('left').replace('px', '');
            y = $(this).css('top').replace('px', '');
            game.currentTarget = $(this).data('target');
            ptx.strokeStyle = ctx.strokeStyle = '#' + $(this).data('color');
            startDraw();
        })
        .on('mouseenter', '.node', function (e) {
            if ($(this).hasClass(game.currentTarget)) {
                game.valid = true;
            }
            stopDraw($(this));
        });
    init();
})(jQuery);
