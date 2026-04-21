import axios from "axios";

const API = "/api/analyze";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function startDemo() {
  setInterval(async () => {
    const payload = {
      rpm: random(1800, 7200),
      temp: random(70, 115),
      battery: (Math.random() * (13.8 - 11.0) + 11.0).toFixed(1)
    };

    try {
      await axios.post(API, payload);
      console.log("sent", payload);
    } catch (e) {
      console.log(e);
    }
  }, 2000);
}
