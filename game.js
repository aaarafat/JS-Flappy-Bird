 const scrn = document.getElementById('canvas');
 const sctx = scrn.getContext("2d");
 scrn.addEventListener("click",()=>{
    switch (state.curr) {
        case state.getReady :
            state.curr = state.Play;
            break;
        case state.Play :
            bird.flap();
            break;
        case state.gameOver :
            state.curr = state.getReady;
            bird.y = 100;
            break;
    }
 })
 sctx.fillStyle = "#30c0df";
 let frames = 0;

 const state = {
     curr : 0,
     getReady : 0,
     Play : 1,
     gameOver : 2,

 }
 const gnd = {
    animations :
    [
        {sprite : new Image()},
        {sprite : new Image()},
    ],
     x : 0,
     y :0,
     frame : 0,
     draw : function() {
        this.y = parseFloat(scrn.height-this.animations[this.frame].sprite.height);
        sctx.drawImage(this.animations[this.frame].sprite,this.x,this.y);
     },
     update : function() {
        
        switch (state.curr) {
            case state.getReady :
                this.frame += (frames%10==0) ? 1 : 0;
                break;
            case state.Play :
                this.frame += (frames%5==0) ? 1 : 0;
                break;
            case state.gameOver :
                this.frame = 0;
                break;
        }
        this.frame = this.frame%this.animations.length;       
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
    speed : 0,
    gravity : .25,
    frame:0,
    draw : function() {
        sctx.drawImage(this.animations[this.frame].sprite,this.x,this.y);
    },
    update : function() {
        
        switch (state.curr) {
            case state.getReady :
                this.y += (frames%10==0) ? (Math.random()-0.5)*2 : 0;
                this.frame += (frames%10==0) ? 1 : 0;
                break;
            case state.Play :
                this.frame += (frames%5==0) ? 1 : 0;
                this.y += this.speed;
                this.speed += this.gravity;
                let r = parseFloat( this.animations[0].sprite.height);
                console.log(r);
                if(this.y + r  >= gnd.y)
                    state.curr = state.gameOver;
                break;
            case state.gameOver :
                this.frame = 1;
                this.speed = 0;
                break;
        }
        this.frame = this.frame%this.animations.length;       
    },
    flap : function(){
        this.speed = -4.6;
    }
 };
 const UI = {
    getReady : {sprite : new Image()},
    gameOver : {sprite : new Image()},
    draw : function() {
        switch (state.curr) {
            case state.getReady :
                curr = this.getReady;
                break;
            case state.gameOver :
                curr = this.gameOver;
                break;
        }
        y = parseFloat(scrn.height-curr.sprite.height)/2;
        x = parseFloat(scrn.width-curr.sprite.width)/2;
        sctx.drawImage(curr.sprite,x,y);
    }

 };

gnd.animations[0].sprite.src="img/ground/g0.png";
gnd.animations[1].sprite.src="img/ground/g1.png";
bg.sprite.src="img/BG.png";
UI.getReady.sprite.src="img/getready.png";
UI.gameOver.sprite.src="img/gameOver.png";
bird.animations[0].sprite.src="img/bird/b0.png";
bird.animations[1].sprite.src="img/bird/b1.png";
bird.animations[2].sprite.src="img/bird/b2.png";
bird.animations[3].sprite.src="img/bird/b0.png";


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
  bird.update();  
  gnd.update();
 }
 function draw()
 {
    sctx.fillRect(0,0,scrn.width,scrn.height)
    bg.draw();
    gnd.draw();
    bird.draw();
    if(state.curr != state.Play)
        UI.draw();
 }

