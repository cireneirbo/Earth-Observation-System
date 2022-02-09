import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Events from './components/Events';
import Event from './components/Event';
import About from './components/About';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} >
          <Route exact path="/" element={<Home />} />
          <Route exact path="events" element={<Events />} />
          <Route path="events/:eventName" element={<Event />} />
          <Route path="about" element={<About />} />
          <Route
            path="*"
            element={
              <div>
                <h2>There's nothing here! Click a navigation link to escape this barren wasteland!</h2>
              </div>
            }
          />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

