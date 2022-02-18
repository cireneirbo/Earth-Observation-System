import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Event() {

  let params = useParams();

  const backendURL = "http://localhost:9000/events/detail/" + params.eventName;

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
  
  return (
    <main>
      <fieldset>
        <h1>{data.title}</h1>

      

      </fieldset>
    </main>
  );
}

export default Event;
