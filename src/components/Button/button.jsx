import React, { Component } from 'react';
import css from './button.module.css';

export default class Button extends Component {
  render() {
    const { onClick, disabled } = this.props;
    return (
      <div className={css['button-container']}>
        <button
          type="button"
          className={css.button}
          onClick={onClick}
          disabled={disabled}
        >
          <span className={css['button-label']}>Load more</span>
        </button>
      </div>
    );
  }
}
