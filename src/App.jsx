import css from './app.module.css';
import { Component } from 'react';
import { fetchPixabay } from 'api';
import SearchBar from 'components/Searchbar/searchBar';

export class App extends Component {
  state = {
    api: null,
    isLoading: false,
    error: null,
  };

  fetchApi = async () => {
    try {
      const api = await fetchPixabay();
      console.log(api);
    } catch (error) {}
  };

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    return (
      <div className={css.App}>
        <SearchBar />
      </div>
    );
  }
}
