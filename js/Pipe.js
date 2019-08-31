(function(){
	var Pipe = window.Pipe = function(){
		this.imageDown = Game.R["pipe_down"];
		this.imageUp = Game.R["pipe_up"];
		
		//管子的位置
		this.x = Game.canvas.width;
		
		//this.h = 100;
		//上面管子的高度
		this.height1 = 100 + parseInt(Math.random() * 221);
		
		//空隙
		this.interspace = 160;
		//下面管子的高就可以算出来了
		this.height2 = Game.canvas.height * Game.landScale - this.height1 - this.interspace;
		
		//将自己放入数组
		Game.pipeArr.push(this);
	}
	Pipe.prototype.update = function(){
		this.x -= 2;
		
		if(Game.bird.R > this.x && Game.bird.L < this.x + 52){
			if(Game.bird.T < this.height1 || Game.bird.B > this.height1 + this.interspace){
				clearInterval(Game.timer); 
			}
		}
		
	}
	Pipe.prototype.render = function(){
		Game.ctx.drawImage(this.imageDown, 0, 320 - this.height1, this.imageDown.width, this.height1, this.x, 0, this.imageDown.width, this.height1);
		Game.ctx.drawImage(this.imageUp, 0, 0, this.imageUp.width, this.height2, this.x, this.height1 + this.interspace, this.imageUp.width, this.height2);
		//Game.ctx.drawImage(this.imageUp, this.x, 450);
	}
})();
