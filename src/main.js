/**
 * 文件载入监听
 * @param {*} fileInput 文件载入框
 * @param {*} fileNameEle 文件名显示框
 * @param {*} fabric_cvs fabric画板
 * @param {*} positon 图片在画板中的位置
 */
function loadImgOnChange(fileInput,fileNameEle,fabric_cvs,positon){
    if(fileInput.files[0]){
        let file=fileInput.files[0];
        fileNameEle.value=file.name;
        loadImgByBlob(file,fabric_cvs,positon);
    }else{
        fileNameEle.value="";
    }
}

/**
 * 通过Blob加载图片
 * @param {*} imgBlob 
 * @param {*} fabric_cvs 
 * @param {*} positon 
 */
function loadImgByBlob(imgBlob,fabric_cvs,positon){
    let reader=new FileReader();
    reader.readAsDataURL(imgBlob);
    reader.onload=function(e){
        let imgUrl=e.target.result;
        fabric.Image.fromURL(imgUrl, function(img) {
            let oImg;
            if(positon&&positon.left&&positon.top){
            }else{
                positon={};
                positon.left=(fabric_cvs.width-img.width)/2;
                positon.top=(fabric_cvs.height-img.height)/2;
                
            }
            oImg = img.set(positon);
            fabric_cvs.add(oImg);
            //默认选中
            fabric_cvs.setActiveObject(oImg)
        });
    }
}

/**
 * 通过url加载图片
 * @param {*} imgUrl 
 * @param {*} fabric_cvs 
 * @param {*} positon 
 */
function loadImgByUrl(imgUrl,fabric_cvs,positon){
    fabric.Image.fromURL(imgUrl, function(img) {
        let oImg;
        if(positon&&positon.left&&positon.top){
        }else{
            positon={};
            positon.left=(fabric_cvs.width-img.width)/2;
            positon.top=(fabric_cvs.height-img.height)/2;
            
        }
        oImg = img.set(positon);
        fabric_cvs.add(oImg);
        //默认选中
        fabric_cvs.setActiveObject(oImg)
    });
}

/**
 * 对激活对象增加滤镜
 * @param {*} filters 
 */
function filterForActiveObject(filters){  

    var obj = fabric_cvs.getActiveObject();
    if(!obj){
        alert("滤镜失败，没有激活对象")
        return
    }
    obj.filters=[];
    for(let filterObj of filters){
        let filter;
        if(filterObj.name==="Sharpen"){
            filter=new fabric.Image.filters.Convolute({
                matrix: [  0, -1,  0,
                          -1,  5, -1,
                           0, -1,  0 ]
              });
        }else if(filterObj.name==="Emboss"){
            filter=new fabric.Image.filters.Convolute({
                matrix: [ 1,   1,  1,
                          1, 0.7, -1,
                         -1,  -1, -1 ]
              });
        }else{
            filter=new fabric.Image.filters[filterObj.name]();     
            for(let key of Object.keys(filterObj)){
                if(filterObj[key]){
                    filter[key]=filterObj[key];
                }
            }
        }        
        obj.filters.push(filter)
    }
    obj.applyFilters();
    fabric_cvs.renderAll();
}

/**
 * 尝试开启Webgl滤镜
 */
(function tryStartWebglFilterBackend(){
    var webglBackend;
    try {
        webglBackend = new fabric.WebglFilterBackend();
    } catch (e) {
        console.log(e)
    }
    fabric.filterBackend = fabric.initFilterBackend();
    if(webglBackend){
        fabric.filterBackend = webglBackend;
    }   
})()