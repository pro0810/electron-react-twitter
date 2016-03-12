import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import App             from './containers/App';
import rootReducer     from './reducers';
import IpcAction       from './utils/IpcAction';
import GlobalKeyBind   from './utils/GlobalKeyBind';

let store = createStore(rootReducer);
new IpcAction(document).subscribe(store);
new GlobalKeyBind(document).subscribe(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
