import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';

import dayjs, { Dayjs } from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";

import { Tornado } from "../../assets/icons/index.ts";
import UserCard from "../user-card/index.tsx";
import AddGroupModal from "./add-group-modal";
import DeleteGroupModal from "./delete-group-modal/index.jsx";
import ModalEditGroup from "./ModalEditGroup/ModalEditGroup";

// import rows from "./rows";
import { ActionsButton } from "../actions-button/index.tsx";
import {
  ChipData,
  chipData,
  columns,
  itemButton,
  locationInput,
  userNNN,
} from "./constants.tsx";
import { defaultValues } from "./constants.tsx";

import {fetchAllGroupsRequest, fetchAddGroupRequest, fetchDeleteGroupsRequest, fetchToggleActiveGroupsRequest, fetchUpdateGroupByIdRequest} from "../../shared/api/groups-api";

export interface SelectedRow {
  id: number;
  userName: string;
  dateActivity: string;
  tlgrmChannels: string;
  tikTokChannels: string;
  location: string;
  salaryRate: string;
  status: string;
  channelName: string;
  details: string;
}

const getSelectedGroupsName = (selectedIds, groups) => {
  const selectedGroups = groups.filter(item => selectedIds.includes(item.id));
  return selectedGroups.map(item => item.name).join(", ");
}
// @ts-ignore
const getEditRow = (rows, id)=> rows.find(item => item.id === id);

