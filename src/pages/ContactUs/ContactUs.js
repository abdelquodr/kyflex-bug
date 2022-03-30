import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  createMuiTheme,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LandingBg from '../../assets/images/customer_service.jpg';
import { LandingBlock } from '../../components/LandingBlock/LandingBlock';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#fb5012',
    color: '#FFFFFF',
    fontSize: '1rem',
    border: 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    '&:hover': {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  },
  contactUs: {
    padding: '0',
    margin: '0',
    maxWidth: '100%',
  },
  contactUsContent: {
    width: '100%',
    justifyContent: 'center',
    padding: '0 2rem',
    maxWidth: '960px',
    margin: '2rem auto',
  },
  contactUsForm: {
    width: '100%',
  },
  accordionHeading: {
    background: 'lightgray',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FC781C',
    },
  },
});

const ContactUs = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const scriptURL =
    'https://script.google.com/macros/s/AKfycby4Vgy5C6EMUsmKzipUp5_sjebO3XF_PELdCE5fg1cO_d3x1KGRSV7_YXfLw2-KVNFzjg/exec'; // Keith's personal Google Sheet, limited to 50 emails per day, will need a company sheet at some point with higher limit

  const onSubmit = (data) => {
    const submitButton = document.getElementById('contact-form-submit-button');
    const contactForm = document.getElementById('contact-form');

    submitButton.innerText = 'Submitting...';
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(contactForm),
    })
      .then((res) => {
        submitButton.innerText = 'Sent!';
        console.log('response is: ', res);
      })
      .catch((error) => {
        console.log('error is', error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.contactUs}>
        <LandingBlock
          background={LandingBg}
          title="Support & Contact us"
          hasSearchBar={false}
        />
        <Grid container className={classes.contactUsContent}>
          <Grid item container className="my-2">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom={true}>
                Request Information
              </Typography>
            </Grid>
            <Grid item container>
              <form
                id="contact-form"
                className={classes.contactUsForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <label>Name</label>
                    <TextField
                      name="user_name"
                      required={true}
                      placeholder="Your Name"
                      autoComplete="name"
                      fullWidth={true}
                      variant="outlined"
                      color="primary"
                      inputRef={register}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label>Email</label>
                    <TextField
                      name="user_email_address"
                      required={true}
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      fullWidth={true}
                      variant="outlined"
                      color="primary"
                      inputRef={register}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label>Message</label>
                    <TextField
                      name="message"
                      required={true}
                      placeholder="Leave your message here"
                      fullWidth={true}
                      variant="outlined"
                      color="primary"
                      multiline={true}
                      rows="8"
                      inputRef={register}
                    />
                  </Grid>

                  <Grid item xs={12} className="text-right">
                    <button
                      id="contact-form-submit-button"
                      type="submit"
                      className={classes.button}
                    >
                      Submit
                    </button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid item container className="my-2">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom={true}>
                Frequently Asked Questions (FAQs)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className={classes.accordionHeading}
                >
                  <Typography>
                    How do I book an experience on KyFlex?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className={classes.accordionHeading}
                >
                  <Typography>How to become a host at KyFlex?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                  className={classes.accordionHeading}
                >
                  <Typography>How to set up a payment?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4-content"
                  id="panel4-header"
                  className={classes.accordionHeading}
                >
                  <Typography>What is KyFlex?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5-content"
                  id="panel5-header"
                  className={classes.accordionHeading}
                >
                  <Typography>Frequently asked question</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export { ContactUs };
