(function(){
	var Bird = window.Bird = function(){
		//随机鸟的颜色
		this.color = parseInt(Math.random() * 3);
		//决定用图, 小鸟有三种翅膀的状态
		this.imageArr = new Array();
		for(var i = 0; i < 3; i++){
			this.imageArr[i] = Game.R["bird" + this.color + "_" + i];
		}
		//翅膀状态
		this.wingStep = 0;
		//小鸟的位置（注意这个位置是真实的物理位置）
		this.x = Game.canvas.width * (1 - 0.618) - 24;
		this.y = 100;
		
		//鸟的帧数,用于下落上升算法
		this.fno = 0;
		
		//角度
		this.d = 0;
		
		//是否拥有能量
		this.hasEnergy = false;
	}
	Bird.prototype.render = function(){
		Game.ctx.save();
		Game.ctx.translate(this.x - 24, this.y - 24);
		Game.ctx.rotate(this.d);
		Game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
		
		Game.ctx.restore();
	}
	Bird.prototype.update = function(){
		Game.fno % 3 == 0 && this.wingStep++;
		if(this.wingStep > 2){
			this.wingStep = 0;
		}
		
		//算法要求掉落
		if(!this.hasEnergy){
			this.y += this.fno * 0.4;
		} else {
			//有能量
			this.y -= (20 - this.fno) * 0.4;
			//20帧之后没有能量
			if(this.fno > 20){
				this.hasEnergy = false;
				this.fno = 0;
			}
		}
		
		this.d += 0.04;
		this.fno++;
	}
	//飞
	Bird.prototype.fly = function(){
		this.hasEnergy = true;
		this.d = -0.6;
		this.fno = 0;
	}
	
})();
