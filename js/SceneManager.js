(function(){
	var SceneManager = window.SceneManager = function(){
		//1表示欢迎屏幕、2表示教程界面、3表示游戏界面、4表示GameOver
		this.sceneNumber = 1;
		//场景管理器负责实例化东西
		this.bg = new Background();
		this.bird = new Bird();
		this.land = new Land();
		Game.bird = this.bird;
		
		//logo的y值
		this.logoY = -48;
		
		//button_play的y值
		this.button_playY = Game.canvas.height;
		this.button_playX = Game.canvas.width / 2 - Game.R["button_play"].width / 2;
		
		//添加监听
		this.bindEvent();
		
	}
	SceneManager.prototype.update = function(){
		switch(this.sceneNumber){
			case 1:
				this.logoY++;
				if(this.logoY > 120){
					
					this.logoY = 120;
				}
				this.button_playY -= 2;
				if(this.button_playY < Game.canvas.height - 336){
					this.button_playY = Game.canvas.height - 336;
				}
				break;
			case 2:
				this.bird.wing();
				if(this.tutorialOpacity == 1){
					this.tutorialOpacity = 0.5;
				} else {
					this.tutorialOpacity = 1;
				}
				break;
			case 3:
				this.bird.update();
				//背景更新
				this.bg.update();
				//大地更新
				this.land.update();
				//管子的实例化
				Game.fno % 150 == 0 && (new Pipe());
				//渲染所有管子
				for(var i = 0; i < Game.pipeArr.length; i++){
					Game.pipeArr[i] && Game.pipeArr[i].update();
				}
				
				
				break;
			case 4:
				Game.fno % 5 == 0 && this.bombStep++;
				if(this.bombStep > 11){
					this.bombStep = 11;
				}
				//白屏要马上缓缓的变回来
//				Game.ctx.globalAlpha += 0.1;
//				if(Game.ctx.globalAlpha > 1){
//					Game.ctx.globalAlpha = 1;
//				}
//				this.maskOpacity -= 0.1;
//				if(this.maskOpacity < 0){
//					this.maskOpacity = 0;
//				}
				break;
				
		}
		

	}
	SceneManager.prototype.render = function(){
		//根据当前的场景，来渲染对应的对象
		switch(this.sceneNumber){
			case 1:
				//渲染背景
				this.bg.render();
				//this.land.render();
				
				if(this.logoY == 120){
					//渲染小鸟
					this.bird.render();
					this.bird.x = Game.canvas.width / 2;
					this.bird.y = 300;
				}
				
				Game.ctx.drawImage(Game.R["logo"], Game.canvas.width / 2 - Game.R["logo"].width / 2, this.logoY);
				Game.ctx.drawImage(Game.R["button_play"], this.button_playX, this.button_playY);
				break;
			case 2:
				this.bg.render();
				this.bird.render();
				this.land.render();
				//画教程
				Game.ctx.save();
				Game.ctx.globalAlpha = this.tutorialOpacity;
				Game.ctx.drawImage(Game.R["tutorial"], Game.canvas.width / 2 - Game.R["tutorial"].width / 2, this.button_playY);
				
				Game.ctx.restore();
				break;
			case 3:
				//渲染背景
				this.bg.render();
				//渲染小鸟
				this.bird.render();
				
				if(!this.firstClick){
					this.firstClick = true;
					this.bird.fly();
				}
				//渲染大地
				this.land.render();
				
				//渲染管子
				for(var i = 0; i < Game.pipeArr.length; i++){
					Game.pipeArr[i] && Game.pipeArr[i].render();
				}
				
				//打印分数
				var scoreStr = Game.score.toString();
				var scoreLength = scoreStr.length;
				
				for(var i = 0; i < scoreLength; i++){
					Game.ctx.drawImage(Game.R["shuzi" + scoreStr.charAt(i)], Game.canvas.width / 2 - (scoreLength / 2 * 24) + 24 * i, 100);
				}
				
				break;
			case 4:
				//渲染背景
				this.bg.render();
				//渲染小鸟
				//this.bird.render();
				
				if(!this.firstClick){
					this.firstClick = true;
					this.bird.fly();
				}
				//渲染大地
				this.land.render();
				
				//渲染管子
				for(var i = 0; i < Game.pipeArr.length; i++){
					Game.pipeArr[i] && Game.pipeArr[i].render();
				}
				// 渲染大白屏
//				Game.ctx.save();
//				Game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
//				Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
//				Game.ctx.restore();
				
				//爆炸特效
				if(this.bombStep != 11){
					Game.ctx.drawImage(Game.R["bomb" + this.bombStep], Game.bird.x - 24, Game.bird.y - 64, 48 * 1.3, 48 * 2.0);	// 		
				} else {
					//爆炸特效完毕，进入场景5
					Game.sm.enter(5);
				}

				//打印分数
				var scoreStr = Game.score.toString();
				var scoreLength = scoreStr.length;
				
				for(var i = 0; i < scoreLength; i++){
					Game.ctx.drawImage(Game.R["shuzi" + scoreStr.charAt(i)], Game.canvas.width / 2 - (scoreLength / 2 * 24) + 24 * i, 100);
				}
				break;
			case 5:
				//渲染背景
				this.bg.render();

				if(!this.firstClick){
					this.firstClick = true;
					this.bird.fly();
				}
				//渲染大地
				this.land.render();
				
				//渲染管子
				for(var i = 0; i < Game.pipeArr.length; i++){
					Game.pipeArr[i] && Game.pipeArr[i].render();
				}

				//打印分数
				var scoreStr = Game.score.toString();
				var scoreLength = scoreStr.length;
				
				for(var i = 0; i < scoreLength; i++){
					Game.ctx.drawImage(Game.R["shuzi" + scoreStr.charAt(i)], Game.canvas.width / 2 - (scoreLength / 2 * 24) + 24 * i, 100);
				}
				//渲染重新再来
				Game.ctx.drawImage(Game.R["text_game_over"], Game.canvas.width / 2 - Game.R["text_game_over"].width / 2, 300);
				
				break;
				
		}
	}
	SceneManager.prototype.enter = function(number){
		this.sceneNumber = number;
		switch(this.sceneNumber){
			case 1:
				//进入1号场景一瞬间要做的事情
				this.bird = new Bird();
				this.logoY = -48;
				this.button_playY = Game.canvas.height;
				break;
			case 2:
				this.tutorialOpacity = 1;
				break;
			case 3:
				//负责标记小鸟第一次飞行
				this.firstClick = false;
				//负责处理管子数组:清空
				Game.pipeArr = new Array();
				break;
			case 4:
				// 死亡动画
				//Game.ctx.globalAlpha = 0.3;
				//绘制白屏的阿尔法值
				//this.maskOpacity = 1;

			
				//爆炸动画
				this.bombStep = 0;
				break;
			case 5:
				
				break;
			
		}
	}
	//添加监听
	SceneManager.prototype.bindEvent = function(number){
		var self = this;
		Game.canvas.onclick = function(event){
			var mousex = event.clientX;
			var mousey = event.clientY;
			//点击按钮 点击的时候判断是第几个场景
			switch(self.sceneNumber){
				case 1:
					if(self.button_playY == Game.canvas.height - 336 && mousex > self.button_playX && mousex < self.button_playX + Game.R["button_play"].width && mousey > self.button_playY && mousey < self.button_playY + Game.R["button_play"].height){
						//Game.canvas.style.cursor = "posinter";
						console.log("你点了play");
						self.enter(2);
					} else {
						//点击了空白处，快速开始游戏
						self.logoY = 120;
						self.button_playY = Game.canvas.height - 336;
					}
					break;
				case 2:
					self.enter(3);
					break;
				case 3:
					self.bird.fly();
					break;
				case 5:
					self.enter(1);
					break;
			}
			
		}
	}
})();
