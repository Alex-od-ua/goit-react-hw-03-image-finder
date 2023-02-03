import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
