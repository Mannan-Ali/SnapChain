import { useState } from "react";
import storeOnIPFS_Pinata from "../utils/ipfs.storage.js";

function UploadSnap() {
  const [title, settitle] = useState("");
  const [file, setfiles] = useState("");
  const [description, setSnapDescription] = useState("");
  const [response, setresponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await storeOnIPFS_Pinata(title,file,description);
      setresponse(response);

    } catch (error) {
      console.log("Error while calling IPFS function: ", error);
    }
  };
  return (
    <>
      <h1>IPFS Tutorial - Upload your file</h1>
      <form action="#">
        <input
          type="file"
          onChange={(e) => {
            //here we are taking the first file of all the files uploaded basically only one file can be uploaded at a time.
            setfiles(e.target.files[0]);
          }}
        />
        <div>
        <label htmlFor="fname">Enter title</label>
          <input
            type="text"
            name="tname"
            id="tname"
            onChange={(e) => {
              settitle(e.target.value);
            }}
            value={title}
            placeholder="describe the event/img"
          />
          <label htmlFor="fname">Enter Description</label>
          <input
            type="text"
            name="fname"
            id="fname"
            onChange={(e) => {
              setSnapDescription(e.target.value);
            }}
            value={description}
            placeholder="describe the event/img"
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
        <h1>{response}</h1>
      </form>
    </>
  );
}

export default UploadSnap;
