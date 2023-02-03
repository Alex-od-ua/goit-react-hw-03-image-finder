import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { nanoid } from 'nanoid';

import { fetchImages } from 'components/services/api';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/Searchbar';

// import css from './styles.css';

// import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    showModal: false,
    loading: false,
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevstate) {
    const prevSearchValue = prevProps.search;
    const nextSearchValue = this.state.search;

    if (prevSearchValue !== nextSearchValue) {
      this.searchImages();
    }
  }

  async searchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const searchValue = search.trim().toLowerCase();
      const data = await fetchImages(searchValue, page);
      if (data.hits.length === 0) {
        alert(`Sorry! We didn't find anything, change your request!`);
        return;
      }
      this.setState({
        images: data.hits,
        status: 'resolved',
        totalHits: data.totalHits,
      });
      return;
    } catch (error) {
      this.setState({ status: 'rejected', error: error.message, images: null });
      alert('Opps! Something went wrong!');
    } finally {
      this.setState({ loading: false });
    }
  }

  handelFormSubmit = inputValue => {
    console.log(inputValue);

    if (inputValue === this.state.search) {
      alert('This is the same query!');
      return;
    }

    this.setState({ search: inputValue, images: [], page: 1 });
    // console.log(this.state.inputValue);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleModal}>
          open
        </button>
        {this.state.showModal && <Modal onClose={this.toggleModal} />}
        <SearchBar onSubmit={this.handelFormSubmit} />
        {/* <ToastContainer /> */}
      </div>
    );
  }
}
