import React, { useState } from 'react';

const ImageGenerator = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');
  
    const handleGenerate = async () => {
      const apiUrl = 'http://localhost:3001/generate-image';
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate image');
        }
  
        const data = await response.json();
        const imageUrl = data.imageUrl;
  
        // Pass the generated image URL to the parent component
        onGenerate(imageUrl);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Image</button>
    </div>
  );
};

export default ImageGenerator;
