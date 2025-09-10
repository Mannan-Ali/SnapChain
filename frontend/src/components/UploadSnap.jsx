/* eslint-disable react/prop-types */
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import storeOnIPFS_Pinata from "../utils/ipfs.storage.js";

function UploadSnap() {
  const {provider, dApp } = useOutletContext();

  const [title, settitle] = useState("");
  const [file, setfiles] = useState("");
  const [description, setSnapDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = await provider.getSigner();

      if(!signer) throw new Error("Signer is not set yet!");

      const response = await storeOnIPFS_Pinata(title, file, description);
      console.log("proiver:",provider);

      if (!response) throw new Error("No IPFS hash received from Pinata");

      let callCaptureSnap = await dApp
        .connect(signer)
        .captureSnap(response);

      await callCaptureSnap.wait();
      console.log("Snap successfully uploaded to blockchain!");

      // ✅ Clear the form after success
      settitle("");
      setfiles("");
      setSnapDescription("");

      // Also reset file input visually
      document.getElementById("snap-upload").value = "";

    } catch (error) {
      console.log("Error while calling uploading file function: ", error);
    }
  };
  return (
    <section className="desc section" id="desc">
      <h2 className="section__title">
        Upload your Memories
      </h2>
      <div className="desc__container container grid">
        <div className="form-container">
          <form action="#">
            <div className="uploadSnap_input_container">
              <div>
                <label htmlFor="tname">Enter title</label>
                <input
                  type="text"
                  name="tname"
                  id="tname"
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  value={title}
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="snap-upload" className="custom-file-upload">
                  Select your Snap
                </label>
                <input
                  id="snap-upload"
                  type="file"
                  onChange={(e) => {
                    //here we are taking the first file of all the files uploaded basically only one file can be uploaded at a time.
                    setfiles(e.target.files[0]);
                  }}
                />
              </div>
              <div className="description_sec">
                <label htmlFor="fname">Enter Description</label>
                <textarea
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={(e) => {
                    setSnapDescription(e.target.value);
                  }}
                  value={description}
                  placeholder="Describe the moment"
                />
              </div>
              <div className="button-container">
                <button type="submit" onClick={handleSubmit}>
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UploadSnap;
