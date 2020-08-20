import React from 'react';
import { Button } from 'react-bootstrap';

interface IBoardCard {
  name: string;
  select: () => void;
}

const BoardCard = (props: IBoardCard) => {
  return (
    <Button className="boardCard" onClick={props.select}>
      <h3>{props.name}</h3>
    </Button>
  );
};
export default BoardCard;
