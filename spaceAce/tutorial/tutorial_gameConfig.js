function TutorialgameData(options){
    this.checkpoints = options.checkPoints; 
    this.startG = options.checkPoints[0].newStage;
    this.keyDirection = [];
    this.moveArrayCheckStart = [];
    this.moveArrayCheckEnd = [];
    this.moveArrayfailed1Start = [];
    this.moveArrayfailed1End = [];
    this.moveArrayfailed2Start = [];
    this.moveArrayfailed2End = [];
    this.stageJump = [];
    this.stageJumpDlay = [];
    this.stageActive = [];
    this.stageComplete = [];
    this.stagePressed = [];
    this.finishStage = [];
    this.assignMove();
   
    console.log(
        this.keyDirection,
        this.moveArrayCheckStart, 
        this.moveArrayCheckEnd, 
        this.moveArrayfailed1Start, 
        this.moveArrayfailed1End,
        this.moveArrayfailed2Start, 
        this.moveArrayfailed2End,
        this.stageJump,
        this.stageJumpDlay,
        this.stageActive,
        this.stageComplete,
        this.stagePressed
    );
    
};
TutorialgameData.prototype.assignMove = function(){
    //console.log(this.checkpoints);  
    for (var i=0; this.checkpoints.length > i; i++){
        this.keyDirection[i] = this.checkpoints[i].correctMove;
        this.moveArrayCheckStart[i] = this.checkpoints[i].startTime;
        this.moveArrayCheckEnd[i] = this.checkpoints[i].endTime;
        this.moveArrayfailed1Start[i] = this.checkpoints[i].wrongMove1.failStartTime;
        this.moveArrayfailed1End[i] = this.checkpoints[i].wrongMove1.failEndTime;
        this.moveArrayfailed2Start[i] = this.checkpoints[i].wrongMove2.failStartTime;
        this.moveArrayfailed2End[i] = this.checkpoints[i].wrongMove2.failEndTime;
        this.stageJump[i] = this.checkpoints[i].jumpTo;
        this.stageJumpDlay[i] = this.checkpoints[i].jumpToDelay;
        this.stageActive[i] = this.checkpoints[i].active;
        this.stageComplete[i] = this.checkpoints[i].complete;
        this.stagePressed[i] = this.checkpoints[i].pressed;
        this.finishStage[i] = this.checkpoints[i].finishStage;
    }
};

