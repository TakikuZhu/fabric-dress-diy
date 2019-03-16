function loadImgOnChange(fileInput,fileNameEle,fabric_cvs,positon){
    if(fileInput.files[0]){
        let file=fileInput.files[0];
        fileNameEle.value=file.name;
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            let result=e.target.result;
            fabric.Image.fromURL(result, function(img) {
                let oImg;
                if(positon&&positon.left&&positon.top){
                }else{
                    positon={};
                    positon.left=(fabric_cvs.width-img.width)/2;
                    positon.top=(fabric_cvs.height-img.height)/2;
                   
                }
                oImg = img.set(positon);
                fabric_cvs.add(oImg);
            });
        }
    }else{
        fileNameEle.value="";
    }
}