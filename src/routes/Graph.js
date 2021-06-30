import React from 'react'

import Header from '../components/Header';
import LiveMeasurements from '../components/LiveMeasurements';
import DataSelection from '../components/DataSelection';

const Graph = () => {
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

      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
    )
}

export default Graph
