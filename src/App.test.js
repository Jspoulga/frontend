import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import store from './store';

test('renders the home page', () => {
  const app = (
    <Provider store={store}>
      <MemoryRouter
        initialEntries={['/']}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </MemoryRouter>
    </Provider>
  );

  render(app);

  expect(
    screen.getByLabelText("Pivot Store, retour à l'accueil")
  ).toBeInTheDocument();
});
