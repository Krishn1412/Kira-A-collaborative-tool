import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

const TeamMemberDropdown = ({ teamMems, onChange }) => {
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    onChange(selectedId);
  };

  if (!teamMems.length) {
    // If teamMems data is not available yet, show a loading message or a placeholder
    return <p>Loading team members...</p>;
  }

  return (
    <select className="dropdown" onChange={handleSelectChange}>
      <option value="">Select a team member</option>
      {teamMems.map((teamMem) => (
        <option key={teamMem._id} value={teamMem._id}>
          {teamMem.name}
        </option>
      ))}
    </select>
  );
};

const TicketPage = ({  }) => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [teamMems, teamSet] = useState({});
  const [ticketName, nameSet] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Simulating API call to fetch ticket details
    const fetchTicketDetails = async () => {
      const cookies = document.cookie;
      const cookieArray = cookies.split('; ');
      // console.log("jui")
      // console.log(cookieArray)
      let pmInfo = null;

      for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'pmInfo') {
          pmInfo = JSON.parse(decodeURIComponent(value));
          break;
        }
      }
      // console.log('pmInfo', pmInfo.teamId);
      if(pmInfo){
        const api_body = {
          "teamId":pmInfo.teamId,
        }
      //   console.log(api_body);
        const apiUrl = 'http://localhost:4000/api/v1/viewTeamMembers';
        // Rest of your code...


      try {
        const response = await axios.post(apiUrl, api_body);
      //   console.log(response)
        console.log('Response:', response.data);
        teamSet(response.data.teamMems);
              // console.log(initialData);
      } catch (error) {
        console.error('Error:', error);
      }
}
    };

    fetchTicketDetails();
  }, []);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");

  const handleTeamMemberChange = (selectedId) => {
    setSelectedTeamMemberId(selectedId);
  };
  const handleButtonClick = async () => {
    try {
      // Make the API call with the selected team member ID

      if (selectedTeamMemberId) {
        console.log(selectedTeamMemberId)
        console.log(id)
        const api_body = {
          "ticket":id,
          "teamMember":selectedTeamMemberId
      }
        const apiUrl = `http://localhost:4000/api/v1/ticket/productManager/assignTicket`;
        const response = await axios.post(apiUrl,api_body);

        // Handle the API response as needed
        // console.log('API Response:', response.data);
        navigate("/assign_ticket");
      } else {
        console.error('No team member selected.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Container>
      <TeamMemberDropdown
        teamMems={teamMems}
        onChange={setSelectedTeamMemberId}
      />
      <button onClick={handleButtonClick}>Execute API Call</button>
    </Container>
  );
};

export default TicketPage;
