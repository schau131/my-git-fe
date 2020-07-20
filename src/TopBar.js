import React, {useState} from 'react';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AfterLogin from './AfterLogin.js';
import BeforeLogin from './BeforeLogin.js';
import axios from 'axios';


const TopBar = (props) => {

  const [userLogin, setUserLogin] = useState(false)

  const [alert, setAlert] = useState('');

  const alertHandler = (alertMessage) => {
    setAlert(alertMessage);
  }

  const userLoginHandler = (userLogin) => {
    setUserLogin(userLogin);
  }

  const fetchData = () => {
    alertHandler('')
    if(!props.userId) {
      console.log('User Id is required')
      alertHandler('User Id is required')
      return
    }

    axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.get(`http://localhost:8080/user/`+ props.userId)
      .then(res => {
        console.log("User file Names : " + res.data.fileNames)
        props.userFilesHandler(res.data.fileNames ? res.data.fileNames : undefined)
        userLoginHandler(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Container>
      { userLogin ?
        <div><AfterLogin userId={props.userId} fetchData={fetchData} editFileHandler={props.editFileHandler}
                            saveEditedFile={props.saveEditedFile} cancelEditHandler={props.cancelEditHandler}/>
        { props.userFiles ?
          undefined :
          <Alert severity="info" style={{marginTop:"10px"}}>You have not uploaded any files yet.</Alert>
        }
        </div>
        : <BeforeLogin userIdHandler={props.userIdHandler} fetchData={fetchData}/>
      }
    </Container>
  );

}

export default TopBar;
