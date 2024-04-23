import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good <= 0 && neutral <= 0 && bad <= 0) {
    return <div> No feedback given </div>;
  } else {
    const total = good + neutral + bad;
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="total" value={total} />
          <Statistic text="average" value={(good - bad) / total + "%"} />
          <Statistic text="positive" value={(good / total) * 100 + "%"} />
        </tbody>
      </table>
    );
  }
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}:{value}
      </td>
    </tr>
  );
};
const Button = ({ clickHandler, text }) => {
  return (
    <button
      onClick={() => {
        clickHandler(text);
      }}
    >
      {text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (sum) => {
    if (sum === "good") {
      setGood(good + 1);
    }
    if (sum === "neutral") {
      setNeutral(neutral + 1);
    }
    if (sum === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <Button text="good" clickHandler={handleClick} />
      <Button text="neutral" clickHandler={handleClick} />
      <Button text="bad" clickHandler={handleClick} />

      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
