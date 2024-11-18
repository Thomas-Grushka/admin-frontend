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
import dayjs, { Dayjs } from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";

import { Tornado } from "../../assets/icons";
import UserCard from "../user-card";
import { rows } from "../../constants/data-filter.ts";
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

const FilterSelector = () => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [chipItems, setChipItems] =
    React.useState<ChipData>(chipData);
  const [_page, setPage] = React.useState(0);
  const [_rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(
    null
  );
  const [isModal, setIsModal] = useState(false);

  console.log("isModal", isModal);
  console.log("selectedRowFilter", selectedRow);

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

  const onSubmit = (data: any) => {
    data.date = value?.toISOString().split("T")[0];
    chipItems.forEach((item) => item[2] && (data[item[1]] = item[2]));
    console.log(data);
  };
  return (
    <Box>
      <Box
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
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: "10px 0",
        }}
      >
        <ActionsButton itemButton={itemButton} sizeBtn={"28px"} />
      </Box>
      {/* <Box> */}
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderRadius: "20px",
          bgcolor: "#fcfcfc",
          // width: "auto",
        }}
        onRowClick={(params) => {
          handleRowClick(params.row);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // autoPageSize={true}
      />
      {/* </Box> */}
      {isModal && (
        <UserCard
          onClose={handleChangeIsModal}
          dataRow={
            selectedRow !== null &&
            rows.find((row) => row.id === selectedRow.id)
          }
        />
      )}
      <Typography
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
      </Typography>
    </Box>
  );
};

export default FilterSelector;
