// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api',

//   params: {
//     per_page: 12,
//     key: '31939981-403d02160b0621624e665fa7a',
//     image_type: 'photo',
//     orientation: 'horizontal',
//   },
// });

// export const searchImages = async (q, page = 1) => {
//   const { data } = await instance.get('/?&', {
//     params: {
//       q,
//       page,
//     },
//   });
//   return data.hits;
// };

import axios from 'axios';

export const fetchImages = async (searchValue, page) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      q: searchValue,
      page,
      key: '31939981-403d02160b0621624e665fa7a',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return data;
};
