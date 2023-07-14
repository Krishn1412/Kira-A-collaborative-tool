import React from 'react';
import styled from 'styled-components';

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
    task1: { id: 'task1', name: 'Task 1' },
    task2: { id: 'task2', name: 'Task 2' },
    task3: { id: 'task3', name: 'Task 3' },
    task4: { id: 'task4', name: 'Task 4' },
  },
  columns: {
    column1: {
      id: 'column1',
      title: 'Not Started',
      taskIds: ['task1', 'task2'],
    },
    column2: {
      id: 'column2',
      title: 'In Progress',
      taskIds: ['task3'],
    },
    column3: {
      id: 'column3',
      title: 'Completed',
      taskIds: ['task4'],
    },
  },
  columnOrder: ['column1', 'column2', 'column3'],
};

const BoardView = () => {
  const { columns } = initialData;

  return (
    <Container>
      {initialData.columnOrder.map((columnId) => {
        const column = columns[columnId];
        const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId]);

        return (
          <Column key={column.id}>
            <ColumnTitle>{column.title}</ColumnTitle>
            {tasks.map((task) => (
              <Card key={task.id}>
                <TaskName>{task.name}</TaskName>
              </Card>
            ))}
          </Column>
        );
      })}
    </Container>
  );
};

export default BoardView;
