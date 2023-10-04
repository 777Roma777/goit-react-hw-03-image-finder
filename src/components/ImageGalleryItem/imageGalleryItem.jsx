import React, { Component } from 'react';
import css from './imageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeImageURL);
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li className={css.galleryItem}>
        <img
          src={src}
          alt={alt}
          className={css.image}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}
