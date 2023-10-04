import React, { Component } from 'react';
import css from './imageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.children}
      </ul>
    );
  }
}
