import React, { ReactElement } from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useCreateEnquiry } from "../hooks";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";

const Root = styled(Container)``;

const FormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 400px;
  margin-top: ${({ theme }) => theme.spacing(2)};
  row-gap: ${({ theme }) => theme.spacing(2)};
`;

const FormTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

const Submit = styled(Button)`
  width: 120px;
`;

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

const EnquiryForm: TNextPageWithLayout = (): ReactElement => {
  const createEnquiryMutation = useCreateEnquiry();

  const handleSubmit = (values: IEnquiryFormValues) => {
    createEnquiryMutation.mutate(values, {
      onSuccess: () => {
        alert("We've successfully received your message. We'll get back to you ASAP.")
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Root>
      <FormContainer>
        <FormTitle variant="h1">CONTACT US</FormTitle>
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth={true}
            size="small"
          />

          <TextField
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            fullWidth={true}
            size="small"
          />

          <TextField
            id="company"
            name="company"
            label="Company Name"
            value={formik.values.company}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
            fullWidth={true}
            size="small"
          />

          <TextField
            id="email"
            name="email"
            label="Work Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth={true}
            size="small"
          />

          <TextField
            id="message"
            name="message"
            label="Message"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            fullWidth={true}
            multiline={true}
            rows={4}
            size="small"
          />

          <Submit
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disabled={createEnquiryMutation.isLoading}
            disableElevation={true}
          >
            Submit
          </Submit>
        </Form>
      </FormContainer>
    </Root>
  );
};

EnquiryForm.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default EnquiryForm;
