import React, { useState } from 'react';
import ImageGenerator from './components/ImageGenerator';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = (imageUrl) => {
    setGeneratedImage(imageUrl);
  };

  return (
    <div>
      <h1>DALL·E 2 Image Generator</h1>
      <ImageGenerator onGenerate={handleGenerate} />
      <ImageDisplay imageUrl={generatedImage} />
    </div>
  );
}

export default App;
