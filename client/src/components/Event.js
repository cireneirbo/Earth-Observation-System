import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Event() {

  let params = useParams();

  const backendURL = "http://localhost:9000/events/detail/" + params.eventName;
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
  console.log(data);
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

          <p>{data.event.title}</p>
          <p><a href={`${frontendURL}${data.event.id}`}>{data.event.id}</a></p>
          <p>{data.event.categories[0].title}</p>
          <p><a href={data.event.sources[0].url}>{data.event.sources[0].id}</a></p>


        </fieldset>
      </main>
    );
  }
}

export default Event;
