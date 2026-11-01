// Hall Operation Status
// 生成运营情况画布
// 指向 id="canvasHOS" 的画布
// 需要的JSON数据格式，详见范例

// 定义绘图常量
var termVR=45;		//终端机高度缩放倍数
var cc={
	zoomN:1,		//放大倍数
	marginL:40,		//左边距
	marginR:10,		//右边距
	marginT:10,		//上边距
	marginB:300,	//下边距
	paddingL:10,	//左内距
	paddingR:10,	//右内距
	paddingT:1800/termVR+10,	//上内距
	paddingB:10,	//下内距
	termW:21,		//终端机矩形宽度
	termH:43200/termVR,	//终端机矩形高度
	termHR:termVR,		//终端机高度缩放倍数
	termSpacing:21,	//终端机矩形水平间隔

	colorSchemes:"../assets/colors.json",	//色阶JSON地址
	bgColorOut:"#fff",			//背景色：大框之外
	bgColorIn:"#f8f8f8",		//背景色：大框之内
	borderColor:"#aaa",			//大框边框颜色
	bgColorTerm:"#f6f6f6",		//终端机矩形背景色
	borderColorTerm:"#aaa",		//终端机矩形边框颜色
	timelineStrokeStyle:"#7e9289",			//时间轴：横线
	timelineFont:"11px sans-serif",						//时间轴：字体样式
	timelineFillStyle:"#000",						//时间轴：字体颜色
	termFont:"14px sans-serif",							//终端机编号
	termFillStyle:"#000",							//终端机编号颜色
	// lineStrokeStyle:"rgba(100,100,200,0.4)",		//跳线颜色
	lineStrokeStyle:"rgba(0,221,118,0.4)",		    //跳线颜色
	lineWidth: 1,									//跳线粗细
	lineCap:"round",								//跳线端点样式
	dotFillStyle:"rgba(255,255,255,0.6)",				//圆点颜色
	dotR: 2,										//圆点半径
	coverFillStyle:"rgba(255,255,255,0.8)",			//罩层颜色
	heightlightLineWidth: 2,						//高亮跳线粗细
	heightlightStrokeStyle:"rgba(100,100,200,1)",	//高亮跳线颜色
	heightlightdotR: 3,								//高亮圆点半径
	heightlightDotFillStyle:"rgba(50,50,200,0.7)"	//高亮圆点颜色
};

var ccs;		//整理之后的常量对象

var dataHOS;	//销售厅运营JSON数据

gDataHOS=[];	//销售厅运营JSON数据  全局变量

gTermIDtoIndex=[];	//终端机编号  全局变量，以确定序号

gColorSchemes=[];	//颜色板  全局变量

gPlotFinish=0;

