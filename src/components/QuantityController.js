import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div``;
const Btn = styled.span`
  color: #222;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  text-align: center;
  vertical-align: middle;
  display: 'inline-block';
  cursor: ${props => props.cursor || 'pointer'};
  border: 1px solid #ccc;
  border-radius: ${props => props.borderRadius || '50%'};
  background: ${props => props.background || '#f1f1f1'};
`;

const QuantityController = ({currentValue, onIncrement, onDecrement}) => {
  const cursor = currentValue === 1 ? 'not-allowed' : 'pointer';

  return (
    <Div>
      <Btn onClick={onDecrement} cursor={cursor}> - </Btn>
      <Btn background="transparent" cursor="default">{currentValue}</Btn>
      <Btn onClick={onIncrement}> + </Btn>
    </Div>
  );
};

QuantityController.propTypes = {
  currentValue: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

export default QuantityController;
