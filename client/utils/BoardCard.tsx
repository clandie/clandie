import React from 'react';
import { Button } from 'react-bootstrap';

interface IBoardCard {
  id: number;
  name: string;
  select: (id: number, name: string) => void;
}

const BoardCard = (props: IBoardCard) => {
  return (
    <Button
      board-key={props.id}
      className="boardCard"
      onClick={() => props.select(props.id, props.name)}
    >
      <h3>{props.name}</h3>
    </Button>
  );
};
export default BoardCard;
