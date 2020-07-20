import React  from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { FileIcon, defaultStyles } from 'react-file-icon';

export default function FileDisplay(props) {

  const fetchFileData = (name) => {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    console.log("File name : " + name.currentTarget.dataset.value);
    let fileName = name.currentTarget.dataset.value;

    props.selectedFileNameHandler(name.currentTarget.dataset.value);

    axios.get(`http://localhost:8080/folder/`+ props.userId + `/file/`+fileName)
      .then(res => {
        props.fileTextHandler(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container spacing={2} style={{marginTop:"30px", marginLeft:"20px"}}>
      <Grid item sm={3}>
        <Box border={1} borderRadius={6} color="text.primary"
            style={{ width:"100%", height:"100%"}}>
          {  props.userFiles.map(file => (
              <Grid container spacing={1} style={{marginTop:"10px", marginLeft:"10px"}}>
                <Grid item sm={2}>
                  <FileIcon size={5} extension="txt" {...defaultStyles.txt} />
                  </Grid>
                <Grid item sm={8} >
                  <p onClick={fetchFileData} data-value={file} style={{marginTop:"8px"}}>{file}</p>
                </Grid>
              </Grid>
            ))
          }
        </Box>
      </Grid>
      <Grid item sm={8}>
        {/*<textarea id="noter-text-area" name="textarea" style={{width:"100%", height:"100%"}}/>*/}
        {/*<input type="textArea" name="textValue" value={fileText} style={{width:"100%", height:"100%"}}/>*/}
        <Box border={1} borderRadius={6} color="text.primary"
            style={{ width:"100%", height:"100%"}}>
          <div
            contentEditable={props.editFile}
            onInput={e => props.fileTextHandler(e.currentTarget.textContent)}
             style={{ width:"100%", height:"100%", whiteSpace:"pre"}} >
            {props.fileText}
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
