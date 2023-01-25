import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const nestedRows = (props) => {
  const keys = Object.keys(props);

  return keys.map((key, index) => {
    return (
      <TableRow key={index}>
        <TableCell>{props[key]}</TableCell>
      </TableRow>
    );
  });
};

export default nestedRows;
