import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import "../styles/add_new.css"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const Table = () => {
    const [data, setData] = useState([
      { id: 1, name: "John", age: 25 },
      { id: 2, name: "Jane", age: 30 },
      { id: 3, name: "Bob", age: 35 },
    ]);
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  const Dropdown = () => {
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    return (
      <select  className="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select a joinee</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    );
  };
  const Dropdown1 = () => {
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    return (
      <select  className="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select a team</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    );
  };
const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "#00106a",
      },
      appBar: {
        background: "#9AC5F4",
        color: "#dfe9ff",
      },
      icon: {
        padding: "10px",
      },
      title: {
        margin: "auto",
      },
      container: {
        display: "flex",
        flex: 1,
      },
      drawer: {
        background: "#fffff",
        position: "static",
        transition: "width .7s",
      },
      closed: {
        width: "0px",
      },
      opened: {
        width: "240px",
      },
      main: {
        flex: 1,
        background: "#f7faff",
        color: "#00106a",
      },
      footer: {
        background: "#00106a",
        height: "50px",
        color: "#dfe9ff",
      },
      button: {
        margin: "10px 0px",
        padding: "12px 24px",
        background: "#fffff",
        color: "#00106a",
        border: "0px solid #00106a",
        borderRadius: "4px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#00106a",
          color: "#dfe9ff",
          cursor: "pointer",
        },
    },
}));

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin :100px;
`;

const CardWrapper = styled.div`
  margin-bottom: 60px;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (min-width: 992px) {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }
`;

const Card = styled.div`
  padding: 16px;
  margin: 20px;
  background: ${props => props.theme.white};
  height: 100%;
  position: relative;
  border: none;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  h3.card-title {
    font-weight: 700;
    font-size: 1.2rem;
    color: ${props => props.theme.darkPurple};
  }

  p {
    color: ${props => props.theme.lightPurple};
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 40px;
  }

  .card-link {
    position: absolute;
    bottom: 10px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .card-icon {
    width: 40px;
    margin-bottom: 6px;
    position: relative;
    top: 0;
    left: -8px;
  }
`;

const useFetchTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Make the API call to fetch teams data
        const response = await axios.get("http://localhost:4000/api/v1/ViewTeams");
        console.log(response);
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return teams;
};

// Custom hook to fetch new members data
const useFetchNewMembers = () => {
  const [newMembers, setNewMembers] = useState([]);

  useEffect(() => {
    const fetchNewMembers = async () => {
      try {
        // Make the API call to fetch new members data
        const response = await axios.get("http://localhost:4000/api/v1/ViewAllUnassignedTeamMembers");
        console.log(response);
        setNewMembers(response.data.teammembers);
      } catch (error) {
        console.error("Error fetching new members:", error);
      }
    };

    fetchNewMembers();
  }, []);

  return newMembers;
};
const handleit = () =>{
  document.cookie = `emInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

const EMD =  () => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const teams = useFetchTeams();
  const newMembers = useFetchNewMembers();

  const handleButtonClick = async () => {
    // Use selectedTeam and selectedMember to make another API call
    // ...
    const api_body={
      "teamId":selectedTeam,
      "teamMemId":selectedMember
    }
    const response = await axios.post("http://localhost:4000/api/v1/EngineeringManager/assignTeam",api_body);
    console.log(response);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setIsOpened(!isOpened)}
            className={classes.icon}
          >
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Engineering Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.container}>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawer, {
              [classes.closed]: !isOpened,
              [classes.opened]: isOpened,
            }),
          }}
        >
          <Button
            className={classes.button}
            component={Link}
            to="/EM_Dashboard"
            onClick={() => setIsOpened(false)}
          >
            Dashboard
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to="/add_mem"
            onClick={() => setIsOpened(false)}
          >
            Add member
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to="/add_team"
            onClick={() => setIsOpened(false)}
          >
            Add new Team
          </Button>
          <Button
              className={classes.button}
              component={Link}
              to="/"
              onClick={handleit}
            >
              Logout
            </Button>
        </Drawer>
        <main className={classes.main}>
          <Container>
            <div>
              {/* Render the teams dropdown */}
              <select
                className="dropdown"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>

              {/* Render the new members dropdown */}
              <select
                className="dropdown"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                <option value="">Select a new member</option>
                {newMembers.map((member) => (
                  <option key={member.id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>

              {/* Render the table */}
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace this with the actual data for the table */}
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>35</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>

          {/* Button to trigger the API call */}
          <button className="button" onClick={handleButtonClick}>
            <span>Add Member</span>
          </button>
        </main>
      </div>
      <div className={classes.footer}>
        <Typography variant="h6">Footer</Typography>
      </div>
    </div>
  );
};

export default EMD;