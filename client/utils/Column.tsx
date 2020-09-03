import React from 'react';
import { Button } from 'react-bootstrap';
import JobCard from './JobCard';
import { Droppable } from 'react-beautiful-dnd';

interface IColumnProps {
  name: string;
  allJobs:
    | {
        _id: number;
        status: string;
        company: string;
        title: string;
        location: string | null;
        notes: string | null;
        salary: string | null;
        url: string | null;
      }[]
    | [];
  open: (e: any) => void;
  details: (jobId: number) => void;
}
const Column = (props: IColumnProps) => {
  const { allJobs, name, details } = props;
  //* fix typing for jobs
  const jobs: any[] = [];
  // place cards into the correct column

  if (allJobs !== undefined) {
    for (let i = 0; i < allJobs.length; i++) {
      if (allJobs[i].status === name) {
        jobs.push(
          <JobCard
            company={allJobs[i].company}
            title={allJobs[i].title}
            jobId={allJobs[i]._id}
            details={details}
            index={i}
          />
        );
      }
    }
  }

  return (
    <Droppable droppableId={props.name}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="column"
        >
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
