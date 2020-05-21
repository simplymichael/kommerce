import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = styled.svg.attrs(props => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: props.width || "24",
  height: props.height || "24",
  viewBox: props.viewBox || "0 0 24 24",
  className: (props.className ? props.className : '') + " icon"
}))`
  fill: ${props => props.fillColor || "#ccc"};
`;

Icon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fillColor: PropTypes.string,
  className: PropTypes.string,
}

export default Icon;
