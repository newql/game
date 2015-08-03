function showNumberWithAnimation(i,j,randNumber)//显示数字的动画效果
{
	var numberCell=$("#number-cell-"+i+"-"+j);

	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({//动画效果 animate是个产生动画的函数jquery中的函数
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy)
{
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score)//在前端显示分数的改变
{
	$("#score").text(score);
}
