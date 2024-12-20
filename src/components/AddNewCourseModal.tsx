import React, { useState } from "react";
import ModalForm from "./Modal/ModalForm";

interface AddNewCourseModalProps {
  open: boolean;
  handleClose: () => void;
    onCourseAdd: (data: { code: string; name: string; department: string; status: string }) => void;
}

const AddNewCourseModal: React.FC<AddNewCourseModalProps> = ({
  open,
  handleClose,
  onCourseAdd,
}) => {
  const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
  const [status, setStatus] = useState("");

  const handleConfirm = () => {
    const newCourse = {
      code: courseCode,
      name: courseName,
      department: departmentName,
      status: status,
    };
    onCourseAdd(newCourse); // Pass the new Course data to the parent component
    handleClose();
  };

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      title="Add New Course"
      fields={[
        {
          label: "Course Code",
          type: "text",
          value: courseCode,
          onChange: setCourseCode,
        },
        {
          label: "Course Name",
          type: "text",
          value: courseName,
          onChange: setCourseName,
          },
        {
          label: "Associated Department",
          type: "select",
          value: departmentName,
          onChange: setDepartmentName,
          options: ["Computer Studies", "Nursing"],
        },
        {
          label: "Status",
          type: "select",
          value: status,
          onChange: setStatus,
          options: ["Active", "Inactive"],
        },
      ]}
      onConfirm={handleConfirm}
      confirmText="Confirm"
    />
  );
};

export default AddNewCourseModal;