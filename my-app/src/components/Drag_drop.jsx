import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
const cookies = document.cookie;
const cookieArray = cookies.split('; ');
const taskMap = new Map();
let userInfo = null;
for (const cookie of cookieArray) {
  const [name, value] = cookie.split('=');
  if (name === 'userInfo') {
    userInfo = JSON.parse(decodeURIComponent(value));
    break;
  }
}
// console.log(userInfo);
if(userInfo){
  const api_body = {
    "teamMemberId":userInfo.userid,
  }
  // console.log(api_body);
  const apiUrl = 'http://localhost:4000/api/v1/TeamMember/viewTickets';
  // Rest of your code...

try {
  const config = {
    // Your request configuration, including headers
    headers: {
      'Content-Type': 'application/json', // Set the content type of the request
    },
  };
  const response = await axios.post(apiUrl, api_body,config);
  // console.log('Response:', response.data);
        response.data.tickets.forEach((ticket) => {
          const { name, status, _id } = ticket;
          const ramu = {name,_id};
          taskMap.set(_id,ramu);
          if (status === 'Not Started') {
            initialData.columns.column1.taskIds.push(ramu);
          } else if (status === 'In Progress') {
            initialData.columns.column2.taskIds.push(ramu);
          } else if (status === 'Completed') {
            initialData.columns.column3.taskIds.push(ramu);
          }
        });
        // console.log(initialData);
} catch (error) {
  console.error('Error:', error);
}
}
const BoardView = () => {
  const [data, setData] = useState(initialData);

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };
  const findColumnIndexByTaskId = (data, taskId) => {
    const { columns, columnOrder } = data;
    // console.log("looing for "+taskId);
    for (let i = 0; i < columnOrder.length; i++) {
      const columnId = columnOrder[i];
      const column = columns[columnId];
      for(let j=0;j<column.taskIds.length;j++) {
        if(column.taskIds[j]._id === taskId) {
          if(i===0) return 'column1';
          if(i===1) return 'column2';
          if(i===2) return 'column3';
        }
      }
    }
  
    return -1;
  };
  const onDrop = async (event, columnId) => {

    const taskId = event.dataTransfer.getData('taskId');
    // console.log(taskId);
    const newColumns = { ...data.columns };
    // console.log(data);
    // Remove task from its previous column
    const previousColumnId = findColumnIndexByTaskId(data, taskId);
    // console.log(previousColumnId);
    if (previousColumnId) {
      newColumns[previousColumnId].taskIds = newColumns[previousColumnId].taskIds.filter(
        (id) => id._id !== taskId
      );
      // console.log(newColumns[previousColumnId].taskIds);
    }

    // Add task to the new column
    if (columnId in newColumns) {
      newColumns[columnId].taskIds.push(taskMap.get(taskId));
    }

    const newData = {
      ...data,
      columns: newColumns,
    };
    const api_body = {
      "id": taskId,
      "status": newData.columns[columnId].title,
    }
    console.log(api_body);
    const apiUrl = 'http://localhost:4000/api/v1/TeamMember/updateStatus';
  // Rest of your code...
    
    try {
      const config = {
        // Your request configuration, including headers
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Include the token in the 'Authorization' header
        },
        withCredentials: true, // This will enable sending cookies
      };
      const response = await axios.post(apiUrl, api_body,config);
      // console.log('Response:', response.data);
            
            console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
    // console.log(newData);
    setData(newData);
  };

   const [tickets, setTickets] = useState([]);
  // useEffect(() => {
  //   const fetchTickets = async () => {
     
  //   };

  //   fetchTickets();
  // }, []);

  return (
    <Container>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        {/* const tasks = column.taskIds.map((taskId) => data.tasks[taskId]); */}

        return (
          <Column
            key={column.id}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, column.id)}
          >
            
            <ColumnTitle>{column.title}</ColumnTitle>
            {column.taskIds.map((task) => (
              <Card
                key={task._id}
                draggable
                onDragStart={(event) => onDragStart(event, task._id)}
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
