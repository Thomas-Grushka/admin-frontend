import {
  ActivitiesRound,
  AnalyticsRound,
  DashboardRound,
  DbGoalRound,
  DbMainRound,
  FiltersRound,
  SettingsRound,
  SignOutRound,
  TikTokChannelsRound,
  TlgrmChannelsRound,
} from "../../assets/icons";

export const mainListItem = [
  // {
  //   text: "Dashboard",
  //   icon: <DashboardRound sx={{ fontSize: 32 }} />,
  //   path: "/dashboard",
  //   attach: [],
  // },
  // {
  //   text: "Activities",
  //   icon: <ActivitiesRound sx={{ fontSize: 32 }} />,
  //   path: "/activities",
  //   attach: [],
  // },
  // {
  //   text: "Filters",
  //   icon: <FiltersRound sx={{ fontSize: 32 }} />,
  //   path: "/filters",
  //   attach: [],
  // },
  {
    text: "Telegram groups",
    icon: <TlgrmChannelsRound sx={{ fontSize: 32 }} />,
    path: "/telegram-groups",
    attach: [],
    // attach: ["tlgr-1550", "tlgr-1551", "tlgr-1552"],
  },
  // {
  //   text: "TikTok-channels",
  //   icon: <TikTokChannelsRound sx={{ fontSize: 32 }} />,
  //   path: "/tiktok-channels",
  //   attach: ["tiktok-1550", "tiktok-1551", "tiktok-1552"],
  // },
  // {
  //   text: "Analytics",
  //   icon: <AnalyticsRound sx={{ fontSize: 32 }} />,
  //   path: "/analytics",
  //   attach: [],
  // },
  // {
  //   text: "DB-Main",
  //   icon: <DbMainRound sx={{ fontSize: 32 }} />,
  //   path: "/db-main",
  //   attach: [],
  // },
  // {
  //   text: "DB-Goal",
  //   icon: <DbGoalRound sx={{ fontSize: 32 }} />,
  //   path: "/db-goal",
  //   attach: [],
  // },
];

export const secondaryListItem = [
  // {
  //   text: "Settings",
  //   icon: <SettingsRound sx={{ fontSize: 32 }} />,
  //   path: "/settings",
  //   attach: ["User group", "User"],
  // },
  {
    text: "Sign Out",
    icon: <SignOutRound sx={{ fontSize: 32 }} />,
    path: "/sign-out",
    attach: [],
  },
];
