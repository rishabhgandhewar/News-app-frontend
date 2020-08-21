
import './App.css';
import React from 'react';
import './NavbarComponent.css';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-switch";
import {
  BrowserRouter as Router,
  Route,
  Switch as RouteSwitch,
  NavLink,
} from "react-router-dom";
import Shares from './Shares';
import AutoSuggest from './AutoSuggest';
import DetailedPageCard from './DetailedPageCard';
import Favorites from './Favorites';
import ReactTooltip from 'react-tooltip'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import World from './World';
import Politics from './Politics';
import Business from './Business';
import Technology from './Technology';
import Sports from './Sports';
import Home from './Home';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      checked: (localStorage.getItem("toggle") === "true" ? false : true),
      results: [],
      nyTop: [],
      guardianTop: [],
      headlines: [],
      pathname: "",
      dummy:"",
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNavbar = this.handleNavbar.bind(this);
  }
  componentDidMount() {
    let ab = [];
    localStorage.setItem('bookmark', JSON.stringify(ab));
    this.setState({pathname: 'other'});
    localStorage.setItem('pathname', 'other');
    
  }
  componentDidUpdate(prevState){
    if(this.state.pathname !== localStorage.getItem('pathname')){
      console.log("updated"+localStorage.getItem('pathname'));
        this.setState({pathname: localStorage.getItem('pathname')});
    }
  }
  handleBookmark() {
    ReactTooltip.hide();
    localStorage.setItem('pathname', 'bookmark');
    this.setState({dummy: "bookmarkDummy"});
    console.log("handled"+localStorage.getItem('pathname'));
    console.log(this.state.pathname);
  }
  handleNavbar(){
    localStorage.setItem('pathname', 'other');
    this.setState({dummy: "otherDummy"});
  }
  handleToggle(checked) {
    console.log("toggled");
    console.log(checked)
    localStorage.setItem("toggle", this.state.checked);
    console.log("handle"+localStorage.getItem("toggle"));
    this.setState({ checked });
  }
  handleSearch(){
    localStorage.setItem('pathname', 'search');
    this.setState({dummy: "searchDummy"});
  }
  render() {
    let main;
    if(localStorage.getItem('pathname') === 'other'){
      main = <div>
      <ReactTooltip 
          place="bottom"
          effect="solid"
          clickable="true"
      />
      <Router>
        <Navbar className="color-nav" expand="lg xs" variant="dark">
          <AutoSuggest action={this.handleSearch}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto">
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none' }}
                to="/"
                activeStyle = {{color: 'white'}}
                exact = {true}
               >
                Home
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none' }}
                to="/world"
                activeStyle = {{color: 'white'}}
                >
                World
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none' }}
                to="/politics"
                activeStyle = {{color: 'white'}}
              >
                Politics
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/business"
                activeStyle = {{color: 'white'}}
               >
                Business
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/technology"
                activeStyle = {{color: 'white'}}
               >
                Technology
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none' }}
                to="/sports"
                activeStyle = {{color: 'white'}}
              >
                Sports
              </NavLink>

            </Nav>
            <NavLink className="fav" to="/favorites">
              <span style={{color: '#e4e4eb', marginRight:'15px'}} data-tip="Bookmark">
              <FaRegBookmark onClick={this.handleBookmark} style={{fontSize: '22px'}}/>
              </span>
            </NavLink>
            <p>NYTimes</p>
            <Switch
              checked={this.state.checked}
              onChange={this.handleToggle}
              onColor="#4693e0"
              name="guardian"
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#dad8d9"
              onHandleColor="#fffffd"
              offHandleColor="#ffffff"
              className="react-switch"
              id="material-switch"
            />
            {/* <Switch
              checked={this.state.checked}
              onChange={this.handleToggle}
              onColor="#86d3ff"
              name="guardian"
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
            /> */}
            <p>Guardian</p>
          </Navbar.Collapse>
        </Navbar>
        <RouteSwitch>
          <Route exact path="/search"
            component={Shares}
          />
          <Route exact path="/detailedpage" render={() => {
                {this.handleSearch()}
                return <DetailedPageCard />;
            }
        }/>
          {/* <Route exact path="/detailedpage"
            component={() => <DetailedPageCard />}
          /> */}
          <Route exact path="/"
            component={() => <Home />}
          />
          <Route exact path="/world"
            component={() => <World />}
          />
          <Route exact path="/politics"
            component={() => <Politics />}
          />
          <Route exact path="/business"
            component={() => <Business />}
          />
          <Route exact path="/technology"
            component={() => <Technology />}
          />
          <Route exact path="/sports"
            component={() => <Sports />}
          />
          <Route path="/favorites" 
          component={() => <Favorites/>}
          />
        </RouteSwitch>
      </Router>
    </div>
    }
    else if(localStorage.getItem('pathname') === 'bookmark'){
      main = <div>
      <ReactTooltip 
          place="bottom"
          effect="solid"
          clickable="true"
      />
      <Router>
        <Navbar className="color-nav" expand="lg" variant="dark">
          <AutoSuggest action={this.handleSearch}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/"
                activeStyle = {{color: 'white'}}
                exact = {true}
                >
                Home
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/world"
                activeStyle = {{color: 'white'}}
                >
                World
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/politics"
                activeStyle = {{color: 'white'}}
               >
                Politics
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/business"
                activeStyle = {{color: 'white'}}
              >
                Business
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/technology"
                activeStyle = {{color: 'white'}}
               >
                Technology
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/sports"
                activeStyle = {{color: 'white'}}
              >
                Sports
              </NavLink>

            </Nav>
            <NavLink to="/favorites">
            <span style={{color: '#e4e4eb', marginRight:'15px'}} data-tip="Bookmark">
              <FaBookmark onClick={this.handleBookmark} style={{fontSize: '22px'}}/>
            </span>
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
        <RouteSwitch>
          <Route exact path="/search"
            component={Shares}
          />
          {/* <Route exact path="/detailedpage"
            component={DetailedPageCard}
          /> */}
          <Route exact path="/detailedpage" render={() => {
                {this.handleSearch()}
                return <DetailedPageCard />;
            }
        }/>
          <Route exact path="/" render={() => {
                {this.handleNavbar()}
                return <Home />;
            }
        }/>
           <Route exact path="/world" render={() => {
                {this.handleNavbar()}
                return <World />;
            }
        }/>
          <Route exact path="/politics" render={() => {
                {this.handleNavbar()}
                return <Politics />;
            }
        }/>
          <Route exact path="/business" render={() => {
                {this.handleNavbar()}
                return <Business />;
            }
        }/>
          <Route exact path="/technology" render={() => {
                {this.handleNavbar()}
                return <Technology />;
            }
        }/>
          <Route exact path="/sports" render={() => {
                {this.handleNavbar()}
                return <Sports />;
            }
        }/>
          <Route path="/favorites" 
          component={Favorites}
          />
        </RouteSwitch>
      </Router>
    </div>
    }
    else if(localStorage.getItem('pathname') === 'search'){
      main = <div>
      <ReactTooltip 
          place="bottom"
          effect="solid"
          clickable="true"
      />
      <Router>
        <Navbar className="color-nav" expand="lg" variant="dark">
          <AutoSuggest action={this.handleSearch}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/"
                activeStyle = {{color: 'white'}}
                exact = {true}
               >
                Home
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/world"
                activeStyle = {{color: 'white'}}
                >
                World
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/politics"
                activeStyle = {{color: 'white'}}
              >
                Politics
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/business"
                activeStyle = {{color: 'white'}}
              >
                Business
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/technology"
                activeStyle = {{color: 'white'}}
               >
                Technology
              </NavLink>
              <NavLink
                style={{ color: '#95abc2', textDecoration: 'none'}}
                to="/sports"
                activeStyle = {{color: 'white'}}
               >
                Sports
              </NavLink>

            </Nav>
            <NavLink to="/favorites">
              <span style={{color: '#e4e4eb', marginRight:'15px'}} data-tip="Bookmark">
              <FaRegBookmark onClick={this.handleBookmark} style={{fontSize: '22px'}}/>
              </span>
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
        <RouteSwitch>
          <Route exact path="/search"
            component={Shares}
          />
          <Route exact path="/detailedpage"
            component={DetailedPageCard}
          />
          <Route exact path="/" render={() => {
                {this.handleNavbar()}
                return <Home />;
            }
        }/>
           <Route exact path="/world" render={() => {
                {this.handleNavbar()}
                return <World />;
            }
        }/>
          <Route exact path="/politics" render={() => {
                {this.handleNavbar()}
                return <Politics />;
            }
        }/>
          <Route exact path="/business" render={() => {
                {this.handleNavbar()}
                return <Business />;
            }
        }/>
          <Route exact path="/technology" render={() => {
                {this.handleNavbar()}
                return <Technology />;
            }
        }/>
          <Route exact path="/sports" render={() => {
                {this.handleNavbar()}
                return <Sports />;
            }
        }/>
          <Route path="/favorites" 
          component={Favorites}
          />
        </RouteSwitch>
      </Router>
    </div>
    }
    return (
      <div>
        {main}
      </div>
    );
  }
}

export default App;