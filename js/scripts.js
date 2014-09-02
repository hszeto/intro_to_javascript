$(document).ready(function(){
    var network = function(classname, number){
        var   canvas = document.querySelector('canvas.' + classname),
            ctx = canvas.getContext('2d'),
            particles = [],
//            it is network point total counter
            patriclesNum = number,
            w = 200,
            h = 200,

//            it is color for naimation
            colors = ['#00FFFF','#FF0000','#0000FF','#00FF00'];

        var width = $('.' + classname).parent().width();
        var height = $('.' + classname).parent().height();
        canvas.width = width;
        canvas.height = height;
//        canvas.style.left = (window.innerWidth - 500)/2+'px';

//        if(window.innerHeight>500)
//            canvas.style.top = (window.innerHeight - 500)/2+'px';

        function Factory(){
            this.x =  Math.round( Math.random() * w);
            this.y =  Math.round( Math.random() * h);
            this.rad = Math.round( Math.random() * 0.5) + 1;
            this.rgba = colors[ Math.round( Math.random() * 3) ];
            this.vx = Math.round( Math.random() * 3) - 1.5;
            this.vy = Math.round( Math.random() * 3) - 1.5;
        }

        function draw(){
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';
            for(var i = 0;i < patriclesNum; i++){
                var temp = particles[i];
                var factor = 1;

                for(var j = 0; j<patriclesNum; j++){

                    var temp2 = particles[j];
                    ctx.linewidth = 0.5;

                    if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<30){
                        ctx.strokeStyle = temp.rgba;
                        ctx.beginPath();
                        ctx.moveTo(temp.x, temp.y);
                        ctx.lineTo(temp2.x, temp2.y);
                        ctx.stroke();
                        factor++;
                    }
                }

                ctx.fillStyle = temp.rgba;
                ctx.strokeStyle = temp.rgba;

                ctx.beginPath();
                ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
//                ctx.arc(temp.x, temp.y, (temp.rad+20)*factor, 0, Math.PI*2, true);
                ctx.stroke();
                ctx.closePath();


                temp.x += temp.vx;
                temp.y += temp.vy;

                if(temp.x > w)temp.x = 0;
                if(temp.x < 0)temp.x = w;
                if(temp.y > h)temp.y = 0;
                if(temp.y < 0)temp.y = h;
            }
        }

        function findDistance(p1,p2){
            return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
        }

        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 1000);
                };
        })();

        (function init(){
            for(var i = 0; i < patriclesNum; i++){
                particles.push(new Factory);
            }
        })();

        (function loop(){
            draw();
            requestAnimFrame(loop);
        })();
    }

    network('network1', 80);
    network('network2', 100);
    network('network3', 100);
    network('network4', 90);
});
 