"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [topic, setTopic] = useState<string>("");
  const [transcript, setTranscript] = useState<string[]>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [usageCount, setUsageCount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [baseURL, setBaseUrl] = useState(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  useEffect(() => {
    const count = localStorage.getItem("usageCount");
    if (count) {
      setUsageCount(parseInt(count));
    }
  }, []);
  const handleGenerate = async () => {
    if (usageCount >= 3100) {
      setError("您已达到最大使用次数（3次）");
      return;
    }

    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tts: true }),
      });
      const data = await res.json();
      if (data.text && data.audio_file && data.timestamps) {
        const lines = data.text.split(/\n+/);
        setTranscript(lines);
        setTimestamps(data.timestamps);
        setAudioUrl(data.audio_file);
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        localStorage.setItem("usageCount", newCount.toString());
      } else {
        setError("服务器返回的数据不完整");
      }
    } catch (err: any) {
      setError("发生错误：" + err.message);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || timestamps.length === 0) return;
    const currentTime = audio.currentTime;
    // 找到当前播放时间对应的行：timestamp[i] <= currentTime < timestamp[i+1]
    let index = 0;
    for (let i = 0; i < timestamps.length; i++) {
      if (currentTime >= timestamps[i]) {
        index = i;
      } else {
        break;
      }
    }
    setCurrentLine(index);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-sans">
      <h1 className="text-3xl font-bold text-primary mb-4">AI 播客生成</h1>
      <div className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="请输入播客话题"
          className="px-4 py-2 w-80 rounded border border-gray-300"
        />
        <button
          onClick={handleGenerate}
          className="ml-2 px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
        >
          生成播客
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {audioUrl && (
        <div>
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            onTimeUpdate={handleTimeUpdate}
            className="w-full"
          />
        </div>
      )}
      {transcript.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-h-72 overflow-y-auto border">
          {transcript.map((line, index) => (
            <p
              key={index}
              className={`my-1 ${
                index === currentLine
                  ? "text-primary font-bold"
                  : "text-gray-800"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      )}
      <div className="mt-4 text-gray-600">使用次数：{usageCount} / 3</div>
    </div>
  );
}
