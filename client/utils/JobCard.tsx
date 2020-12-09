import React from 'react';
import { Card, Popover, OverlayTrigger } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps {
  company: string;
  title: string;
  location: string | null;
  jobId: number;
  index: number;
  notes: string | null;
  status: string;
  details: (jobId: number) => void;
}

const JobCard = (props: ICardProps) => {
  let location = '';
  if (props.location !== null) {
    location = props.location
  };

  const renderPopover = (
    <Popover id="popover-basic" className="popover">
      <Popover.Title id="popover-title">{props.company}</Popover.Title>
      <Popover.Content id="popover-content">{props.notes}</Popover.Content>
    </Popover>
  );

  const placement = props.status === 'offers' || props.status === 'rejected'
                     ? "left" 
                     : "right";

  return (
    <Draggable draggableId={String(props.jobId)} index={props.index} key={props.jobId}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="jobCard"
        >
          <OverlayTrigger placement={placement} delay={{ show: 250, hide: 400 }} overlay={renderPopover}>
            <Card className="card" onClick={() => props.details(props.jobId)}>
              <Card.Body className="cardBody">
                <div className="cardTop">
                  <Card.Text className="cardCompany">{props.company}</Card.Text>
                  <Card.Text className="cardLocation">{location}</Card.Text>
                </div>
                <Card.Text className="cardTitle">{props.title}</Card.Text>
              </Card.Body>
            </Card>
          </OverlayTrigger>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
