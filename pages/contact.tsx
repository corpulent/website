import React, { FunctionComponent, ReactElement } from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import * as notion from "../utils/notion";

interface IEnquiryFormValues {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  message: string;
}

const initialValues: IEnquiryFormValues = {
  name: "",
  jobTitle: "",
  company: "",
  email: "",
  message: "",
};

const EnquiryForm: FunctionComponent = (): ReactElement => {
  const handleSubmit = (values: IEnquiryFormValues) => {
    // Call your createEnquiry function here with the form values
    notion.createEnquiryRow(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        fullWidth
        margin="normal"
      />

      <TextField
        id="jobTitle"
        name="jobTitle"
        label="Job Title"
        value={formik.values.jobTitle}
        onChange={formik.handleChange}
        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
        fullWidth
        margin="normal"
      />

      <TextField
        id="company"
        name="company"
        label="Company Name"
        value={formik.values.company}
        onChange={formik.handleChange}
        error={formik.touched.company && Boolean(formik.errors.company)}
        helperText={formik.touched.company && formik.errors.company}
        fullWidth
        margin="normal"
      />

      <TextField
        id="email"
        name="email"
        label="Work Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
      />

      <TextField
        id="message"
        name="message"
        label="Message"
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default EnquiryForm;
