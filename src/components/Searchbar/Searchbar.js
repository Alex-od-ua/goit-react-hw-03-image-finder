import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
// import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleSearchChange = event => {
    this.setState({ search: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.search.trim() === '') {
      alert('Erorrrrre');

      return;
    }
    this.props.onSubmit(this.state.search);

    this.setState({ search: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <ImSearch />
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleSearchChange}
            className="input"
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
