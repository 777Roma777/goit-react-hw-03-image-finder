import { Component } from 'react';
import css from './searchbar.module.css';

export default class SearchBar extends Component {



  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
