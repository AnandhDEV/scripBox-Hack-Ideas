import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import { styled } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { Alert, Collapse, Grid } from "@mui/material";
import illustration from "../../Assests/images/login_illustration.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { emailRegex } from "../../Utils/constants";

const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    height: "100vh",
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "28rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "16rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    height: "100vh",
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const Login = () => {
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.challenges);

  const [userEmail, setuserEmail] = useState("");
  const [error, setError] = useState(false);
  const [WarningText, setWarningText] = useState("");

  const handleChange = (e) => {
    setuserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    setWarningText("");
    e.preventDefault();
    if (userEmail && emailRegex.test(userEmail)) {
      if (!!users.find((item) => item.userId === userEmail)?.userId) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(users.find((item) => item.userId === userEmail))
        );
        navigate("/challenges");
      } else {
        setWarningText("User is not available");
      }
    } else {
      setError(true);
    }
  };

  return (
    <Grid container>
      <Grid item md={8} xs={12} lg={8} xl={8}>
        <LoginIllustrationWrapper>
          <LoginIllustration src={illustration}></LoginIllustration>
        </LoginIllustrationWrapper>
      </Grid>

      <Grid item md={4} xs={12} lg={4} xl={4}>
        <RightWrapper>
          <Box
            sx={{
              p: 12,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
            }}
          >
            <BoxWrapper>
              <Box
                sx={{
                  top: 30,
                  left: 40,
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Box>
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant="h5">
                  Welcome to Challenges
                </TypographyStyled>
                <Typography variant="body2">
                  Please sign-in to your account
                </Typography>
              </Box>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  value={userEmail}
                  onChange={handleChange}
                  autoFocus
                  label="Email"
                  error={
                    (error && !userEmail) ||
                    (error && !emailRegex.test(userEmail))
                  }
                  helperText={
                    (error && !userEmail && "Required") ||
                    (error &&
                      !emailRegex.test(userEmail) &&
                      "Please enter valid Email")
                  }
                  placeholder="example@mail.com"
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Login
                </Button>
                <Collapse in={!!WarningText}>
                  <Alert severity="warning">{WarningText}</Alert>
                </Collapse>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Grid>
    </Grid>
  );
};

export default Login;
