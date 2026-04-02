import { ReactElement } from "react";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding-top: ${({ theme }) => theme.spacing(6)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`;

const MessageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
`;

const MessageTitle = styled(Typography)`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`;

const MessageDescription = styled(Typography)`
  font-size: 24px;
  max-width: 600px;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledCard = styled(Card)`
  width: min(100%, 560px);
  border-color: ${({ theme }) => theme.palette.divider};
  background: ${({ theme }) => theme.palette.background.paper};
  backdrop-filter: blur(14px);
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(3)};
  row-gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }
`;

const FormTitle = styled(Typography)`
  font-size: 32px;
  font-weight: 600;
  text-align: left;
`;

const Submit = styled(Button)`
  min-width: 140px;
`;

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
    onSubmit: handleSubmit,
  });

  useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, "contact");

  return (
    <Root>
      <Recaptcha />
      {createEnquiryMutation.isSuccess && (
        <MessageContainer>
          <MessageTitle>Thank you</MessageTitle>
          <MessageDescription>
            Message received! Will be in touch soon.
          </MessageDescription>
        </MessageContainer>
      )}
      {createEnquiryMutation.isError && (
        <MessageContainer>
          <MessageTitle>Something went wrong</MessageTitle>
          <MessageDescription>
            An error occurred while sending your message. Please try again in
            some time.
          </MessageDescription>
        </MessageContainer>
      )}
      {(createEnquiryMutation.isIdle || createEnquiryMutation.isPending) && (
        <StyledCard elevation={0}>
          <StyledCardContent>
            <FormTitle variant="h1">Get in touch</FormTitle>
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
                label="Work email"
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
                rows={4}
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
              />
              <Submit
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                disabled={createEnquiryMutation.isPending}
                disableElevation={true}
              >
                Send{" "}
                {createEnquiryMutation.isPending && (
                  <CircularProgress size={14} sx={{ ml: 1 }} />
                )}
              </Submit>
              {/* You are allowed to hide the badge as long as you include the reCAPTCHA
               * branding visibly in the user flow.
               *
               * See https://stackoverflow.com/a/53749730 for more information.
               */}
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
          </StyledCardContent>
        </StyledCard>
      )}
    </Root>
  );
};

EnquiryForm.getLayout = (children: ReactElement): ReactElement => {
  return <PrimaryLayout>{children}</PrimaryLayout>;
};

export default EnquiryForm;
