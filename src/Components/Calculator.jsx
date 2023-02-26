import React, { Component } from "react";
import Keys from "./keys";

export default class Calculator extends Component {
  state = {
    result: "",
  };
  onClick = (button) => {
    if (button === "=") {
      this.calculate();
    } else if (button === "AC") {
      this.reset();
    } else if (button === "C") {
      this.backspace();
    } else {
      this.setState({
        result: this.state.result + button,
      });
    }
  };
  operate(num1, operator, num2) {
    let result = 0;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        break;
    }
    return result.toString();
  }
  calculate() {
    const { result } = this.state;
    const regex = /([-+]?[0-9]*\.?[0-9]+)([-+*/])([-+]?[0-9]*\.?[0-9]+)/g;
    let checkResult = result.replace(regex, (match, p1, p2, p3) => {
      const num1 = parseFloat(p1);
      const num2 = parseFloat(p3);
      let operator = "";
      switch (p2) {
        case "+":
          operator = "+";
          break;
        case "-":
          operator = "-";
          break;
        case "*":
          operator = "*";
          break;
        case "/":
          operator = "/";
          break;
        default:
          break;
      }
      return operator ? this.operate(num1, operator, num2) : match;
    });

    // If checkResult still contains an operator, throw an error
    if (checkResult.match(/[-+*/]/g)) {
      this.setState({ result: "error" });
    } else {
      this.setState({ result: checkResult });
    }
  }
  reset = () => {
    this.setState({
      result: "",
    });
  };
  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
    });
  };
  render() {
    return (
      <div>
        <div className="calculator">
          <input id="inputField" type="text" value={this.state.result} />
          <Keys onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
