import React from 'react';
import { Button } from 'react-bootstrap';

interface IColumnProps {
  name: string;
  open: () => void;
}
const Column = (props: IColumnProps) => {
  return (
    <div className="column">
      <h1>{props.name}</h1>
      <Button variant="light" className="addBtn" onClick={props.open} block>
        +
      </Button>
    </div>
  );
};

export default Column;
