import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const TicketCard = styled.div`
  padding: 16px;
  background: ${(props) => props.theme.white};
  margin-bottom: 16px;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  max-width: 500px;
`;

const TicketTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: ${(props) => props.theme.darkPurple};
`;

const TicketDetails = styled.div`
  margin-bottom: 16px;
`;

const TicketLabel = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TicketValue = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
`;

const TicketPage = ({ ticketNo }) => {
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch ticket details
    const fetchTicketDetails = async () => {
      try {
        // Replace this with your API call to fetch ticket details
        // For now, I'm just simulating the response
        const response = await fetch(`/api/tickets/${ticketNo}`);
        const data = await response.json();
        setTicketDetails(data);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTicketDetails();
  }, [ticketNo]);

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  const { title, description, status, assignee, priority } = ticketDetails;

  return (
    <Container>
      <TicketCard>
        <TicketTitle>{title}</TicketTitle>
        <TicketDetails>
          <TicketLabel>Description:</TicketLabel>
          <TicketValue>{description}</TicketValue>
          <TicketLabel>Status:</TicketLabel>
          <TicketValue>{status}</TicketValue>
          <TicketLabel>Assignee:</TicketLabel>
          <TicketValue>{assignee}</TicketValue>
          <TicketLabel>Priority:</TicketLabel>
          <TicketValue>{priority}</TicketValue>
        </TicketDetails>
      </TicketCard>
    </Container>
  );
};

export default TicketPage;
