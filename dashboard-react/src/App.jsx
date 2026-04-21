import { useEffect, useState } from "react";
import axios from "axios";
import {
  Gauge,
  BatteryCharging,
  Thermometer,
  AlertTriangle,
} from "lucide-react";

const API = "/api";

export default function App() {
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);

  async function loadData() {
    try {
      await axios.post(`${API}/analyze`, {
        rpm: Math.floor(Math.random() * 5000) + 2000,
        temp: Math.floor(Math.random() * 50) + 70,
        battery: (Math.random() * 2 + 11).toFixed(1),
      });

      const res = await axios.get(`${API}/history`);
      setHistory(res.data);

      if (res.data.length > 0) {
        setLatest(res.data[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadData();
    const t = setInterval(loadData, 2000);
    return () => clearInterval(t);
  }, []);

  const rpm = latest?.rpm || 0;
  const temp = latest?.temperature || 0;
  const battery = latest?.battery || 0;
  const alerts = latest?.alerts || "No alerts";

  const rpmPercent = Math.min((rpm / 8000) * 100, 100);
  const gaugeDegrees = rpmPercent * 3.6;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-widest">
              BMW M COCKPIT
            </h1>
            <p className="text-zinc-400">
              Vehicle Telemetry Performance Monitor
            </p>
          </div>

          <div className="text-green-400 font-bold text-lg animate-pulse">
            ● ONLINE
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* RPM TACOMETRO */}
          <div className="bg-zinc-900 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4 self-start">
              <Gauge className="text-blue-400" />
              <span className="text-xl">RPM</span>
            </div>

            <div className="relative w-56 h-56">
              <div
                className="absolute inset-0 rounded-full transition-all duration-700"
                style={{
                  background: `conic-gradient(
                    #3b82f6 0deg,
                    #ffffff ${gaugeDegrees / 2}deg,
                    #ef4444 ${gaugeDegrees}deg,
                    #18181b ${gaugeDegrees}deg
                  )`,
                }}
              />

              <div className="absolute inset-4 bg-black rounded-full flex flex-col items-center justify-center border border-zinc-800">
                <div className="text-sm text-zinc-400">ENGINE</div>
                <div className="text-5xl font-bold">{rpm}</div>
                <div className="text-sm text-zinc-500">RPM</div>
              </div>
            </div>
          </div>

          {/* TEMPERATURA */}
          <div className="bg-zinc-900 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Thermometer className="text-red-400" />
              <span className="text-xl">ENGINE TEMP</span>
            </div>

            <div className="text-5xl font-bold">{temp}°C</div>

            <div className="mt-6 h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-700"
                style={{ width: `${Math.min(temp, 120)}%` }}
              />
            </div>
          </div>

          {/* BATERIA */}
          <div className="bg-zinc-900 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <BatteryCharging className="text-green-400" />
              <span className="text-xl">BATTERY</span>
            </div>

            <div className="text-5xl font-bold">{battery}V</div>

            <div className="mt-6 h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-500 transition-all duration-700"
                style={{
                  width: `${Math.min((battery / 14) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ALERTAS */}
        <div className="mt-6 bg-zinc-900 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-yellow-400" />
            <span className="text-xl">SYSTEM ALERTS</span>
          </div>

          <div className="text-2xl text-red-400 font-semibold animate-pulse">
            {alerts}
          </div>
        </div>

        {/* HISTORIAL */}
        <div className="mt-6 bg-zinc-900 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">RECENT TELEMETRY</h2>

          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-zinc-400 border-b border-zinc-700">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">RPM</th>
                  <th className="text-left p-3">TEMP</th>
                  <th className="text-left p-3">BATTERY</th>
                  <th className="text-left p-3">ALERTS</th>
                </tr>
              </thead>

              <tbody>
                {history.slice(0, 8).map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                  >
                    <td className="p-3">{row.id}</td>
                    <td className="p-3">{row.rpm}</td>
                    <td className="p-3">{row.temperature}</td>
                    <td className="p-3">{row.battery}</td>
                    <td className="p-3 text-red-400">{row.alerts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}