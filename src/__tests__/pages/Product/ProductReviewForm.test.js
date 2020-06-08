import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import ProductReviewForm from '../../../pages/Product/ProductReviewForm';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const formRole = 'product-review-form';
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(ProductReviewForm));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Product Review Form', () => {
  it('contains an name input field', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const nameInputField = form.querySelector('input[name="authorName"]');

    expect(nameInputField).toBeInTheDocument();
    expect(nameInputField.getAttribute('type')).toEqual('text');
    expect(nameInputField.getAttribute('placeholder')).toMatch(/Enter your name/i);
  });

  it('contains a review text input field', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const reviewInputField = form.querySelector('textarea[name="reviewText"]');

    expect(reviewInputField).toBeInTheDocument();
    expect(reviewInputField.getAttribute('placeholder')).toMatch(/Enter your review/i);
  });

  it('contains a 5-star rating field', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const stars = form.querySelectorAll('svg');

    expect(stars.length).toBe(5);

    for(let i = 0; i < stars.length; i++) {
      let starNumber = i + 1;
      let currStar = stars[i];

      expect(Object.values(currStar.classList)).toContain('icon', 'star', 'rating');
      expect(parseInt(currStar.dataset.rating)).toEqual(starNumber);
    }
  });

  it('contains a "Submit" button', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const submitButton = form.querySelector('button[type="submit"]');

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Add review/i);
  });

  it('displays an error message on submit of empty form fields', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toMatch(/Add review/i);
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).not.toBeNull();
  });

  it('displays an error message on submit of empty name field', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const nameInputField = form.querySelector('input[name="authorName"]');
    const reviewInputField = form.querySelector('textarea[name="reviewText"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(nameInputField).toBeInTheDocument();

    expect(reviewInputField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(reviewInputField, { target: { value: 'Sample review' } });

    expect(reviewInputField.value).toBe('Sample review');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).toMatch(/The Name field is required/i);
  });

  it('displays an error message on submit of empty password field', () => {
    const { getByRole } = Component;
    const form = getByRole(formRole);
    const nameInputField = form.querySelector('input[name="authorName"]');
    const reviewInputField = form.querySelector('textarea[name="reviewText"]');
    const submitButton = form.querySelector('button[type="submit"]');
    let errorNotification = null;

    const notificationThrower = () => {
      errorNotification = getByRole('error-notification');
    };

    expect(nameInputField).toBeInTheDocument();
    expect(reviewInputField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(notificationThrower).toThrow();
    expect(errorNotification).toBeNull();

    fireEvent.change(nameInputField, { target: { value: 'John Doe' } });

    expect(nameInputField.value).toBe('John Doe');

    fireEvent.click(submitButton);

    errorNotification = getByRole('error-notification');

    expect(errorNotification).not.toBeNull();
    expect(errorNotification.textContent).toMatch(/The Review field is required/i);
  });

  describe('Name input field', () => {
    it('has an empty placeholder on focus', () => {
      const { getByRole } = Component;
      const form = getByRole(formRole);
      const nameInputField = form.querySelector('input[name="authorName"]');

      expect(nameInputField).toBeInTheDocument();
      expect(nameInputField.getAttribute('placeholder')).toMatch(/Enter your name/i);

      fireEvent.focus(nameInputField);

      expect(nameInputField.getAttribute('placeholder')).toEqual('');
    });

    it('has an "Enter your name" placeholder on blur', () => {
      const { getByRole } = Component;
      const form = getByRole(formRole);
      const nameInputField = form.querySelector('input[name="authorName"]');

      expect(nameInputField).toBeInTheDocument();
      expect(nameInputField.getAttribute('placeholder')).toMatch(/Enter your name/i);

      fireEvent.focus(nameInputField);

      expect(nameInputField.getAttribute('placeholder')).toEqual('');

      fireEvent.blur(nameInputField);

      expect(nameInputField.getAttribute('placeholder')).toMatch(/Enter your name/i);
    });
  });

  describe('Review input field', () => {
    it('has an empty placeholder on focus', () => {
      const { getByRole } = Component;
      const form = getByRole(formRole);
      const reviewInputField = form.querySelector('textarea[name="reviewText"]');

      expect(reviewInputField).toBeInTheDocument();
      expect(reviewInputField.getAttribute('placeholder')).toMatch(/Enter your review/i);

      fireEvent.focus(reviewInputField);

      expect(reviewInputField.getAttribute('placeholder')).toEqual('');
    });

    it('has an "Enter your review" placeholder on blur', () => {
      const { getByRole } = Component;
      const form = getByRole(formRole);
      const reviewInputField = form.querySelector('textarea[name="reviewText"]');

      expect(reviewInputField).toBeInTheDocument();
      expect(reviewInputField.getAttribute('placeholder')).toMatch(/Enter your review/i);

      fireEvent.focus(reviewInputField);

      expect(reviewInputField.getAttribute('placeholder')).toEqual('');

      fireEvent.blur(reviewInputField);

      expect(reviewInputField.getAttribute('placeholder')).toMatch(/Enter your review/i);
    });
  });
});
