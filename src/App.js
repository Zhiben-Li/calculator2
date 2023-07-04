import { useState } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [hasDot, setHasDot] = useState(false);
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState(0);
  const [opr, setOpr] = useState("");
  const [start, setStart] = useState(false);
  const [memory, setMemory] = useState(0);
  const [buttonClicks, setButtonClicks] = useState([]);
  const [numlist, setNumlist] = useState([]);
  // const [screen, setScreen] = useState("0");

  const ops = ["/", "*", "+", "-"];

  const updateCalc = (value) => {
    if (opr === "=") {
      setCalc(value);
      setOpr("");
      return;
    }
    if (value === "0" && calc === "") {
      setCalc("0");
      return;
    }
    if (value === "0" && calc === "0") {
      setCalc("0");
      return;
    }
    if (value === "." && calc === "0") {
      if (!hasDot) {
        setHasDot(true);
        setCalc(calc + value);
        return;
      } else {
        return;
      }
    }
    if (calc === "0") {
      setCalc(value);
      return;
    }
    if (value === ".") {
      if (!hasDot) {
        setHasDot(true);
      } else {
        return;
      }
    }
    if (ops.includes(value) && result === 0) {
      return;
    }
    // setScreen(calc + value);
    setCalc(calc + value);
    handleClick(value);
  };

  const add = () => {
    handleClick("+");
    if (calc === "") {
      const updatedNumlist = [...numlist];
      let tempnum1 = updatedNumlist.pop();
      let tempnum2 = updatedNumlist.pop();
      let output = eval(tempnum2 + "+" + tempnum1);
      setCalc(output.toString());
      setResult(output);
      setNumlist([...updatedNumlist, output.toString()]);
      // setScreen(output.toString());
      setCalc("");
      setHasDot(false);
      return;
    }
    const updatedNumlist = [...numlist];
    let tempnum = updatedNumlist.pop();
    let output = eval(tempnum + "+" + calc);
    setCalc(output.toString());
    setResult(output);
    setNumlist([...updatedNumlist, output.toString()]);
    // setScreen(output.toString());
    setCalc("");
    setHasDot(false);
  };

  const divide = () => {
    handleClick("/");
    if (calc === "") {
      const updatedNumlist = [...numlist];
      let tempnum1 = updatedNumlist.pop();
      let tempnum2 = updatedNumlist.pop();
      let output = eval(tempnum2 + "/" + tempnum1);
      setCalc(output.toString());
      setResult(output);
      setNumlist([...updatedNumlist, output.toString()]);
      // setScreen(output.toString());
      setCalc("");
      setHasDot(false);
      return;
    }
    const updatedNumlist = [...numlist];
    let tempnum = updatedNumlist.pop();
    let output = eval(tempnum + "/" + calc);
    setCalc(output.toString());
    setResult(output);
    setNumlist([...updatedNumlist, output.toString()]);
    // setScreen(output.toString());
    setCalc("");
    setHasDot(false);
  };

  const subtract = () => {
    handleClick("-");
    if (calc === "") {
      const updatedNumlist = [...numlist];
      let tempnum1 = updatedNumlist.pop();
      let tempnum2 = updatedNumlist.pop();
      let output = eval(tempnum2 + "-" + tempnum1);
      setCalc(output.toString());
      setResult(output);
      setNumlist([...updatedNumlist, output.toString()]);
      // setScreen(output.toString());
      setCalc("");
      setHasDot(false);
      return;
    }
    const updatedNumlist = [...numlist];
    let tempnum = updatedNumlist.pop();
    let output = eval(tempnum + "-" + calc);
    setCalc(output.toString());
    setResult(output);
    setNumlist([...updatedNumlist, output.toString()]);
    // setScreen(output.toString());
    setCalc("");
    setHasDot(false);
  };

  const multiply = () => {
    handleClick("*");
    if (calc === "") {
      const updatedNumlist = [...numlist];
      let tempnum1 = updatedNumlist.pop();
      let tempnum2 = updatedNumlist.pop();
      let output = eval(tempnum2 + "*" + tempnum1);
      setCalc(output.toString());
      setResult(output);
      setNumlist([...updatedNumlist, output.toString()]);
      // setScreen(output.toString());
      setCalc("");
      setHasDot(false);
      return;
    }
    const updatedNumlist = [...numlist];
    let tempnum = updatedNumlist.pop();
    let output = eval(tempnum + "*" + calc);
    setCalc(output.toString());
    setResult(output);
    setNumlist([...updatedNumlist, output.toString()]);
    // setScreen(output.toString());
    setCalc("");
    setHasDot(false);
  };

  const enter = () => {
    handleClick("enter");
    setNumlist([...numlist, calc]);
    // setScreen(calc);
    setCalc("");
    setResult(parseFloat(calc));
    setHasDot(false);
  };

  const deleteLast = () => {
    handleClick("DEL");
    if (calc === "") {
      return;
    }
    setCalc(calc.slice(0, -1));
  };

  const memoryAdd = () => {
    handleClick("M");
    setMemory(calc.toString());
    setOpr("=");
  };

  const memoryRecall = () => {
    handleClick("MR");
    if (memory === "") {
      return;
    }
    setCalc(memory.toString());
  };

  const clearEntry = () => {
    handleClick("CE");
    setCalc("0");
    setHasDot(false);
    // setScreen("");
  };

  const clear = () => {
    handleClick("C");
    setCalc("0");
    setResult(0);
    setNumlist([]);
    setOpr("");
    // setScreen("");
    setStart(false);
    setHasDot(false);
  };

  const createDigit = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  function handleClick(buttonText) {
    var timestamp = new Date().toISOString();
    const updatedButtonClicks = [...buttonClicks, { buttonText, timestamp }];
    setButtonClicks(updatedButtonClicks);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span></span> {calc || result.toString()}
        </div>

        <div className="extension">
          <button onClick={clearEntry}>CE</button>
          <button onClick={clear}>C</button>
          <button onClick={memoryAdd}>M</button>
          <button onClick={memoryRecall}>MR</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div class="container">
          <div className="digits">
            {createDigit()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button onClick={enter}>Enter</button>
          </div>

          <div className="operators">
            <button onClick={add}>+</button>
            <button onClick={subtract}>-</button>
            <button onClick={multiply}>*</button>
            <button onClick={divide}>/</button>
          </div>
        </div>
      </div>
      <div className="history">
        <CSVLink data={buttonClicks} filename={"buttonClicks.csv"}>
          Download buttonClicks.CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default App;
