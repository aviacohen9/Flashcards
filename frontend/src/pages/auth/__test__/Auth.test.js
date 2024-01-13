import { render, screen } from '@testing-library/react';
import Signup from '../Signup';
import Login from '../Login';
import { BrowserRouter as Router, Route, Switch, RouterProvider, createMemoryRouter } from 'react-router-dom'
import routesConfig from '../../../routesConfig'


describe('Sign Up page',()=>{
  

    test('should have 4 input fields to fill', () => {
      const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/signup'],
        initialIndex: 0
      });
      render(
        <RouterProvider router={router} />)
      /*render(
      <Router>
        <Signup />
      </Router>);*/
      const inputFields = screen.getAllByRole('input');
      expect(inputFields.length).toBe(4);
    });

    /*

    test('should have an email field to fill', () => {
      render(<Router>
        <Signup />
      </Router>);
      const emailInput = screen.getByTitle(/email/i);
      expect(emailInput).toBeInTheDocument();
    });
    
    
    
    test('should have an password field to fill', () => {
      render(<Router>
        <Signup />
      </Router>);
      const passwordInput = screen.getByTitle(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });
    */

})


/*
describe('Log In page',()=>{

    test('should have an password field to fill', () => {
      render(<Router>
        <Login />
      </Router>);
      const inputFields = screen.getAllByRole('input');
      expect(inputFields.length).toBe(2);
    });


    test('should have an email field to fill', () => {
      render(<Router>
        <Login />
      </Router>);
      const emailInput = screen.getByTitle(/email/i);
      expect(emailInput).toBeInTheDocument();
    });



    test('should have an password field to fill', () => {
      render(<Router>
        <Login />
      </Router>);
      const passwordInput = screen.getByTitle(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });
  })
*/