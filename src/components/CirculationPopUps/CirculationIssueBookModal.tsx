import React, { useState } from "react";
import ModalForm from "../CirculationModal/CirculationModalForm";

interface CirculationIssueBookModalProps {
  open: boolean;
  handleClose: () => void;
  onBookIssue: (data: {
    BookTitle: string;
    Author: string;
    Borrower: string;
    UserType: string;
    DateandTimeBorrowed: string;
    DateandTimeReturned: string;
    status: string;
  }) => void;
}

const CirculationIssueBookModal: React.FC<CirculationIssueBookModalProps> = ({
  open,
  handleClose,
  onBookIssue,
}) => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [borrower, setBorrower] = useState("");
  const [userType, setUserType] = useState("");
  const [dateandTimeBorrowed, setDateandTimeBorrowed] = useState("");
  const [dateandTimeReturned, setDateandTimeReturned] = useState("");
  const [status, setStatus] = useState("");

  const handleConfirm = () => {
    const newCirculationData = {
      BookTitle: bookTitle,
      Author: author,
      Borrower: borrower,
      UserType: userType,
      DateandTimeBorrowed: dateandTimeBorrowed,
      DateandTimeReturned: dateandTimeReturned,
      status: status,
    };
    onBookIssue(newCirculationData); // Pass the new data to the parent component
    handleClose();
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Issue A Book"
      fields={[
        {
          label: "Book Title",
          type: "text",
          value: bookTitle,
          onChange: setBookTitle,
        },
        {
          label: "Author",
          type: "text",
          value: author,
          onChange: setAuthor,
        },
        {
          label: "Borrower",
          type: "text",
          value: borrower,
          onChange: setBorrower,
        },
        {
          label: "User Type",
          type: "select",
          value: userType,
          onChange: setUserType,
          options: ["Faculty", "Student"],
        },
        {
          label: "Date and Time Borrowed",
          type: "text",
          value: dateandTimeBorrowed,
          onChange: setDateandTimeBorrowed,
        },
        {
          label: "Date and Time Returned",
          type: "text",
          value: dateandTimeReturned,
          onChange: setDateandTimeReturned,
        },
        {
          label: "Status",
          type: "select",
          value: status,
          onChange: setStatus,
          options: ["Borrowed", "Returned", "Renewed"],
        },
      ]}
      onConfirm={handleConfirm}
      confirmText="Confirm"
    />
  );
};

export default CirculationIssueBookModal;
