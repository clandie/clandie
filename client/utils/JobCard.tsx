import React from 'react';
import { Card } from 'react-bootstrap';

interface ICardProps {
  company: string;
  title: string;
}

const JobCard = (props: ICardProps) => {
  console.log('jobcard', props);
  return (
    <div className="jobCard">
      <Card>
        <Card.Body>
          <Card.Title>{props.company}</Card.Title>
          <Card.Text>{props.title}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobCard;
