import React from 'react';
import { act, fireEvent, render, cleanup } from '@testing-library/react';
import LoginForm from '../../../pages/Login/LoginForm';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const ConnectedForm = bindComponentToStore(store)(wrapComponentInRouter(LoginForm));

beforeEach(() => {
  Component = render(
    <ConnectedForm />
  );
});

afterEach(cleanup);

describe('Login Form', () => {
  it('contains an email input field', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const emailInputField = form.querySelector('input[type="email"]');

    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute('name')).toEqual('email');
    expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
  });

  it('contains a password input field', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const passwordInputField = form.querySelector('input[type="password"]');

    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute('name')).toEqual('password');
    expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
  });

  it('contains a "Sign In" button', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const submitButton = form.querySelector('button[type="submit"]');

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
  });

  it('displays an error message on submit of empty form fields', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    act(() => {
      fireEvent.click(submitButton);
    });

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).not.toBeNull();
  });

  it('displays an error message on submit of empty email field', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const emailInputField = form.querySelector('input[type="email"]');
    const passwordInputField = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute('name')).toEqual('email');
    expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute('name')).toEqual('password');
    expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(passwordInputField, { target: { value: 'secret' } });

    expect(passwordInputField.value).toBe('secret');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).toMatch(/The Email field is required/i);
  });

  it('displays an error message on submit of empty password field', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const emailInputField = form.querySelector('input[type="email"]');
    const passwordInputField = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute('name')).toEqual('email');
    expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute('name')).toEqual('password');
    expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(emailInputField, { target: { value: 'user@example.com' } });

    expect(emailInputField.value).toBe('user@example.com');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).toMatch(/The Password field is required/i);
  });

  it('displays an error message on submit of invalid email', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const emailInputField = form.querySelector('input[type="email"]');
    const passwordInputField = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute('name')).toEqual('email');
    expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute('name')).toEqual('password');
    expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(emailInputField, { target: { value: 'user@example' } });
    fireEvent.change(passwordInputField, { target: { value: 'secret' } });

    expect(emailInputField.value).toBe('user@example');
    expect(passwordInputField.value).toBe('secret');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent)
      .toMatch(/The Email address you have entered is invalid/i);
  });

  it('displays an error message on submit of short password', () => {
    const { getByRole } = Component;
    const form = getByRole('login-form');
    const emailInputField = form.querySelector('input[type="email"]');
    const passwordInputField = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute('name')).toEqual('email');
    expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute('name')).toEqual('password');
    expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Sign In/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(emailInputField, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInputField, { target: { value: 'secret' } });

    expect(emailInputField.value).toBe('user@example.com');
    expect(passwordInputField.value).toBe('secret');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent)
      .toMatch(/Password length must be at least/i);
  });

  describe('Email input field', () => {
    it('has an empty placeholder on focus', () => {
      const { getByRole } = Component;
      const form = getByRole('login-form');
      const emailInputField = form.querySelector('input[type="email"]');

      expect(emailInputField).toBeInTheDocument();
      expect(emailInputField.getAttribute('placeholder')).toEqual('Email');

      act(() => {
        fireEvent.focus(emailInputField);
      });

      expect(emailInputField.getAttribute('placeholder')).toEqual('');
    });

    it('has an "Email" placeholder on blur', () => {
      const { getByRole } = Component;
      const form = getByRole('login-form');
      const emailInputField = form.querySelector('input[type="email"]');

      expect(emailInputField).toBeInTheDocument();
      expect(emailInputField.getAttribute('placeholder')).toEqual('Email');

      act(() => {
        fireEvent.focus(emailInputField);
      });

      expect(emailInputField.getAttribute('placeholder')).toEqual('');

      act(() => {
        fireEvent.blur(emailInputField);
      });

      expect(emailInputField.getAttribute('placeholder')).toEqual('Email');
    });
  });

  describe('Password input field', () => {
    it('has an empty placeholder on focus', () => {
      const { getByRole } = Component;
      const form = getByRole('login-form');
      const passwordInputField = form.querySelector('input[type="password"]');

      expect(passwordInputField).toBeInTheDocument();
      expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');

      act(() => {
        fireEvent.focus(passwordInputField);
      });

      expect(passwordInputField.getAttribute('placeholder')).toEqual('');
    });

    it('has a "Password" placeholder on blur', () => {
      const { getByRole } = Component;
      const form = getByRole('login-form');
      const passwordInputField = form.querySelector('input[type="password"]');

      expect(passwordInputField).toBeInTheDocument();
      expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');

      act(() => {
        fireEvent.focus(passwordInputField);
      });

      expect(passwordInputField.getAttribute('placeholder')).toEqual('');

      act(() => {
        fireEvent.blur(passwordInputField);
      });

      expect(passwordInputField.getAttribute('placeholder')).toEqual('Password');
    });
  });
});
