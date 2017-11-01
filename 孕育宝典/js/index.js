new IScroll("#home",{
	mouseWheel:true,
	scrollbars:true
});
new IScroll("#list",{
	mouseWheel:true,
	scrollbars:true
});
var Dates = null;
//ajax返回数据
$.ajax({
	url:'data/data.json',
	dataType:"json",
	success:function(data){
		Dates=data;
	}
})
function tran(dom){
	$(dom).css({//当点击首页时首页的href为#home,
		transition:'all .3s',
		transform:'translateX(0)'
	}).siblings().css({//显示首页内容元素,隐藏其他的兄弟元素
		transition:'all .3s',
		transform:'translateX(100%)'
	})
}
$(".container").on('click','a',function(e){
	e.preventDefault();
	var that = $(this).attr("href");
	//点击时将nav按钮的href属性中的字符取出在下面获取内容盒子元素,赋予样式移动
	tran(that);
	//下面是nav的背景色移动功能
	var idx = $(this).index();
	if( this.parentNode.nodeName=='NAV' ){
		$("#mark").css({
			transition:'all .3s',
			left:idx*25+"%"
		})
	}
	//首页效果
	resetHead($(this));
})
function resetHead(dom){//传进来的是点击的元素节点
	//改变header内容的
	var href = dom.attr('href'),
	returns = $("#return"),
	fav = $("#fav"),
	search = $("#search"),
	id=dom.attr("id");
	if(href=='#favorite'){//收藏
		$('header').find("h2").text("收藏");
		returns.show()
		returns.on("click",function(){
		$('header').find("h2").text("孕育宝典");
			tran($(".home"))
		})
		}else if(href=='#history'){//历史记录
		returns.show()
		$('header').find("h2").text("历史记录");
		returns.on("click",function(){
		$('header').find("h2").text("孕育宝典");
			tran($(".home"))
		})
		}else if(href=='#home'){//首页
		$('header').find("h2").text("孕育宝典");
		returns.hide()//显示返回按钮
		search.show()//显示搜索按钮
	}else if(href=='#list'){//首页>列表
		returns.show();
		returns.on("click",function(){
		$('header').find("h2").text("孕育宝典");
			tran($(".home"))
		})
		search.hide();
		$('header').find("h2").text(dom.attr("title"));
		let str = '';
		$.each(Dates[id].fenlei,function(idx,val){
			console.log(idx);
			str+=`
			<li>
			<a href='#list_cont' id='${id}_${idx}'>
			<img src="img/tu/${val.img}" alt="" />
			<h2>${val.title}</h2>
			</a>
			</li>`
		})
		$("#list_iscroll").append(str);
	}else if(href=='#list_cont'){//首页>列表>内容文本
		returns.show()//显示返回按钮
		returns.on("click",function(){
			$('header').find("h2").text("孕前准备");
			tran($(".list"))
			returns.on("click",function(){
			$('header').find("h2").text("孕育宝典");
			tran($(".home"))
		})
		})
		var str =  dom.attr("id");
		var arr = str.split("_");//分出数组,1是名字,2是下标
		let cont=Dates[arr[0]].fenlei[arr[1]].content;
		let tit=Dates[arr[0]].fenlei[arr[1]].title;
		$(".list_cc").html("<div><h2>"+tit+"</h2><p>"+cont+"</p></a></div>");

	}
}


