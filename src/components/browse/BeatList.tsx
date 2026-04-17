import BeatRow, { Beat } from "./BeatRow";

const beats: Beat[] = [
  { title: "Sky Is The Limit - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 190, key: "G min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Too Far Gone - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 140, key: "A♯ maj / B♭ maj", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Guilty Pleasure - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 134, key: "C♯ min / D♭ min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Apples Don't Fall Far - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 127, key: "C min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Back2DaCity - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 125, key: "C min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Intro Muzik 2", artist: "Tone Jonez", bpm: 0, key: "G♯ maj / A♭ maj", tags: ["Hip Hop", "Jay Z Type Beat", "Roc A Fella Type Beat"], price: "$75.00", verified: true },
  { title: "Silent Dreams - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 154, key: "G min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Special Love - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 172, key: "C♯ maj / D♭ maj", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Soul Cries - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 166, key: "D♯ maj / E♭ maj", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "SHINING STARS - BUY 1 GET 4 FREE", artist: "Yung Nab", bpm: 140, key: "B min", tags: ["Hip Hop"], price: "$25.00", verified: true },
  { title: "Midnight Drive", artist: "ProdByKane", bpm: 88, key: "F min", tags: ["Trap", "Drake Type Beat"], price: "$30.00", verified: true },
  { title: "City Lights", artist: "808Mafia", bpm: 145, key: "A min", tags: ["Trap"], price: "$45.00", verified: true },
];

const BeatList = () => {
  return (
    <div className="divide-y divide-border/30">
      {beats.map((b, i) => (
        <BeatRow key={i} beat={b} />
      ))}
    </div>
  );
};

export default BeatList;
