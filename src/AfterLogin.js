import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

let enableAdd = false;

const AfterLogin = (props) => {

  const [fileOpen, setFileOpen] = useState(false)

  const startButtonStyle = {
    marginLeft: "20px",
    marginTop: "10px",
    width: "150px",
    textTransform: "none"
  }

  const handleClose = () => {
    setFileOpen(false);
  }

  const handleOpen = () => {
    setFileOpen(true);
  }

  const handleSave = (files) => {
    console.log("Saving file : " + files)
    let formData = new FormData()

    files.map(file =>
      formData.append('files', file)
    );

    axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`http://localhost:8080/user/`+ props.userId, formData)
      .then(res => {
        console.log(res.data)
        props.fetchData()
      })
      .catch(error => {
        console.log(error)
      })
    handleClose()
  }

  const editFileHandler = () => {
    props.editFileHandler()
    enableAdd = true;
  }

  const cancelEditHandler = () => {
    enableAdd = false;
    props.cancelEditHandler()
  }

  const saveEditedFile = () => {
    enableAdd = false;
    props.saveEditedFile();
  }

  return(
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Logged in as" value={props.userId} disabled={true}/>
      <Button onClick={handleOpen} variant="contained" color="primary" style={startButtonStyle}>
       Add Files
      </Button>
      <Button onClick={editFileHandler} variant="contained" color="primary" style={startButtonStyle}>
       Edit File
      </Button>
      {enableAdd ? <Button onClick={saveEditedFile} variant="contained" color="primary" style={startButtonStyle}>
       Save File
      </Button> : undefined}
      {enableAdd ? <Button onClick={cancelEditHandler} variant="contained" color="primary" style={startButtonStyle}>
       Cancel
      </Button> : undefined}
      <DropzoneDialog
        open={fileOpen}
        onSave={handleSave}
        acceptedFiles={[]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        />
    </form>);
}

export default AfterLogin;
