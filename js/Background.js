(function(){
	var Background = window.Background = function(){
		//自己的背景
		this.image = Game.R.bg_day;
		//自己的y
		this.y = Game.landScale * Game.canvas.height - 396;
		//Game.ctx.drawImage(this.image, 100, 100);
		this.x = 0;
		
		
	}
	Background.prototype.render = function(){
		Game.ctx.drawImage(this.image, this.x, this.y);
		Game.ctx.drawImage(this.image, this.image.width + this.x, this.y);
		Game.ctx.drawImage(this.image, this.image.width * 2 + this.x, this.y);
		//渲染天空的猫腻矩形
		Game.ctx.save();
		Game.ctx.fillStyle = "#4EC0CA";
		Game.ctx.fillRect(0, 0, Game.canvas.width, this.y + 10);
		Game.ctx.fillStyle = "#5EE270";
		Game.ctx.fillRect(0, this.y + this.image.height - 10, Game.canvas.width, Game.canvas.height - (this.y + this.image.height) + 10);
		Game.ctx.restore();
	}
	Background.prototype.update = function(){
		this.x--;
		if(this.x == -this.image.width){
			this.x = 0;
		}
	}
})();
