import { useState, useCallback } from 'react';
import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';

import { GetImageType } from '../../helper/common';
import { apiDomain } from '../../apis/fetch';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result);
    reader.onerror = (error) => reject(error);
});


const ImageUploader = ({imgArr, setImgArr, namespace, maxImgCount}) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const customRequest = useCallback(async ({ file, onSuccess, onError }) => {

    try {
      const typeName = GetImageType(file.type)
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 data

        // Use the fetch API to send the base64-encoded data to the server
        const response = await fetch(`${apiDomain}/p/c/images/${namespace}?type=${typeName}`, {
          method: 'POST',
          headers: {
            'Content-Type': `image/${typeName}`,
          },
          body: base64Data,
        });

        if (response.ok) {
          onSuccess();
          const resp = await response.json()
          const imgId = resp?.data?.imageName || ""

          setImgArr( (preImgs) => [...preImgs, {backendId: imgId, uid: file.uid}])

          message.success(`${file.name}, image uploaded successfully`);
        } else {
          // If the request failed, handle the error
          throw new Error('Upload failed');
        }
      };
    } catch (error) {
      // Display an error message
      onError(error);
    }
  }, [])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const onImageRemove = (file) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    const newImgArr = imgArr.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    setImgArr(newImgArr)
  }

  return (
    <>
        <ImgCrop 
            rotationSlider
            modalOk="Upload"
            quality={0.9}
        >
        <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={handlePreview}
            name='image'
            customRequest={customRequest}
            onRemove={onImageRemove}
        >
            {fileList.length < maxImgCount && <span style={{ color: "white" }}> + Upload</span>}
        </Upload>
        </ImgCrop>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="uploaded-image"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ImageUploader;
