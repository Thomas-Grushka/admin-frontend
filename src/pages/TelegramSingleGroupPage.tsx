import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TelegramSingleGroup from "../components/TelegramSingleGroup/TelegramSingleGroup";

const TelegramGroupsPage = () => {
  return (
    <Box
      component="main"
      sx={{
        width: "100vw",
        height: "100vh",
        p: "20px 24px",
        bgcolor: "primary.main",
      }}
    >
      {/* <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ color: "#fcfcfc", fontSize: 12 }}
      >
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/Activities">
          Activities
        </Link>
      </Breadcrumbs> */}
      <Typography
        component="h1"
        sx={{
          fontSize: 18,
          fontWeight: "medium",
          color: "#fcfcfc",
          pt: 1.25,
          pb: 1.5,
        }}
      >
        Telegram Single Group
      </Typography>
      <TelegramSingleGroup />
    </Box>
  );
};

export default TelegramGroupsPage;
