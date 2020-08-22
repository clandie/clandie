import React from 'react';
import { Button } from 'react-bootstrap';

interface IColumnProps {
  name: string;
  allJobs: { status: string; company: string; title: string }[] | [];
  open: (e: any) => void;
}
const Column = (props: IColumnProps) => {
  const { allJobs, name } = props;
  const jobs = [];
  console.log('allJobs', allJobs);
  for (let i = 0; i < allJobs.length; i++) {
    if (allJobs[i].status === name) {
      jobs.push(<div>{allJobs[i].company}</div>);
    }
  }

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
      <div className="jobList">{jobs}</div>
    </div>
  );
};

export default Column;
