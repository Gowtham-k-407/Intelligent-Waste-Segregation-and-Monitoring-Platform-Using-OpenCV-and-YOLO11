import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export default function Upload() {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center items-center h-full">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <div className="w-[700px] bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div
          className="border-2 border-dashed border-green-500 rounded-3xl p-12 cursor-pointer hover:bg-slate-800 transition"
          onClick={() => inputRef.current.click()}
        >

          {!image ? (

            <div className="flex flex-col items-center">

              <UploadCloud
                size={70}
                className="text-green-500"
              />

              <h2 className="text-white text-2xl mt-6">
                Upload Waste Image
              </h2>

              <p className="text-slate-400 mt-3">
                Click to choose an image
              </p>

            </div>

          ) : (

            <img
              src={image}
              alt="Preview"
              className="rounded-2xl max-h-[450px] mx-auto"
            />

          )}

        </div>

      </div>

    </div>
  );
}