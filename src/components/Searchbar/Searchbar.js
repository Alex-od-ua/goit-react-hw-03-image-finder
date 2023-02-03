import { Component } from 'react';
import PropTypes from 'prop-types';

import { FcSearch } from 'react-icons/fc';

import css from './SearchBar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit({ ...this.state });
    // this.reset();
  };

  // reset() {
  //   this.setState({
  //     search: '',
  //   });
  // }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <FcSearch />
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            name="search"
            type="text"
            value={search}
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
