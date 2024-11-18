import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Eye,
  EyeSlash,
  Lock,
  LockRound,
  User,
} from "../assets/icons";
import { Form, redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/auth/auth-slice";

import {loginRequest} from "../shared/api/auth-api";

const defaultValues = {
  login: "",
  password: "",
};

export const loginAction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();

  const loginData = {
    login: formData.get("login"),
    password: formData.get("password"),
  };
  console.log("loginData", loginData);
  // await axios.post("/login", data);
  return redirect("/dashboard");
};
type Props = {};

export const LoginPage: React.FC<Props> = (_props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    reset,
    // setValue,
    control,
    formState: {
      errors,
      isValid,
      // isSubmitting,
      dirtyFields,
    },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm: SubmitHandler<{
    login: string;
    password: string;
  }> = async (data: any) => {
    try {
     await loginRequest(data);
      reset(defaultValues);
      dispatch(changeUser(data));
      navigate("/telegram-groups");
    }
    catch(error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#e1e3ff",
          pt: 6,
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: 440,
            mx: "auto",
            borderRadius: "20px",
            boxShadow: "0px 2px 12px 0px #00000040",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              p: "26px 24px",
            }}
          >
            <LockRound fontSize="large" />
            <Typography
              variant="subtitle1"
              component="h2"
              color={"#5255bc"}
            >
              Enter login and password
            </Typography>
          </Box>
          <Form
            method="post"
            action="/login"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                bgcolor: "#fcfcfc",
                p: "76px 24px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                borderTop: "1px solid #5255bc",
              }}
            >
              <FormControl variant="outlined">
                <Typography
                  sx={{ mb: 0.5 }}
                  color={"#5255bc"}
                  variant="caption"
                  component="p"
                >
                  Login
                </Typography>
                <Controller
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      error={!!errors.login}
                      sx={{
                        pl: 0,
                        borderRadius: "10px",
                        bgcolor: "#e1e3ff",
                        color: "#161616",
                        "& fieldset": { border: "none" },
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: dirtyFields.login
                                ? "#5255bc"
                                : "#9092d6",
                              width: 40,
                              height: "56px",
                              // m: 0,
                              borderRadius: "10px 0 0 10px",
                            }}
                          >
                            <User fill="#e1e3ff" />
                          </Box>
                        </InputAdornment>
                      }
                      label="login"
                      placeholder="Enter your login"
                      type="text"
                    />
                  )}
                  defaultValue=""
                  name="login"
                  rules={{
                    required: "Input correct login",
                  }}
                  control={control}
                />
                {
                  <FormHelperText
                    sx={{
                      color: "red",
                      fontSize: 12,
                      position: "absolute",
                      bottom: -20,
                    }}
                  >
                    {/* {JSON.stringify(isValid)} */}
                    {errors.login?.message}
                  </FormHelperText>
                }
                {/* <MyFormHelperText /> */}
              </FormControl>
              <FormControl variant="outlined">
                <Typography
                  sx={{ mb: 0.5 }}
                  color={"#5255bc"}
                  variant="caption"
                  component="p"
                >
                  Password
                </Typography>
                <Controller
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      error={!!errors.password}
                      sx={{
                        pl: 0,
                        borderRadius: "10px",
                        bgcolor: "#e1e3ff",
                        color: "#161616",
                        "& fieldset": { border: "none" },
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: dirtyFields.password
                                ? "#5255bc"
                                : "#9092d6",
                              width: 40,
                              height: "56px",
                              // m: 0,
                              borderRadius: "10px 0 0 10px",
                            }}
                          >
                            <Lock fill="#e1e3ff" />
                          </Box>
                        </InputAdornment>
                      }
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <EyeSlash
                                fill="#161616"
                                fontSize="small"
                              />
                            ) : (
                              <Eye fill="#161616" fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      placeholder="Enter password"
                    />
                  )}
                  name="password"
                  rules={{
                    required: "Input correct password",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                  }}
                  control={control}
                />
                <FormHelperText
                  sx={{
                    color: "red",
                    fontSize: 12,
                    position: "absolute",
                    bottom: -20,
                  }}
                >
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!isValid}
                sx={{
                  display: "block",
                  p: "10px 36px",
                  borderRadius: 1.25,
                  width: "auto",
                  ml: "auto",
                  bgcolor: isValid ? "#5255bc" : "#9092d6",
                  mt: 5,
                  mb: 5,
                }}
              >
                ENTER
              </Button>
            </Box>
          </Form>
        </Box>
        <Typography
          sx={{ mt: 2, textAlign: "center" }}
          color={"#5255bc"}
          variant="caption"
          component="p"
        >
          ® All rights reserved
        </Typography>
      </Box>
    </>
  );
};
