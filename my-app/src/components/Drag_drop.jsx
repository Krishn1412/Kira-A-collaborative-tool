import React, { useState } from 'react';
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
  const [data, setData] = useState(initialData);

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, columnId) => {
    const taskId = event.dataTransfer.getData('taskId');

    const newColumns = { ...data.columns };

    // Remove task from its previous column
    const previousColumnId = Object.keys(data.columns).find((columnId) =>
      data.columns[columnId].taskIds.includes(taskId)
    );
    if (previousColumnId) {
      newColumns[previousColumnId].taskIds = newColumns[previousColumnId].taskIds.filter(
        (id) => id !== taskId
      );
    }

    // Add task to the new column
    if (columnId in newColumns) {
      newColumns[columnId].taskIds.push(taskId);
    } else {
      newColumns[columnId] = {
        id: columnId,
        title: columnId,
        taskIds: [taskId],
      };
      data.columnOrder.push(columnId);
    }

    const newData = {
      ...data,
      columns: newColumns,
    };

    setData(newData);
  };

  return (
    <Container>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <Column
            key={column.id}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, column.id)}
          >
            <ColumnTitle>{column.title}</ColumnTitle>
            {tasks.map((task) => (
              <Card
                key={task.id}
                draggable
                onDragStart={(event) => onDragStart(event, task.id)}
              >
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
