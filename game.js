 const scrn = document.getElementById('canvas');
 const sctx = scrn.getContext("2d");
 sctx.fillStyle = "#30c0df";
 let frames = 0;
 const gnd = {
     sprite : new Image(),
     x : 0,
     y :0,
     draw : function() {
        y = parseFloat(scrn.height-this.sprite.height);
        sctx.drawImage(this.sprite,this.x,y);
     }
    };
 const bg = {
    sprite : new Image(),
    x : 0,
    y :0,
    draw : function() {
        y = parseFloat(scrn.height-this.sprite.height);
        sctx.drawImage(this.sprite,this.x,y);
    }
};
const gr = {
    sprite : new Image(),
    x : 0,
    y :0,
    draw : function() {
        y = parseFloat(scrn.height-this.sprite.height)/2;
        x = parseFloat(scrn.width-this.sprite.width)/2;
        sctx.drawImage(this.sprite,x,y);
    }
};
const bird = {
    animations :
        [
            {sprite : new Image()},
            {sprite : new Image()},
            {sprite : new Image()},
            {sprite : new Image()},
        ],
    x : 13,
    y :100,
    frame:0,
    draw : function() {
        sctx.drawImage(this.animations[this.frame].sprite,this.x,this.y);
    }
    
};

gnd.sprite.src="img/ground.png";
bg.sprite.src="img/BG.png";
gr.sprite.src="img/getready.png";
bird.animations[0].sprite.src="img/bird/b0.png";
bird.animations[1].sprite.src="img/bird/b1.png";
bird.animations[2].sprite.src="img/bird/b2.png";
bird.animations[3].sprite.src="img/bird/b0.png";
console.log(gnd.sprite);

gameLoop();

 function gameLoop()
 { 
     update();
     draw();
     frames++;
     requestAnimationFrame(gameLoop);
 }

 function update()
 {
    bird.frame += (frames%5==0) ? 1 : 0;
    bird.frame = bird.frame%4;
    bird.y += (frames%5==0) ? (Math.random()-0.5)*2 : 0;
 }
 function draw()
 {
    sctx.fillRect(0,0,scrn.width,scrn.height)
    bg.draw();
    gnd.draw();
    bird.draw();
    gr.draw();
 }

