import {
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GetApiData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (response) {
          setData(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [data]);

  return (
    <>
      {data.length > 0 ? (
        <>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                API Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value) => (
              <TableRow key={data.indexOf(value)}>
                <TableCell>{data.indexOf(value) + 1}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.username}</TableCell>
                <TableCell>{value.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      ) : (
        <>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                API Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableHead>
        </>
      )}
    </>
  );
};

export default GetApiData;
