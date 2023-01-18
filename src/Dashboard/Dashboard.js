import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [electricCars, setElectricCars] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5002/")
      .then((response) => {
        setElectricCars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const auto =  [car.range, car.make, car.model]
  return <div>{electricCars.map((car) => car.price)}</div>;
};

export default Dashboard;