// ■■■■■■■■■■■■■■■■  ■■■■■■■■■■■■■■■■
// 画图
$(function() {
	var canvas=document.getElementById("canvasHOS");
	var ctx=canvas.getContext("2d");
	prov_city_hall=null;
	$.getJSON("./data/files.json?v=2",function (rs) {
		//文件名
		var k=0;
		for(i in rs){
			if(k===0){
				$('#select-file').append('<option value="'+rs[i]+'" selected>'+rs[i].replace('.txt','').replace('-', ' · 匿名销售厅 ')+'</option>');
				k=1;
			}else {
				$('#select-file').append('<option value="'+rs[i]+'">'+rs[i].replace('.txt','').replace('-', ' · 匿名销售厅 ')+'</option>');
			}

		};

		var temp=$('#select-file').val().replace('.txt','').split('-');
		plotAll(canvas,ctx,temp[0],temp[1]);

		$('#select-file').change(function(event) {
			var temp=$('#select-file').val().replace('.txt','').split('-');
			plotAll(canvas,ctx,temp[0],temp[1]);

		});

	});

});
// ■■■■■■■■■■■■■■■■ 总绘图 ■■■■■■■■■■■■■■■■
function plotAll (canvas,ctx,saleDate,saleHall) {
	$.getJSON(cc['colorSchemes'],function (rs) {
		// 加载颜色表，0~1000
		var colorSchemes=rs;
		gColorSchemes=rs;
		// 加载数据
		gPlotFinish=0;
		var dateURL='./data/datas/'+saleDate.replace(/-/g,'')+'-'+saleHall+'.txt?v='+Math.random();//json路径
		$.ajax({
		  url: dateURL,
		  type: 'GET',
		  success: function(rs){
		  	dataHOS=processData(rs);
			gDataHOS=dataHOS;
			$('#hallID').text(dataHOS['hallID']);
			$('#saleAmount').text(Math.round(dataHOS['saleAmount']/100)/100);
			$('#gameTimeRatio').text(Math.round(dataHOS['gameTimeRatio']*100)+'%');
			$('#cardNum').text(dataHOS['cardNum']);
			$('#bar2CardNum').text(Math.round(1000*dataHOS['bar2CardNum']/dataHOS['cardNum'])/10+'%');
			$('#b2NotUsedAfterProduct').text(Math.round(1000*dataHOS['b2NotUsedAfterProduct']/dataHOS['cardNum'])/10+'%');


			ccs={
				width: Math.ceil(cc.marginL+cc.marginR+cc.paddingL+cc.paddingR+dataHOS.termNum*(cc.termW+cc.termSpacing)-cc.termSpacing),
				height: Math.ceil(cc.marginT+cc.marginB+cc.paddingT+cc.paddingB+cc.termH),
				axesOriginX: cc.marginL+cc.paddingL,
				axesOriginY: cc.marginT+cc.paddingT
			};
			plot(canvas,ctx,dataHOS,colorSchemes);
			gPlotFinish+=1; $('#chart-status').text('悬停查看明细 · 点击色块跟踪卡片轨迹');
		  },
		  error: function(){
		  	$('#chart-status').text('数据加载失败，请刷新后重试。');
		  	$('#canvasHOSdiv div').remove();
		  	$('#chart-status').text('数据加载失败，请刷新后重试。');
		  }
		});
	});
}

