import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { UpdateData } from "./store/DataSlice";

function Upload_data() {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const customData = JSON.parse(e.target.result);
          // Assign UUIDs to each question
          const updatedData = customData.map((item) => ({
            ...item,
            id: uuidv4(), // Generate unique ID for each question
          }));
          dispatch(UpdateData(updatedData));
        } catch {
          console.log("Somethig went wrong while uploading a file");
        }
      };
      reader.readAsText(file);
    }
  };

  return <input type="file" accept=".json" onChange={handleFileUpload} />;
}

export default Upload_data;
