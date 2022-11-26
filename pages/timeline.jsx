import Head from "next/head";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import React, { useState, useEffect } from "react";
import axiosInstance from "../src/lib/axiosInstance";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MessageIcon from "@mui/icons-material/Message";
import MedicationIcon from "@mui/icons-material/Medication";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bains = await axiosInstance.get("/timeline/getdate");
      setItems(bains);
    };

    fetchData();
  }, []);

  const TaskIcon = ({ task }) => {
    switch (task) {
      case "couches":
        return <BabyChangingStationIcon />;
      case "evenements":
        return <MessageIcon />;
      case "biberons":
        return <FastfoodIcon />;
      case "bains":
        return <BathtubIcon />;
      case "vitamines":
        return <MedicationIcon />;
    }
  };

  const typeToStr = {
    couches: "Couche",
    evenements: "Évènement",
    biberons: "Biberon",
    bains: "Bain",
    vitamines: "Vitamine",
  };

  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <Timeline position="alternate">
        {items.map((item) => {
          return (
            <TimelineItem key={item._id}>
              <TimelineOppositeContent sx={{ m: "auto 0" }}>
                {format(new Date(item.date), "H:mm")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <TaskIcon task={item.type} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ m: "auto 0" }}>
                <Typography variant="h6" component="span">
                  {typeToStr[item.type]}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}
