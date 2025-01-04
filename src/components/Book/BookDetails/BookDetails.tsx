import { useLocation, useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { Book } from '../../../model/Book';
import { getBooksByAuthor } from '../../../services/LocalBooksAPI';
import { useState } from 'react';
import BookList from '../BookList/BookListComponent';
import Header from '../../Header/Header';
import Footer from '../../Footer/Copyright';
import { Box, Button, Typography, CardMedia, CardContent, Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddBookReferenceModal from '../../CurriculumManagement/AddBookReferenceModal';

const BookDetails: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showBooks, setShowBooks] = useState(false);
  const [booksByAuthor, setBooksByAuthor] = useState<Book[] | null>(null);
  const [isAddBookRefModalOpen, setIsAddBookRefModalOpen] = useState(false);
  // const [urlPath, setURLPath] = useState("");

  const book: Book = state?.book;
  const handleAddBookRefModalOpen = () => setIsAddBookRefModalOpen(true);
  const handleAddBookRefModalClose = () => setIsAddBookRefModalOpen(false);

  const handleToggleBooksByAuthor = async () => {
    setShowBooks((prev) => !prev);
    if (!showBooks && booksByAuthor === null) {
      try {
        const books = await getBooksByAuthor(book.authors[0]);
        setBooksByAuthor(books);
      } catch (error) {
        console.error('Failed to fetch books by the author:', error);
      }
    }
  };
  const handleAddCopies = () => navigate('/admin/book-form', { state: { book } });

  const handleEditTitle = () => {
    const newTitle = prompt('Edit the title of the book:', book.title);
    if (newTitle) {
      alert(`Title updated to: ${newTitle}`);
      // Add logic to update title
    }
  };

  const handleReserve = () => alert(`Book "${book.title}" reserved.`);
  const handleBorrow = () => alert(`Book "${book.title}" borrowed.`);
  const handleAddToWishlist = () => alert(`Book "${book.title}" added to your wishlist.`);

  const handleBookClick = (book: Book) =>
    navigate(`/user/book/${book.id}`, { state: { book } });

  const handleGoBack = () => {
    const path = UserService.isAdmin()
      ? '/admin/catalog/management/search-title'
      : '/user/browse';
    navigate(path, { state: { searchState: state?.searchState } });
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header buttons={<Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleGoBack}>Go Back</Button>} />
        <Box sx={{ flexGrow: 1, padding: 3, margin: '20px auto', maxWidth: '1000px', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', gap: 3, marginBottom: 3 }}>
            <CardMedia
              component="img"
              image={book.thumbnail}
              alt={book.title}
              sx={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 2, boxShadow: 1 }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ marginBottom: 2 }}>{book.title}</Typography>
              <Typography variant="body1"><strong>Authors:</strong> {book.authors.join(', ')}</Typography>
              <Typography variant="body1"><strong>Publisher:</strong> {book.publisher || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Published Date:</strong> {book.publishedDate || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Page Count:</strong> {book.pageCount || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Categories:</strong> {book.categories || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Language:</strong> {book.language || 'N/A'}</Typography>
              <Typography variant="body1"><strong>ISBN-10:</strong> {book.isbn10 || 'N/A'}</Typography>
              <Typography variant="body1"><strong>ISBN-13:</strong> {book.isbn13 || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Description:</strong> {book.description || 'No description available.'}</Typography>
              <Typography variant="body1"><strong>Item Type:</strong> {book.printType || 'N/A'}</Typography>
            </CardContent>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginY: 3 }} onClick={handleToggleBooksByAuthor}>
            {showBooks ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <Typography sx={{ marginLeft: 1 }}>{showBooks ? 'Hide Books by This Author' : 'More on This Author'}</Typography>
          </Box>

          <Collapse in={showBooks}>
            {booksByAuthor && <BookList books={booksByAuthor} onBookClick={handleBookClick} />}
          </Collapse>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 3 }}>
            {UserService.isAdmin() && (
              <>
                <Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleAddCopies}>Add Copies</Button>
                <Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleEditTitle}>Edit Title</Button>
                <Button
                  sx={{ backgroundColor: '#ea4040', color: 'white' }}
                  onClick={handleAddBookRefModalOpen}
                >
                  Add As Book Reference
                </Button>
              </>
            )}
            <Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleReserve}>Reserve item</Button>
            <Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleBorrow}>Borrow item</Button>
            <Button sx={{ backgroundColor: '#ea4040', color: 'white' }} onClick={handleAddToWishlist}>Add to Wishlist</Button>
          </Box>
        </Box>
        <Footer />
      </Box>

      <AddBookReferenceModal
        open={isAddBookRefModalOpen}
        handleClose={handleAddBookRefModalClose}
        // onBookRefAdd={handleBookReferenceAdded}
        // bookId={book.id}
        bookName={book.title}
        urlPath={`/user/book/${book.id}`}
      />

    </>

  );
};

export default BookDetails;