function TutorialgamePlay(options){
    _that = this;
    this.gdTutorial = new TutorialgameData(options);
    this.videoEl = document.getElementById("tutorialScene");
    this.audioError = document.getElementById("audioError");
    this.audioSuccess = document.getElementById("audioSuccess");
    this.audioSuccess.volume = .1; 
    this.audioError.volume = .1; 
    this.current, this.prev, this.next, this.count = 0;
    /*
    this.level = gameCfg.levels;
    this.lives;    
    this.score;
    this.currentScore;
    */
    this.gameOver = false;
    //this.start();
    this.playThrough();
};
TutorialgamePlay.prototype.playThrough = function(){
    var pressed = false, success = false, error = false, moved = false, jumpActive = false, current,prev,next, failStart, failEnd;
    var len = this.gdTutorial.checkpoints.length;
    this.videoEl.addEventListener('timeupdate', function(){
        //console.log(Math.round(this.videoEl.currentTime*100)/100)
        
        for (var i = 0; this.gdTutorial.checkpoints.length > i; i++) { 
            if (this.gameOver)break;
            (function(index){                
                if (!success && !pressed && this.videoEl.currentTime > this.gdTutorial.moveArrayCheckStart[index] && this.videoEl.currentTime < this.gdTutorial.moveArrayCheckEnd[index] && !this.gdTutorial.stageActive[index] && !this.gdTutorial.stageComplete[index]){
                    document.getElementById("tutorialLayer").style.display = "block";
                    document.getElementById("showMovingTutorial").style.display = "block";
                    document.getElementById("showMovingTutorial").src = "../img/"+this.gdTutorial.keyDirection[i]+".png";                    
                    this.videoEl.pause();
                    this.current = [
                        this.gdTutorial.keyDirection[index], this.gdTutorial.moveArrayCheckStart[index], this.gdTutorial.moveArrayCheckEnd[index],this.gdTutorial.moveArrayfailed1Start[index], this.gdTutorial.moveArrayfailed1End[index],this.gdTutorial.moveArrayfailed2Start[index], this.gdTutorial.moveArrayfailed2End[index],this.gdTutorial.stageJump[index],this.gdTutorial.stageJumpDlay[index],true,this.gdTutorial.stageComplete[index],this.gdTutorial.stagePressed[index],this.gdTutorial.finishStage[index]
                    ]; 
                    //this.current
                    if (index > 0){
                        this.prev = [
                            this.gdTutorial.keyDirection[(index+len-1)%len], //0
                            this.gdTutorial.moveArrayCheckStart[(index+len-1)%len], //1
                            this.gdTutorial.moveArrayCheckEnd[(index+len-1)%len], //2
                            this.gdTutorial.moveArrayfailed1Start[(index+len-1)%len], //3 
                            this.gdTutorial.moveArrayfailed1End[(index+len-1)%len], //4
                            this.gdTutorial.moveArrayfailed2Start[(index+len-1)%len], //5
                            this.gdTutorial.moveArrayfailed2End[(index+len-1)%len], //6
                            this.gdTutorial.stageJump[(index+len-1)%len], //7
                            this.gdTutorial.stageJumpDlay[(index+len-1)%len], //8
                            false,//this.gdTutorial.stageActive[(index+len-1)%len], //9
                            true,//this.gdTutorial.stageComplete[(index+len-1)%len], //10
                            this.gdTutorial.stagePressed[(index+len-1)%len], //11
                            this.gdTutorial.finishStage[(index+len-1)%len] //12
                        ];
                    } else {
                        this.prev = false;
                    }
                    if (i != (this.gdTutorial.checkpoints.length-1)){
                        this.next = [
                            this.gdTutorial.keyDirection[(index+1)%len], this.gdTutorial.moveArrayCheckStart[(index+1)%len],this.gdTutorial.moveArrayCheckEnd[(index+1)%len],this.gdTutorial.moveArrayfailed1Start[(index+1)%len], this.gdTutorial.moveArrayfailed1End[(index+1)%len],this.gdTutorial.moveArrayfailed2Start[(index+1)%len], this.gdTutorial.moveArrayfailed2End[(index+1)%len],this.gdTutorial.stageJump[(index+1)%len],this.gdTutorial.stageJumpDlay[(index+1)%len],false,this.gdTutorial.stageComplete[(index+1)%len],this.gdTutorial.stagePressed[(index+1)%len],this.gdTutorial.finishStage[(index+1)%len]
                        ];
                    } else {
                        this.next = false
                    }
                    console.log("Prev: " ,this.prev);
                    console.log("Current: ", this.current);
                    console.log("Next: " ,this.next);
                    console.log(i, index, this.gdTutorial.checkpoints.length-1);
                    console.log(this.prev[9],this.current[9], this.next[9])
                    console.log("---------------------------------------");
                    
                    //check the key pressed
                    document.onkeydown = function(e){                            
                        if (this.current != undefined && this.current[9] && !this.current[11]){
                            pressed = true;
                            switch (e.keyCode) {
                                case 37:                        
                                    key = "left";
                                    this.current[11] = true;
                                    this.videoEl.play();
                                    if (!this.current[10]){
                                        if (key == this.current[0]) {                                          
                                            success = true;                                                                             
                                            this.audioSuccess.play();                                       
                                            console.log("******************** success *******************" , this.count);     
                                            error=false;
                                        } else {                                                                               
                                            this.audioError.play();
                                            error=true;
                                            console.log("**************** error ******************");
                                        }
                                    }
                                    document.getElementById("showMovingTutorial").style.display = "none";
                                    document.getElementById("tutorialLayer").style.display = "none";
                                    this.current[11] = true;
                                    //pressed = true;
                                    break;
                                case 39:                        
                                    key = "right";
                                    this.current[11] = true;
                                    this.videoEl.play();
                                    if (!this.current[10]){
                                        if (key == this.current[0]) {                                          
                                            success = true;                                                                             
                                            this.audioSuccess.play();                                       
                                            console.log("******************** success *******************" , this.count);     
                                            error=false;
                                        } else {                                                                               
                                            this.audioError.play();
                                            error=true;
                                            console.log("**************** error ******************");                                        
                                        } 
                                    }                          
                                    document.getElementById("showMovingTutorial").style.display = "none"; 
                                    document.getElementById("tutorialLayer").style.display = "none";
                                    this.current[11] = true;
                                    //pressed = true;
                                    break;                                    
                                case 38:                        
                                    key = "up";
                                    this.current[11] = true;
                                    this.videoEl.play();
                                    if (!this.current[10]){
                                        if (key == this.current[0]) {                                          
                                            success = true;                                                                             
                                            this.audioSuccess.play();                                       
                                            console.log("******************** success *******************" , this.count);     
                                            error=false;
                                        } else {                                                                               
                                            this.audioError.play();
                                            error=true;
                                            console.log("**************** error ******************");                                        
                                        } 
                                    }                    
                                    document.getElementById("showMovingTutorial").style.display = "none";
                                    document.getElementById("tutorialLayer").style.display = "none";
                                    this.current[11] = true;
                                    //pressed = true;
                                    break;

                                case 40:                        
                                    key = "down";
                                     this.current[11] = true;
                                    this.videoEl.play();
                                     if (!this.current[10]){
                                        if (key == this.current[0]) {                                          
                                            success = true;                                                                             
                                            this.audioSuccess.play();                                       
                                            console.log("******************** success *******************" , this.count);     
                                            error=false;
                                        } else {                                                                               
                                            this.audioError.play();
                                            error=true;
                                            console.log("**************** error ******************");                                        
                                        } 
                                    }                         
                                    document.getElementById("showMovingTutorial").style.display = "none";
                                    document.getElementById("tutorialLayer").style.display = "none";
                                    this.current[11] = true;
                                    //pressed = true;
                                    break;

                                case 83:                        
                                    key = "fire";                               
                                    this.current[11] = true;
                                    this.videoEl.play();
                                     if (!this.current[10]){
                                        if (key == this.current[0]) {                                          
                                            success = true;                                                                             
                                            this.audioSuccess.play();                                       
                                            console.log("******************** success *******************" , this.count);     
                                            error=false;
                                        } else {                                                                               
                                            this.audioError.play();
                                            error=true;
                                            console.log("**************** error ******************");                                        
                                        } 
                                    }                        
                                    document.getElementById("showMovingTutorial").style.display = "none";
                                    document.getElementById("tutorialLayer").style.display = "none";
                                    this.current[11] = true;
                                    //pressed = true;                            
                                    break;
                            }   
                        }                    
                        //key down end
                    }.bind(this);                     
                }
                
                if (this.current != undefined && Math.round(this.videoEl.currentTime*100)/100 > this.current[2] && this.current[9] && !this.current[10]){ 
                    this.current[9] = false;
                    if (this.current[11] || pressed){ 
                        //if you pressed a right key
                        if (success){                        
                            this.current[10] = true;
                            //this.prev[10] = true;this.prev[10] = true;this.prev[9] = false;
                            this.count++;
                            console.log("******************** success *******************" , this.count);
                            //this.scoreUpdater();
                            error=false;
                            pressed = false;
                        } else if (!success && error) {
                            //if you pressed a wrong key
                            failEnd = this.current[4]
                            this.videoEl.currentTime =  this.current[3];
                            document.getElementById("showMovingTutorial").style.display = "none";  
                            document.getElementById("tutorialLayer").style.display = "none";
                            console.log("**************** error ******************");
                            this.current[11] = false;
                            error=true;
                        }                    
                    } else {
                        //if you dont pressed a key                    
                        error=true;
                        console.log(error);                        
                        failEnd = this.current[6]
                        this.videoEl.currentTime =  this.current[5];
                        document.getElementById("showMovingTutorial").style.display = "none";
                        document.getElementById("tutorialLayer").style.display = "none";
                        //this.prev[10] = true;this.prev[10] = true;this.prev[9] = false;
                        console.log("******************* error *****************");
                    }
                    if (success && this.current[7] != undefined){                   
                        var gotoNextStep = setInterval(function(){ 
                            if (parseInt(this.videoEl.currentTime) >= this.current[12]){
                                clearInterval(gotoNextStep);
                                //this.videoEl.currentTime = this.current[7];  
                                this.videoEl.pause();                                
                            }                            
                        }.bind(this), 250);                   
                    }               
                success = false;
                }
                //if (!success && error && pressed && this.videoEl.currentTime > failEnd && !this.current[10]){
                if (!success && error && pressed && this.videoEl.currentTime > this.current[4] && !this.current[10]){
                    document.getElementById("showMovingTutorial").style.display = "none";
                    document.getElementById("tutorialLayer").style.display = "none";
                    pressed = false;
                    this.current[11] = false;
                    //if (this.lives > 0) {
                        //this.lives = parseInt(document.getElementById("gdLives").innerHTML) - 1;                                   
                        //document.getElementById("gdLives").innerHTML = this.lives;              
                    /*
                        TweenMax.to("#gdLives",0.3,{
                            scale:2,
                            opacity:0.4,
                            //color:"#ff0000",
                            onComplete: function(){
                                TweenMax.to("#gdLives",0.3,{
                                    scale:1, 
                                    //color:"#fff",
                                    opacity:1
                                });
                            }.bind(this)
                        });                    
                        */
                        this.videoEl.pause();
                        if (this.prev == false){
                            this.videoEl.currentTime = this.gdTutorial.startG;
                        } else if (this.prev[7] != undefined){
                            this.videoEl.currentTime = this.prev[7];                            
                        } else {
                            this.videoEl.currentTime = this.prev[2];
                        }
                        TweenMax.to("#getReady",0.5,{autoAlpha:1});                                 
                        setTimeout(function(){
                            TweenMax.to("#getReady",0.5,{autoAlpha:0});      
                            //document.getElementById("getReady").style.visibility = "hidden";
                            this.videoEl.play();   
                        }.bind(this),2500);
                        error = false;                        
                    //} else { 
                    //    this.game_over(error, pressed);                       
                    //} 
                } 
                //else if (!success && error && !pressed && this.videoEl.currentTime > failEnd && !this.gdTutorial.stageComplete[i]){
                else if (!success && error && !pressed && this.videoEl.currentTime > this.current[6] && !this.gdTutorial.stageComplete[i]){
                     document.getElementById("showMovingTutorial").style.display = "none";
                    document.getElementById("tutorialLayer").style.display = "none";
                     //if (this.lives > 0) {
                        //this.lives = parseInt(document.getElementById("gdLives").innerHTML) - 1;                                   
                        //document.getElementById("gdLives").innerHTML = this.lives;              
                    /*    
                    TweenMax.to("#gdLives",0.3,{
                            scale:2,
                            opacity:0.4,
                            //color:"#ff0000",
                            onComplete: function(){
                                TweenMax.to("#gdLives",0.3,{
                                    scale:1, 
                                    //color:"#fff",
                                    opacity:1
                                });
                            }.bind(this)
                        });
                        */
                        this.videoEl.pause();
                        if (this.prev == false){                        
                            this.videoEl.currentTime = this.gdTutorial.startG;
                        } else if (this.prev[7] != undefined){
                            this.videoEl.currentTime = this.prev[7];                            
                        } else {
                            this.videoEl.currentTime = this.prev[2];
                        }
                        TweenMax.to("#getReady",0.5,{autoAlpha:1});                                  
                        setTimeout(function(){
                            TweenMax.to("#getReady",0.5,{autoAlpha:0});                            
                            this.videoEl.play();   
                        }.bind(this),2500);
                        error = false;                          
                    //} else {                    
                    //    this.game_over(error, pressed);                       
                    //}                

                }                          
                //function index end
            }.bind(this))(i);
           //for end 
        }
        //timeupdate end
    }.bind(this));                
};
TutorialgamePlay.prototype.start = function(){
    this.videoEl.currentTime = this.gdTutorial.startG;
    this.videoEl.play();  
};
TutorialgamePlay.prototype.game_over = function(error, pressed){
    console.log("%%%%%%%%%%%%%%%%%%% Game over %%%%%%%%%%%%%%%%%%%%");
    this.videoEl.pause();    
    this.gameOver = true;
    error = false;
    pressed = false;
    
    TweenMax.to("#ModalGameOver",0.5,{autoAlpha:1});
};
TutorialgamePlay.prototype.exit = function(){   
    TweenMax.to("#tutorialWrapper",0.5,{
        autoAlpha:0,
        onComplete: function(){
            document.getElementById("mainArea").removeChild(document.getElementById("tutorialWrapper"));
            document.getElementById("mainArea").removeChild(document.querySelector(".tutorialTitle"));
            document.getElementById("mainArea").removeChild(document.querySelector("#tutorialBtn"));
            document.getElementById("mainArea").removeChild(document.querySelector("#exitTutorialBtn"));
            TweenMax.to("#levelWrapper",0.5,{autoAlpha:1});
        }
    });       
};

function Init(data){
    var _this = this;
    this.gamePlayTutorial = new TutorialgamePlay(data);    
   
    document.getElementById("tutorialBtn").onclick = function(){
        this.gamePlayTutorial.start();
        document.getElementById("levelWrapper").style.visibility = "hidden";
        TweenMax.to("#levelWrapper",0.5,{
            autoAlpha:0,
            onComplete: function(){
                TweenMax.to("#tutorialBtn",0.5,{autoAlpha:0});
                TweenMax.to("#tutorialWrapper",0.5,{autoAlpha:1});
                TweenMax.to("#exitTutorialBtn",0.5,{autoAlpha:1});
            }
        });
        //this.gamePlayTutorial.videoEl.style.zIndex = "9999";//tutorialScene
    }.bind(this);   
     document.getElementById("exitTutorialBtn").onclick = function(){
         this.gamePlayTutorial.exit(); 
    }.bind(this); 
};

var init = new Init(data);