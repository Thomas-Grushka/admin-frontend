import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

type Props = {};

export const Dashboard: React.FC<Props> = (_props) => {
  return (
    <Box
      component="main"
      sx={{
        width: "100vw",
        height: "100vh",
        p: "20px 24px",
        bgcolor: "#e1e3ff",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ color: "primary.main", fontSize: 12 }}
      >
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
      </Breadcrumbs>
      <Typography
        component="h1"
        sx={{
          fontSize: 18,
          fontWeight: "medium",
          color: "#5255bc",
          pt: 1.25,
          pb: 1.5,
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={2}></Grid>
    </Box>
  );
};
