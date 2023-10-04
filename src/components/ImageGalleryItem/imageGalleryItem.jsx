import React from 'react';
import css from './imageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, onClick, largeImageURL }) {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.image}
        onClick={handleClick}
      />
    </li>
  );
}
