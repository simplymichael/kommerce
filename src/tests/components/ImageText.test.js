import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ImageText from '../../components/ImageText';

afterEach(cleanup);

describe('ImageText', () => {
  let Component;
  const { hostname, protocol } = location; // eslint-disable-line
  const src = `${protocol}//${hostname}/image.jpeg`;

  it('returns null when src prop is not given', () => {
    // consume the error from prop type validation
    const original = console.error;
    console.error = jest.fn();

    Component = render(
      <ImageText />
    );

    const { container } = Component;

    expect(container.childNodes.length).toEqual(0);

    console.error = original;
  });

  it('renders image with default width and height when src is given', () => {
    const defaultWidth = '32px';
    const defaultHeight = '32px';

    Component = render(
      <ImageText src={src} />
    );

    const { container } = Component;
    const image = container.firstChild;
    const children = container.childNodes[1];

    expect(image.src).toEqual(src);
    expect(image.style.width).toEqual(defaultWidth);
    expect(image.style.height).toEqual(defaultHeight);
    expect(children.nodeValue).toEqual('');
  });

  it('renders image with specified width and height when given', () => {
    const imgWidth = '52px';
    const imgHeight = '40px';

    Component = render(
      <ImageText src={src} width={imgWidth} height={imgHeight} />
    );

    const { container } = Component;
    const image = container.firstChild;
    const children = container.childNodes[1];

    expect(image.src).toEqual(src);
    expect(image.style.width).toEqual(imgWidth);
    expect(image.style.height).toEqual(imgHeight);
    expect(children.nodeValue).toEqual('');
  });

  it('renders children when children prop is specified', () => {
    const text = 'This is an image text';

    Component = render(
      <ImageText src={src}>
        {text}
      </ImageText>
    );

    const { container } = Component;
    const image = container.firstChild;
    const children = container.childNodes[1];

    expect(image.src).toEqual(src);
    expect(children.nodeValue).toEqual(text);
  });
});
