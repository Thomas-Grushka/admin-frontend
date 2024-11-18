import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
} from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';

import { DataGrid } from "@mui/x-data-grid";

import {
  columns,
} from "./constants.tsx";

import {fetchAllUsersFromGroupsRequest} from "../../shared/api/users-api.js";

// @ts-ignore
const getEditRow = (rows, id)=> rows.find(item => item.id === id);

const TelegramSingleGroup = () => {
  const [rows, setRows] = useState([]);
  const {id} = useParams();

  useEffect(()=> {
    const fetchGroups = async()=> {
      try {
        const data = await fetchAllUsersFromGroupsRequest(id);
        console.log(data);
        setRows(data);
      }
      catch(error) {
        console.log(error);
      }
    }

    fetchGroups();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: "10px 0",
        }}
      >

      </Box>
      {rows.length ? <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderRadius: "20px",
          bgcolor: "#fcfcfc",
          // width: "auto",
        }}

        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
        // autoPageSize={true}
      /> : <Box sx={{ display: 'flex', justifyContent: "center" }}><CircularProgress color="success" size="3rem" /></Box>}
      {/* </Box> */}

      {/* <Typography
        fontFamily="icomoon"
        fontSize={25}
        color={"#fcfcfc"}
        sx={{
          width: 27,
          height: 27,
          bgcolor: "#0095ff",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &#xe903;
      </Typography> */}
    </Box>
  );
};

export default TelegramSingleGroup;
