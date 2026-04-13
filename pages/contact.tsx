import { ReactElement } from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useCreateEnquiry, useRecaptcha } from "../hooks";
import { PrimaryLayout } from "../components/layouts";
import { TNextPageWithLayout } from "../types";
import Recaptcha from "../components/common/Recaptcha";

const Root = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(10)};
  padding-top: ${({ theme }) => theme.spacing(14)};
  padding-bottom: ${({ theme }) => theme.spacing(16)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(6)};
    padding-top: ${({ theme }) => theme.spacing(9)};
  }
`;

const LeftCol = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  max-width: 440px;
`;

const PageEyebrow = styled(Typography)`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.primary.main};
` as typeof Typography;

const PageTitle = styled(Typography)`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0em;
` as typeof Typography;

const PageLead = styled(Typography)`
  font-size: 1rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.palette.text.secondary};
` as typeof Typography;

const Detail = styled(Typography)`
  font-size: 0.875rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.palette.text.secondary};
` as typeof Typography;

const RightCol = styled("div")`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing(1)};
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

const Submit = styled(Button)`
  align-self: flex-end;
  min-width: 140px;
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing(1.2, 3.5)};
`;

const MessageContainer = styled("div")`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const MessageTitle = styled(Typography)`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
` as typeof Typography;

const MessageDescription = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  max-width: 480px;
  text-align: center;
  line-height: 1.9;
` as typeof Typography;

interface IEnquiryFormValues {
  name: string;
  company: string;
  email: string;
  message: string;
}

const initialValues: IEnquiryFormValues = {
  name: "",
  company: "",
  email: "",
  message: "",
};

const EnquiryForm: TNextPageWithLayout = (): ReactElement => {
  const createEnquiryMutation = useCreateEnquiry();

  const handleSubmit = (values: IEnquiryFormValues) => {
    createEnquiryMutation.mutate(values);
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<IEnquiryFormValues> = {};
      if (!values.name.trim()) errors.name = "Name is required.";
      if (!values.email.trim()) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Please enter a valid email address.";
      }
      if (!values.message.trim()) errors.message = "Message is required.";
      return errors;
    },
    onSubmit: handleSubmit,
  });

  useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, "contact");

  return (
    <Root maxWidth="lg">
      <Recaptcha />

      {(createEnquiryMutation.isSuccess || createEnquiryMutation.isError) && (
        <MessageContainer>
          {createEnquiryMutation.isSuccess ? (
            <>
              <MessageTitle variant="h1">Thank you</MessageTitle>
              <MessageDescription>
                Message received. We will be in touch shortly.
              </MessageDescription>
            </>
          ) : (
            <>
              <MessageTitle variant="h1">Something went wrong</MessageTitle>
              <MessageDescription>
                An error occurred while sending your message. Please try again.
              </MessageDescription>
            </>
          )}
        </MessageContainer>
      )}

      {(createEnquiryMutation.isIdle || createEnquiryMutation.isPending) && (
        <>
          <LeftCol>
            <PageTitle variant="h1">Get in touch.</PageTitle>
            <PageLead>
              Whether you are looking to build a new analytical infrastructure,
              make sense of existing systems, or simply explore what&apos;s
              possible, we are happy to start with a conversation.
            </PageLead>
            <Detail>
              We work with organizations of all sizes. Engagements range from
              focused strategy sessions to long-term implementation
              partnerships. There is no commitment required to get in touch.
            </Detail>
            <Detail>We usually respond within one business day.</Detail>
          </LeftCol>

          <RightCol>
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
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              <TextField
                id="company"
                name="company"
                label="Company name"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
                fullWidth={true}
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth={true}
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
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
                rows={5}
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              <Submit
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={createEnquiryMutation.isPending}
                disableElevation={true}
              >
                Send{" "}
                {createEnquiryMutation.isPending && (
                  <CircularProgress size={14} sx={{ ml: 1 }} />
                )}
              </Submit>
              <Typography
                sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.7 }}
              >
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  style={{ color: "inherit" }}
                  href="https://policies.google.com/privacy"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  style={{ color: "inherit" }}
                >
                  Terms of Service
                </a>{" "}
                apply.
              </Typography>
            </Form>
          </RightCol>
        </>
      )}
    </Root>
  );
};

EnquiryForm.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default EnquiryForm;
