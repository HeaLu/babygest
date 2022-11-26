import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreateIcon from "@mui/icons-material/Create";
import TimelineIcon from "@mui/icons-material/Timeline";
import Link from "../utils/Link";

const Navigation = () => {
  const router = useRouter();
  const [value, setValue] = useState("/");

  useEffect(() => {
    setValue(router.asPath);
  }, [router]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} showLabels>
        <BottomNavigationAction
          label="Saisie"
          value="/"
          href="/"
          LinkComponent={Link}
          icon={<CreateIcon />}
        />
        <BottomNavigationAction
          label="Timeline"
          value="/timeline"
          href="/timeline"
          LinkComponent={Link}
          icon={<TimelineIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
