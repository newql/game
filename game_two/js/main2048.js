var board = new Array();
var score = 0;
var hasConflicted = new Array();//用于判断叠加了几次 修改2 2 4 8 的bug
//true代表已经合并过一次了 不能再合并了

$(document).ready(function(){
	newgame();
});

function newgame()
{
	//初始化
	init();
	//开始的时候随机在两个格子生成数字
	generateOneNumber();
	generateOneNumber();//随机生成一个数字
}

function init()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));//穿入每个格子的相应坐标值即对每个格子进行定位
			gridCell.css("left",getPosLeft(i,j));
		}
	}

	for(var i=0;i<4;i++)
	{
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j=0;j<4;j++)
		{
			board[i][j]=0;//初始化游戏数据
			hasConflicted[i][j]=false;
		}
	}

	updateBoardView();//通知前端显示board数据
	score=0;//初始化分数
}

function updateBoardView()
{
	$(".number-cell").remove();

	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			//为每个格子添加一个numbercell
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0)
			{
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j)+50);
				theNumberCell.css("left",getPosLeft(i,j)+50);//numbercell在gridcell的中间
			}
			else
			{
				theNumberCell.css("width","100px");
				theNumberCell.css("height","100px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));//显示numbercell的背景色
				theNumberCell.css("color",getNumberColor(board[i][j]));//显示numbercell的前景色
				theNumberCell.text(board[i][j]);//显示数字的值
			}
			hasConflicted[i][j]=false;//每次更改后归位设置为false;
		}
	}
}

function generateOneNumber()
{
	if(nospace(board))//如果board中没有位置可以防止随机数字了
	{
		return false;
	}

	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));

	var times=0;
	//判定这个位置是否可用
	while(times<50)
	{
		if(board[randx][randy]==0)
			break;

		//随机一个位置
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50)
	{
		for(var i=0;i<4;i++)
		{
			for(var j=0;j<4;j++)
			{
				if(board[i][j]!=0)
				{
					randx=i;
					randy=j;
				}
			}
		}
	}
	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2:4;
	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);//显示数字的动画效果

	return true;
}


$(document).keydown(function(event){
	switch(event.keyCode)
	{
		case 37 ://left
			if(moveLeft())//如果可以向左移动
			{
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38 ://up
			if(moveUp())//如果可以向上移动
			{
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39 ://right
			if(moveRight())//如果可以向右移动
			{
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40 ://down
			if(moveDown())//如果可以向下移动
			{
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		default:
			break;
	}
})

function isgameover()
{
	if(nospace(board) && nomove(board))
		gameover();
}

function gameover()
{
	alert("game over");
}

function moveLeft()
{
	if(!canMoveLeft(board))//判断能否向左移动
		return false;
	//moveleft 对每个数字的左侧进行检测看是否可以作为落脚点(落脚数字是否为空 或者与自己相等 以及移动过程是否有障碍物)
	for(var i=0;i<4;i++)
	{
		for(var j=1;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<j;k++)
				{
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board))
					{
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k])
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);//将分数的改变显示在前端
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);//在前端显示数字的改变
	return true;
}
function moveUp()
{
	if(!canMoveUp(board))
		return false;
	//moveup 对每个数字的上面进行检测看是否可以作为落脚点
	for(var j=0;j<4;j++)
	{
		for(var i=1;i<4;i++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<i;k++)
				{
					if(board[k][j]==0 && noBlockVertical(j,k,i,board))
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);//将分数的改变显示在前端
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);//在前端显示数字的改变
	return true;
}
function moveRight()
{
	if(!canMoveRight)//判断能否向右移动
	{
		return false;
	}
	//moveright 对每个数字的右侧进行检测看是否可以作为落脚点
	for(var i=0;i<4;i++)
	{
		for(var j=2;j>=0;j--)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>j;k--)
				{
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board))
					{
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k])
					{
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);//将分数的改变显示在前端
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown()
{
	if(!canMoveDown(board))
		return false;
	//movedown
	for(var j=0;j<4;j++)
	{
		for(var i=2;i>=0;i--)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>i;k--)
				{
					if(board[k][j]==0 && noBlockVertical(j,i,k,board))
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);//将分数的改变显示在前端
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

