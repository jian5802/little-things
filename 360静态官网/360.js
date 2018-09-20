//顶部隐藏盒子功能
let hid = $('.hid');
let navg = $('.navigation');
let hd = $('.header');
let N = 0;
navg.bind("mouseover", function () {
    hid.css("z-index", 3);
    hid.animate({
        height: '450px'
    }, 200);
    N = 1;
});
navg.bind("mouseout", function () {
    N = 0;
});
hid.bind("mouseout", function () {
    if (N == 0) {
        hid.animate({
            height: '0px'
        }, 200);
        hid.css("z-index", 3);
    }
});

hd.on("mouseover", function () {
    hid.animate({
        height: '0px'
    }, 200);
    hid.css("z-index", 3);
});

//360商城小轮播图   //如果需要过渡效果则保留3个li就ok,这里就不写了
let imgs = $('.imgs');
let left_move = $('.left_move');
let right_move = $('.right_move');
let img_ul = $('.img_ul');



//优化轮播过度
let arr = ['https://p2.ssl.qhimg.com/t0165265ab5933b8a02.jpg', 'https://p.ssl.qhimg.com/t01b654125d470ccedd.jpg', 'https://p.ssl.qhimg.com/t017fd78bd91702176e.jpg', 'https://p.ssl.qhimg.com/t01dac7a500c67f92f9.jpg'];
let i = 0;


//小圆点样式
let points = $('.point_li');

function ponits_css() {
    points.css('backgroundColor', function (index, value) {
        if (index == i) {
            return '#23ac38';
        } else {
            return 'rgba(126, 124, 124, 0.5)';
        }
    });
}
ponits_css();
//绑定移动事件
left_move.bind('click', fLeft);

right_move.bind('click', fRight);

function fLeft() {
    //改进后的方法
    i--;
    if (i < 0) {
        i = 3;
    }
    ponits_css();
    let newLi = $('<li><img src=' + arr[i] + '> </li>');
    img_ul.prepend(newLi);
    img_ul.children().eq(1).remove();


    //加载全部图片后，不添加过渡效果，比较浪费资源

    // img_ul.css('left',function(){
    //     let distance = $(this).css('left');
    //     distance = parseInt(distance);
    //     if($(this).css('left')=='0px'){
    //         $(this).css('left','-1815px');
    //     }
    //     else{
    //         $(this).css('left',distance+605+'px');
    //     }
    // });
}

function fRight() {
    //改进后的方法
    i++;
    if (i > 3) {
        i = 0;
    }
    ponits_css();
    let newLi = $('<li><img src=' + arr[i] + '> </li>');
    img_ul.append(newLi);
    img_ul.children().eq(0).remove();


    //加载全部图片后，不添加过渡效果，比较浪费资源

    // img_ul.css('left',function(){
    //     let distance = $(this).css('left');
    //     distance = parseInt(distance);
    //     if($(this).css('left')=='-1815px'){
    //         $(this).css('left','0px');
    //     }
    //     else{
    //         $(this).css('left',distance-605+'px');
    //     }
    // });
}



// //自动轮播
let time_two = setInterval(fRight, 3000);

//暂定轮播  绑定鼠标移入事件
imgs.bind('mouseenter', function () {
    left_move.css({
        'display': 'block',
        'backgroundColor': 'rgba(100, 98, 98, 0.2)'
    });
    right_move.css({
        'display': 'block',
        'backgroundColor': 'rgba(100, 98, 98, 0.2)'
    });
    clearInterval(time_two);
});

//移除消除左右按钮
imgs.bind('mouseleave', function () {
    left_move.css({
        'display': 'none'
    });
    right_move.css({
        'display': 'none'
    });
    time_two = setInterval(fRight, 3000);
})

//移入移除左右按钮
left_move.bind('mouseenter', function (e) {
    left_move.css({
        'backgroundColor': 'rgba(100, 98, 98, 0.664)'
    });
})
left_move.bind('mouseleave', function (e) {
    left_move.css({
        'backgroundColor': 'rgba(100, 98, 98, 0.2)'
    });
})


right_move.bind('mouseenter', function () {
    right_move.css({
        'backgroundColor': 'rgba(100, 98, 98, 0.664)'
    });
})
right_move.bind('mouseleave', function () {
    right_move.css({
        'backgroundColor': 'rgba(100, 98, 98, 0.2)'
    });
})


//绑定小圆点事件
points.bind('mouseenter',function(){
    console.log($(this).attr('data-num'));
    i=parseInt($(this).attr('data-num')); 
    i++;
    fLeft();

})