import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

// slideshow components
import Intro from './slides/1/Intro';
import Data from './slides/2/Data';

function App() {
  return (
    <div>
      <AwesomeSlider>
        <div><Intro /></div>
        <div><Data /></div>
      </AwesomeSlider>
    </div>
  );
}

export default App;
