import axios from "axios";
const storeOnIPFS_Pinata = async (snapTitle, snapImage, snapDiscription) => {
    try {
        console.log("snapTitle:", snapTitle);
        console.log("snapImage:", snapImage);
        console.log("snapDescription:", snapDiscription);

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
            title: snapTitle,
            image: fileUrl,
            description: snapDiscription,
        }

        const metadataResponse = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(
                {
                    pinataMetadata:{
                        name:snapTitle,
                    },
                    pinataContent: metadata,
                }
            ),
        })
        const metaDataUrl = "https://gateway.pinata.cloud/ipfs/" + metadataResponse.data.IpfsHash;
        console.log(metaDataUrl);
        return metadataResponse.data.IpfsHash;

    } catch (error) {
        console.log("Error occured while submitting: ", error);
    }
};

export default storeOnIPFS_Pinata;