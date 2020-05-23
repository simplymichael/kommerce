import React from 'react';
import { render } from '@testing-library/react';
import Faq from '../../pages/Faq';

describe('FAQ Page', () => {
  it('renders text: Faq page', () => {
    const { getByText } = render(<Faq />);
    const text = getByText(/Faq page/i);
    expect(text).toBeInTheDocument();
  });
});
