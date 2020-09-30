import React from 'react';
import { Button } from 'react-bootstrap';
import JobCard from './JobCard';
import { Droppable } from 'react-beautiful-dnd';
import * as types from '../constants/types';
import _ from 'lodash';
// import { useCallback } from 'react';

interface IColumnProps {
  name: string;
  column: types.IJobs[];
  open: (e: any) => void;
  details: (jobId: number) => void;
  // // props for dnd
  // allJobs: types.IJobs[] | [];
  // updateStatus: (jobId: number, status: string) => void;
  // updateJobs: (allJobs: any[]) => void;
  // setColumns: (allJobs: any[]) => void;
}
const Column = (props: IColumnProps) => {
  const { details, column } = props;

  //* fix typing for jobs
  const jobs: any[] = [];
  for (let i = 0; i < column.length; i++) {
    jobs.push(
      <JobCard
        company={column[i].company}
        title={column[i].title}
        jobId={column[i]._id}
        details={details}
        index={Number(column[i].list_order)}
      />
    );
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
