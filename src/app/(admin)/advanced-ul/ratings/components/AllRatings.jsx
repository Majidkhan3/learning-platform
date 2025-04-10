'use client';

import { Button } from 'react-bootstrap';
import { Rating, RoundedStar, Star, StickerStar, ThinRoundedStar, ThinStar } from '@smastrom/react-rating';
import { useState } from 'react';

// css
import '@smastrom/react-rating/style.css';
import ComponentContainerCard from '@/components/ComponentContainerCard';
const DefaultStarRating = () => {
  const [rating, setRating] = useState(3);
  return <ComponentContainerCard title="Basic @smastrom/react-rating Example" id="basic" titleClass="mb-3">
      <Rating value={rating} onChange={setRating} style={{
      maxWidth: 160
    }} />
    </ComponentContainerCard>;
};
const ReadOnlyRating = () => {
  return <ComponentContainerCard title="Read Only Examples." id="read_only" titleClass="mb-3">
      <Rating value={2} readOnly style={{
      maxWidth: 160
    }} />
    </ComponentContainerCard>;
};
const DisabledRating = () => {
  return <ComponentContainerCard title="Disabled Rating Example" id="disable" titleClass="mb-3">
      <Rating value={0} isDisabled style={{
      maxWidth: '160px'
    }} />
    </ComponentContainerCard>;
};
const HighlightOnlyRating = () => {
  const [rating, setRating] = useState(3);
  return <ComponentContainerCard title="Highlight only selected Example" id="highlight" titleClass="mb-3">
      <Rating value={rating} onChange={setRating} highlightOnlySelected style={{
      maxWidth: '160px'
    }} />
    </ComponentContainerCard>;
};
const ResetButtonRating = () => {
  const [rating, setRating] = useState(3);
  return <ComponentContainerCard title="Rating With Reset Button" id="reset_example" titleClass="mb-3">
      <div className="d-inline-flex align-items-center gap-3">
        <Rating value={rating} onChange={setRating} style={{
        maxWidth: '160px'
      }} />
        <Button variant="light" size="sm" onClick={() => setRating(0)}>
          Reset
        </Button>
      </div>
    </ComponentContainerCard>;
};
const StarStyles = () => {
  const [rating, setRating] = useState(3);
  const includedShapesStyles = [Star, ThinStar, RoundedStar, ThinRoundedStar, StickerStar].map(itemShapes => ({
    itemShapes,
    activeFillColor: '#f59e0b',
    inactiveFillColor: '#ffedd5'
  }));
  return <ComponentContainerCard title="Clear/Reset Rater Example" id="rating_style" titleClass="mb-3">
      {includedShapesStyles.map((itemStyles, idx) => <Rating key={`shape_${idx}`} value={rating} onChange={setRating} itemStyles={itemStyles} style={{
      maxWidth: '160px'
    }} />)}
    </ComponentContainerCard>;
};
const AllRatings = () => {
  return <>
      <DefaultStarRating />

      <ReadOnlyRating />

      <DisabledRating />

      <HighlightOnlyRating />

      <ResetButtonRating />

      <StarStyles />
    </>;
};
export default AllRatings;