import makeReaquest from "./components/home/makerequest";

const multerupload = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await makeReaquest.post("/upload", formData);
        return res.data;
    } catch (error) {
        console.log(error.response.data);
    }
};
export default multerupload;

// we need to add path in image src ={"/upload"} like something...;
