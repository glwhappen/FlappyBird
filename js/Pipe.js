(function(){
	var Pipe = window.Pipe = function(){
		this.imageDown = Game.R["Pipe_down"];
		this.imageUp = Game.R["Pipe_up"];
		
		//管子的位置
		this.x = Game.canvas.width;
		
		//this.h = 100;
		//上面管子的高度
		this.height1 = 100 + parseInt(Math.random() * 221);
		
		//空隙
		this.interspace = 120;
		//下面管子的高就可以算出来了
		this.height2 = Game.canvas.height * 0.75 - this.height1 - this.interspace;
		
	}
	Pipe.prototype.update = function(){
		this.x -= 2;
		
	}
	Pipe.prototype.render = function(){
		Game.ctx.drawImage(this.imageDown, 0, 320 - this.height1, this.imageDown.width, this.height1, this.x, 0, this.imageDown.width, this.height1);
		Game.ctx.drawImage(this.imageUp, 0, 0, this.imageUp.width, this.height2, this.x, this.height1 + this.interspace, this.imageUp.width, this.height2);
		//Game.ctx.drawImage(this.imageUp, this.x, 450);
	}
})();
