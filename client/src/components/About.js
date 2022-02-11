
function About() {

  
  return (
    <main>
      <fieldset className="page-field">
      <h1>About</h1>

      <h3>Earth Observatory Natural Event Tracker API</h3>
        <p>
          Disaster events are returned from NASA's <a href='https://eonet.gsfc.nasa.gov/docs/v3' target='_blank'>EONET</a> API and parsed for new events to be handled.
        </p>

      <h3>Twitter API</h3>
        <p>
        Data from the EONET API is tracked internally, and new events are posted to the <a href='https://twitter.com/kalefice' target='_blank'>developer's</a> Twitter account. No user data is sent via the Twitter API.
        </p>

      </fieldset>
        
    </main>
  );
}

export default About;
