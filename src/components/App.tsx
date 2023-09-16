// components
import Sidebar from "./Sidebar";
import Weather from "./Weather";

// styles
import "../styles/App.css";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Weather />
    </div>
  );
}
