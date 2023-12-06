import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Generated artwork" />}
    </div>
  );
};

export default ImageDisplay;
