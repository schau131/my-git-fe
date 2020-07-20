import React from 'react';
import { TextField, Button } from '@material-ui/core';

const BeforeLogin = (props) => {

  const startButtonStyle = {
    marginLeft: "20px",
    marginTop: "10px",
    width: "150px",
    textTransform: "none"
  }

  return(
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Your ID please" onChange={(event) => props.userIdHandler(event)}/>
      <Button onClick={props.fetchData} variant="contained" style={startButtonStyle}>
       Log In
      </Button>
    </form>);
}

export default BeforeLogin;
