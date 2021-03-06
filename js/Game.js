(function(){
	var Game = window.Game = function(params){
		//得到画布
		this.canvas = document.querySelector(params.id);
		//上下文		
		this.ctx = this.canvas.getContext("2d");
		//资源文件地址
		this.Rjsonurl = params.Rjsonurl; 
		//帧编号
		this.fno = 0;
		//大地占屏幕比例
		this.landScale = 0.8;
		
		//设置画布的宽度和高度
		this.init();
		
		//分数
		this.score = 0;
		
		//读取资源，读取资源是一个异步函数，我们不知道他什么时候执行完毕，但是其他函数必须等到这个函数执行完毕才能执行，所以必须用回调函数
		var self = this;
		this.loadAllResource(function(){
			//我们封装的回调函数，这里表示全部资源读取完毕
			self.start();
		});
		
	}
	Game.prototype.init = function(){
		//读取设备的高度和宽度
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight
		//验收
		if(windowW > 414){
			windowW = 414;
		} else if(windowW < 320){
			windowW = 320;
		}
		
		if(windowH > 736){
			windowH = 736;
		} else if(windowH < 500){
			windowH = 500;
		}
		//让canvas适配
		this.canvas.width = windowW;
		this.canvas.height = windowH;
	}
	
	//读取资源
	Game.prototype.loadAllResource = function(callback){ //这里是一个回调函数
		this.R = {};
		var self = this;	//备份
		//计数器
		var alreadyDoneNumber = 0;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var Robj = JSON.parse(xhr.responseText);
				for (var i = 0; i < Robj.images.length; i++) {
					self.R[Robj.images[i].name] = new Image();
					//请求
					self.R[Robj.images[i].name].src = Robj.images[i].url;
					//监听
					self.R[Robj.images[i].name].onload = function(){
						//清屏
						self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
						alreadyDoneNumber++;
						var txt = "正在加载资源" + alreadyDoneNumber + "/" + Robj.images.length + "请稍后";
						
						self.ctx.save();
						//提示文字
						self.ctx.textAlign = "center";
						
						//防止居中的位置，屏幕的黄金分割点
						self.ctx.font = "20px 微软雅黑";
						self.ctx.fillText(txt, self.canvas.width / 2, self.canvas.height * (1 - 0.618));
						self.ctx.restore();
						//判断是否全部加载完毕
						if(alreadyDoneNumber == Robj.images.length){
							callback();
						}
					}
				}
			}
		}
		xhr.open("get", this.Rjsonurl, true);
		xhr.send(null);
	}
	//开始游戏
	Game.prototype.start = function(){
//		//实例化背景
//		this.background = new Background();
//		//实例化大地
//		this.land = new Land();
//		
//
//		//管子数组，定时器每间隔150帧都要实例化管子
//		this.pipeArr = new Array();
//		
//		//小鸟的实例
//		this.bird = new Bird();
		
		
		//实例化自己的场景管理器
		this.sm = new SceneManager();
		



		
		var self = this;
		this.timer = setInterval(function(){
			//清屏
			self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
			//帧编号
			self.fno++;
			//场景管理器的渲染和更新
			self.sm.update();
			self.sm.render();

//			//更新背景
//			self.background.update();			
//			//渲染背景
//			self.background.render();
//			//更新大地
//			self.land.update();
//			//渲染大地
//			self.land.render();
//			if(self.fno % 150 == 0)
//			{
//				new Pipe();
////				if(self.fno >= 200)
////					self.score++;
//			}
//			//管子的更新和渲染
//			for(var i = 0; i < self.pipeArr.length; i++){
//				self.pipeArr[i].update();
//				//验证管子是否还在数组中
//				self.pipeArr[i] && self.pipeArr[i].render();
//			}
//			//渲染小鸟
//			self.bird.render();
//			self.bird.update();
//			
//			//打印分数
//			var scoreStr = self.score.toString();
//			var scoreLength = scoreStr.length;
//			
//			for(var i = 0; i < scoreLength; i++){
//				self.ctx.drawImage(self.R["shuzi" + scoreStr.charAt(i)], self.canvas.width / 2 - (scoreLength / 2 * 24) + 24 * i, 100);
//			}
			
			//var len = 2;
			//self.ctx.drawImage(self.R["shuzi1"], self.canvas.width / 2 - (len / 2 * 34), 100);
			//self.ctx.drawImage(self.R["shuzi0"], self.canvas.width / 2 - (len / 2 * 34) + 24, 100);
			
			

			//打印帧编号
			self.ctx.save();
			self.ctx.font = "16px consolas";
			self.ctx.fillText("FNO:" + self.fno, 10, 20);
			self.ctx.fillText("场景号:" + self.sm.sceneNumber, 10, 40);
			self.ctx.restore();
		}, 20);
	}

})();
