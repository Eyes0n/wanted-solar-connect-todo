import ReactDOM from 'react-dom';
import { TodoProvider } from 'context/TodoContext';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
  body {
    background: #eeeeee;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <TodoProvider>
      <App />
    </TodoProvider>
  </>,
  document.getElementById('root')
);