// ■■■■■■■■■■■■■■■■  ■■■■■■■■■■■■■■■■
// 定义数据处理函数
function processData(rs){
	var rsArray = [];			//二维数组，用于转存rs
	var rsNew=rs.split(/\n/g);	//临时使用
	var nRow = rsNew[0].split(/\t/g).length;	//每行字段数量
	rs=rs.replace(/^\\s+|\\s+$/,'').split(/[\t\n]/g);		//按制表符和换行符拆分数据为数组

	//生成二维数组 rsArray
	rs.forEach( function(e, i) {
		if(i%nRow===0){rsArray.push([]);}
		rsArray[Math.floor(i/nRow)].push(e);
	});

	var TermIDs=[],
		cardIDs=[],
		datas=[],
		saleAmount=0;

	//计算返回数据中的data
	rsArray.forEach( function(e, i) {
		if(e.length===nRow){
			if(TermIDs.indexOf(e[2])<0) TermIDs.push(e[2]);
			if(cardIDs.indexOf(e[3])<0) cardIDs.push(e[3]);
			saleAmount+=e[18]/100.00;
			//游戏时长转换单位
			var gameTime=parseInt(e[16],10);
			if (parseInt(e[16],10)>=3600){
				gameTime=Math.floor(gameTime/3600)+'小时 '+Math.floor((gameTime%3600)/60)+'分钟 '+gameTime%60+'秒'
			}else if (parseInt(e[16],10)>=60) {
				gameTime=Math.floor(gameTime/60)+'分钟 '+gameTime%60+'秒'
			}else {
				gameTime=gameTime+'秒'
			}
			datas.push({
				"cardID": e[3],
	            "termID": parseInt(e[2],10),
							"timeStartRaw": e[12].substr(11,8),
	            "timeEndRaw": e[13].substr(11,8),
	            "timeStart": parseInt(e[14],10),
	            "timeEnd": parseInt(e[15],10),
							"gameTime": gameTime,
	            "costBalance": (e[18]/100.00)+"元",
	            "betTimes01234": e[31]+e[32]+e[33]+e[34]+e[35],
	            "betPoints": e[17]+'点',
	            "loginTimes": e[6]+" / "+e[7],
	            "firstLastBar": e[25]+" / "+e[26],
	            "completeRound": e[21],
							"saveRound": e[22],
							"giveupRound": e[31],
	            "remainPoints": e[29]+'点'+" / "+e[30]+'点',
	            "remainMoney": (e[27]/100.00)+"元 / "+(e[28]/100.00)+"元",
	            "betAvg": Math.round(e[42])+"点×"+e[36]+"次",
	            "bar0BetAvg": Math.round(e[37])+"点×"+e[31]+"次",
	            "bar1BetAvg": Math.round(e[38])+"点×"+e[32]+"次",
	            "bar2BetAvg": Math.round(e[39])+"点×"+e[33]+"次",
	            "bar3BetAvg": Math.round(e[40])+"点×"+e[34]+"次",
	            "bar4BetAvg": Math.round(e[41])+"点×"+e[35]+"次",
	            "term": "--",
	            "round": "--"
			});
		}
	});

    //计算统计指标
	var bar2CardNum=0, b2NotUsed=0, b2NotUsedAfterProduct=0, b2ProductAfterUsed={}, b2ProductBeforUsed={};
	var tAllcardID={}, tBar2CardID={}, tNBar2CardID={};
	var gameTimeRatio=0;
	rsArray.forEach(function(e, i){
	    tAllcardID[e[3]]=1;
	    //二关卡统计（含三关卡）
	    if(e[38]<25 && e[32]>20 && e[33]<15 && e[34]==0 || e[38]<25 && e[39]<25 && e[32]*e[33]>15 && e[34]<15){
	        if (tBar2CardID[e[3]]==undefined){tBar2CardID[e[3]]=e[14];}//二关卡列表
	    }
	    //计算饱和度
	    if(e[16]){
	        gameTimeRatio += 1.0*e[16];
	    }
	});
	rsArray.forEach(function(e, i){
	    //计算二关卡
	    //如果当前登录不是生产二关卡
	    if(!(e[38]<25 && e[32]>20 && e[33]<15 && e[34]==0 || e[38]<25 && e[39]<25 && e[32]*e[33]>15 && e[34]<15)){
            //产前使用列表：使用之后生产，生产之前，第2关或第3关有投注，且大于15拍
	        if(tBar2CardID[e[3]]>e[14] && e[33]+e[34]>15){
	            if(b2ProductAfterUsed[e[3]]==undefined){b2ProductAfterUsed[e[3]]=0}
	            b2ProductAfterUsed[e[3]] += 1;
	        }
	        //产后使用列表：使用之前生产，生产之后，第2关或第3关有投注，且大于15拍
	        if(tBar2CardID[e[3]]<e[14] && e[33]+e[34]>15){
	            if(b2ProductBeforUsed[e[3]]==undefined){b2ProductBeforUsed[e[3]]=0}
	            b2ProductBeforUsed[e[3]] += 1;
	        }
	    }
	});
	//生产前后都未被使用
    for(i in tBar2CardID){
        if(b2ProductAfterUsed[i]==undefined && b2ProductBeforUsed[i]==undefined){
            b2NotUsed+=1;
        }
    }
    //生产后未被使用
    for(i in tBar2CardID){
        if(b2ProductBeforUsed[i]==undefined){//如果不在产后使用列表中
            b2NotUsedAfterProduct+=1;
        }
    }
    //按终端机编号排序
	datas.sort(function(a,b){a["termID"]-b["termID"]});
	//打印 rsArray
    console.log({
            "termNum": TermIDs.length,
            "cardNum": Object.getOwnPropertyNames(tAllcardID).length,
            "logNum": rsArray.length,
            "hallID": rsArray[0][1],
            "hallName": "--",
            "date": rsArray[0][0],
            "saleAmount": saleAmount,
            "bar2CardNum": Object.getOwnPropertyNames(tBar2CardID).length,
            "b2ProductBeforUsed": Object.getOwnPropertyNames(b2ProductBeforUsed).length,
            "b2ProductAfterUsed": Object.getOwnPropertyNames(b2ProductAfterUsed).length,
            "b2NotUsed": b2NotUsed,
            "b2NotUsedAfterProduct": b2NotUsedAfterProduct,
            "gameTimeRatio": gameTimeRatio/TermIDs.length/43200,
            "data": datas
        });
	//返回数据
	return {
        "termNum": TermIDs.length,
        "cardNum": Object.getOwnPropertyNames(tAllcardID).length,
        "logNum": rsArray.length,
        "hallID": rsArray[0][1],
        "hallName": "--",
        "date": rsArray[0][0],
        "saleAmount": saleAmount,
        "bar2CardNum": Object.getOwnPropertyNames(tBar2CardID).length,
        "b2ProductBeforUsed": Object.getOwnPropertyNames(b2ProductBeforUsed).length,
        "b2ProductAfterUsed": Object.getOwnPropertyNames(b2ProductAfterUsed).length,
        "b2NotUsed": b2NotUsed,
        "b2NotUsedAfterProduct": b2NotUsedAfterProduct,
        "gameTimeRatio": gameTimeRatio/TermIDs.length/43200,
        "data": datas
    }

}
// ■■■■■■■■■■■■■■■■  ■■■■■■■■■■■■■■■■
// 定义绘图函数
function plot (canvas,ctx,dataHOS,colorSchemes) {
	// 绘图

	//填写信息
	$('#plotHall').html('销售厅：'+dataHOS['hallID']+'--'+dataHOS['hallName']);
	$('#plotDate').html('日期：'+dataHOS['date']);
	//终端机编号排序
	var data=dataHOS['data'];
	gTermIDtoIndex=[];
	data.forEach(function(e,i) {
		if(gTermIDtoIndex.indexOf(e['termID'])<0){
			gTermIDtoIndex.push(parseInt(e['termID'],10));
		}
	});
	gTermIDtoIndex.sort(sortNumber);
	// 绘图
	// 设置画布：宽，高
	canvas.width=ccs.width;
	canvas.height=ccs.height;
	$('#canvasHOSdiv').css({width:ccs.width,height:ccs.height});
	plotBox(ctx);
	plotTerm(ctx,gTermIDtoIndex,dataHOS["termNum"]);
	plotCard(ctx,data,gTermIDtoIndex,colorSchemes);
	plotLine (canvas,ctx,data);

	//存储当前画布至离屏画布
		//由于页面中存在多个动态加载项，所以需要当所有加载完成后（绘图完成后）方可存储
	kkkk();
	function kkkk(){
	  if(gPlotFinish>=2){
	    var offscreenCanvas=document.getElementById('offscreenCanvasHOS');
		offscreenCanvas.width=canvas.width;
		offscreenCanvas.height=canvas.height;
		var offscreenCtx=offscreenCanvas.getContext('2d');
		offscreenCtx.drawImage(canvas,0,0,canvas.width,canvas.height);
	    clearTimeout(t);
	  }else{
	    var t=setTimeout(kkkk,100);
	  }
	}
}

