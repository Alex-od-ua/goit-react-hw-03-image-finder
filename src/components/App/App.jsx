import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import { nanoid } from 'nanoid';

import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/Searchbar';

// import css from './styles.css';

// import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    showModal: false,
    loading: false,
  };

  handelFormSubmit = inputValue => {
    console.log(inputValue);
    this.setState({ search: inputValue });
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
        <ToastContainer />
      </div>
    );
  }
}
