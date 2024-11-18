import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Excel } from "../../assets/icons/excel";
import { FloppyDisk } from "../../assets/icons/floppyDisk";
import { Share } from "../../assets/icons/share";
import { Trash } from "../../assets/icons/trash";
import { MoreVert } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import styles from "./styles.module.css";

export const defaultValues = {
  userName: "",
  location: "",
};

export const userNNN = [
  "John",
  "Doe",
  "Jane",
  "Joe",
  "Jack",
  "Jill",
  "Jenny",
];
export const locationInput = [
  "New York",
  "London",
  "Paris",
  "Berlin",
  "Moscow",
  "Rome",
];

export const itemButton = [
  {
    id: 0,
    name: "Share",
    icon: <Share fill="#fcfcfc" sx={{ p: "3px" }} />,
  },
  {
    id: 1,
    name: "Save",
    icon: <FloppyDisk fill="#fcfcfc" sx={{ p: "3px" }} />,
  },
  {
    id: 2,
    name: "Export",
    icon: <Excel fill="#fcfcfc" sx={{ p: "3px" }} />,
  },
  {
    id: 3,
    name: "Trash",
    icon: <Trash fill="#fcfcfc" sx={{ p: "3px" }} />,
  },
];

export type GridColDefIcon = Omit<GridColDef, "headerName"> & {
  headerName: any;
};

export interface Channel {
  channelComeFrom: string;
  activationDate: string;
  activity: number;
}
export const columns: GridColDefIcon[] | GridColDef[] = [
  {
    field: "userName",
    headerName: "User name",
    // width: 140,
  },
  {
    field: "dateActivity",
    headerName: "Date activity",
    width: 120,
  },
  {
    field: "tlgrmChannels",
    headerName: (
      <Typography style={{ fontFamily: "icomoon" }}>
        <span
          className={styles.iconTelegram1}
          style={{ fontSize: "25px" }}
        >
          <span className={styles.path1}></span>
          <span className={styles.path2}></span>
        </span>
      </Typography>
    ),
    // <TlgrmChannelsRound />,
    valueGetter: (_value, row) =>
      row.channels.some(
        (item: Channel) =>
          item.channelComeFrom.split("#")[0] == "t.me"
      )
        ? "+"
        : "–",
    renderCell: (params) => (
      // <Chip
      //   label={params.value}
      //   sx={{
      //     bgcolor: params.value === "+" ? "#67c75f" : "#9092d6",
      //     color: "#fcfcfc",
      //     "& .MuiChip-label": {
      //       padding: 0,
      //     },
      //     fontSize: "21px",
      //     width: "21px",
      //     height: "21px",
      //     textAlign: "center",
      //   }}
      // />
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 21,
            height: 21,
            borderRadius: "50%",
            bgcolor: params.value === "+" ? "#67c75f" : "#9092d6",
          }}
        >
          <Typography
            color={"#fcfcfc"}
            fontSize={21}
            sx={{ pb: "3px" }}
          >
            {params.value}
          </Typography>
        </Box>
      </Box>
    ),
    sortable: false,
    width: 40,
  },
  {
    field: "tikTokChannels",
    headerName: (
      <Typography style={{ fontFamily: "icomoon" }}>
        <span
          className={styles.iconTiktok1}
          style={{ fontSize: "25px" }}
        >
          <span className={styles.path1}></span>
          <span className={styles.path2}></span>
        </span>
      </Typography>
      // <TikTokChannelsRound />
    ),
    valueGetter: (_value, row) =>
      row.channels.some(
        (item: {
          channelComeFrom: string;
          activationDate: string;
          activity: number;
        }) => item.channelComeFrom.split("#")[0] === "tiktok"
      )
        ? "+"
        : "–",
    renderCell: (params) => (
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 21,
            height: 21,
            borderRadius: "50%",
            bgcolor: params.value === "+" ? "#67c75f" : "#9092d6",
          }}
        >
          <Typography
            color={"#fcfcfc"}
            fontSize={21}
            sx={{ pb: "3px" }}
          >
            {params.value}
          </Typography>
        </Box>
      </Box>
    ),
    sortable: false,
    width: 40,
  },
  {
    field: "location",
    headerName: "Location",
    // width: 140,
    // type: "number",
    // width: 90,
  },
  {
    field: "salaryRate",
    headerName: "Salary rate",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    // width: 120,
    valueGetter: (_value, row) =>
      `${row.currency}${row.salaryMin}-${row.salaryMax}`,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          bgcolor:
            params.value === "New"
              ? "#67c75f"
              : params.value === "Process"
              ? "#9092d6"
              : "#5052bc",
          color: "#fcfcfc",
          width: 100,
        }}
      />
    ),
    // width: 100,
  },
  { field: "channelName", headerName: "Channel name", width: 170 },
  {
    field: "details",
    headerName: "Details",
    // , width: 50
    renderCell: (_params) => (
      <IconButton
      // onClick={() => {
      //   console.log(params);
      // }}
      >
        <MoreVert />
      </IconButton>
    ),
  },
];

export type ChipData = [string, string, boolean][];

export const chipData: ChipData = [
  ["All Streams", "allStreams", false],
  ["Last activity", "lastActivity", false],
  ["Week", "week", false],
  ["Month", "month", false],
  ["Leader", "leader", false],
];
