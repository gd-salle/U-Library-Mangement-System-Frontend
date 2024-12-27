/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../../components/Header/Header";
import Line from "../../components/Line/Line";
import Copyright from "../../components/Footer/Copyright";
import CirculationIssueBookModal from "../../components/CirculationPopUps/CirculationIssueBookModal";
import CirculationUpdateModal from "../../components/CirculationPopUps/CirculationUpdateModal";

import styles from "./styles.module.css";
import { getAllLoans } from "../../services/CirculationApi";

const ManageCirculation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loansData = await getAllLoans();
        setLoans(loansData);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchLoans(); // Call the function on component mount
  }, []);

  const handleSideBarClick = () => {
    console.log("Hamburger menu clicked!");
  };

  // const borrow = [
  //   {
  //     BookTitle: "Greek Mythology",
  //     Author: "Unknown",
  //     Borrower: "Mikyla Grace",
  //     UserType: "Student",
  //     DateandTimeBorrowed: "March 5, 2024",
  //     DateandTimeReturned: "",
  //     status: "Borrowed",
  //   },
  // ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookUpdate = () => {
    // Logic for updating a book record
  };

  const handleBookIssue = () => {
    // Logic for issuing a new book
  };

  return (
    <Box className={styles.rootContainer}>
      <Container maxWidth="lg" className={styles.container}>
        <Header
          buttons={
            <>
              <IconButton onClick={handleSideBarClick}>
                <MenuIcon className={styles.menuIcon} />
              </IconButton>
            </>
          }
        />
        <Typography variant="h4" gutterBottom className={styles.title}>
          Manage Circulation
        </Typography>

        <Line />

        <Box className={styles.actionBar}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EA4040",
              color: "#fff",
              textTransform: "none",
              ":hover": { backgroundColor: "#d13333" },
            }}
            onClick={handleOpenModal}
          >
            Issue A Book
          </Button>

          <Box className={styles.searchBox}>
            <TextField
              placeholder="Search..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon className={styles.searchIcon} />,
              }}
            />
            <IconButton>
              <TuneIcon className={styles.tuneIcon} />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Borrower</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Date & Time Borrowed</TableCell>
                <TableCell>Date & Time Returned</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{loan.title}</TableCell>
                  <TableCell>{loan.authorName}</TableCell>
                  <TableCell>{loan.borrowerFullName}</TableCell>
                  <TableCell>{loan.departmentName}</TableCell>
                  <TableCell>{loan.borrowDate}</TableCell>
                  <TableCell>{loan.returnDate}</TableCell>
                  <TableCell
                    className={
                      loan.status === "Active"
                        ? styles.activeStatus
                        : styles.inactiveStatus
                    }
                  >
                    {loan.status.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      sx={{
                        color: "#EA4040",
                        textTransform: "none",
                        ":hover": {
                          backgroundColor: "#f2f2f2",
                          color: "#d13333",
                        },
                      }}
                      onClick={handleOpenModal}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <CirculationIssueBookModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        onBookIssue={handleBookIssue}
      />

      <CirculationUpdateModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        onUpdateCirculation={handleBookUpdate}
      />
      <Copyright />
    </Box>
  );
};

export default ManageCirculation;
