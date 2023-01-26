export const validateLoginForm = (validationScheme) => {
  const { mail, password } = validationScheme;
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

const validatePassword = (password) => {
  return password.length > 5 && password.length < 13;
};

const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

const validateUsername = (username) => {
  return username.length > 2 && username.length < 13;
};

export const validateVehicleForm = (props) => {
  const { make, model, range, price } = props;
  const isMakeValid = validateMake(make);
  const isModelValid = validateModel(model);
  const isRangeValid = validateRange(range);
  const isPriceValid = validatePrice(price);

  return isMakeValid && isModelValid && isRangeValid && isPriceValid;
};

const validateMake = (make) => {
  return (
    make.length > 3 && !/[!@#\$%\^&\*\(\)\{\}\[\]:;""'<>\?,\.\/|\\]/g.test(make)
  );
};

const validateModel = (model) => {
  return (
    model.length > 3 &&
    !/[!@#\$%\^&\*\(\)\{\}\[\]:;""'<>\?,\.\/|\\]/g.test(model)
  );
};

const validateRange = (range) => {
  return /^[0-9]+(km)$/.test(range);
};

const validatePrice = (price) => {
  return /^[0-9]+$/.test(price);
};

export const validateAnnouncementForm = ({ title, description }) => {
  let errors = {};
  let isValid = true;

  if (!title) {
    isValid = false;
    errors.title = "Title is required";
  } else if (title.length < 5) {
    isValid = false;
    errors.title = "Title must be at least 5 characters long";
  }

  if (!description) {
    isValid = false;
    errors.description = "Description is required";
  } else if (description.length < 10) {
    isValid = false;
    errors.description = "Description must be at least 10 characters long";
  }

  return {
    errors,
    isValid,
  };
};
export const validateTaskForm = ({ title, description, time, coinsToEarn }) => {
  let errors = {};
  let isValid = true;

  if (!title) {
    isValid = false;
    errors.title = "Title is required";
  } else if (title.length < 5) {
    isValid = false;
    errors.title = "Title must be at least 5 characters long";
  }

  if (!description) {
    isValid = false;
    errors.description = "Description is required";
  } else if (description.length < 10) {
    isValid = false;
    errors.description = "Description must be at least 10 characters long";
  }

  if (!time) {
    isValid = false;
    errors.time = "Time is required";
  }

  if (!coinsToEarn) {
    isValid = false;
    errors.coinsToEarn = "Coins to earn is required";
  }

  return {
    errors,
    isValid,
  };
};
