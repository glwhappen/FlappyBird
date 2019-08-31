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
		//小鸟的位置（注意这个位置是真实的物理位置，并且是小鸟真实点的位置）
		//this.x = Game.canvas.width * (1 - 0.618) - 24;
		//this.y = 100;
		this.x = Game.canvas.width / 2;
		this.y = 300;
		//鸟的帧数,用于下落上升算法
		this.fno = 0;
		
		//角度
		this.d = 0;
		
		//是否拥有能量
		this.hasEnergy = false;
	}
	Bird.prototype.render = function(){
		Game.ctx.save();
		//将坐标系拉到小鸟中心点
		Game.ctx.translate(this.x, this.y);
		Game.ctx.rotate(this.d);
		
		Game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
		
		Game.ctx.restore();
	}
	Bird.prototype.update = function(){
		
		this.wing();
		

		
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
		
		//验收天花板
		if(this.y < -20)
		{
			this.y = -20;
		}
		
		//计算自己四个碰撞检测值
		this.T = this.y - 9; //12
		this.R = this.x + 12; //17
		this.B = this.y + 11; //12
		this.L = this.x - 15; //17
		// 验证是否落地
		if(this.B > Game.canvas.height * Game.landScale){
			Game.sm.enter(4);
		}
		
	}
	//飞
	Bird.prototype.fly = function(){
		this.hasEnergy = true;
		this.d = -0.6;
		this.fno = 0;
	}
	//扑打翅膀
	Bird.prototype.wing = function(){
		Game.fno % 3 == 0 && this.wingStep++;
		if(this.wingStep > 2){
			this.wingStep = 0;
		}
	}
})();
