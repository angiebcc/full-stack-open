import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const getRandomAnecdoteIndex = () => {
  const anecdoteIndex = Math.floor(Math.random() * anecdotes.length);

  return anecdoteIndex;
};

const Winner = () => {};

const App = () => {
  const [selected, setSelected] = useState(getRandomAnecdoteIndex);
  const [allVotes, setAllVotes] = useState(
    Array.from({ length: anecdotes.length }).fill(0)
  );
  const getNextAnecdote = () => {
    setSelected(getRandomAnecdoteIndex());
  };

  const addVote = () => {
    const newVotes = [...allVotes];

    const currentVotes = newVotes[selected] || 0;

    newVotes[selected] = currentVotes + 1;

    setAllVotes(newVotes);
  };

  const maxVotes = Math.max(...allVotes);
  const mostVotedAnecdoteIndex = allVotes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {allVotes[selected] || 0} votes</div>
      <Button onClick={addVote} text="vote">
        vote
      </Button>
      <Button onClick={getNextAnecdote} text="Next Anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotedAnecdoteIndex]}</div>
      <div>has {allVotes[mostVotedAnecdoteIndex]} votes</div>
    </div>
  );
};

export default App;
