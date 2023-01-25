import { useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";

const useNestedRows = (propsArray) => {
  const [nestedRows, setNestedRows] = useState([]);

  const formatDate = (argument) => {
    const date = new Date(argument);

    if (!isNaN(argument)) {
      return argument;
    }
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
    return argument;
  };

  useEffect(() => {
    if (propsArray) {
      const newNestedRows = propsArray.map((props, index) => {
        const keys = Object.keys(props).filter(
          (key) => key !== "id" && key !== "_id" && key !== "__v"
        );
        console.log("keys", keys);
        return (
          <TableRow key={index}>
            {keys.map((key, index) => (
              <TableCell key={index}>{formatDate(props[key])}</TableCell>
            ))}
          </TableRow>
        );
      });
      setNestedRows(newNestedRows);
    }
  }, [propsArray]);

  return nestedRows;
};

export default useNestedRows;
