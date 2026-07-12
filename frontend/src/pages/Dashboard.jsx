import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Upload, Camera, Square, RotateCcw } from "lucide-react";

import StatCard from "../components/common/StatCard";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartCard from "../components/charts/BarChartCard";

export default function Dashboard() {

  const fileInputRef = useRef(null);

  const webcamRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [liveMode, setLiveMode] = useState(false);

  const [hasPrediction, setHasPrediction] = useState(false);

  const [prediction, setPrediction] = useState({
    class: "--",
    confidence: "--",
    category: "--"
  });

  const [stats, setStats] = useState([
    {
      title: "Biodegradable",
      value: "--",
      color: "bg-green-500",
    },
    {
      title: "Non-Biodegradable",
      value: "--",
      color: "bg-red-500",
    },
    {
      title: "E-Waste",
      value: "--",
      color: "bg-blue-500",
    },
    {
      title: "Detected Objects",
      value: "--",
      color: "bg-yellow-500",
    },
  ]);

  const handleImageUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setSelectedImage(imageURL);

    setLiveMode(false);

    console.log(file);

    /*
      NEXT STEP

      axios.post("/predict", file)

      setPrediction(...)

      setStats(...)

      setHasPrediction(true)

    */

  };

  const startLive = () => {

    setSelectedImage(null);

    setLiveMode(true);

  };

  const stopLive = () => {

    setLiveMode(false);

  };

  const resetDashboard = () => {

    setSelectedImage(null);

    setLiveMode(false);

    setHasPrediction(false);

    setPrediction({
      class: "--",
      confidence: "--",
      category: "--"
    });

    setStats([
      {
        title: "Biodegradable",
        value: "--",
        color: "bg-green-500",
      },
      {
        title: "Non-Biodegradable",
        value: "--",
        color: "bg-red-500",
      },
      {
        title: "E-Waste",
        value: "--",
        color: "bg-blue-500",
      },
      {
        title: "Detected Objects",
        value: "--",
        color: "bg-yellow-500",
      },
    ]);

    if(fileInputRef.current){

      fileInputRef.current.value="";

    }

  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Intelligent Waste Segregation Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            AI Powered Waste Detection & Analytics
          </p>

        </div>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-green-400 font-medium">
            AI Ready
          </span>

        </div>

      </div>

      {/* Action Buttons */}

      <div className="grid grid-cols-4 gap-4">

        <button className="bg-green-600 hover:bg-green-500 transition rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold">

          <Upload size={22} />

          Upload Image

        </button>

        <button className="bg-blue-600 hover:bg-blue-500 transition rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold">

          <Camera size={22} />

          Start Live

        </button>

        <button className="bg-red-600 hover:bg-red-500 transition rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold">

          <Square size={22} />

          Stop

        </button>

        <button className="bg-slate-700 hover:bg-slate-600 transition rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold">

          <RotateCcw size={22} />

          Reset

        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Waste Distribution
          </h2>

          {hasPrediction ? (
            <PieChartCard />
          ) : (
            <div className="h-[260px] flex items-center justify-center text-slate-500">
              No prediction available
            </div>
          )}

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Waste Count
          </h2>

          {hasPrediction ? (
            <BarChartCard />
          ) : (
            <div className="h-[260px] flex items-center justify-center text-slate-500">
              Waiting for detection...
            </div>
          )}

        </div>

      </div>

      {/* Preview & Prediction */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Live Preview / Uploaded Image
          </h2>

          <div className="h-[350px] rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500">

            No Image / Camera Feed

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Prediction Details
          </h2>

          {!hasPrediction ? (

            <div className="h-[350px] flex items-center justify-center text-slate-500">

              Waiting for AI Prediction...

            </div>

          ) : (

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>Detected Class</span>
                <span>Plastic</span>
              </div>

              <div className="flex justify-between">
                <span>Confidence</span>
                <span>98%</span>
              </div>

              <div className="flex justify-between">
                <span>Category</span>
                <span>Non-Biodegradable</span>
              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}