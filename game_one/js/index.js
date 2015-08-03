window.onload=function()
{
	var jiandao = document.getElementById("jiandao");//获取图片剪刀
	var shitou = document.getElementById("shitou");//获取图片石头
	var bu = document.getElementById("bu");//获取图片布

	var div2 = document.getElementById("div2");//获取放置三个图片的div
	var div3 = document.getElementById("div3");//获取游戏结果的div
	var my_result = document.getElementById("my-result");//获取我点击的图片
	var computer_result = document.getElementById("computer-result");//获取电脑随机挑选的图片
	var result = document.getElementById("result");//获取最终的结果

	var win = document.getElementById("win");//获取次数的id
	var all = document.getElementById("all");
	var lose = document.getElementById("lose");
	var tie = document.getElementById("tie");
	var newgame = document.getElementById("newgame");//点击这个才能开始游戏
	var lose_times=0;
	var win_times=0;
	var tie_times=0;

	
	jiandao.onclick=function()//如果点击剪刀图片
	{
		my_result.src=jiandao.src;//获取点击图片的src

		var randNumber=parseInt(Math.floor(Math.random()*3));// 0 1 2 
		if(randNumber==0)//如果随机数为0
		{
			computer_result.src=jiandao.src;//电脑选择剪刀
			result.innerHTML="平局";//结果为平局
			tie_times+=1;
			tie.innerHTML=tie_times;
			all.innerHTML=tie_times+win_times+lose_times;
		}
		else if(randNumber==1)//如果随机数为1
		{
			computer_result.src=shitou.src;//电脑选择石头
			result.innerHTML="You Lose";//结果是失败
			lose_times+=1;
			lose.innerHTML=lose_times;
			all.innerHTML=tie_times+lose_times+win_times;
		}
		else if(randNumber==2)//如果随机数为2
		{
			computer_result.src=bu.src;//电脑选择布
			result.innerHTML="You Win";//结果是赢了
			win_times+=1;//赢的次数加上一
			win.innerHTML=win_times;//显示赢的次数
			all.innerHTML=tie_times+win_times+lose_times;
		}
	}

	shitou.onclick=function()
	{
		my_result.src=shitou.src;

		var randNumber=parseInt(Math.floor(Math.random()*3));// 0 1 2 
		if(randNumber==0)
		{
			computer_result.src=jiandao.src;
			result.innerHTML="You Win";
			win_times+=1;//赢的次数加上一
			win.innerHTML=win_times;//显示赢的次数
			all.innerHTML=tie_times+win_times+lose_times;
		}
		else if(randNumber==1)
		{
			computer_result.src=shitou.src;
			result.innerHTML="平局";
			tie_times+=1;
			tie.innerHTML=tie_times;
			all.innerHTML=tie_times+win_times+lose_times;
		}
		else if(randNumber==2)
		{
			computer_result.src=bu.src;
			result.innerHTML="You Lose";
			lose_times+=1;
			lose.innerHTML=lose_times;
			all.innerHTML=tie_times+lose_times+win_times;
		}
	}

	bu.onclick=function()
	{
		my_result.src=bu.src;

		var randNumber=parseInt(Math.floor(Math.random()*3));// 0 1 2 
		if(randNumber==0)
		{
			computer_result.src=jiandao.src;
			result.innerHTML="You Lose";
			lose_times+=1;
			lose.innerHTML=lose_times;
			all.innerHTML=tie_times+lose_times+win_times;
		}
		else if(randNumber==1)
		{
			computer_result.src=shitou.src;
			result.innerHTML="You Win";
			win_times+=1;//赢的次数加上一
			win.innerHTML=win_times;//显示赢的次数
			all.innerHTML=tie_times+win_times+lose_times;

		}
		else if(randNumber==2)
		{
			computer_result.src=bu.src;
			result.innerHTML="平局";
			tie_times+=1;
			tie.innerHTML=tie_times;
			all.innerHTML=tie_times+win_times+lose_times;
		}
	}
}
