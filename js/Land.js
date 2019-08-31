(function(){
	var Land = window.Land = function(){
		//自己的背景
		this.image = Game.R.land;
		
		this.y = Game.canvas.height * Game.landScale;
		this.x = 0;
		
	}
	//渲染
	Land.prototype.render = function(){
		Game.ctx.drawImage(this.image, this.x, this.y);
		Game.ctx.drawImage(this.image, this.image.width + this.x, this.y);
		Game.ctx.drawImage(this.image, this.image.width * 2 + this.x, this.y);
		Game.ctx.save();
		Game.ctx.fillStyle = "#DED895";
		Game.ctx.fillRect(0, this.y + this.image.height - 10, Game.canvas.width, Game.canvas.height - (this.y + this.image.height) + 10);
		Game.ctx.restore();
		
	}
	Land.prototype.update = function(){
		this.x -= 2;
		if(this.x == -this.image.width){
			this.x = 0;
		}
	}
})();
