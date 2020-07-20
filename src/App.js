import React, {useState} from 'react';
import TopBar from './TopBar.js';
import FileDisplay from './FileDisplay.js';
import axios from 'axios';

let selectedFileName = '';

function App() {

  const [userId, setUserId] = useState('')

  const [userFiles, setUserFiles] = useState()

  const [editFile, setEditFile] = useState(false);

  const [fileText, setFileText] = useState('Click any of the files to view there Content here')


  const userIdHandler = (event) => {
    setUserId(event.target.value);
  }

  const userFilesHandler = (files) => {
    setUserFiles(files)
  }

  const editFileHandler = () => {
    setEditFile(true)
  }

  const fileTextHandler = (text) => {
    setFileText(text)
  }

  const selectedFileNameHandler = (name) => {
    selectedFileName = name;
  }

  const cancelEditHandler= () => {
    setEditFile(false);
  }

  const saveEditedFile = () => {
    axios.defaults.headers.put['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';

    console.log("Updating file : " + selectedFileName)
    let formData = new FormData()
    formData.append('fileContent', fileText);

    axios.put(`http://localhost:8080/folder/`+ userId + `/file/`+ selectedFileName, formData)
      .then(res => {
        console.log("successfully updated file");
      })
      .catch(error => {
        console.log(error)
      })

      setEditFile(false);
  }

  return (
    <div>
    <TopBar userId={userId} userFiles={userFiles} userIdHandler={userIdHandler} userFilesHandler={userFilesHandler}
          editFileHandler={editFileHandler} saveEditedFile={saveEditedFile} cancelEditHandler={cancelEditHandler}/>
    {userFiles ? <FileDisplay userId={userId} userFiles={userFiles} editFile={editFile} fileText={fileText}
                        fileTextHandler={fileTextHandler} selectedFileNameHandler={selectedFileNameHandler}/> : undefined}
    {/*<FileDisplay userFiles={userFiles}/>*/}
    </div>
  );
}

export default App;
