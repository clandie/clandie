import React from 'react';
import { Button } from 'react-bootstrap';
import JobCard from './JobCard';
import { Droppable } from 'react-beautiful-dnd';
import * as types from '../constants/types';
import _ from 'lodash';

interface IColumnProps {
  name: string;
  column: types.IJobs[];
  open: (e: any) => void;
  details: (jobId: number) => void;
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
        location={column[i].location}
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

  //* column-header: sprite images currently not in use
  
  return (
    <div className="column"> 
      {/* <div className="column-header">  */}
        <h1>{title}</h1>
        <h3>{column.length} Jobs</h3>
        {/* <div className={`${title.toLowerCase()}-img`}></div> */}
      {/* </div> */}
      <Button
        variant="light"
        id={name}
        className="addBtn"
        onClick={(e) => props.open(e)}
        block
      >
        +
      </Button>
      <Droppable droppableId={name}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="inner-column"
            key={name}
          >
            <div className="jobList">{jobs}</div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
