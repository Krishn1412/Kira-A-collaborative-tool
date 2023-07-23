import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import "../styles/add_new.css"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Board from "./Simp_view1";



const handleit = () =>{
  document.cookie = `pmInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
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


const TicketCard = ({ ticket }) => {
  const ticketId = ticket._id;

  return (
    <Link to={`/ticket/${ticketId}`}>
      <Card>
        <h3 className="card-title">{ticket.title}</h3>
        <p>{ticket.description}</p>
        <div className="card-link">Card Link</div>
      </Card>
    </Link>
  );
};

const TicketPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // Fetch ticket details from the backend API
    axios.get(`/api/tickets/${ticketId}`)
      .then((response) => {
        setTicket(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
      });
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Ticket {ticket.id}</h2>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.priority}</p>
      <Dropdown/>
      {/* Display ticket details */}
    </div>
  );
};


const PMD =  () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const cookies = document.cookie;
  const cookieArray = cookies.split('; ');
  const [isOpened, setIsOpened] = useState(false);
  const [pmInfo, setpmInfo] = useState(null);

  const settingPm = (givenPminfo) => {
    setpmInfo(givenPminfo);
  }


  useEffect(() => {
    if(pmInfo === null){
      for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'pmInfo') {
          
          settingPm(JSON.parse(decodeURIComponent(value)));
          break;
        }
      }
    //   console.log(api_body);
      const apiUrl = 'http://localhost:4000/api/v1/ticket/viewUnassignedTickets';
      // Rest of your code...
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          // Rest of your code...
          console.log(response.data);
          setTickets(response.data.tickets);
          // response.data.tickets.forEach((ticket) => {
          //   const { name, status } = ticket;
          //   if (status === 'Not Started') {
          //     initialData.columns.column1.taskIds.push(name);
          //   } else if (status === 'In Progress') {
          //     initialData.columns.column2.taskIds.push(name);
          //   } else if (status === 'Completed') {
          //     initialData.columns.column3.taskIds.push(name);
          //   }
          // });
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      // Call the async function immediately
      fetchData();

    }
  }, []);
  return (
    <div className={classes.root}>
    <AppBar className={classes.appBar}>
           <Toolbar>
             <IconButton
              color="inherit"
              onClick={() => setIsOpened(!isOpened)}
              className={classes.icon}
            >
              {isOpened ? (
                <ChevronLeftIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Product Dashboard
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
              to="/PM_Dashboard"
              onClick={() => setIsOpened(false)} // Close the drawer after clicking the button
            >
              Dashboard
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/add_ticket"
              onClick={() => setIsOpened(false)} // Close the drawer after clicking the button
            >
              Add Tickets
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/assign_ticket"
              onClick={() => setIsOpened(false)} // Close the drawer after clicking the button
            >
              Assign Tickets
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
      <h3>Assign the below tasks</h3>
      {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
      ))}
      
    </Container>
      </main>
    </div>
    <div className={classes.footer}>
          <Typography variant="h6">Footer</Typography>
        </div>
      </div>
  );
};

export default PMD;

