import React from 'react';
import {Container, Navbar, NavbarBrand, Row, Col, Jumbotron, InputGroup, Input, Button, FormGroup} from 'reactstrap';
import Weather from './Weather';
export default props => {
  const [newCityName, setNewCityName] = React.useState('');
  const [cityList, setCityList] = React.useState([]);
  const [weather, setWeather] = React.useState('');

  const getCityList = () => {
    fetch('/api/cities')
    .then(res=>res.json())
    .then(res=>{
      var cityList = res.map(r=>r.city);
      setCityList(cityList);
    });
  }
  React.useEffect(()=>{
    
  },[]);
  const handleInput = event => setNewCityName(event.target.value);

  const handleSubmit = () =>{
    fetch("api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: newCityName,
      })
    })
      .then((res) => {
        getCityList();
        setNewCityName("");
      });
  }
  const getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res=>res.json())
    .then(weather=>setWeather(weather));
  }
  const handleOption = event => {
    getWeather(event.target.value);
  }
  return (
    <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">WEATHER</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">World Weather</h1>
            <p className="lead">
              The application which provides the weather for a place
            </p>
            <InputGroup>
              <Input
                placeholder="Enter your dream city"
                value={newCityName}
                onChange={handleInput}
              />
              <Button color="warning" onClick={handleSubmit}>
                Fetch this!
              </Button>
            </InputGroup>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Weather Now</h1>
          <FormGroup>
            <Input type="select" onChange={handleOption}>
              {cityList.length === 0 ? <option>No cities to fetch!</option>:
              <option>Select a city ✌</option>}
              {cityList.map((city,i)=>{
                return <option key={i}>{city}</option>
              })}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data={weather}/>
    </Container>
  );
}
