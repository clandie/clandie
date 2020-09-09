import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps {
  company: string;
  title: string;
  jobId: number;
  index: number;
  details: (jobId: number) => void;
}

const JobCard = (props: ICardProps) => {
  return (
    <Draggable draggableId={String(props.jobId)} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="jobCard"
        >
          <Card className="card" onClick={() => props.details(props.jobId)}>
            <Card.Body>
              <Card.Title className="cardTitle">{props.company}</Card.Title>
              <Card.Text>{props.title}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
