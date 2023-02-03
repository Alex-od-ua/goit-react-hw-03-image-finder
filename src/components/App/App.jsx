import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { searchImages } from 'services/api';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    pictures: [],
    loading: false,
    error: null,
    currentImage: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    // const prevSearchValue = prevProps.search;
    // const nextSearchValue = this.state.search;
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPictures();
    }
  }

  async fetchPictures() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;

      const hits = await searchImages(search, page);

      if (hits.length === 0) {
        toast.error('Sorry, there are no available images.');
      }

      this.setState(({ pictures }) => ({
        pictures: [...pictures, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message, pictures: [] });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchPictures = ({ search }) => {
    if (search === this.state.search) {
      toast.error('This is the same query!');
      return;
    }

    this.setState({ search, pictures: [], page: 1 });
  };

  showPicture = img => {
    this.setState({
      currentImage: img,
    });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { loading, error, pictures, currentImage } = this.state;
    const { searchPictures, loadMore, showPicture, closeModal } = this;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchPictures} />

        {error && <p>{error}</p>}
        {loading && <Loader />}
        {ImageGallery && (
          <ImageGallery pictures={pictures} showPicture={showPicture} />
        )}
        {Boolean(pictures.length) && !loading && <Button loadMore={loadMore} />}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={closeModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
