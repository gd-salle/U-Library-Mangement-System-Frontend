/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Book } from "../../model/Book";
import BookList from "../../components/Book/BookList/BookListComponent";
import Header from "../../components/Header/Header";
import MenuIcon from "@mui/icons-material/Menu";
import Line from "../../components/Line/Line";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar/Searchbar";
import { searchGoogleBooks } from "../../services/Cataloging/GoogleBooksApi";
import { getBooksByAdvancedSearch } from "../../services/Cataloging/LocalBooksAPI";

const BookSearch: React.FC = () => {
    const location = useLocation();
    const state = location.state as { query: any; books: Book[]; source: string };

    const [query, setQuery] = useState(state?.query || {});
    const [source, setSource] = useState(state?.source || 'Main Library');
    const [books, setBooks] = useState<Book[]>(state?.books || []); // Store fetched books
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const handleSideBarClick = () => setSidebarOpen(!isSidebarOpen);
    const handleSidebarClose = () => setSidebarOpen(false);

    // Function to handle the book click
    const handleBookClick = (book: Book) => {
        navigate(`/user/book/${book.id}`, {
            state: { book, searchState: { query, books, source } },
        });
    };

    const handleSearch = (newBooks: Book[], newSource: string, newQuery: string | object) => {
        setBooks(newBooks);
        setSource(newSource);
        setQuery(newQuery);
    };
    const fetchBooks = async (searchQuery: any, searchSource: string) => {
        setLoading(true);
        try {
            let result: Book[] = [];
            if (searchSource === 'Google Books') {
                // Fetch books from Google Books
                result = await searchGoogleBooks(searchQuery);
            } else if (searchSource === 'Main Library' && typeof searchQuery === 'object') {
                // Handle advanced search
                result = await getBooksByAdvancedSearch(searchQuery);
            }
            setBooks(result);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchBooks(query, source);
        }
    }, [query, source]);

    const generateSearchMessage = () => {
        const criteria =
            typeof query === 'string'
                ? query
                : query.criteria?.map((criterion: any) => `${criterion.idx}: ${criterion.searchTerm}`).join(' AND ');

        if (books.length === 0) {
            return `No results match your search for ${criteria || 'your query'} in ${source}.`;
        } else {
            return `${books.length} result(s) found for '${criteria || 'your query'}' in ${source}.`;
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Header
                    buttons={
                        <>
                            <IconButton onClick={handleSideBarClick}>
                                <MenuIcon style={{ color: "#EA4040" }} />
                            </IconButton>
                        </>
                    }
                />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" } }}
                        fontWeight="bold"
                    >
                        Catalog
                    </Typography>
                </Box>
                <Line />
                <SearchBar
                    initialQuery={typeof query === 'string' ? query : ''}
                    initialSource={source}
                    onSearch={handleSearch}
                />

                {/* Display Search Results Summary */}
                {!loading && (
                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        {generateSearchMessage()}
                    </Typography>
                )}

                {loading ? (
                    <Typography>Loading...</Typography>
                ) : books.length === 0 ? (
                    <Typography>No results found</Typography>
                ) : (
                    <BookList books={books} onBookClick={handleBookClick} />
                )}
            </Container>
        </Box>
    );
};

export default BookSearch;
