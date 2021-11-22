import Header from '../components/Header';
import LiveMeasurements from '../components/LiveMeasurements';
import DataSelection from '../components/DataSelection';

//hooks
import { useSelectionForm } from '../hooks/useSelectionForm';


//defaults
import { initialShowSelectionTrue } from '../DefaultConstants';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * import individual components
 */

//  import { Link } from “react-router-dom”;
//todo change to only import individual components
/**
 * Main Page Component @ /
 */
const App = () => {

  const [handleSubmit, handleReset, 
    showModal, setShowModalState] = useSelectionForm({});

  /**
   * handling DataForm Events
   * Raw Data radio should disable all checkboxes line type and the graphing options
   * reset button resets all checkboxes and radio to default
   * save previous options in localstorage, but there is a bug when selecting raw data, and we simply check the conditions of raw data
   */

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

        <section className="App-main-section" id="App-main-data">
          <DataSelection
            // useContext to pass these props stuff down?
            handleSubmit={handleSubmit} handleReset={handleReset}
            initialShowSelection={initialShowSelectionTrue}
            showModal={showModal} setShowModalState={setShowModalState} />
        </section>

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

export default App;