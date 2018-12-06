/** globals sessionStorage */
import React from 'react';
import { hot } from 'react-hot-loader';
import { RepairPartsAdmin } from 'repair-parts-admin';

class App extends React.Component {
  render() {
    return (
      <div style={{width: "80%"}}> 
        <RepairPartsAdmin userId="test-admin" partsServiceUrl="https://partsservice-dev.apps-np.homedepot.com/partsservice/v1"/>
      </div>
    );
  }
}

export default hot(module)(App);
