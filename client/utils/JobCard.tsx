import React from 'react';
import { Card } from 'react-bootstrap';

interface ICardProps {
  company: string;
  title: string;
}

const JobCard = (props: ICardProps) => {
  return (
    <div className="jobCard">
      <Card className="card">
        <Card.Body>
          <Card.Title className="cardTitle">{props.company}</Card.Title>
          <Card.Text>{props.title}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobCard;
