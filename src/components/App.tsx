// styles
import "../styles/App.css";

// components
import Sidebar from "./Sidebar";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Weather />
    </div>
  );
}
