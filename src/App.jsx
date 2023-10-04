import { Component } from 'react';
import { fetchImages } from 'Service/api';
import { RotatingLines } from 'react-loader-spinner';
import Searchbar from 'components/Searchbar/searchBar';
import ImageGalleryItem from 'components/ImageGalleryItem/imageGalleryItem';
import ImageGallery from 'components/ImageGallery/imageGallery';
import Button from 'components/Button/button';
import Modal from 'components/Modal/modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    selectedImage: null,
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ isLoading: true });

      try {
        const data = await fetchImages(query, page);
        this.setState(prevState => ({
          images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
        }));
      } catch (error) {
        console.error('Error requesting images:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
          <RotatingLines />
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
