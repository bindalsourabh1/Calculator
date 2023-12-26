import { useState, useCallback } from "react";
import "./App.css"; // Import your CSS file for styling
import Navbar from "./assets/Components/Navbar";
import Button from "@mui/material/Button";
import HoverRating from "./assets/Components/Rating";

function App() {
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);
  const [sizeA, setSizeA] = useState(0);
  const [sizeB, setSizeB] = useState(0);

  const handleMatrixSizeChange = (e, matrixType) => {
    const size = parseInt(e.target.value);

    if (isNaN(size) || size < 1) {
      // alert("Matrix size must be a number greater than 0.");
      if (matrixType === "A") {
        setMatrixA([]);
        setSizeA(0);
      } else if (matrixType === "B") {
        setMatrixB([]);
        setSizeB(0);
      }
      setResult([]);
      return;
    }

    if (matrixType === "A") {
      const newMatrixA = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));
      setMatrixA(newMatrixA);
      setSizeA(size);
    } else if (matrixType === "B") {
      const newMatrixB = Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));
      setMatrixB(newMatrixB);
      setSizeB(size);
    }
    setResult([]);
  };

  const handleMatrixAChange = useCallback(
    (e, row, col) => {
      const updatedMatrixA = matrixA.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((cell, colIndex) =>
              colIndex === col ? +e.target.value : cell
            )
          : r
      );
      setMatrixA(updatedMatrixA);
    },
    [matrixA]
  );

  const handleMatrixBChange = useCallback(
    (e, row, col) => {
      const updatedMatrixB = matrixB.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((cell, colIndex) =>
              colIndex === col ? +e.target.value : cell
            )
          : r
      );
      setMatrixB(updatedMatrixB);
    },
    [matrixB]
  );

  const handleMatrixMultiplication = () => {
    if (
      matrixA.length === 0 ||
      matrixB.length === 0 ||
      matrixA[0].length !== matrixB.length
    ) {
      alert("Matrix sizes are incompatible for multiplication.");
      return;
    }

    const resultMatrix = [];
    for (let i = 0; i < matrixA.length; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrixB.length; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        resultMatrix[i].push(sum);
      }
    }
    setResult(resultMatrix);
  };

  return (
    <div className="background">
      <Navbar />
      <div className="matrix-sizes">
        <div className="matrix-size mr-auto p-5">
          <label htmlFor="matrixSizeA">
            <strong>Enter the Matrix A size:</strong>
          </label>
          <input
            className="mx-2 border-black border-2"
            id="matrixSizeA"
            type="number"
            min="1"
            onChange={(e) => handleMatrixSizeChange(e, "A")}
          />
        </div>

        <div className="matrix-size  p-5">
          <label htmlFor="matrixSizeB">
            <strong>Enter the Matrix B size:</strong>
          </label>
          <input
            className="mx-2 border-black border-2"
            id="matrixSizeB"
            type="number"
            min="1"
            onChange={(e) => handleMatrixSizeChange(e, "B")}
          />
        </div>
      </div>

      <div className="matrix-input p-5 ">
        <h2>
          <strong className="font-mono ">Matrix A</strong>
        </h2>
        <div className="matrix border-2 inline-block">
          {matrixA.map((row, rowIndex) => (
            <div key={rowIndex} className="matrix-row border-2">
              {row.map((col, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={col}
                  onChange={(e) => handleMatrixAChange(e, rowIndex, colIndex)}
                  style={{ borderRight: "1px solid black" }} // Add border to each column
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="matrix-input border-current p-5 ">
        <h2>
          <strong className="font-mono">Matrix B</strong>
        </h2>
        <div className="matrix border-2 inline-block">
          {matrixB.map((row, rowIndex) => (
            <div key={rowIndex} className="matrix-row border-2">
              {row.map((col, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={col}
                  onChange={(e) => handleMatrixBChange(e, rowIndex, colIndex)}
                  style={{ borderRight: "1px solid black" }} // Add border to each column
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="contained"
        className="my-2 mx-auto p-6"
        onClick={handleMatrixMultiplication}
      >
        Multiply The Matrices
      </Button>

      <div className="matrix-result border-e-0">
        <h2>
          <strong className="p-6">Result</strong>
        </h2>
        <div className="matrix">
          {result.map((row, rowIndex) => (
            <div key={rowIndex} className="p-3 matrix-row  ">
              {row.map((col, colIndex) => (
                <span key={colIndex} className="result-number  p-3 border">
                  {col}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hover-rating p-6 font-bold">
        Rate the Calculator
        <HoverRating />
      </div>
    </div>
  );
}

export default App;
