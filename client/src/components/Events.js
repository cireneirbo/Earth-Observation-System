import { useState, useEffect } from 'react';
import axios from 'axios';

function Events() {

  
  const backendURL = "http://localhost:9000/events/check";
  const frontendURL = "http://localhost:3000/events/";

  const [ isProcessed, setIsProcessed ] = useState(false);

  const [ data, setData ] = useState("");

  useEffect(() => {
    if(isProcessed == false) {
      axios.get(backendURL)
      .then(res => {
        setData(res.data);
      }).catch(err => {
        console.log(err);
      });
      return setIsProcessed(true);
    }
  }, []);
  console.log(data)

  if(data == "") {
    return (
      <main>
        <fieldset>
          <p>Awaiting API data...</p>
        </fieldset>
      </main>
    );
  } else {
    return (
      <main>
        <fieldset>

          <h1>{data.title}</h1>

          <p>{data.events.description}</p>

          <table>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Sources</th>
              <th>Date of Event</th>
            </tr>
            {data.events.events.map(event => (
              <tr key={event.id}>
                <td><a href={`${frontendURL}${event.id}`}>{event.id}</a></td>
                <td>{event.title}</td>
                <td>{event.categories[0].title}</td>
                <td><a href={event.sources[0].url}>{event.sources[0].id}</a></td>
                <td>{event.geometry[event.geometry.length - 1].date.slice(0,10)}</td>
              </tr>
            ))}
          </table>

        </fieldset>
      </main>
    );
  }
}

export default Events;
