import Webcam from "react-webcam";

export default function Live() {
  return (
    <div>

      <h1 className="text-4xl text-white font-bold mb-6">
        Live Detection
      </h1>

      <div className="bg-slate-900 rounded-3xl p-6">

        <Webcam
          className="rounded-2xl w-full"
        />

      </div>

    </div>
  );
}