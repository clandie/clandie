import React from 'react';
import { Button } from 'react-bootstrap';

interface IColumnProps {
  name: string;
  open: (e: any) => void;
}
const Column = (props: IColumnProps) => {
  return (
    <div className="column">
      <h1>{props.name}</h1>
      <Button
        variant="light"
        id={props.name}
        className="addBtn"
        onClick={(e) => props.open(e)}
        block
      >
        +
      </Button>
    </div>
  );
};

export default Column;