function plotBox(ctx){
	// 绘制方框
	ctx.fillStyle = cc.bgColorOut;
	ctx.fillRect(0.5, 0.5, ccs.width, ccs.height);
	ctx.strokeStyle = cc.borderColor;
	ctx.strokeRect(cc.marginL+0.5, cc.marginT+0.5, ccs.width-cc.marginL-cc.marginR, ccs.height-cc.marginT-cc.marginB);
	ctx.fillStyle = cc.bgColorIn;
	ctx.fillRect(cc.marginL+0.5, cc.marginT+0.5, ccs.width-cc.marginL-cc.marginR, ccs.height-cc.marginT-cc.marginB);
}

function plotTerm(ctx,gTermIDtoIndex,n){
	// 绘制终端机
	ctx.strokeStyle=cc.borderColorTerm;
	ctx.fillStyle=cc.bgColorTerm;

	for (i=0;i<n;i++){
		ctx.strokeRect(ccs.axesOriginX+0.5+i*cc.termW+i*cc.termSpacing,ccs.axesOriginY+0.5,cc.termW,cc.termH);
	}

	// 绘制时间轴
	ctx.strokeStyle= cc.timelineStrokeStyle;
	ctx.font = cc.timelineFont;
	ctx.fillStyle= cc.timelineFillStyle;
	ctx.beginPath();
	for(i=10;i<=22;i++){
		ctx.moveTo(ccs.axesOriginX-cc.paddingL-0.5*cc.paddingL,ccs.axesOriginY+Math.round(cc.termH*(22-i)/12)+0.5);
		ctx.lineTo(ccs.axesOriginX-cc.paddingL+0.5*cc.paddingL,ccs.axesOriginY+Math.round(cc.termH*(22-i)/12)+0.5);
		ctx.fillText(i+':00', ccs.axesOriginX-cc.paddingL-0.5*cc.paddingL-35,ccs.axesOriginY+Math.round(cc.termH*(22-i)/12)+4+0.5);
	}
	ctx.closePath();
	ctx.stroke();

	// 绘制终端机图标
	var img = new Image();
	img.src = '../assets/term.jpg';
	img.onload = function(){
		gTermIDtoIndex.forEach( function(e, i) {
			ctx.drawImage(img, ccs.axesOriginX+0.5+(i-0.3)*cc.termW+i*cc.termSpacing, ccs.axesOriginY+cc.termH+15);
		});
		gPlotFinish+=1;
	}

	// 终端机编号
	ctx.font = cc.termFont;
	ctx.fillStyle=cc.termFillStyle;
	for (i=0;i<n;i++){
		ctx.fillText(gTermIDtoIndex[i], ccs.axesOriginX+0.5+i*cc.termW+i*cc.termSpacing, cc.marginT+cc.termH+cc.paddingT+cc.paddingB+70);
	}
}

