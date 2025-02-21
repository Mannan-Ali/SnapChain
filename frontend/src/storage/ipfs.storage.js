import axios from "axios";
const storeOnIPFS_Pinata = async (snapImage,snapDiscription) => {
    try {
        const fileData = new FormData();
        fileData.append("file", snapImage);

        //uploading image
        const imgResponseData = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
                "Content-Type": "multipart/form-data",
            },
            data: fileData,
        });
        const fileUrl = "https://gateway.pinata.cloud/ipfs/" + imgResponseData.data.IpfsHash;

        //uploading json with description
        const metadata = {
            image: fileUrl,
            description:snapDiscription,
        }

        const metadataResponse = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(metadata),
        })
        const metaDataUrl = "https://gateway.pinata.cloud/ipfs/" + metadataResponse.data.IpfsHash;
        console.log(metaDataUrl);

    } catch (error) {
        console.log("Error occured while submitting: ", error);
    }
};

export default storeOnIPFS_Pinata;