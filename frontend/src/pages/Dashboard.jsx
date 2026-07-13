import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import {
  Upload,
  Camera,
  Square,
  RotateCcw,
} from "lucide-react";

import StatCard from "../components/common/StatCard";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartCard from "../components/charts/BarChartCard";

import { predictImage } from "../services/api";

export default function Dashboard() {

  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);



  const [selectedImage, setSelectedImage] = useState(null);

  const [liveMode, setLiveMode] = useState(false);

  const [prediction, setPrediction] = useState({
    class: "--",
    confidence: "--",
    category: "--",
  });


  const defaultStats = [
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
    title: "Detected Objects",
    value: "--",
    color: "bg-yellow-500",
  },
];

  const [stats, setStats] = useState(defaultStats);



  const [pieData, setPieData] = useState([]);

  const [barData, setBarData] = useState([]);


  const updateDashboard = (result) => {

    const isBio =
      result.prediction === "Biodegradable";

    const bioPercent = isBio
      ? result.confidence
      : 100 - result.confidence;

    const nonBioPercent = isBio
      ? 100 - result.confidence
      : result.confidence;

    setPrediction({

      class: result.prediction,

      confidence: result.confidence + "%",

      category: result.prediction,

    });

    setStats([

      {
        title: "Biodegradable",
        value: bioPercent.toFixed(2) + "%",
        color: "bg-green-500",
      },

      {
        title: "Non-Biodegradable",
        value: nonBioPercent.toFixed(2) + "%",
        color: "bg-red-500",
      },

      {
        title: "Detected Objects",
        value: "1",
        color: "bg-yellow-500",
      },

    ]);

    setPieData([

      {
        name: "Biodegradable",
        value: bioPercent,
      },

      {
        name: "Non-Biodegradable",
        value: nonBioPercent,
      },

    ]);

    setBarData([

      {
        name: "Biodegradable",
        count: isBio ? 1 : 0,
      },

      {
        name: "Non-Biodegradable",
        count: isBio ? 0 : 1,
      },

    ]);

  };

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(
      URL.createObjectURL(file)
    );

    setLiveMode(false);

    try {

      const result =
        await predictImage(file);

      updateDashboard(result);

    } catch (err) {

      console.error(err);

      alert("Prediction Failed");

    }

  };


  const captureFrame = async () => {

    if (!webcamRef.current) return;

    const imageSrc =
      webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    const blob =
      await (await fetch(imageSrc)).blob();

    const file = new File(

      [blob],

      "frame.jpg",

      {
        type: "image/jpeg",
      }

    );

    try {

      const result =
        await predictImage(file);

      updateDashboard(result);

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    if (!liveMode) return;

    const interval = setInterval(() => {

      captureFrame();

    }, 2000);

    return () => clearInterval(interval);

  }, [liveMode]);


  const resetDashboard = () => {

    setSelectedImage(null);

    setLiveMode(false);

    setPrediction({

      class: "--",

      confidence: "--",

      category: "--",

    });

    setStats(defaultStats);

    setPieData([]);

    setBarData([]);

    if (fileInputRef.current)

      fileInputRef.current.value = "";

  };
    return (
    <div className="space-y-8">

      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-green-600 hover:bg-green-500 rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold transition"
        >
          <Upload size={20} />
          Upload Image
        </button>

        <button
          onClick={() => setLiveMode(true)}
          className="bg-blue-600 hover:bg-blue-500 rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold transition"
        >
          <Camera size={20} />
          Start Live
        </button>

        <button
          onClick={() => setLiveMode(false)}
          className="bg-red-600 hover:bg-red-500 rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold transition"
        >
          <Square size={20} />
          Stop
        </button>

        <button
          onClick={resetDashboard}
          className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 flex items-center justify-center gap-3 text-white font-semibold transition"
        >
          <RotateCcw size={20} />
          Reset
        </button>

      </div>

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Waste Distribution
          </h2>

          <PieChartCard data={pieData} />

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Waste Count
          </h2>

          <BarChartCard data={barData} />

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Live Preview / Uploaded Image
          </h2>

          <div className="h-[350px] rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">

            {liveMode ? (

              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />

            ) : selectedImage ? (

              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />

            ) : (

              <p className="text-slate-500">
                No Image / Camera Feed
              </p>

            )}

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">

          <h2 className="text-white text-xl font-semibold mb-4">
            Prediction Details
          </h2>

          <div className="space-y-4 text-white">

            <div className="flex justify-between">

              <span>Detected Class</span>

              <span>{prediction.class}</span>

            </div>

            <div className="flex justify-between">

              <span>Confidence</span>

              <span>{prediction.confidence}</span>

            </div>

            <div className="flex justify-between">

              <span>Category</span>

              <span>{prediction.category}</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}