function plotCard (ctx,data,gTermIDtoIndex,colorSchemes) {
	// 绘制每次登退过程的平均单拍
	// 获取画布容器的位置
	var cLeft=0;	//+parseInt($('#canvasHOSdiv').css('margin-left'))
	var cTop=0;

	// 循环每次登退 + 绘制登录矩形
	$('#canvasHOSdiv>div').remove();
	data.forEach( function(da, i) {
		// 绘制登录矩形
		var termN=da["termID"],
			time1=da["timeStart"]/cc.termHR,
			time2=da["timeEnd"]/cc.termHR,
			betAvg=parseInt(da["betAvg"]);
		var termNI=gTermIDtoIndex.indexOf(termN);
		ctx.fillStyle=colorSchemes[betAvg];
		ctx.strokeStyle='#cbd5d1';
		ctx.fillRect(ccs.axesOriginX+0.5+termNI*cc.termW+termNI*cc.termSpacing, ccs.axesOriginY+0.5+cc.termH-time2, cc.termW,time2-time1);
		ctx.strokeRect(ccs.axesOriginX+0.5+termNI*cc.termW+termNI*cc.termSpacing, ccs.axesOriginY+0.5+cc.termH-time2, cc.termW,time2-time1);

		//HTML提示层 + 鼠标单击
		$("#canvasHOSdiv").append(
			'<div class="hoverTips" style="width:'+
			(cc.termW-1)+
			'px;height:'+
			(time2-time1)+
			'px;left:'+
			(cc.marginL+cc.paddingL+0.5+termNI*cc.termW+termNI*cc.termSpacing+cLeft)+
			'px;top:'+
			(cc.marginT+cc.paddingT+0.5+cc.termH-time2+cTop)+
			'px;" onmouseover="tooltipMouseOver(this,'+i+','+gTermIDtoIndex.length+','+termNI+
			');" onmouseout="tooltipMouseOut();" onclick="heightlightSelection('+
			da['cardID']
			+');"></div>');
	});
}

