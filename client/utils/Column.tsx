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
  const { details, column, name } = props;

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

  // Capitalize column name
  let title = name[0].toUpperCase();
  for (let i = 1; i < name.length; i++) {
    title += name[i];
  }

  return (
    <Droppable droppableId={name}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="column"
          key={name}
        >
          <h1>{title}</h1>
          <Button
            variant="light"
            id={name}
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
