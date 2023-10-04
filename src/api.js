import axios from 'axios';

export const fetchPixabay = async () => {
  const { data } = await axios.get(
    'https://pixabay.com/api/?q=cat&page=1&key=39085998-de98ea17e1a185b93e997485c&image_type=photo&orientation=horizontal&per_page=12'
  );
  return data;
};
