import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Logo from '../../components/Logo';

afterEach(cleanup);

describe('Logo', () => {
  let Component;
  const { hostname, protocol } = location; // eslint-disable-line
  const baseUrl = `${protocol}//${hostname}`;
  const src = `${baseUrl}/image.jpeg`;

  it('does not allow changing the src prop', () => {
    Component = render(
      <Logo src={src} />
    );

    const { container } = Component;
    const image = container.firstChild;

    expect(image.src).not.toEqual(src);
    expect(image.src).toEqual(`${baseUrl}/logo.png`);
  });

  it('renders logo with default width and height when none is given', () => {
    const defaultWidth = '64px';
    const defaultHeight = '45px';

    Component = render(
      <Logo />
    );

    const { container } = Component;
    const image = container.firstChild;

    expect(image.style.width).toEqual(defaultWidth);
    expect(image.style.height).toEqual(defaultHeight);
  });

  it('renders logo with specified width and height when given', () => {
    const imgWidth = '52px';
    const imgHeight = '40px';

    Component = render(
      <Logo width={imgWidth} height={imgHeight} />
    );

    const { container } = Component;
    const image = container.firstChild;

    expect(image.style.width).toEqual(imgWidth);
    expect(image.style.height).toEqual(imgHeight);
  });

  it('renders children when children prop is specified', () => {
    const text = 'This is accompanying text for logo';

    Component = render(
      <Logo>
        {text}
      </Logo>
    );

    const { container } = Component;
    const children = container.childNodes[1];

    expect(children.nodeValue).toEqual(text);
  });
});