const TelegramGroups = () => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [chipItems, setChipItems] =
    React.useState<ChipData>(chipData);
  const [_page, setPage] = React.useState(0);
  const [_rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(
    null
  );
  const [rows, setRows] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [modalDeleteGroup, setModalDeleteGroup] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState(false);

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchGroups = async()=> {
      try {
        const data = await fetchAllGroupsRequest();
        setRows(data);
      }
      catch(error) {
        console.log(error);
      }
    }

    fetchGroups();
  }, []);

  const handleSelectionChange = (newSelection: any) => {
    setSelectionModel(newSelection);
  };

  const { handleSubmit, reset, watch, control, register } = useForm({
    defaultValues,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (params: SelectedRow) => {
    setSelectedRow(params);
    setIsModal(true);
  };

  const handleChangeIsModal = () => {
    setIsModal(!isModal);
  };

  const toggleAddGroupModal = useCallback(()=> setModalAddGroup(prevState => !prevState), []);

  const toggleDeleteGroupModal = useCallback(()=> setModalDeleteGroup(prevState => !prevState), []);

  const toggleEditGroupModal = useCallback(()=> setModalEditGroup(prevState => !prevState), []);

  const onSubmit = (data: any) => {
    data.date = value?.toISOString().split("T")[0];
    chipItems.forEach((item) => item[2] && (data[item[1]] = item[2]));
    console.log(data);
  };

  const onAddGroup = async(data: any) => {
    try {
      const result = await fetchAddGroupRequest(data);
      //@ts-ignore
      setRows(prevRows => [...prevRows, result]);
    }
    catch(error) {
      console.log(error);
    }
  }

  const onEditGroup = async(data: any) => {
    try {
      const result = await fetchUpdateGroupByIdRequest(selectionModel[0], data);
      //@ts-ignore
      setRows(prevRows => {
        const cloneRows = [...prevRows];
        //@ts-ignore
        const index = cloneRows.findIndex(item => item.id === selectionModel[0]);
        //@ts-ignore
        cloneRows[index] = result;

        return cloneRows;
      });
      setSelectionModel(prevItems => prevItems.slice(1));
    }
    catch(error) {
      console.log(error);
    }
  }

  const onDeleteGroups = async()=> {
    try {
      await fetchDeleteGroupsRequest(selectionModel);
      // @ts-ignore
      setRows(prevRows => prevRows.filter(item => !selectionModel.includes(item.id)));
    }
    catch(error) {
      console.log(error);
    }
  }

  const onToggleActiveGroups = async()=> {
    try {
      const [, updateRows] = await fetchToggleActiveGroupsRequest(selectionModel);
      // @ts-ignore
      setRows(prevRows => {
        return prevRows.map(item => {
          // @ts-ignore
          const row = updateRows.find(el => el.id === item.id);
          if(row) {
            // @ts-ignore
            return {...item, active: row.active};
          }
          return item;
        })
      })
      setSelectionModel([]);
    }
    catch(error) {
      console.log(error)
    };
  }

  return (
    <Box>
      {/* <Box
        component="div"
        sx={{
          p: 3.5,
          fullWidth: "true",
          bgcolor: "#fcfcfc",
          boxShadow: "0px 2px 12px 0px #00000040",
          borderRadius: "20px",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              bgcolor: "#e1e3ff",
              p: "8px 16px",
              "&.Mui-expanded": {
                borderRadius: "10px",
              },
            }}
          >
            Filter selector
          </AccordionSummary>
          <AccordionActions>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ flexGrow: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      options={userNNN}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...register("userName")}
                          {...params}
                          placeholder="userName"
                          variant="outlined"
                          sx={{
                            bgcolor: "#e1e3ff",
                          }}
                        />
                      )}
                    />
                  )}
                  defaultValue={""}
                  control={control}
                  name="userName"
                />
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      options={locationInput}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...register("location")}
                          {...params}
                          placeholder="Location"
                          variant="outlined"
                          sx={{
                            bgcolor: "#e1e3ff",
                          }}
                        />
                      )}
                    />
                  )}
                  defaultValue={""}
                  control={control}
                  name="location"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // defaultValue={dayjs(
                    //   new Date().toISOString().split("T")[0]
                    // )}
                    value={value}
                    onChange={(newValue) => {
                      setValue(dayjs(newValue));
                    }}
                    sx={{ bgcolor: "#e1e3ff" }}
                    views={["day", "month", "year"]}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={1}>
                  {chipData.map((data, index) => (
                    <Chip
                      key={index}
                      label={data[0]}
                      variant="outlined"
                      sx={{
                        bgcolor: "#5255bc",
                        color: "#fcfcfc",
                        borderColor: "#9092d6",
                      }}
                      // onClick={handleClick}
                      // onDelete={handleDelete}
                      onClick={() => {}}
                      onDelete={() => {
                        setChipItems((prev) => {
                          const newChipData = [...prev];
                          newChipData[index][2] = !data[2];
                          return newChipData;
                        });
                      }}
                      deleteIcon={!data[2] ? undefined : <Tornado />}
                    />
                  ))}
                </Stack>

                <Box>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      p: "10px 36px",
                      borderRadius: "10px",
                    }}
                  >
                    Clean all
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      ml: 1,
                      p: "10px 36px",
                      borderRadius: "10px",
                    }}
                  >
                    apply filter
                  </Button>
                </Box>
              </Box>
            </form>
          </AccordionActions>
        </Accordion>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: "10px 0",
        }}
      >
        <AdjustOutlinedIcon onClick={onToggleActiveGroups}  sx={{ color: '#fff', fontSize: 28, cursor: "pointer" }} />
        <EditOutlinedIcon onClick={toggleEditGroupModal}  sx={{ color: '#fff', fontSize: 28, cursor: "pointer" }} />
        <AddBoxOutlinedIcon onClick={toggleAddGroupModal} sx={{ color: '#fff', fontSize: 28, cursor: "pointer" }} />
        <DeleteForeverOutlinedIcon onClick={toggleDeleteGroupModal}  sx={{ color: '#fff', fontSize: 28, cursor: "pointer" }} />

      </Box>
      {/* <Box> */}
      {rows.length ? <DataGrid
        rows={rows}
        columns={columns}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        sx={{
          borderRadius: "20px",
          bgcolor: "#fcfcfc",
          // width: "auto",
        }}
        onRowClick={(params) => {
          navigate(`/telegram-groups/${params.id}`);
          // handleRowClick(params.row);
        }}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
        checkboxSelection
        // autoPageSize={true}
      /> : <Box sx={{ display: 'flex', justifyContent: "center" }}><CircularProgress color="success" size="3rem" /></Box>}
      {/* </Box> */}
      {modalAddGroup && (
        <AddGroupModal open={modalAddGroup} handleClose={toggleAddGroupModal} onSubmit={onAddGroup} />
      )}
      {modalEditGroup && (
        <ModalEditGroup defaultValues={getEditRow(rows, selectionModel[0])} open={modalEditGroup} handleClose={toggleEditGroupModal} onSubmit={onEditGroup} />
      )}
      {modalDeleteGroup && (
        <DeleteGroupModal onAgree={onDeleteGroups} groupName={getSelectedGroupsName(selectionModel, rows)} open={modalDeleteGroup} handleClose={toggleDeleteGroupModal} />
      )}
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

export default TelegramGroups;
