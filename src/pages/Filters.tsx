import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { ActionsButton } from "../components/actions-button";
import { itemButton } from "../components/filter-selector/constants";

const Filters = () => {
  return (
    <Box
      component="main"
      sx={{
        width: "100vw",
        height: "100vh",
        p: "20px 24px",
        bgcolor: "#5255bc",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ color: "#fcfcfc", fontSize: 12 }}
      >
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/filters">
          All filters
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          Filters list
        </Typography>
        <ActionsButton itemButton={itemButton} sizeBtn={"28px"} />
      </Box>
    </Box>
  );
};

export default Filters;
