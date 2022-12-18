import React, { useState } from 'react'

const DisplayAnecdote = ({ anecdote, votes, text }) => {
  return (
    <>
      <h2>{text}</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const DisplayMostVoted = ({ anecdotes, votes, text }) => {
  const maxVotes = Math.max(...votes)
  const anecdote = anecdotes[votes.indexOf(maxVotes)]
  return (
    <DisplayAnecdote anecdote={anecdote} votes={maxVotes} text={text} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const selectAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} text="Anecdote of the day"/>
      <Button onClick={addVote} text="vote"/>
      <Button onClick={selectAnecdote} text="next anecdote"/>
      <DisplayMostVoted anecdotes={anecdotes} votes={votes} text="Anecdote with most votes"/>
    </div>
  )
}

export default App