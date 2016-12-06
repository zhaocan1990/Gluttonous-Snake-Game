  /***2016年11月29日10:58:57*****/
  var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        // 游戏类
        function Game(){
            this.snake = new Snake();
            this.food = new Food();
        }
        Game.prototype={
            // 主循环
            loop:function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);  // 清除画布
                this.food.render();  // 渲染食物
                this.snake.update();  // 更新蛇

                // 判断死亡 以及 吃到食物
                var snakeHead_X = this.snake.map[this.snake.map.length-1][0];
                var snakeHead_Y = this.snake.map[this.snake.map.length-1][1];
                //判断死亡
                //判断蛇的头部 X、Y坐标是否超过画布宽度
                if(snakeHead_X > 24 || snakeHead_X<0 || snakeHead_Y>14 || snakeHead_Y<0){
                    //gameover/停止定时器
                    alert('game over');
					ctx.clearRect(0,0,canvas.width,canvas.height);
					clearInterval(this.timer);
                    return false;
                }
                //判断小蛇是否吃到自己
                //遍历蛇段
                for(var j=0; j<this.snake.map.length-1; j++){
                    if(this.snake.map[j][0]==snakeHead_X  && this.snake.map[j][1]==snakeHead_Y){
                        alert('恭喜您，自杀！');
						ctx.clearRect(0,0,canvas.width,canvas.height);
						clearInterval(this.timer);
                        return false;
                    }
                }

                var food_X = this.food.x;
                var food_Y = this.food.y;
                if(snakeHead_X == food_X && snakeHead_Y == food_Y){
                    //① 吃，创建一节，坐标就是最后一个蛇节的坐标
                    var newduan = this.snake.footer;
                    this.snake.map.unshift(newduan);  //添加进蛇身
                    //② 重新生成食物
                    this.food.update();

                }
                this.snake.render();

            },
            start:function(){
                // 绑定键盘事件
                this.changeDirection();
                var This = this;
                this.timer = setInterval(function(){
                    This.loop();
                },100);
            },
            changeDirection:function(){
                var This = this;
                document.addEventListener('keydown',function(e){
                    switch(e.keyCode){
                        case 37:
                            This.snake.direction = 'left';
                            break;
                        case 38:
                            This.snake.direction = 'up';
                            break;
                        case 39:
                            This.snake.direction = 'right';
                            break;
                        case 40:
                            This.snake.direction = 'down';
                            break;
                    }
                });
            }
        };

        // Food类
        function Food(){
            this.w= 20;
            this.h= 20;
            this.x = Math.random()*25|0;
            this.y = Math.random()*15|0;
        }
        Food.prototype= {
            render:function(){
                ctx.fillStyle = "red";
                ctx.fillRect( this.x*this.w, this.y*this.h,this.w,this.h);
            },
            update:function(){
                this.x = Math.random()*25|0;
                this.y = Math.random()*15|0;
            }
        };

        // Snake类
        function Snake(){
            this.bodyColor = 'blue';
            this.headColor = 'red';
            this.bodyWidth = 20;
            this.bodyHeight = 20;
            this.isDeath = false;
            this.direction = "right";
            this.map = [[0,1,this.bodyColor],[1,1,this.bodyColor],[2,1,this.bodyColor],[3,1,this.headColor]];
        }
        Snake.prototype={
            update:function(){
                // 保存最后一节
                this.footer = [this.map[0][0],this.map[0][1],this.bodyColor];
                //移动
                for(var i=0;i<this.map.length-1;i++){
                    this.map[i][0] = this.map[i+1][0];
                    this.map[i][1] = this.map[i+1][1];
                }
                //根据方向移动头
                if(this.direction == 'right'){ this.map[this.map.length-1][0] += 1; }
                if(this.direction == 'left'){ this.map[this.map.length-1][0] -= 1; }
                if(this.direction == 'up'){ this.map[this.map.length-1][1] -= 1; }
                if(this.direction == 'down'){ this.map[this.map.length-1][1] += 1; }
            },
            render:function(){
                for(var i=0;i<this.map.length;i++){
                    ctx.fillStyle = this.map[i][2];
                    ctx.fillRect(this.map[i][0]*this.bodyWidth,this.map[i][1]*this.bodyHeight,this.bodyWidth,this.bodyHeight);
                }
            }
        };

        var game = new Game();
        game.start();
