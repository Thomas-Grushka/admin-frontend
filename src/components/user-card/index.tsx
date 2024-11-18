import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Channel } from "../filter-selector";
import { ActionsButton } from "../actions-button";
import { Share } from "../../assets/icons/share";
import { FloppyDisk } from "../../assets/icons/floppyDisk";
import { Excel } from "../../assets/icons/excel";
import { Print } from "../../assets/icons/print";
// import { SelectedRow } from "../filter-selector";

type TypographyLabelProps = {
  children: React.ReactNode;
};

const TypographyLabel: React.FC<TypographyLabelProps> = ({
  children,
}) => {
  return (
    <Typography fontSize={12} color={"#9092d6"} marginBottom={0.5}>
      {children}
    </Typography>
  );
};

const itemButton = [
  {
    id: 0,
    name: "Share",
    icon: <Share fill="#fcfcfc" sx={{ p: "5px" }} />,
  },
  {
    id: 1,
    name: "Save",
    icon: <FloppyDisk fill="#fcfcfc" sx={{ p: "5px" }} />,
  },
  {
    id: 2,
    name: "Export",
    icon: <Excel fill="#fcfcfc" sx={{ p: "5px" }} />,
  },
  {
    id: 3,
    name: "Print",
    icon: <Print fill="#fcfcfc" sx={{ p: "5px" }} />,
  },
];

