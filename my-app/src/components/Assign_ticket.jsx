import { useState } from "react";
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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "../styles/add_new.css"


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
  const ticketId = ticket.id;

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

const Ast = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch ticket list from the backend API
    axios.get("/api/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket list:", error);
      });
  }, []);

  return (
    <Container>
      <h3>Assign the below tasks</h3>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
      
    </Container>
  );
};

const EMD = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <Routes>
          <Route path="/" element={<Ast />} />
          <Route path="/ticket/:ticketId" element={<TicketPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default EMD;

