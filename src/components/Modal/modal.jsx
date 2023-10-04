import React, { Component } from 'react';
import css from './modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt, onClose } = this.props;

    return (
      <div className={css.overlay} onClick={onClose}>
       
          <img src={src} alt={alt} className={css.image}/>
        
      </div>
    );
  }
}