export default function UserCard({ onClose, dataRow }: any) {
  const [open, setOpen] = React.useState(true);
  enum Currency {
    "$",
    "€",
    "₴",
  }

  const [currencyCheck, setCurrencyCheck] = React.useState<number>(
    +Currency[dataRow.currency]
  );

  console.log("params", dataRow);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleCheckCurrency = () => {
    setCurrencyCheck(currencyCheck > 1 ? 0 : currencyCheck + 1);
  };

  return (
    <React.Fragment>
      §
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
              (formData as any).entries()
            );
            const newData = {
              salaryMin: +formJson.salary.split("-")[0],
              salaryMax: +formJson.salary.split("-")[1],
            };
            delete formJson.salary;
            let channels = [];
            for (let i = 0; i < dataRow.channels.length; i++) {
              const channel = {
                channelComeFrom: formJson[`channelComeFrom${i}`],
                activationDate: formJson[`activationDate${i}`],
                activity: formJson[`activity${i}`].slice(0, -1),
              };
              delete formJson[`channelComeFrom${i}`];
              delete formJson[`activationDate${i}`];
              delete formJson[`activity${i}`];
              channels.push(channel);
            }
            const data = {
              ...formJson,
              ...newData,
              channels,
              currency: currencyCheck,
              id: dataRow.id,
            };

            // const email = formJson.name;
            console.log(
              // "formJson", formJson,
              "data",
              data
            );
            handleClose();
          },
        }}
      >
        <Paper sx={{ p: "0 16px 40px" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <DialogTitle
              sx={{
                fontWeight: "medium",
                fontSize: 16,
                color: "#5255bc",
              }}
            >
              Personal Data
            </DialogTitle>
            <IconButton onClick={handleClose} sx={{ mr: 2 }}>
              <Close fontSize="medium" />
            </IconButton>
          </Box>
          <DialogContent
            sx={{
              flexGrow: 1,
            }}
          >
            <DialogContentText
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: 16, color: "#5255bc", mb: 3 }}
              >
                ID #{dataRow.id}
              </Typography>
              <ActionsButton
                itemButton={itemButton}
                sizeBtn={"20px"}
              />
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    width: 510,
                  }}
                >
                  <Box>
                    <TypographyLabel>Name</TypographyLabel>
                    <OutlinedInput
                      defaultValue={dataRow.userName}
                      autoFocus
                      required
                      margin="dense"
                      id="userName"
                      name="userName"
                      sx={{
                        width: "100%",
                        height: 40,
                        background: "#E1E3FF80",
                        borderRadius: "10px",
                        borderColor: "e1e3ff",
                        outlineColor: "transparent",
                        "& .MuiOutlinedInput-input": {
                          fontSize: 14,
                          p: "9.5px 16px",
                        },
                      }}
                      // label="Email Address"
                      type="text"
                      startAdornment={
                        // <InputAdornment position="start">
                        // <IconButton
                        //   aria-label="toggle currency"
                        //   onClick={() => {}}
                        //   // onMouseDown={handleMouseDownPassword}
                        //   edge="start"
                        // >
                        <Avatar
                          src={dataRow.avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                        // </IconButton>
                        // </InputAdornment>
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <TypographyLabel>Phone</TypographyLabel>
                      <OutlinedInput
                        defaultValue={dataRow.phone}
                        autoFocus
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        sx={{
                          width: 250,
                          height: 40,
                          background: "#E1E3FF80",
                          borderRadius: "10px",
                          borderColor: "e1e3ff",
                          outlineColor: "transparent",
                          "& .MuiOutlinedInput-input": {
                            fontSize: 14,
                            p: "9.5px 16px",
                          },
                        }}
                        // label="Email Address"
                        type="text"
                      />
                    </Box>
                    <Box>
                      <TypographyLabel>Email</TypographyLabel>
                      <OutlinedInput
                        defaultValue={dataRow.email}
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        sx={{
                          width: 250,
                          height: 40,
                          background: "#E1E3FF80",
                          borderRadius: "10px",
                          borderColor: "e1e3ff",
                          outlineColor: "transparent",
                          "& .MuiOutlinedInput-input": {
                            fontSize: 14,
                            p: "9.5px 16px",
                          },
                        }}
                        // label="Email Address"
                        type="email"
                      />
                    </Box>
                  </Box>
                  {dataRow.channels.map(
                    (item: Channel, idx: number) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        key={idx}
                      >
                        <Box>
                          <TypographyLabel>
                            channel come from
                          </TypographyLabel>
                          <OutlinedInput
                            defaultValue={item.channelComeFrom}
                            autoFocus
                            required
                            margin="dense"
                            id={`channelComeFrom${idx}`}
                            name={`channelComeFrom${idx}`}
                            sx={{
                              width: 250,
                              height: 40,
                              background: "#E1E3FF80",
                              borderRadius: "10px",
                              borderColor: "e1e3ff",
                              outlineColor: "transparent",
                              "& .MuiOutlinedInput-input": {
                                fontSize: 14,
                                p: "9.5px 16px",
                              },
                            }}
                            // label="Email Address"
                            type="text"
                          />
                        </Box>
                        <Box>
                          <TypographyLabel>
                            Activation date
                          </TypographyLabel>
                          <OutlinedInput
                            defaultValue={item.activationDate}
                            autoFocus
                            required
                            margin="dense"
                            id={`activationDate${idx}`}
                            name={`activationDate${idx}`}
                            sx={{
                              width: 122,
                              height: 40,
                              background: "#E1E3FF80",
                              borderRadius: "10px",
                              borderColor: "e1e3ff",
                              outlineColor: "transparent",
                              "& .MuiOutlinedInput-input": {
                                fontSize: 14,
                                p: "9.5px 16px",
                              },
                            }}
                            // label="Email Address"
                            type="text"
                          />
                        </Box>
                        <Box>
                          <TypographyLabel>Activity</TypographyLabel>
                          <OutlinedInput
                            defaultValue={`${item.activity}%`}
                            autoFocus
                            required
                            margin="dense"
                            id={`activity${idx}`}
                            name={`activity${idx}`}
                            sx={{
                              width: 122,
                              height: 40,
                              background: "#E1E3FF80",
                              borderRadius: "10px",
                              borderColor: "e1e3ff",
                              outlineColor: "transparent",
                              "& .MuiOutlinedInput-input": {
                                fontSize: 14,
                                p: "9.5px 16px",
                              },
                            }}
                            // label="Email Address"
                            type="text"
                          />
                        </Box>
                      </Box>
                    )
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <TypographyLabel>Location</TypographyLabel>
                      <OutlinedInput
                        defaultValue={dataRow.location}
                        autoFocus
                        required
                        margin="dense"
                        id="location"
                        name="location"
                        sx={{
                          width: 250,
                          height: 40,
                          background: "#E1E3FF80",
                          borderRadius: "10px",
                          borderColor: "e1e3ff",
                          outlineColor: "transparent",
                          "& .MuiOutlinedInput-input": {
                            fontSize: 14,
                            p: "9.5px 16px",
                          },
                        }}
                        // label="Email Address"
                        type="text"
                      />
                    </Box>
                    <Box>
                      <TypographyLabel>Salary</TypographyLabel>
                      <OutlinedInput
                        defaultValue={`${dataRow.salaryMin}-${dataRow.salaryMax}`}
                        autoFocus
                        required
                        margin="dense"
                        id="salary"
                        name="salary"
                        sx={{
                          width: 250,
                          height: 40,
                          background: "#E1E3FF80",
                          borderRadius: "10px",
                          borderColor: "e1e3ff",
                          outlineColor: "transparent",
                          "& .MuiOutlinedInput-input": {
                            fontSize: 14,
                            p: "9.5px 16px",
                          },
                        }}
                        // label="Email Address"
                        type="text"
                        endAdornment={
                          <InputAdornment position="end">
                            {/* <IconButton
                              aria-label="toggle currency"
                              onClick={() => {}}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {"$"}
                            </IconButton> */}
                            <IconButton
                              // variant="contained"
                              sx={{
                                width: "37px",
                                height: "24px",
                                p: "2px 8px",
                                bgcolor: "primary.main",
                                borderRadius: "4px",
                                "&:hover": {
                                  bgcolor: "primary.main",
                                  boxShadow:
                                    "0px 2px 12px 0px #00000040",
                                },
                              }}
                              onClick={handleCheckCurrency}
                            >
                              <Typography color={"#fcfcfc"}>
                                {Currency[currencyCheck]}
                              </Typography>
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 12, color: "#9092d6" }}
                    >
                      Add infomation
                    </Typography>
                    <DialogActions>
                      <IconButton
                        type="submit"
                        // variant="contained"
                        sx={{
                          widows: 26,
                          height: 26,
                          p: "3px",
                          bgcolor: "primary.main",
                          borderRadius: "5px",
                          "&:hover": {
                            bgcolor: "primary.main",
                            boxShadow: "0px 2px 12px 0px #00000040",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            border: "1px solid #FCFCFC",
                            bgcolor: "transparent",
                            borderRadius: "5px",
                            width: 16.25,
                            height: 16.25,
                          }}
                        >
                          <Typography
                            color={"#FCFCFC"}
                            sx={{
                              position: "relative",
                              bottom: 4.5,
                              fontSize: 14,
                            }}
                          >
                            +
                          </Typography>
                        </Box>
                      </IconButton>
                    </DialogActions>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    fontSize={16}
                    color={"#5255bc"}
                    sx={{
                      fontWeight: "medium",
                      textTransform: "uppercase",
                      mb: 1.5,
                    }}
                  >
                    Activity
                  </Typography>
                  <OutlinedInput
                    defaultValue={dataRow?.comment}
                    autoFocus
                    multiline
                    // required
                    margin="dense"
                    id="comment"
                    name="comment"
                    placeholder="Write a comment..."
                    sx={{
                      width: 510,
                      background: "#E1E3FF80",
                      borderRadius: "10px",
                      borderColor: "e1e3ff",
                      outlineColor: "transparent",
                      "& .MuiOutlinedInput-input": {
                        fontSize: 14,
                        p: "9.5px 16px",
                      },
                    }}
                    type="text"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  pt: 2.5,
                  width: 168,
                  gap: 16,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    fontSize={16}
                    color="#5255bc"
                    fontWeight={500}
                    sx={{ mb: "6px" }}
                  >
                    Technologies
                  </Typography>
                  {dataRow.technologies.map(
                    (item: string, idx: number) => (
                      <Box
                        sx={{
                          bgcolor: "#e1e3ff",
                          borderRadius: "5px",
                          p: "7px 10px",
                        }}
                        key={idx}
                      >
                        <Typography fontSize={13} color={"#161616"}>
                          {item}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    fontSize={16}
                    color="#5255bc"
                    fontWeight={500}
                  >
                    ACTIONS
                  </Typography>
                  {dataRow.actions.map(
                    (
                      item: { title: string; data: string },
                      idx: number
                    ) => (
                      <Box
                        sx={{
                          bgcolor: "#e1e3ff",
                          borderRadius: "5px",
                          p: "7px 10px",
                        }}
                        key={idx}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontSize={13} color={"#5255bc"}>
                            {item.title}
                          </Typography>
                          <Typography fontSize={13} color={"#161616"}>
                            {item.data}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}
