let game={maxXY:400,waitingDraw:!1,canDraw:!1,valid:!1,lineWidth:5,oob:[0,1,2,3,6,7,8,9,10,11,18,19,20,29,30,39,60,69,70,79,80,81,88,89,90,91,92,93,96,97,98,99],offset:{"03":[5,0],"06":[5,0],12:[-5,0],17:[-5,0],21:[-5,-5],28:[-5,5],30:[0,5],39:[0,-5],60:[0,5],69:[0,-5],71:[5,-5],78:[5,5],82:[5,0],87:[5,0],93:[-5,0],96:[-5,0]},colors:["ff0000","00ff00","0000ff","ffff00","ffa500"],levels:[[["1259","5278","6057"],["2460","0657","1274"],["2187","7166","2382"],["2187","0566","0328"],["1269","2687","2157"],["4036","3378","1274"],["2193","2460","4057"],["2124","2872","0547"],["4294","1744","4671"],["0565","3482","4660"],["4795","4578","2582"],["0577","4382","3660"],["3795","1578","3371"],["1560","4782","2853"]],[["2176","0432","4694","2359"],["1734","1369","5295","6671"],["2682","3378","4830"],["7660","2682","0662"],["2682","1763","3073"],["5066","2596","1277"],["3282","2696","5059"],["3750","5387","1266"],["0454","4078","2135","2876"],["2125","0647","2873","6075"],["2146","1764","2594","3378"],["1244","2833","4294","4660"],["3073","0565","3693","3459"],["0334","2659","4296","6671"]],[["3056","0537","3593","2852"],["0575","4249","2595","4047"],["4387","1256","3693","1763"],["0474","1776","5471","8226"],["2582","1378","5962","3295"],["3750","0469","0265","5396"],["6882","3787","3062","2371"],["2682","3478","2173","5296"],["3782","3578","4064","2371","1753"],["2682","3450","3074","4296","0567"],["3682","4478","4065","5471","1752"],["4750","4963","8235","2387","0574"],["4682","6469","5540","4496","6612"],["5057","5259","3682","2387","0764"],["7682","6942","2530","9637","6612"],["5037","5062","5482","2587","0367"]]],done:[],paths:[],levelCompleted:[],currentLevel:"00",currentTarget:"",startX:0,startY:0};!function(e){let t=e(".viewport"),n=e(".popup"),l=e("#welcome"),s=e("#game_menu"),o=e("#game_wrapper"),m=e("#game"),h=e("#path"),p=e("#level_name"),f=e("#settings"),u=m[0].getContext("2d"),v=h[0].getContext("2d"),w=e("#check")[0].getContext("2d"),C=0,T=0,x=[],Y=document.getElementById("game");const X=()=>{const e=JSON.parse(localStorage.getItem("twodots"));e&&(game.levelCompleted=e.levelCompleted?e.levelCompleted:[])},k=()=>{if(v.fillStyle="white",u.clearRect(0,0,m[0].width,m[0].height),v.fillRect(0,0,m[0].width,m[0].height),u.strokeStyle="#000",I(),game.paths.length)for(i in u.lineWidth=game.lineWidth,game.paths)u.strokeStyle=game.paths[i].color,u.stroke(game.paths[i].path);a=game.currentLevel.substring(0,1),b=game.currentLevel.substring(1);let e=game.levels[a][b];for(i in e)[a,b,c,d]=e[i].toString().split(""),S(a,b,c,d,i),S(c,d,a,b,i)},D=()=>{game.paths=[],game.done=[],game.paths=[],game.currentTarget="",k()},S=(e,a,t,n,l)=>{const s=game.maxXY/10,i=s/2,o=game.offset[e+""+a];let r=a*s+i,g=e*s+i;o&&(g+=o[0],r+=o[1]);const m=new Path2D;u.beginPath(),m.arc(g,r,i,0,2*Math.PI),v.fillStyle=u.fillStyle="#"+game.colors[l],u.lineWidth=4,u.strokeStyle="#fff",u.fill(m),u.stroke(m),v.fill(m)},I=()=>{const e=new Path2D;u.lineWidth=5,e.arc(game.maxXY/2,game.maxXY/2,game.maxXY/2-15,0,2*Math.PI),o.find("img").css({width:game.maxXY-30+"px",height:game.maxXY-30+"px"}),u.stroke(e)},W=(e,a)=>{const t=game.maxXY/10,n=t/2,l=game.offset[e+""+a];let s=a*t+n,i=e*t+n;l&&(i+=l[0],s+=l[1]),w.beginPath(),w.arc(i,s,.85*n,0,2*Math.PI),w.fillStyle="#fff",w.fill(),w.fillStyle="rgba(0,0,0,0.2)",w.fill()},y=()=>{const e=new Path2D,t=game.maxXY/10;u.lineWidth=game.lineWidth,a=game.currentLevel.substring(0,1),b=game.currentLevel.substring(1);let n=game.levels[a][b][M()].split(""),l=x[0].split(","),s=[];for(let e=0;e<n.length;e++)n[e]*=t;for(i in Math.abs(n[0]-l[0])<=2*t&&Math.abs(n[1]-l[1])<=2*t?(l[0]=n[0]+t/2,l[1]=n[1]+t/2,s[0]=n[2]+t/2,s[1]=n[3]+t/2):(s[0]=n[0]+t/2,s[1]=n[1]+t/2,l[0]=n[2]+t/2,l[1]=n[3]+t/2),e.moveTo(l[0],l[1]),x){let a=x[i].split(",");e.lineTo(a[0],a[1]),e.moveTo(a[0],a[1])}e.lineTo(s[0],s[1]),e.moveTo(s[0],s[1]),[r,g,b]=game.currentTarget.split(","),game.paths.push({color:"#"+O(parseInt(r),parseInt(g),parseInt(b)),path:e}),game.done.push(game.currentTarget),game.currentTarget="",x=[],k()},L=()=>{if(game.waitingDraw)return game.waitingDraw=!1,void(game.currentTarget="");if(game.canDraw){if(game.canDraw=!1,P()&&(J("TRY AGAIN!"),game.valid=!1),!game.valid)return k(),x=[];(()=>{let e=!0,t=new Path2D,n=game.lineWidth;w.strokeStyle="rgba(0,0,0,0.2)",w.fillStyle="white",w.fillRect(0,0,m[0].width,m[0].height),t=new Path2D,w.lineWidth=5,t.arc(game.maxXY/2,game.maxXY/2,game.maxXY/2-15,0,2*Math.PI),w.stroke(t),a=game.currentLevel.substring(0,1),b=game.currentLevel.substring(1);let l,s=game.levels[a][b];for(i in s)[a,b,c,d]=s[i].toString().split(""),W(a,b),W(c,d);for(i in t=new Path2D,game.paths)w.lineWidth=game.lineWidth,w.strokeStyle="#fff",w.stroke(game.paths[i].path),w.strokeStyle="rgba(0,0,0,0.2)",w.stroke(game.paths[i].path);for(i in x){let e=x[i].split(",");i>0?(t.lineTo(e[0],e[1]),t.moveTo(e[0],e[1])):t.moveTo(e[0],e[1])}w.stroke(t);for(let a=30;a<=game.maxXY-30;a+=n){for(let t=30;t<=game.maxXY-30&&(((l=w.getImageData(a,t,1,1).data)[0]>0||l[1]>0||l[2]>0)&&(l[0]<200||l[1]<200||l[2]<200)&&(e=!1),e);t+=n);if(!e)break}return e?(y(),!0):(J("TRY AGAIN!"),x=[],k(),!1)})()&&_(),game.valid=!1}},P=()=>{let e=M(),a=game.maxXY/10,t=x[0].split(","),n=x[x.length-1].split(",");switch(game.currentTarget){case"255,0,0":e=0;break;case"0,255,0":e=1;break;case"0,0,255":e=2;break;case"255,255,0":e=3;break;case"255,165,0":e=4}return Math.abs(t[0]-n[0])<=a&&Math.abs(t[1]-n[1])<=a},M=()=>{switch(game.currentTarget){case"0,255,0":return 1;case"0,0,255":return 2;case"255,255,0":return 3;case"255,165,0":return 4}return 0},_=()=>{a=game.currentLevel.substring(0,1),b=game.currentLevel.substring(1);let e=game.levels[a][b];game.done.length>=e.length&&(game.levelCompleted.includes(game.currentLevel)||game.levelCompleted.push(game.currentLevel),(()=>{const e={levelCompleted:game.levelCompleted};localStorage.setItem("twodots",JSON.stringify(e))})(),J("WELL DONE!",!0),setTimeout(()=>{s.removeClass("d-none"),p.addClass("d-none"),o.addClass("d-none"),f.addClass("d-none"),A(game.currentLevel.substring(0,1))},1e3))},N=(e,a)=>{const t=E(e,a),n=t[0]+","+t[1]+","+t[2];game.waitingDraw&&"255,255,255"===n&&(game.waitingDraw=!1,game.canDraw=!0,[r,g,b]=game.currentTarget.split(","),u.strokeStyle="#"+O(parseInt(r),parseInt(g),parseInt(b)),game.startX=C=e,game.startY=T=a),game.canDraw&&(n===game.currentTarget?(game.valid=!0,L()):(u.lineWidth=game.lineWidth,u.beginPath(),u.moveTo(C,T),u.lineTo(e,a),u.stroke(),C=e,T=a,x.push(C+","+T)))},R=(e,a)=>{if(!game.waitingDraw){const t=E(e,a);t[0]+t[1]+t[2]<765&&!game.done.includes(t[0]+","+t[1]+","+t[2])&&(game.waitingDraw=!0,game.currentTarget=t[0]+","+t[1]+","+t[2])}},A=a=>{if(a<0)return!1;console.log(a);let n=["beginner","intermediate","expert"];if(s.html(""),1===a.length){let t=0,l=e('<div class="row lvl-select"></div>');e('<h2><img src="img/'+n[a]+'.png"></h2>').appendTo(s);for(let s=0;s<game.levels[a].length;s++){let i=e('<div class="col-4"></div>');game.levelCompleted.includes(a+""+s)?e('<div class="lvl-node"><a class="completed" data-level="'+a+s+'"><span>'+(s+1)+"</span></a></div>").appendTo(i):t?e('<div class="lvl-node"><a class="disabled" data-level="-1"><span>'+(s+1)+"</span></a></div>").appendTo(i):(t=1,e('<div class="lvl-node"><a class="current '+n[a]+'" data-level="'+a+s+'"><span>'+(s+1)+"</span></a></div>").appendTo(i)),i.appendTo(l)}l.appendTo(s),e('<div class="col-12 text-center pt-5"><a data-level="main"><img class="label-img" src="img/main_menu.png" style="max-height: 60px;"></a></div>').appendTo(s)}else if("main"===a){e('<h2><img class="label-img" src="img/choose.png"></h2>').appendTo(s);for(let a=0;a<game.levels.length;a++)e('<a data-level="'+a+'" class="d-inline-block mb-3"><img src="img/'+n[a]+'.png"></a>').appendTo(s)}else a.length<4&&(game.currentLevel=a,t.addClass("in-game"),s.addClass("d-none"),p.removeClass("d-none"),o.removeClass("d-none"),f.removeClass("d-none"),p.find("h2").html('<img src="img/'+n[a.substring(0,1)]+'.png"><span class="level-number '+n[a.substring(0,1)]+'">'+(parseInt(a.substring(1))+1)+"</span>"),D())},E=(e,a)=>{const t=v.getImageData(e,a,1,1).data;return[t[0],t[1],t[2]]},O=(e,a,t)=>{if(e>255||a>255||t>255)throw"Invalid color component";return("0"+e.toString(16)).slice(-2)+""+("0"+a.toString(16)).slice(-2)+("0"+t.toString(16)).slice(-2)},G=()=>{t.removeClass("in-game"),s.removeClass("d-none"),p.addClass("d-none"),l.addClass("d-none"),o.addClass("d-none"),f.addClass("d-none"),A("main")},J=(e,a=!1)=>{a?n.addClass("success"):(t.addClass("error"),setTimeout(()=>{t.removeClass("error")},500)),n.text(e),n.removeClass("d-none"),setTimeout(()=>{n.removeClass("success"),n.addClass("d-none")},1e3)};s.on("click","a",function(a){A(e(this).data("level").toString())}),l.on("click",".go_main",function(e){G()}),f.on("click",".go_main",function(e){G()}).on("click","#reset",function(e){D()}),o.on("touchstart",function(e){e.target==Y&&(e.preventDefault(),R(e.touches[0].clientX-o.offset().left,e.touches[0].clientY-o.offset().top))}).on("touchmove",function(e){e.touches[0].clientX-o.offset().left<0||e.touches[0].clientX>o.width()||e.touches[0].clientY<o.offset().top||e.touches[0].clientY>o.offset().top+o.height()?L():N(e.touches[0].clientX-o.offset().left,e.touches[0].clientY-o.offset().top)}).on("touchend",L).on("mousedown",function(e){e.preventDefault(),R(e.offsetX,e.offsetY)}).on("mousemove",function(e){N(e.offsetX,e.offsetY)}).on("mouseup",L).on("mouseleave",L),e(window).width()<game.maxXY&&(game.maxXY=e(window).width()),o.css({width:game.maxXY+"px",height:game.maxXY+"px"}),v.canvas.height=u.canvas.height=w.canvas.height=game.maxXY,v.canvas.width=u.canvas.width=w.canvas.width=game.maxXY,v.lineCap=u.lineCap=w.lineCap="round",v.lineWidth=u.lineWidth=w.lineWidth=game.lineWidth,X(),D()}(jQuery);
