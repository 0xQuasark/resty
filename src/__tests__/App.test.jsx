import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testing the App component', () => {
  test('Should render pikachu when button is clicked', async () => {
    render(<Form />);

    let goButton = screen.getByText('GO!');
    fireEvent.click(goButton);

    expect(screen.getByText(/bulbasaur/)).toBeVisible();
  });
})