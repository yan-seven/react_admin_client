import React, { useState } from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

export default function UploadImg(){
  const [fileList, setFileList] = useState([
  ]);

  // getImgs=()=>{
  //   const imgs=this.state.fileList.map(file=>file.name)
  //   console.log(imgs)
  //   return imgs
  // }

  const onChange = ({ fileList: newFileList }) => {
    const file=newFileList[newFileList.length-1]||{}
    if(file.status==='done'){
      message.success('上传图片成功')
      const result=file.response.data
      file.name=result.name
      file.url=result.url
    }
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="/manage/img/upload"//上传图片的接口地址
        listType="picture-card"//卡片样式
        accept={"image/*"}//只接收图片格式
        name='image'//请求参数名
        fileList={fileList}//所有已上传图片文件对象的数组
        onChange={onChange}
        onPreview={onPreview}//显示大图时触发
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};