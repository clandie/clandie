import React from 'react';
import { Button } from 'react-bootstrap';
import JobCard from './JobCard';

interface IColumnProps {
  name: string;
  allJobs: { status: string; company: string; title: string }[] | [];
  open: (e: any) => void;
}
const Column = (props: IColumnProps) => {
  const { allJobs, name } = props;
  const jobs = [];
  // place cards into the correct column

  if (allJobs !== undefined) {
    for (let i = 0; i < allJobs.length; i++) {
      if (allJobs[i].status === name) {
        jobs.push(
          <JobCard company={allJobs[i].company} title={allJobs[i].title} />
        );
      }
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
