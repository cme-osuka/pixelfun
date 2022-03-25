import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Box(props) {
  function changeColor() {
    axios.post("https://colors.osuka.dev/grid", {
      user: "Oscar",
      color: props.selectedColor,
      position: {
        x: props.x,
        y: props.y
      }
    })
  }

  return (
    <div
      onClick={changeColor}
      style={{
        background: props.color,
        width: "30px",
        height: "30px",
        margin: "1px",
      }}
    ></div>
  );
}

function App() {
  const [grid, setGrid] = useState(null);
  const [color, setColor] = useState("#f3f3f3")

  function getGrid() {
    axios
      .get("https://colors.osuka.dev/grid")
      .then((res) => {
        // Sätta vårt state
        setGrid(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const id = setInterval(() => getGrid(), 100)
    return () => clearInterval(id)
  }, []);

  if (!grid) return <p>Loading...</p>;

  return (
    <div className="App">
      <header className="App-header">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />

        {grid.map((y, yPos) => {
          return (
            <div style={{ display: "flex" }}>
              {y.map((x, xPos) => {
                return <Box color={x.color} x={xPos} y={yPos} selectedColor={color} />;
              })}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
