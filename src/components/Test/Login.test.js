//1. npm install --save-dev jest babel-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy
//2. tao file babel.config.js
// module.exports = {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react'
//   ]
// };

//3. tao file jest.config.js
// module.exports = {
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//   },
//   moduleFileExtensions: ['js', 'jsx'],
// };

//4. tao file jest.setup.js
//import '@testing-library/jest-dom';

//5. package.json 
// "scripts": {
//   "test": "jest"
// }

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login/Login';

describe('Login Component', () => {
  test('renders email and password inputs and login button', () => {
    render(<Login onLogin={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // test('allows user to type into inputs', async () => {
  //   render(<Login onLogin={() => {}} />);

  //   const emailInput = screen.getByLabelText(/email/i);
  //   const passwordInput = screen.getByLabelText(/password/i);

  //   await userEvent.type(emailInput, 'thinh@gmail.com');
  //   await userEvent.type(passwordInput, 'mypassword');

  //   expect(emailInput).toHaveValue('thinh@gmail.com');
  //   expect(passwordInput).toHaveValue('mypassword');
  // });

  test('calls onLogin with email and password when submitted', async () => {
    const handleLogin = jest.fn();
    render(<Login onLogin={handleLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'mypassword');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(handleLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'mypassword',
    });
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });
});

