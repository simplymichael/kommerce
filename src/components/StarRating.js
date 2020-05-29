import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icons/Icon';

//SVG credits: https://codepen.io/brianknapp/pen/JEotD/
const Stars = styled.div`
  ${props => props.hoverEffectActive && css`
    cursor: pointer;
    &:hover {
      .star polygon {
        fill: #ffd055 !important;
      }
    }
  `}

  &[data-stars] {
    .star polygon {
      fill: #ffd055;
    }
  }

  /* I added this to allow also setting a (default) rating value of 0 (zero) */
  &[data-stars="0"] {
    .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="1"] {
    .star:nth-child(1) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="2"] {
    .star:nth-child(2) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="3"] {
    .star:nth-child(3) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="4"] {
    .star:nth-child(4) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="5"] {
    .star:nth-child(5) ~ .star polygon {
      fill: #d8d8d8;
    }
  }
`;

export const Star = styled(Icon).attrs(props => ({
  className: 'star rating',
  width: 23,
  height: 25,
  'data-rating': props.rateValue || '0'
}))`
  float: left;

  polygon {
    fill: #d8d8d8;
  }

  &:hover ~ .star {
    polygon {
      fill: #d8d8d8 !important;
    }
`;

const Polygon = styled.polygon`
  fill-rule: nonzero;

  /*
   This rule allows us to extract the polygon into its own,
   without relying on the indirect styling from a parent,
   e.g the Stars component using &:hover{ .star polygon { fill: #ffd055 !important;} }
  */
  /*
  :hover {
    fill: #ffd055 !important;
  }
  */
`;

class StarRating extends React.Component {
  handleClick(ratingVal) {
    if(typeof this.props.clickHandler === 'function') {
      // Callup to the passed click handler for further processing
      this.props.clickHandler(ratingVal);
    }
  }

  render() {
    const {
      currentRating = 0,
      maxPossibleRating = 5,
      fixed = false,
    } = this.props;

    let stars = [];

    for(let i = 0; i < maxPossibleRating; i++) {
      stars.push(i + 1);
    }

    return (
      <Stars data-stars={currentRating} hoverEffectActive={!fixed}>
        {stars.map(star => {
          return (
            <Star key={star} rateValue={star}
              onClick={() => this.handleClick(star)}>
              <Polygon
                points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            </Star>
          );
        })}
      </Stars>
    );
  }
}

StarRating.propTypes = {
  fixed: PropTypes.bool,
  currentRating: PropTypes.number,
  maxPossibleRating: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default StarRating;
