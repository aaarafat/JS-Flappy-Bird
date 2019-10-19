 const RAD = Math.PI/180;
 const dx = 2;
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
    sprite : new Image(),
     x : 0,
     y :0,
     draw : function() {
        this.y = parseFloat(scrn.height-this.sprite.height);
        sctx.drawImage(this.sprite,this.x,this.y);
     },
     update : function() {
        
        switch (state.curr) {
            case state.getReady :
                this.x -= dx/2; 
                break;
            case state.Play :
                this.x -= dx 
                break;
            case state.gameOver :
                this.frame = 0;
                break;
        }
        this.x = this.x % (this.sprite.width/2);    
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
    rotatation : 0,
    x : 50,
    y :100,
    speed : 0,
    gravity : .125,
    thrust : 3.6,
    frame:0,
    draw : function() {
        let h = this.animations[this.frame].sprite.height;
        let w = this.animations[this.frame].sprite.width;
        sctx.save();
        sctx.translate(this.x,this.y);
        sctx.rotate(this.rotatation*RAD);
        sctx.drawImage(this.animations[this.frame].sprite,-w/2,-h/2);
        sctx.restore();
    },
    update : function() {
        console.log(this.speed ,this.rotatation);
        switch (state.curr) {
            case state.getReady :
                bird.y = 100;
                this.rotatation = 0;
                this.y += (frames%10==0) ? (Math.random()-0.5)*2 : 0;
                this.frame += (frames%10==0) ? 1 : 0;
                break;
            case state.Play :
                this.frame += (frames%5==0) ? 1 : 0;
                this.y += this.speed;
                this.setRotation()
                this.speed += this.gravity;
                let r = parseFloat( this.animations[0].sprite.width)/2;
                if(this.y + r  >= gnd.y)
                    state.curr = state.gameOver;
                break;
            case state.gameOver :
                this.rotatation = 90;
                this.frame = 1;
                this.speed = 0;
                break;
        }
        this.frame = this.frame%this.animations.length;       
    },
    flap : function(){
        if(this.y > 0)
        this.speed = -this.thrust;
    },
    setRotation : function(){
        if(this.speed <= 0)
        {
            
            this.rotatation = Math.max(-25, -25 * this.speed/(-1*this.thrust));
        }
        else if(this.speed > 0 ) {
            this.rotatation = Math.min(90, 90 * this.speed/(this.thrust*2));
        }
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

gnd.sprite.src="img/ground.png";
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

