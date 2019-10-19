 const RAD = Math.PI/180;
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
            pipe.pipes=[];
            break;
    }
 })
 sctx.fillStyle = "#30c0df";
 let frames = 0;
 let dx = 2;

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
                this.x -= 1; 
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
 const pipe = {
     top : {sprite : new Image()},
     bot : {sprite : new Image()},
     gap:85,
     pipes : [],
     draw : function(){
        for(let i = 0;i<this.pipes.length;i++)
        {
            let p = this.pipes[i];
            sctx.drawImage(this.top.sprite,p.x,p.y)
            sctx.drawImage(this.bot.sprite,p.x,p.y+parseFloat(this.top.sprite.height)+this.gap)
        }
     },
     update : function(){
         if(state.curr!=state.Play) return;
         if(frames%100==0)
         {
            console.log("lol");
             this.pipes.push({x:parseFloat(scrn.width),y:-210*Math.min(Math.random()+1,1.8)});
         }
         this.pipes.forEach(pipe=>{
             pipe.x -= dx;
         })

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
        switch (state.curr) {
            case state.getReady :
                this.rotatation = 0;
                this.y +=(frames%10==0) ? Math.sin(frames*RAD) :0;
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
pipe.top.sprite.src="img/toppipe.png";
pipe.bot.sprite.src="img/botpipe.png";
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
  pipe.update();

 }
 function draw()
 {
    sctx.fillRect(0,0,scrn.width,scrn.height)
    bg.draw();
    pipe.draw();
    gnd.draw();
    bird.draw();
    if(state.curr != state.Play)
        UI.draw();
 }

