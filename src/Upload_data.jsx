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

          localStorage.setItem("uploadedDataSet", JSON.stringify(updatedData));
          dispatch(UpdateData(updatedData));
        } catch {
          console.log("Somethig went wrong while uploading a file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex items-center h-full ">
      <label className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out">
        Upload Data
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      {/* {fileName && (
        <p className="mt-2 text-sm text-gray-600">File: {fileName}</p>
      )} */}
    </div>
  );
}

export default Upload_data;
