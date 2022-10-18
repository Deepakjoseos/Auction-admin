import { useState, useEffect } from 'react';
import ImagesField from './ImagesField';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import auctionInventoryService from 'services/auctionInventory';


const UploadImage = ({ inventoryId }) => {
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchImages = async () => {
    const data = await auctionInventoryService.getInventoryImages(inventoryId);
    if (data) {
      const mutatedData = [];
      Object.keys(data).forEach((key) => {
        data[key].forEach(async (image, index) => {
          mutatedData.push({
            uid: key + index,
            name: 'image.png',
            status: 'done',
            url: image
          });
        });
      });
      setImages(mutatedData);
      // console.log(`images`, mutatedData);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onSubmit = async () => {
    setSubmitLoading(true);
    const formData = new FormData();
    images.forEach((image) => {
      if (image.originFileObj) {
        formData.append('files', image.originFileObj);
      }
    });

    formData.append('type', imageType);

    const uploaded = await auctionInventoryService.updateAuctionInventoryImages(
      inventoryId,
      formData
    );
    if (uploaded) {
      message.success(`Uploaded Auction Inventory Image.`);
      history.goBack();
      setSubmitLoading(false);
    }
  };

  return (
    <ImagesField
      setImages={setImages}
      images={images}
      setImageType={setImageType}
      onSubmit={onSubmit}
    />
  );
};

export default UploadImage;
