import React, { useState } from "react";
import { Image } from "react-bootstrap";

export const ImageWithPlaceholder = ({
  src,
  alt,
  placeholderImg,
}: {
  src: string;
  alt: string;
  placeholderImg: string;
}) => {
  const [imgSrc, setImgSrc] = useState(
    src.match(/\.jpg$|\.jpeg$|\.png$|\.gif$/i) ? src : placeholderImg
  );

  const handleError = () => {
    setImgSrc(placeholderImg); // Set the source to the placeholder on error
  };

  return (
    <Image
      style={{
        width: "200px",
        aspectRatio: "2/3",
        objectFit: "cover",
        borderRadius: "0.375rem",
      }}
      src={imgSrc}
      alt={alt}
      onError={handleError} // Set the error handler
    />
  );
};
