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
import { getItemConfig } from "../src/lib/itemConfig";
import { startOfDay } from "date-fns";
import fr from "date-fns/locale/fr";
import { Box } from "@mui/system";

export default function Home() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const itemData = await axiosInstance.get("/timeline/getperiod");
      let newItems = {};
      for (const item of itemData) {
        const day = startOfDay(new Date(item.date)).toISOString();
        if (!newItems[day]) newItems[day] = [];
        newItems[day].push(item);
      }
      setItems(newItems);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <br />
      {Object.entries(items).map(([date, itemList]) => {
        return (
          <div key={date}>
            <Box textAlign="center">
              <Typography variant="h6" component="div">
                {format(new Date(date), "eeee d LLLL yyyy", {
                  locale: fr,
                })[0].toUpperCase()}
                {format(new Date(date), "eeee d LLLL yyyy", {
                  locale: fr,
                }).substring(1)}
              </Typography>
            </Box>
            <Timeline position="alternate">
              {itemList.map((item) => {
                const itemConfig = getItemConfig(item.type);
                const messageMaxLength = 50;
                return (
                  <TimelineItem key={item._id}>
                    <TimelineOppositeContent sx={{ m: "auto 0" }}>
                      {format(new Date(item.date), "H:mm")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color={item.type}>
                        {itemConfig.icon}
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ m: "auto 0" }}>
                      <Typography variant="h6" component="span">
                        {itemConfig.label}
                      </Typography>
                      {item.message && (
                        <Typography>
                          {item.message.slice(0, messageMaxLength)}
                          {item.message.length > messageMaxLength + 1 && "..."}
                        </Typography>
                      )}
                      {item.type === "couches" && (
                        <Typography>{item.caca ? "💩" : "Pas 💩"}</Typography>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        );
      })}
    </>
  );
}
