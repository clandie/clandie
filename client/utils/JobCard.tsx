import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps {
  company: string;
  title: string;
  location: string | null;
  jobId: number;
  index: number;
  details: (jobId: number) => void;
}

const JobCard = (props: ICardProps) => {
  let location = '';
  if (props.location !== null) {
    location = props.location
  }
  return (
    <Draggable draggableId={String(props.jobId)} index={props.index} key={props.jobId}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="jobCard"
        >
          <Card className="card" onClick={() => props.details(props.jobId)}>
            <Card.Body className="cardBody">
              <div className="cardTop">
                <Card.Text className="cardCompany">{props.company}</Card.Text>
                <Card.Text className="cardLocation">{location}</Card.Text>
              </div>
              <Card.Text className="cardTitle">{props.title}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
