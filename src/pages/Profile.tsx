import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile, AccountInformation } from "components";
import { useTypedSelector } from "../redux/store";

const Account = () => {
  const { user, isAuthorized } = useTypedSelector((state) => state.user);

  if (!isAuthorized) {
    return <p>You have no permission to see this page</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountInformation userInformation={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfile userInformation={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Account;
