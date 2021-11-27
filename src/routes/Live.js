import Header from '../components/Header';
import LiveMeasurements from '../components/LiveMeasurements';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
/**
 * Live Page component @ /live
 */
const Live = () => {

  return (
    <div className="App">
      <Header className="App-header" />

      <section className="App-main" id="main-header">
        <div>
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Current Irradiance and Meteorological Conditions</h1>
        </div>
      </section>
      <hr />

      <main className="App-main">

        <section className="App-main-section" id="App-main-live">
          <LiveMeasurements />
        </section>

      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
  );
}

export default Live;