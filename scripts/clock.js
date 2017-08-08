

		var drawing=document.getElementById("drawing");

		var times=[3,4,5,6,7,8,9,10,11,12,1,2];

		var img=document.images[0];
		


		if(drawing.getContext){
			var context=drawing.getContext("2d");

			var width=context.canvas.width;

			var r=width/2;//圆的半径

			var rem=width/200;//比例
			


			//画背景
			function background(){
				context.save();//保存最开始的画布环境

				context.translate(r,r);//将圆的中心设置为原点

				context.beginPath();

				context.strokeStyle="#4f4f4f";
			
				context.shadowColor="grey";
				context.lineWidth=10*rem;

				context.arc(0,0,r-10*rem,0,2*Math.PI);

				context.drawImage(img,-r,-r,300,300);
				// context.stroke();
			



				//画时钟的十二个数字
				for (var i = 0; i < times.length; i++) {
					var rad=Math.PI/6*i;

					var x=Math.cos(rad)*(r-30*rem);
					var y=Math.sin(rad)*(r-30*rem);

					context.font=12*rem+"px Arial";
					context.textAlign="center";
					context.textBaseline="middle";
				    context.fillStyle="#ff359a";



				    context.fillText(times[i],x,y);

				}
				//画时钟的60的点
				for (var i = 0; i < 60; i++) {
					var rad=Math.PI/30*i;

					var x=Math.cos(rad)*(r-18*rem);
					var y=Math.sin(rad)*(r-18*rem);


					context.beginPath();

					if(i%5==0){
				   		 context.arc(x,y,2*rem,0,2*Math.PI,false);
						
					}

				   	context.arc(x,y,1*rem,0,2*Math.PI,false);


				    context.fill();
				}
			}		

			//画时针
			function hourChange(hour,minute){
				context.save();

				var rad=2*Math.PI/12*hour;//小时对应的弧度
				var ext=2*Math.PI/12/60*minute;//分钟在时针上对应的弧度

				context.beginPath();
				context.rotate(rad+ext);

				context.lineWidth=8*rem;
				context.lineCap="round";
				context.strokeStyle="#64a600";

				context.moveTo(0,10*rem);
				context.lineTo(0,-r/2);

				context.stroke();

				context.restore();
			}
			



			//画分针
			function minuteChange(minute){
				context.save();

				var rad=2*Math.PI/60*minute;//分钟在分针上对应的弧度

				context.beginPath();
				context.rotate(rad);

				context.lineWidth=5*rem;
				context.lineCap="round";
				context.strokeStyle="#548c00";

				
				context.moveTo(0,10*rem);
				context.lineTo(0,-(r-40*rem));

				context.stroke();
				context.restore();

			}
			

			//画秒针
			function secondChange(second){
				context.save();

				var rad=2*Math.PI/60*second;//秒数在秒针上对应的弧度

				context.beginPath();
				context.rotate(rad);
				
				context.fillStyle="#ff359a";

				context.moveTo(-2*rem,10*rem);
				context.lineTo(-0.5*rem,-(r-20*rem));
				context.lineTo(0.5*rem,-(r-20*rem));
				context.lineTo(2*rem,10*rem);

				context.fill();

				context.restore();

			}

			//画中间的圆帽
			function myRound(){
				
				context.beginPath();
				context.fillStyle="#F0E68C";
				context.arc(0,0,5*rem,0,2*Math.PI);
				context.fill();
			}

			//画时钟
			function draw(){

				var date=new Date();
				var hour=date.getHours();
				var minute=date.getMinutes();
				var second=date.getSeconds();

				background();
				hourChange(hour,minute);
				minuteChange(minute);
				secondChange(second);
				myRound();


				context.restore();

			}

			draw();
			
			setInterval(function(){
				context.clearRect(0,0,context.canvas.width,context.canvas.width);

				draw();
			},1000);

			
		}

		