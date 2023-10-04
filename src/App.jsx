import { Component } from 'react';
import { fetchImages } from 'Service/api';
import Searchbar from 'components/Searchbar/searchBar';
import ImageGalleryItem from 'components/ImageGalleryItem/imageGalleryItem';
import ImageGallery from 'components/ImageGallery/imageGallery';
import Button from 'components/Button/button';
import Modal from 'components/Modal/modal';
import { RotatingLines } from 'react-loader-spinner';


export class App extends Component {
  state = {
    query: '',
    images: [],
    selectedImage: null,
    page: 1,
    isLoading: false,
  };

  handleSearch = async query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isLoading: true,
    });

    try {
      const data = await fetchImages(query, 1);
      this.setState({ images: data.hits });
    } catch (error) {
      console.error('Помилка пошуку зображень:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  

  // Функція для завантаження додаткових зображень
  loadMoreImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const data = await fetchImages(query, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.error('Помилка пошуку більше зображень:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // Функція для відкриття модального вікна з обраним зображенням
  openModal = selectedImage => {
    this.setState({ selectedImage });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, selectedImage, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.id}
              onClick={() => this.openModal(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading ? ( 
          <RotatingLines/>
        ) : (
          images.length > 0 && <Button onClick={this.loadMoreImages} />
        )}
        {selectedImage && (
          <Modal
            src={selectedImage}
            alt="Selected Image"
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
