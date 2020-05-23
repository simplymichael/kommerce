import React from 'react';
import { render } from '@testing-library/react';
import Category from '../../pages/Category';

describe('Category Page', () => {
  it('renders text: Category page', () => {
    const { getByText } = render(<Category />);
    const text = getByText(/Category page/i);
    expect(text).toBeInTheDocument();
  });
});
