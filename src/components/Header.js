import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

export function Header() {

    const navbar = {
        background: "#FFFFFF",
        padding: "0"
      };

    const navbar_subtitle={
        justifyContent: "center",
        margin: "0px 50px"
    }

    const navbar_subtitle_fonts = {
        fontFamily: 'revert',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: "18px",
        lineHeight: "31px",
        alignItems: "center",
        color: "#0F2B61",
        background: "white",
        border: '0'
    }

  const imgSize = {
    width: "10vw",
  }

  const navbar_button = {
    marginRight: '1rem',
  }

  const [section, setSection] = useState(null);

  useEffect(() => {
    const sectionElement = document.getElementById("footerId");
    setSection(sectionElement);
  }, []);

  function scrollToSection() {
    section.scrollIntoView({ behavior: 'smooth' });
  }

  const [lawsuitsData, setLawsuitsData] = useState(null)

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`http://${process.env.REACT_APP_BACKEND_IP}/active-lawsuits/all`);
            console.log(datafetch)
            setLawsuitsData(datafetch.data.lawsuitList);
          }catch(error){  
            console.log(error);
          }
        };
  
        getapidata();
        
      },[]);

    return (
        <Navbar style={navbar} expand="lg">
            <div className="navbar_title">
              <img src="https://americancompo.s3.ap-south-1.amazonaws.com/american-compo-logo-white.png" style={imgSize}></img>
              {/* <h5 className="navbar_title_font" id='logText'>American Compo Legal</h5> */}
            </div>
                {/* <Navbar.Brand style={navbar_title}><h5>American Compo Legal</h5></Navbar.Brand> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" style={navbar_button}/>
            <Navbar.Collapse id="basic-navbar-nav" style={navbar_subtitle}>
              <Nav className="dropbtn sizeOfNavbar">
                <Nav.Link style={navbar_subtitle_fonts} href="/">Home</Nav.Link>
                <Nav.Link style={navbar_subtitle_fonts} href="/about-us">About Us</Nav.Link>
                <Dropdown className='dropdownbtn'>
                  <Dropdown.Toggle style={navbar_subtitle_fonts} variant="success" id="dropdown-basic">
                  Active Lawsuits
                  </Dropdown.Toggle>
                  {lawsuitsData && 
                  <Dropdown.Menu>
                    {lawsuitsData.map((item, index) => (
                        <Dropdown.Item className='dropdownbtntext' href={"/active-lawsuit/?name="+item} key={index} value={item}>{item}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>}
                </Dropdown>  
                <Nav.Link style={navbar_subtitle_fonts} href="#link">Feedback</Nav.Link>            
              </Nav>
            </Navbar.Collapse>

            <div className="navbar_title_last">
            <h5 className="navbar_title_last_font" onClick={scrollToSection}>Call Now</h5>
            </div>
        </Navbar>
      );
}
