import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { isValidEmail } from "../../helpers";
import Joi from "joi";
import { createUserAction } from "../../store/user/asyncActions";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton, InputAdornment } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Signin = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const createUserData = useSelector((state) => state?.user?.createUser);

  useEffect(() => {
    document.title = 'Sign in - User App';
  }, []);

  useEffect(() => {
    if (createUserData?.data?.success) {
      createUserData.data = null;
      history.push('/users');
    }
  }, [createUserData]);

  const [loginFormData, setLoginFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const loginDataHandleChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  }

  const handleMobileChange = (e) => {
    let newValue = e.target.value.replace(/\s/g, '');
    if (newValue.length <= 10 && !isNaN(newValue)) {
      setLoginFormData({
        ...loginFormData,
        [e.target.name]: newValue
      });
    } else {
      e.preventDefault();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    mobile: Joi.string()
      .required()
      .pattern(/^\d{10}$/)
      .message('Mobile number must be a 10-digit number without any spaces or special characters')
      .label('Mobile'),
    password: Joi.string().min(8).required().label('Password'),
  });

  const login = (e) => {
    e.preventDefault();

    const validationResult = schema.validate(loginFormData, { abortEarly: false });

    if (validationResult.error) {
      const validationErrors = {};
      validationResult.error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(createUserAction(loginFormData));
    }
  }

  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={(e) => { login(e) }}>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <Typography variant="h3">
                    Create User
                  </Typography>
                  <Typography variant="caption">
                    Register new user to continue.
                  </Typography>
                </div>
                <TextField
                  name="name"
                  label="Name"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={loginFormData?.name}
                  error={errors?.name}
                  helperText={errors?.name}
                  onChange={(e) => loginDataHandleChange(e)}
                />
                <TextField
                  name="email"
                  label="E-Mail"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={loginFormData?.email}
                  error={errors?.email}
                  helperText={errors?.email}
                  onChange={(e) => loginDataHandleChange(e)}
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={loginFormData?.mobile}
                  error={errors?.mobile}
                  helperText={errors?.mobile}
                  onChange={(e) => handleMobileChange(e)}
                />
                <TextField
                  name="password"
                  label="Password"
                  className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={loginFormData?.password}
                  error={errors?.password}
                  helperText={errors?.password}
                  onChange={(e) => loginDataHandleChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()} // Prevents focus change
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  className='mt-2'
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={createUserData?.loading ? true : false}
                >
                  Create User
                </Button>
                {/* <div className="pt-1 text-md-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                </div> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
