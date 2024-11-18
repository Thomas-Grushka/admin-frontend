
import { GridColDef } from "@mui/x-data-grid";


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
    field: "telegramId",
    headerName: "Telegram id",
    width: 200,
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 150,
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  {
    field: "language_code",
    headerName: "Language code",
    width: 200,
  },   
  { 
    field: "createdAt", 
    headerName: "Date created", 
    width: 140,
    renderCell: (params) => params.value.split("T")[0]
  },
  { 
    field: "updatedAt", 
    headerName: "Date updated", 
    width: 140,
    renderCell: (params) => params.value.split("T")[0]
  },
];
