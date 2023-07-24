import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UseFetchTickets from './UseFetchForPM';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px;
`;

const Column = styled.div`
  flex: 0 0 33.33%;
  max-width: 33.33%;
  margin: 0 20px;
`;

const ColumnTitle = styled.h2`
  margin-bottom: 16px;
`;

const Card = styled.div`
  padding: 16px;
  background: ${(props) => props.theme.white};
  margin-bottom: 16px;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

const TaskName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const initialData = {
  tasks: {
    // task1: { id: 'task1', name: 'Task 1' },
  },
  columns: {
    column1: {
      id: 'column1',
      title: 'Not Started',
      taskIds: [],
    },
    column2: {
      id: 'column2',
      title: 'In Progress',
      taskIds: [],
    },
    column3: {
      id: 'column3',
      title: 'Completed',
      taskIds: [],
    },
  },
  columnOrder: ['column1', 'column2', 'column3'],
};



const BoardView = () => {
    const [teamMemberId, setTeamMemberId] = useState(''); // Set your team member ID here
    const tickets = UseFetchTickets(teamMemberId);
  console.log("aya")
    if (!tickets) {
      // You can render a loading state here if needed
      return <div>Loading...</div>;
    }
  
    const { columns } = tickets;
  
    return (
      <Container>
        {tickets.columnOrder.map((columnId) => {
          const column = columns[columnId];
  
          return (
            <Column key={column.id}>
              <ColumnTitle>{column.title}</ColumnTitle>
              {column.taskIds.map((task) => (
                <Card key={task}>
                  <TaskName>{task}</TaskName>
                </Card>
              ))}
            </Column>
          );
        })}
      </Container>
    );
  };
  export default BoardView;