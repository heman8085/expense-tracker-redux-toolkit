import React,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './components/store/store';
import { Provider ,useSelector} from 'react-redux';

const ThemedApp = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);


