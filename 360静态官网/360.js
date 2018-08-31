let hid = $('.hid');
let navg = $('.navigation');
let hd = $('.header');
let N=0;
navg.bind("mouseover",function(){
    hid.css("z-index",3);
    hid.animate({height:'450px'},200);
    N=1;
});
navg.bind("mouseout",function(){
    N=0;
});
hid.bind("mouseout",function(){
    if(N==0){
        hid.animate({height:'0px'},200);
        hid.css("z-index",3);
    }
});

hd.on("mouseover",function(){
    hid.animate({height:'0px'},200);
        hid.css("z-index",3);
});