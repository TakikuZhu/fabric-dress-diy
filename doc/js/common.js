window.onload=function(){
    //添加canvas
    let cvs=document.createElement("canvas");
    cvs.id="cvs";
    document.body.prepend(cvs);
    //设置canvas全屏
    cvs.width = document.body.clientWidth;
    cvs.height = document.body.clientHeight;
    console.info("canvas全屏,宽："+cvs.width+",高："+cvs.height)
    fabric_cvs=new fabric.Canvas('cvs');
    new fabric.Canvas('test');
    console.info("fabric_cvs初始化完成")
    
    document.querySelector(".open-close").onclick=function(e){
        if(tip.classList.contains("close")){
            tip.classList.remove("close")
        }else{
            tip.classList.add("close")
        }
    }
    //尝试开启Webgl滤镜
    // tryStartWebglFilterBackend()
    init()
}

