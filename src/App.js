import "./App.css";
import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import GetApiData from "./Components/GetApiData";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .trim("Name cannot include leading and trailing spaces")
      .strict(true)
      .matches(/^[A-Za-z ]*$/, "Please enter a valid Name")
      .min(2, "Name must be at least 2 characters")
      .max(20, "Name must not exceed 20 characters"),
    username: Yup.string()
      .required("Username is required")
      .trim("The Username cannot include leading and trailing spaces")
      .strict(true)
      .matches(/^[A-Za-z_]*$/, "Please enter a valid Username")
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .max(50, "Email must not exceed 50 characters"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data) => {
    setInputs((input) => [...input, data]);
    reset();
    handleClose();
  };

  return (
    <Box className="App">
      <br />
      <Typography variant="h4">Assignment</Typography>
      <br />
      <Button onClick={handleOpen} variant="contained">
        Add User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Fill the details</Typography>
            <Table size="small">
              <TableBody>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell>Enter your name:</TableCell>
                  <TableCell>
                    <TextField
                      required
                      size="small"
                      type="text"
                      name="name"
                      {...register("name")}
                      error={errors["name"] ? true : false}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell colSpan={2}>
                    {errors["name"] ? (
                      <span style={{ color: "#c62828" }}>
                        <ErrorMessage errors={errors} name="name" />
                      </span>
                    ) : (
                      <br />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell>Enter your username:</TableCell>
                  <TableCell>
                    <TextField
                      required
                      size="small"
                      type="text"
                      name="username"
                      {...register("username")}
                      error={errors["username"] ? true : false}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell colSpan={2}>
                    {errors["username"] ? (
                      <span style={{ color: "#c62828" }}>
                        <ErrorMessage errors={errors} name="username" />
                      </span>
                    ) : (
                      <br />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell>Enter your email:</TableCell>
                  <TableCell>
                    <TextField
                      required
                      size="small"
                      type="email"
                      name="email"
                      {...register("email")}
                      error={errors["email"] ? true : false}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell colSpan={2}>
                    {errors["email"] ? (
                      <span style={{ color: "#c62828" }}>
                        <ErrorMessage errors={errors} name="email" />
                      </span>
                    ) : (
                      <br />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ td: { border: 0 } }}>
                  <TableCell colSpan={2}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </Box>
      </Modal>
      <br />
      <br />
      <TableContainer>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Table
              sx={{
                maxWidth: 1000,
                border: "2px solid black",
                mb: "100px",
                p: "5px",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Website</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              {inputs.length > 0 && (
                <>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        Input Data
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputs.map((value) => (
                      <TableRow key={inputs.indexOf(value)}>
                        <TableCell>{inputs.indexOf(value) + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.username}</TableCell>
                        <TableCell>{value.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              )}
              <GetApiData />
            </Table>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default App;
