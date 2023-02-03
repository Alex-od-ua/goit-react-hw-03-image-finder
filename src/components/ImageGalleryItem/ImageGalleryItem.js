import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  tags,
  webformatURL,
  showPicture,
}) => {
  return (
    <li
      onClick={() => showPicture({ alt: tags, src: webformatURL })}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItem__image}
        src={largeImageURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  showPicture: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
