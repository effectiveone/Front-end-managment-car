import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "../shared/components/InputWithLabel";
import { addItem } from "../store/actions/itemActions";
import Layout from "../shared/components/Layout";
import Dashboard from "./Dashboard";
import { validateVehicleForm } from "../shared/utils/validators";
import AlertNotification from "../shared/components/AlertNotification";

const AddNewVehicleForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [range, setRange] = useState("");
  const [price, setPrice] = useState("");
  const [isFormValid, setIsFormValid] = useState(null);
  const [makeError, setMakeError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [rangeError, setRangeError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.auth?.userDetails);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVehicle = { make, model, range, price };
    setIsFormValid(validateVehicleForm({ make, model, range, price }));

    if (make.length < 3) {
      setMakeError("Make should be at least 3 characters long");
    }
    if (model.length < 3) {
      setModelError("Model should be at least 3 characters long");
    }
    if (!price.endsWith("$")) {
      setPriceError("Price should end with $");
    }
    if (!range.endsWith("km")) {
      setRangeError("Range should end with km");
    }

    if (isFormValid) {
      dispatch(addItem(newVehicle, user));
      setIsVisible(true);
      setMake("");
      setModel("");
      setPrice("");
      setRange("");
    }
  };

  return (
    <>
      {user.isAdmin ? (
        <>
          <Layout>
            <form onSubmit={handleSubmit}>
              <AlertNotification typeOfAlert="success" />
              <InputWithLabel
                label="Make"
                value={make}
                setValue={setMake}
                placeholder="Enter the make of the vehicle"
                error={makeError}
                setError={setMakeError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Model"
                value={model}
                setValue={setModel}
                placeholder="Enter the model of the vehicle"
                error={modelError}
                setError={setModelError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Range"
                value={range}
                setValue={setRange}
                placeholder="Enter the range of the vehicle"
                error={rangeError}
                setError={setRangeError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Price"
                value={price}
                setValue={setPrice}
                placeholder="Enter the price of the vehicle"
                error={priceError}
                setError={setPriceError}
                isFormValid={isFormValid}
              />
              <button type="submit">Add new vehicle</button>
            </form>
          </Layout>
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default AddNewVehicleForm;
