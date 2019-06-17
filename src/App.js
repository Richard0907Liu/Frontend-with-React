import React, { Component } from 'react';
// {} to include components of react
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; // for redux
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

  render() {
    // The last step is to make use of the Connect from react-redux to connect 
    // the React application to the Redux Store. We do in the MainComponent
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
