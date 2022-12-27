import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Page403 = () => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ minHeight: "60vh" }}
    >
      <Typography variant="h1">4️⃣0️⃣3️⃣</Typography>
      <Typography variant="h6">{"Vous n'avez pas le droit d'accéder à cette fonctionnalité"}</Typography>
      <Typography variant="body2"></Typography>
    </Stack>
  );
};

export default Page403;
