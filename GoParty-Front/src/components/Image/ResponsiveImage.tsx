import React from 'react';

interface ResponsiveImageProps {
  imageUrl: string;
  altText: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ imageUrl, altText }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-1/3 hidden md:block">
      <img src={imageUrl} alt={altText} className="object-cover h-full w-full" />
    </div>
  );
};

export default ResponsiveImage;
