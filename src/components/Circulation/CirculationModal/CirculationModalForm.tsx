import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import styles from "./styles.module.css";



interface Field {
  label: string;
  type: string;
  value: string;
  onChange?: (value: string) => void; // Optional since read-only fields won't need this
  readOnly: boolean;
  options?: string[]; // For dropdown fields
}

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  fields: Field[];
  onConfirm: () => void;
  confirmText: string;
  errorMessage?: string | null;
}

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  handleClose,
  title,
  fields,
  onConfirm,
  confirmText,
  errorMessage, // Include errorMessage here
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalBox}>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            className={styles.modalHeader}
          >
            <span className={styles.modalHeaderLine} />
            {title}
          </Typography>
          {fields.map((field, index) => {
            if (field.type === "text") {
              return (
                <TextField
                  key={index}
                  label={field.label}
                  variant="outlined"
                  value={field.value}
                  onChange={field.readOnly ? undefined : (e) => field.onChange?.(e.target.value)}
                  InputProps={{ readOnly: field.readOnly }}
                  className={styles.textField}
                />
              );
            } else if (field.type === "select" && field.options) {
              return (
                <TextField
                  key={index}
                  select
                  label={field.label}
                  variant="outlined"
                  value={field.value}
                  onChange={field.readOnly ? undefined : (e) => field.onChange?.(e.target.value)}
                  InputProps={{ readOnly: field.readOnly }}
                  className={styles.textField}
                >
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }
            return null;
          })}
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              className={styles.errorMessage}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EA4040",
              color: "#fff",
              textTransform: "none",
              ":hover": { backgroundColor: "#d13333" },
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button
            variant="text"
            sx={{
              color: "#EA4040",
              textTransform: "none",
              ":hover": { backgroundColor: "#f2f2f2", color: "#d13333" },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};


export default ModalForm;
