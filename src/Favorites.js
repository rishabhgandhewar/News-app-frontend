import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FavoritePageCard from './FavoritePageCard';
import {Container, Row} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import {
    withRouter
  } from "react-router-dom";

  
class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            favorites: [],
            length: "",
            fill: "",
        }
        this.handler = this.handler.bind(this);
    }
    componentDidMount(){
        let ab = [];
        ab = JSON.parse(localStorage.getItem('bookmark'));
        console.log(ab);
        this.setState({length: ab.length});
        this.setState({favorites: ab});
    }
    componentDidUpdate(){
        let ab = [];
        ab = JSON.parse(localStorage.getItem('bookmark'));
        if(this.state.length !== ab.length) {
            let ab = [];
            ab = JSON.parse(localStorage.getItem('bookmark'));
            console.log(ab);
            this.setState({length: ab.length});
            this.setState({favorites: ab});
        }
    }
    handler(){
        let title = JSON.parse(localStorage.getItem('trash'));
        toast("Removing "+title,{
            className: "toastColor"
        });
        localStorage.removeItem('trash');
        console.log("toasting")
        this.setState({fill: "fill"});
    }
    render(){
        let aB = [];
        let mainLabel;
        aB = JSON.parse(localStorage.getItem('bookmark'));

        if(aB !== null && aB.length !== 0){
            mainLabel = <div className="header"><label className="header">Favorites</label> </div>
        }
        else{
            mainLabel = <div className="center-header"><label>You have no saved articles</label> </div>
        }
    return(
        <div>
            <ToastContainer
                    position="top-center"
                    hideProgressBar={true}
                    autoClose={2000}
                    closeOnClick={true}
                    draggable={false}
                    rtl={false}
                    transition={Zoom}
                    newestOnTop={true}
                />
            {mainLabel}
            <Container fluid>
                <Row lg = {4}>
                    {this.state.favorites.map(item => <FavoritePageCard action={this.handler} key={item.id} id={item.id} title={item.title} image={item.image} publishedOn={item.published_date} section={item.section} url = {item.url} />)}
                </Row>
            </Container>        
        </div>
    );
    }
}

export default withRouter(Favorites);