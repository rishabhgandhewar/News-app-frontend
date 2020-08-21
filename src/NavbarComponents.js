import React from 'react';
import './NavbarComponent.css';
import {Form, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-switch";
import AsyncSelect from 'react-select/lib/Async';
import MainPageCard from './MainPageCard';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Route,
    Switch as RouteSwitch,
    Link,
    Redirect,
  } from "react-router-dom";


class NavbarComponents extends React.Component {

    constructor(context){
        super();
        this.state = {
            selectedOption: null,
            checked: true,
            results: [],
            nyTop: [],
            guardianTop: [],
            headlines: [],
            nyWorld: [],
            nyPolitics: [],
            nyBusiness: [],
            nyTechnology: [],
            nySports: [],
            guardianWorld: [],
            guardianPolitics: [],
            guardianBusiness: [],
            guardianTechnology: [],
            guardianSports: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.getOptions = _.debounce(this.getOptions.bind(this), 1000, {
            leading: true
          });
        this.handleBookmark = this.handleBookmark.bind(this);
        this.world = this.world.bind(this);
        this.politics = this.politics.bind(this);
        this.business = this.business.bind(this);
        this.technology = this.technology.bind(this);
        this.sports = this.sports.bind(this);
        this.home = this.home.bind(this);
    }
    componentDidMount() {
        fetch('https://secure-refuge-01308.herokuapp.com/nyTimes')
        .then(res => res.json())
        .then((data) => {
          this.setState({ nyTop: data})
        })

        fetch('https://secure-refuge-01308.herokuapp.com/guardian')
        .then(res => res.json())
        .then((data1) => {
          this.setState({ guardianTop: data1, headlines: data1 })
        })
        .catch(console.log)
    }
    handleBookmark(){
        console.log("clicked");
    }
    handleChange(selectedOption) {
        console.log(selectedOption);
    this.setState({
      selectedOption: selectedOption
    });
    }
      async getOptions(inputValue) {
        if (!inputValue) {
          return [];
        }
        try {
        const response = await fetch(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${inputValue}`,
            {
            headers: {
                "Ocp-Apim-Subscription-Key": "69bdc886f9924cfc9f5452dd1930b9ca"
            }
            }
        );
        const data = await response.json();
        const resultsRaw = data.suggestionGroups[0].searchSuggestions;
        const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }));
        this.setState({ results });
        return results;
        } catch (error) {
        console.error(`Error fetching search ${inputValue}`);
        }
    };
    handleToggle(checked){
        this.setState({ checked });
        if(this.state.nyTop.length && this.state.checked){
            this.setState({ headlines: this.state.nyTop })

        }
        else{
            this.setState({ headlines: this.state.guardianTop })
        }
    };
    world(){
        if(this.state.checked){
            fetch('https://secure-refuge-01308.herokuapp.com/guardianWorld')
            .then(res => res.json())
            .then((data) => {
            this.setState({ guardianWorld: data, headlines: data})    
            }) 
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/nyWorld')
                .then(res => res.json())
                .then((data) => {
                this.setState({ nyWorld: data, headlines: data})
            })
        }
        return <Redirect to="/world" />
    }
    politics(){
        if(this.state.checked){
            fetch('https://secure-refuge-01308.herokuapp.com/guardianPolitics')
            .then(res => res.json())
            .then((data) => {
            this.setState({ guardianPolitics: data, headlines: data})    
            }) 
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/nyPolitics')
                .then(res => res.json())
                .then((data) => {
                this.setState({ nyPolitics: data, headlines: data})
            })
        }
        return <Redirect to="/politics" />
    }
    business(){
        if(this.state.checked){
            fetch('https://secure-refuge-01308.herokuapp.com/guardianBusiness')
            .then(res => res.json())
            .then((data) => {
            this.setState({ guardianBusiness: data, headlines: data})    
            }) 
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/nyBusiness')
                .then(res => res.json())
                .then((data) => {
                this.setState({ nyBusiness: data, headlines: data})
            })
        }
        return <Redirect to="/business" />
    }
    technology(){
        if(this.state.checked){
            fetch('https://secure-refuge-01308.herokuapp.com/guardianTechnology')
            .then(res => res.json())
            .then((data) => {
            this.setState({ guardianTechnology: data, headlines: data})    
            }) 
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/nyTechnology')
                .then(res => res.json())
                .then((data) => {
                this.setState({ nyTechnology: data, headlines: data})
            })
        }
        
        return <Redirect to="/technology" />
    }
    sports(){
        if(this.state.checked){
            fetch('https://secure-refuge-01308.herokuapp.com/guardianSports')
            .then(res => res.json())
            .then((data) => {
            this.setState({ guardianSports: data, headlines: data})    
            }) 
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/nySports')
                .then(res => res.json())
                .then((data) => {
                this.setState({ nySports: data, headlines: data})
            })
        }
        return <Redirect to="/sports" />
    }
    home(){
        if(this.state.checked){
            this.setState({ headlines: this.state.guardianTop}) 
        }
        else{
            this.setState({ headlines: this.state.nyTop})
        }
        return <Redirect to="/" />
    }

    render(){
        return (
            <div>
            <Navbar className="color-nav" expand="lg">
            <Router>
            <Form inline>
                <AsyncSelect
                    className="searchBox"
                    value={this.state.selectedOption}
                    getOptionValue={this.getOptionValue}
                    getOptionLabel={this.getOptionLabel}
                    onChange= {this.handleChange}
                    placeholder="Enter keyword ..."
                    loadOptions={this.getOptions}
                    noOptionsMessage = {() => 'No Match'}
                />
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}} 
                        to="/" 
                        onClick={this.home}>
                            Home
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}}
                        to="/world" 
                        onClick={this.world}>
                            World
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}} 
                        to="/politics" 
                        onClick={this.politics}>
                            Politics
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}}
                        to="/business"  
                        onClick={this.business}>
                            Business
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}} 
                        to="/technology" 
                        onClick={this.technology}>
                        Technology
                    </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link 
                        style={{color: '#e4e4eb', textDecoration: 'none'}} 
                        to="/sports" 
                        onClick={this.sports}>
                        Sports
                    </Link>
                    </Nav.Link>
                
                </Nav>
                <RouteSwitch>
                <Route exact path="/"
                />
                <Route path="/world"
                />
                <Route path="/politics"
                />
                <Route path="/business"
                />
                <Route path="/technology"
                />
                <Route path="/sports"
                />
                </RouteSwitch>            
            <svg 
            style={{color: '#e4e4eb', 
            marginRight: '10px'
            }}
            onClick={this.handleBookmark}
            className="bi bi-bookmark" 
            width="1.5em" 
            height="1.5em" 
            viewBox="0 0 16 16"
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
            >
            <path fillRule="evenodd"
            d="M8 12l5 3V3a2 2 0 00-2-2H5a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v10.234z" 
            clipRule="evenodd"
            />
            </svg>
            <p>NYTimes</p>
            <Switch
                checked={this.state.checked}
                name="guardian"
                onChange={this.handleToggle}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
              <p>Guardian</p>
            </Navbar.Collapse>
            </Router>
          </Navbar>
          {this.state.headlines.map(item => <MainPageCard key={item.title} title={item.title} description={item.abstract} urlToImage={item.image} publishedOn={item.published_date} section={item.section} url = {item.url} />)}
          </div>
        );
    }
  }
export default NavbarComponents;