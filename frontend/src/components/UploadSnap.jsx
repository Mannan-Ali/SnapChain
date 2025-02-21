import { useState } from "react";
import storeOnIPFS_Pinata from "../storage/ipfs.storage";

function UploadSnap() {
  const [file, setfiles] = useState("");
  const [description, setSnapDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      storeOnIPFS_Pinata(file,description);
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
      </form>
    </>
  );
}

export default UploadSnap;
