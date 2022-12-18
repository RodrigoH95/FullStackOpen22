import React from 'react';

const Total = ({ parts }) => (
    <>
      <p>Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises.</p>
    </>
  )

export default Total