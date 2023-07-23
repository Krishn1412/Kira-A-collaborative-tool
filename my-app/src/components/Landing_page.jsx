import React from 'react';
import styled from 'styled-components';
import { Outlet, Link } from "react-router-dom";
import Footer from './Footer';
// variables
const darkPurple = '#00106a';
const lightBlue = '#dfe9ff';
const activeBlue = '#4b71ff';
const white = '#ffffff';
const lightPurple = '#989dc5';

// Navigation styling
const Nav = styled.nav`
  height: 50px;
  background: ${white};
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center; 
  justify-content: flex-start;
  padding: 0;

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;

    li {
      margin-right: 30px;
      color: ${activeBlue};

      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .logo {
    height: 50px;
    width: 75px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    background-color: ${activeBlue};
    cursor: pointer;
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid ${white};
  }
`;

// Banner styles
const Banner = styled.section`
   height: auto;
  margin: 32px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    height: 450px;
    margin-bottom: 32px;
  }
  .container {
    ${'' /* display: flex  */}
    margin-left:290px;
    align-items: left;
    justify-content: left;
  }
  .banner-button {
  border: 0;
  border-radius: 50px;
  margin-right:10px;
  padding: .75rem 2.75rem;
  background:${activeBlue};
  color: $white;
  box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.25);
  cursor: pointer;
  position: relative;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  -o-transform: translateY(-5px);
  transform: translateY(-5px);
    box-shadow: 0 1rem 1.5rem rgba(0,0,0,.25);
    background: rgba(97, 180, 232)
  }
  
}
  .banner-text {
    max-width: 550px;
    float: right;
    h1 {
      color: ${darkPurple};
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: 3px;
      margin-bottom: 1rem;
    }
    p {
      color: ${darkPurple};
      font-size: 1.05rem;
      line-height: 1.75;
    }
  }
  .banner-kk{
    background:red;
  }
  .banner-image {
    opacity: 0.25;
    height: 300px;
    right: 0px;
    top: 0px;
    position: absolute;
    -webkit-filter: drop-shadow(0 3rem 0.05rem rgba(191, 216, 255, 1));
    filter: drop-shadow(0 3rem 0.05rem rgba(191, 216, 255, 1));
  }

  @media (min-width: 768px) {
    height: 450px;
    margin-bottom: 32px;

    .banner-image {
      display: inherit;
      height: 400px;
      top: 0px;
      opacity: 0.5;
    }
  }

  @media (min-width: 992px) {
    height: 500px;
    top: -50px;
    opacity: 1;
  }
`;

// Card styles
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  padding: 16px 24px;
  margin: 40px 40px;
  bottom: 50px;
  background: ${white};
  height: 100%;
  position: relative;
  border: none;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  h3.card-title {
    font-weight: 700;
    font-size: 1.3rem;
    color: ${darkPurple};
  }

  p {
    color: ${lightPurple};
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 72px;
  }

  .card-link {
    position: center;
    bottom: 18px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .card-icon {
    width: 60px;
    margin-bottom: 8px;
    position: relative;
    top: 0;
    left: -12px;
  }
`;

const cardsData = [
  {
    icon: 'https://image.ibb.co/fcnzt6/team_management.png',
    title: 'Team Management',
    text:
      'With Digital Teams you can invite and manage users, ensure security with two-factor authentication, and control your resource spend with centralized billing–at no additional cost.',
    link: '#',
  },
  {
    icon: 'https://image.ibb.co/evyiLm/backups.png',
    title: 'Backups',
    text:
      'Backups run automatically on your Droplets each week and are stored for four weeks–add 20% of monthly Droplet cost.',
    link: '#',
  },
  {
    icon: 'https://image.ibb.co/cFV8mR/monitoring.png',
    title: 'Monitoring',
    text:
      'Collect metrics on visibility, monitor Droplet performance and receive alerts when problems arise in your infrastructure–at no additional cost.',
    link: '#',
  },
];

// Footer styles
// const Footer = styled.footer`
//   background: ${darkPurple};
//   margin: 32px 0 0;
//   padding: 32px 0;

//   ul {
//     margin: 0;
//     padding: 0;
//     list-style: none;

//     li {
//       color: ${white};
//       margin-bottom: 16px;
//     }
//   }
// `;



const Landing = () => {
  return (
    <>
      <div>
      <Nav>
      <div className="logo">
        <div className="arrow-down"></div>
      </div>
      <ul>
        <li>Services</li>
        <li>Products</li>
        <li>FAQs</li>
        <li>Contact</li>
      </ul>
    </Nav>
    <div className="kk">
    <Banner>
      <div className="container">
        <div className="banner-text">
          <h1>Kira</h1>
          <p>
            <strong>
              A great Collaborative tool for managing your bussiness
            </strong>{' '}
            Our tools make it simple to track how your teams are performing
            and help you to respond quickly if there is a problem
          </p>
          <Link to="/EM_login">
            <button className='banner-button'>EM</button>
          </Link>
          <Link to="/PM_login">
            <button className='banner-button'>PM</button>
          </Link>
          <Link to="/Mem_login">
            <button className='banner-button'>Team Member</button>
          </Link>
        </div>
      </div>
      <img
        className="banner-image"
        src="https://preview.ibb.co/bMi5Y6/banner_img.png"
        alt="monitoring"
      />
    </Banner>
    <Container>
    {cardsData.map((card, index) => (
      <CardWrapper key={index} className="mb-30">
        <Card>
          <img className="card-icon" src={card.icon} alt={card.title} />
          <h3 className="card-title">{card.title}</h3>
          <p className="card-text">{card.text}</p>
          <a className="card-link" href={card.link}>
            Learn more
          </a>
        </Card>
      </CardWrapper>
    ))}
    </Container>
    <Footer />
    {/* <Footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>Footer Link</li>
            </ul>
          </div>
        </div>
      </div>
    </Footer> */}
    </div>
    <Outlet/>
    </div>
    </>
  );
};

export default Landing;