function plotLine (canvas, ctx, data) {
	// 绘制跳转线
	var tally={};
	data.forEach( function(e, i) {
		if(e['cardID'] in tally){
			tally[e['cardID']].push({"termID":e['termID'],"timeStart":e['timeStart'],"timeEnd":e['timeEnd']});
		}else{
			tally[e['cardID']]=[{"termID":e['termID'],"timeStart":e['timeStart'],"timeEnd":e['timeEnd']}];
		}
	});
	for( key in tally){
		if(parseInt(key)>0 && tally[key].length>1){
			var tempArray=tally[key];
			tempArray.sort(sortNumber2);

			var n=tempArray.length;
			ctx.strokeStyle=cc.lineStrokeStyle;
			ctx.lineWidth=cc.lineWidth;
			ctx.lineCap=cc.lineCap;
			ctx.beginPath();
			for(i=0;i<n-1;i++){
				var e1=tempArray[i],
					e2=tempArray[i+1];
				var termNI1=gTermIDtoIndex.indexOf(e1['termID']),
					termNI2=gTermIDtoIndex.indexOf(e2['termID']),
					time1=(e1['timeStart']+e1['timeEnd'])/cc.termHR/2,
					time2=(e2['timeStart']+e2['timeEnd'])/cc.termHR/2;
				var x1=ccs.axesOriginX+0.5+(termNI1+0.5)*cc.termW+termNI1*cc.termSpacing,
					x2=ccs.axesOriginX+0.5+(termNI2+0.5)*cc.termW+termNI2*cc.termSpacing,
					y1=ccs.axesOriginY+0.5+cc.termH-time1,
					y2=ccs.axesOriginY+0.5+cc.termH-time2;

				ctx.moveTo(x1,y1);
				ctx.quadraticCurveTo(
					x1+(x2-x1)/2-0.1*(y2-y1),
					y1+(y2-y1)/2+0.1*(x2-x1),
					x2,
					y2);
			}
			ctx.stroke();
			ctx.closePath();

			//绘制跳转圆点
			ctx.fillStyle=cc.dotFillStyle;
			for(i=0;i<n;i++){
				var e=tempArray[i];
				var termNI=gTermIDtoIndex.indexOf(e['termID']),
					time=(e['timeStart']+e['timeEnd'])/cc.termHR/2;
				var x=ccs.axesOriginX+0.5+(termNI+0.5)*cc.termW+termNI*cc.termSpacing,
					y=ccs.axesOriginY+0.5+cc.termH-time;

				ctx.beginPath();
				ctx.arc(x, y, cc.dotR, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}

function sortNumber(a,b){
	//排序函数:plot
	return a - b;
}
function sortNumber2(a,b){
	//排序函数:plotLine
	return a['timeStart'] - b['timeStart'];
}

function tooltipMouseOver (e,i,termNum,termNI) {
	// 提示：鼠标移入
	$('#tooltipHOS').html('');
	var html='';
	html+='<p>卡号：<strong>'+gDataHOS['data'][i]['cardID']+'</strong></p>';
	html+='<p>登退次数：<strong>'+gDataHOS['data'][i]['loginTimes']+'</strong></p>';
	html+='<p>完成/保留/放弃局数：<strong>'+gDataHOS['data'][i]['completeRound']+'/'+gDataHOS['data'][i]['saveRound']+'/'+gDataHOS['data'][i]['giveupRound']+'</strong></p>';
	html+='<p>首关/末关：<strong>'+gDataHOS['data'][i]['firstLastBar']+'</strong></p>';
	html+='<p>游戏时长：<strong>'+gDataHOS['data'][i]['gameTime']+'</strong> ('+gDataHOS['data'][i]['timeStartRaw']+' ~ '+gDataHOS['data'][i]['timeEndRaw']+')</p>';
	html+='<br>';

	html+='<p>总投注本金：<strong>'+gDataHOS['data'][i]['costBalance']+'</strong></p>';
	html+='<p>总投注点数：<strong>'+gDataHOS['data'][i]['betPoints']+'</strong></p>';
	html+='<p>卡内余额（登/退）：<strong>'+gDataHOS['data'][i]['remainMoney']+'</strong></p>';
	html+='<p>卡内余点（登/退）：<strong>'+gDataHOS['data'][i]['remainPoints']+'</strong></p>';
	html+='<br>';

	html+='<p>123关平均投注点数：<strong>'+gDataHOS['data'][i]['betAvg']+'</strong></p>';
	html+='<p>第0关平均投注点数：<strong>'+gDataHOS['data'][i]['bar0BetAvg']+'</strong></p>';
	html+='<p>第1关平均投注点数：<strong>'+gDataHOS['data'][i]['bar1BetAvg']+'</strong></p>';
	html+='<p>第2关平均投注点数：<strong>'+gDataHOS['data'][i]['bar2BetAvg']+'</strong></p>';
	html+='<p>第3关平均投注点数：<strong>'+gDataHOS['data'][i]['bar3BetAvg']+'</strong></p>';
	html+='<p>第4关平均投注点数：<strong>'+gDataHOS['data'][i]['bar4BetAvg']+'</strong></p>';
	$('#tooltipHOS').append(html);
	$('#tooltipHOS').css('display','block');

	if(termNum>=20 && termNI/termNum>0.6){
		$('#tooltipHOS')
		.css('left',$(e).offset().left-cc.termW-parseInt($('#tooltipHOS').css('width')))
		.css('top',$(e).offset().top+parseInt($(e).css('height'))/2);
	}else{
		$('#tooltipHOS')
		.css('left',$(e).offset().left+cc.termW)
		.css('top',$(e).offset().top+parseInt($(e).css('height'))/2);
	}
}
function tooltipMouseOut () {
	// 提示：鼠标移出
	$('#tooltipHOS').css('display','none');
	var offscreenCanvas=document.getElementById('offscreenCanvasHOS');
	var canvas=document.getElementById("canvasHOS");
	var ctx=canvas.getContext("2d");
	ctx.drawImage(offscreenCanvas,0,0,canvas.width,canvas.height);
}

function heightlightSelection(cardID){
	//高亮当前选择卡当天的所有投注
	var da=gDataHOS['data'];
	var canvas=document.getElementById("canvasHOS");
	var ctx=canvas.getContext("2d");

    ctx.fillStyle=cc.coverFillStyle;
    ctx.fillRect(0,0,canvas.width, canvas.height);

	// 绘制登录矩形
	var tempArray=[];	//存储需要绘跳线的数据
	da.forEach( function(e, i) {
		if(e['cardID']==cardID){
			tempArray.push({"termID":e['termID'],"timeStart":e['timeStart'],"timeEnd":e['timeEnd']});
			var termN=e["termID"],
				time1=e["timeStart"]/cc.termHR,
				time2=e["timeEnd"]/cc.termHR,
				betAvg=parseInt(e["betAvg"]);
			var termNI=gTermIDtoIndex.indexOf(termN);
			ctx.fillStyle=gColorSchemes[betAvg];
			ctx.strokeStyle='#cbd5d1';
			ctx.fillRect(ccs.axesOriginX+0.5+termNI*cc.termW+termNI*cc.termSpacing, ccs.axesOriginY+0.5+cc.termH-time2, cc.termW,time2-time1);
			ctx.strokeRect(ccs.axesOriginX+0.5+termNI*cc.termW+termNI*cc.termSpacing, ccs.axesOriginY+0.5+cc.termH-time2, cc.termW,time2-time1);
		}
	});

	// 绘制跳线与圆点
	var n=tempArray.length;
	if(n>1){
		// 绘制跳线
		tempArray.sort(sortNumber2);
		ctx.strokeStyle=cc.heightlightStrokeStyle;
		ctx.lineWidth=cc.heightlightLineWidth;
		ctx.lineCap=cc.lineCap;
		ctx.beginPath();
		for(i=0;i<n-1;i++){
			var e1=tempArray[i],
				e2=tempArray[i+1];

			var termNI1=gTermIDtoIndex.indexOf(e1['termID']),
				termNI2=gTermIDtoIndex.indexOf(e2['termID']),
				time1=(e1['timeStart']+e1['timeEnd'])/cc.termHR/2,
				time2=(e2['timeStart']+e2['timeEnd'])/cc.termHR/2;

			var x1=ccs.axesOriginX+0.5+(termNI1+0.5)*cc.termW+termNI1*cc.termSpacing,
				x2=ccs.axesOriginX+0.5+(termNI2+0.5)*cc.termW+termNI2*cc.termSpacing,
				y1=ccs.axesOriginY+0.5+cc.termH-time1,
				y2=ccs.axesOriginY+0.5+cc.termH-time2;

			ctx.moveTo(x1,y1);
			ctx.quadraticCurveTo(
				x1+(x2-x1)/2-0.1*(y2-y1),
				y1+(y2-y1)/2+0.1*(x2-x1),
				x2,
				y2);
		}
		ctx.stroke();
		ctx.closePath();

		//绘制跳转圆点
		ctx.fillStyle=cc.heightlightDotFillStyle;
		for(i=0;i<n;i++){
			var e=tempArray[i];
			var termNI=gTermIDtoIndex.indexOf(e['termID']),
				time=(e['timeStart']+e['timeEnd'])/cc.termHR/2;
			var x=ccs.axesOriginX+0.5+(termNI+0.5)*cc.termW+termNI*cc.termSpacing,
				y=ccs.axesOriginY+0.5+cc.termH-time;

			ctx.beginPath();
			ctx.arc(x, y, cc.heightlightdotR, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}
}
