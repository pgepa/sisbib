import React, { useState, useEffect } from 'react';

const Home = () => {
  const [ content, setContent ] = useState('');
  useEffect(() => {
    setContent('');
  }, []);
  return (
    <div className="container">
      <header className="card">
        <h2>{content}</h2>
      </header>
    </div>
  )
}

export default Home;