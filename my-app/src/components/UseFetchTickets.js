// useFetchTickets.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const initialData = {
    columnOrder: ['column1', 'column2', 'column3'],
    columns: {
    column1: { id: 'column1', title: 'Not Started', taskIds: [] },
    column2: { id: 'column2', title: 'In Progress', taskIds: [] },
    column3: { id: 'column3', title: 'Completed', taskIds: [] },
    },
};

const UseFetchTickets = (teamMemberId) => {
  const [tickets, setTickets] = useState(null);
  const [userInfo, setUserInfo] = useState("");


  useEffect(() => {
    const fetchUserInfo = () => {
      const cookies = document.cookie;
      const cookieArray = cookies.split('; ');
  
      for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'userInfo') {
          setUserInfo(JSON.parse(decodeURIComponent(value)));
          break;
        }
      }
    };
  
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetchTickets = async () => {
        try {
          const api_body = {
            "teamMemberId": userInfo.userid,
          };
        //   console.log(userInfo.userid)
          const response = await axios.post('http://localhost:4000/api/v1/TeamMember/viewTickets', api_body);
          const fetchedTickets = response.data.tickets;
          fetchedTickets.forEach((ticket) => {
                const { name, status } = ticket;
                if (status === 'Not Started') {
                initialData.columns.column1.taskIds.push(name);
                } else if (status === 'In Progress') {
                initialData.columns.column2.taskIds.push(name);
                } else if (status === 'Completed') {
                initialData.columns.column3.taskIds.push(name);
                }
            });
          setTickets(initialData); // Assuming the API response contains the ticket data
        } catch (error) {
          // Handle error (e.g., display an error message)
          console.error('Error fetching tickets:', error);
        }
      };
  
      fetchTickets();
    }
  }, [userInfo]);

  return tickets;
};

export default UseFetchTickets;
