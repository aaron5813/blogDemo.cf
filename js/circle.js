let circleInner = `
<div class="container">
<div class="cube cube--1">
    <div class="side side--back">
        <div class="side__inner"></div>
    </div>
    <div class="side side--left">
        <div class="side__inner"></div>
    </div>
    <div class="side side--right">
        <div class="side__inner"></div>
    </div>
    <div class="side side--top">
        <div class="side__inner"></div>
    </div>
    <div class="side side--bottom">
        <div class="side__inner"></div>
    </div>
    <div class="side side--front">
        <div class="side__inner"></div>
    </div>
</div>

<div class="cube cube--2">
    <div class="side side--back">
        <div class="side__inner"></div>
    </div>
    <div class="side side--left">
        <div class="side__inner"></div>
    </div>
    <div class="side side--right">
        <div class="side__inner"></div>
    </div>
    <div class="side side--top">
        <div class="side__inner"></div>
    </div>
    <div class="side side--bottom">
        <div class="side__inner"></div>
    </div>
    <div class="side side--front">
        <div class="side__inner"></div>
    </div>
</div>

<div class="cube cube--3">
    <div class="side side--back">
        <div class="side__inner"></div>
    </div>
    <div class="side side--left">
        <div class="side__inner"></div>
    </div>
    <div class="side side--right">
        <div class="side__inner"></div>
    </div>
    <div class="side side--top">
        <div class="side__inner"></div>
    </div>
    <div class="side side--bottom">
        <div class="side__inner"></div>
    </div>
    <div class="side side--front">
        <div class="side__inner"></div>
    </div>
</div>
</div>
`

$(document).ready(()=> {

    let contentEle = $('.circle-content');
    let progressEle = $('.progress-bar');
    let proValue = 0;
    let timeoutId = null;

    
    //展示开场动画
    contentEle.append(circleInner);

    // 跳过读条
    contentEle.on('click',function () { 

        contentEle.off('click');
        contentEle.fadeToggle(900);
        clearInterval(timeoutId);

    });  
    

    //初始化进度条
    timeoutId = setInterval(() => {

        if(proValue === 100) {

            clearInterval(timeoutId);
            
            setTimeout(function () { 
                contentEle.fadeToggle(900);
            },500);

        }else if(proValue === 50){

            proValue += 3;

            progressEle.css('width',proValue + '%');
            
            progressEle.text(proValue + "%");

        }else{

            proValue += 1;

            progressEle.css('width',proValue + '%');
            
            progressEle.text(proValue + "%");
        }
        
    },50);

});