import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdShare} from 'react-icons/io';
import {TwitterIcon, FacebookIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from 'react-share';
import {Modal} from 'react-bootstrap';
import {
    withRouter,
  } from "react-router-dom";
import { IoMdTrash } from 'react-icons/io';
import './FavoritePageCard.css'
import 'react-toastify/dist/ReactToastify.css';


let hashtags = ["CSCI_571_NewsApp"];


class FavoritePageCard extends React.Component{
    constructor(props){
        super();
        this.state = {
            cat: "",
            NewsApp: "",
            showModal: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.details = this.details.bind(this);
        this.handleTrash = this.handleTrash.bind(this);
    }
    componentDidMount(){
        if(this.props.section === "WORLD" || this.props.section === "SPORTS" || this.props.section === "TECHNOLOGY" || this.props.section === "BUSINESS" || this.props.section === "POLITICS"){
            this.setState({cat: this.props.section});
        }
        else{
            this.setState({cat: "OTHER"});
        }
        if(this.props.id.substring(0,5)==="https"){
            this.setState({NewsApp: "NYTIMES"});
        }
        else{
            this.setState({NewsApp: "GUARDIAN"})
        }
    }
    // componentDidUpdate(){
        
    // }
    handleClick(event) {
        console.log("Shares");
        this.setState({
          showModal: !this.state.showModal
        });
    }
    details(event){
        event.stopPropagation();
        console.log(event.target.className);
            if(event.target.className === "modal-title h4" || event.target.className === "fade modal show" || event.target.className === "shareModal" || event.target.className === "modal-header" || event.target.className === "modal-body" || event.target.className === "col-lg-4 col-md-4 col-sm-4 col-4" || event.nativeEvent.target.localName === "svg" || event.nativeEvent.target.localName === "path" || event.nativeEvent.target.localName === "span" || event.nativeEvent.target.localName === "circle"){
                return;
            }
            console.log("Details");
            this.props.history.push('/detailedpage?id='+this.props.id);
            this.props.action();
    }
    handleTrash(event){
        console.log("hiii");
        // toast("Removing "+this.props.title);
        let ab = [];
        ab = JSON.parse(localStorage.getItem('bookmark'));
        for(let i = 0; i < ab.length; i++){
            if(ab[i].title === this.props.title){
                ab.splice(i,1);
                localStorage.setItem('bookmark', JSON.stringify(ab));
            }
        }
        localStorage.setItem('trash', JSON.stringify(this.props.title));
        this.props.action();
    }
    render(){
        return (
            <div onClick={this.details}>
            <Card className="box">
            <Card.Body>
            <Container>
                <Row style={{marginBottom:"3%"}}>
                <Card.Title style={{fontSize:'18px', fontStyle:'italic', fontWeight:'bold'}}>
                    {this.props.title}
                        <IoMdShare style={{fontSize:'20px'}} onClick={this.handleClick}/>
                        <IoMdTrash style={{fontSize:'24px'}} onClick={this.handleTrash}/>
                </Card.Title>
                </Row>
                <Row>
                <Card.Img className = "cardImage1" variant="top" src={this.props.image} style={{border: '0.5px grey groove', padding: '3px', borderRadius:'2px', marginTop: '-5%'}}/>
                </Row>
                </Container>
                </Card.Body>
                <Container style={{marginTop:'-2%'}}>
                <Row style={{marginLeft:'5px', marginBottom: '15px'}}>
                    <Col lg={5} md={5} sm={5} xs={5}>
                    <label style={{fontStyle:'italic'}}>{this.props.publishedOn}</label>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                    <label className = {this.state.cat} style={{height: '20px'}}>{this.props.section}</label>
                    </Col >
                    <Col lg={3} md={3} sm={3} xs={3} style={{padding:'-10%'}}>
                    <label className = {this.state.NewsApp} style={{float:'right', height: '20px'}}>{this.state.NewsApp}</label>
                    </Col>
                </Row>
            </Container>
            
            </Card> 
            <Modal size="md" show={this.state.showModal} onHide={this.handleClick}>
                <Modal.Header closeButton>
                <Container>
                <Row>
                    <Modal.Title style={{fontWeight: "bold", fontSize: "24px"}}>{this.state.NewsApp}</Modal.Title>
                </Row>
                <Row>
                    <Modal.Title style={{fontWeight: "500", fontSize: "20px"}}>{this.props.title}</Modal.Title>
                </Row>
                </Container>
                </Modal.Header>
                <Modal.Body>
                <div style={{textAlign: "center"}} className="shareModal">
                    <label style={{fontSize: "18px", fontWeight: "500"}} className="shareModal">Share Via</label>
                    <br className="shareModal"></br>
                    <Container>
                        <Row>
                            <Col lg = {4} md = {4} sm = {4} xs = {4}>
                                <FacebookShareButton url={this.props.url} hashtag= "#CSCI_571_NewsApp" ><FacebookIcon size={56} round={true} /></FacebookShareButton>
                            </Col>
                            <Col lg = {4} md = {4} sm = {4} xs = {4}>
                                <TwitterShareButton url={this.props.url} hashtags= {hashtags} ><TwitterIcon size={56} round={true} /></TwitterShareButton>
                            </Col>
                            <Col lg = {4} md = {4} sm = {4} xs = {4}>
                                <EmailShareButton url={this.props.url} subject="#CSCI_571_NewsApp" ><EmailIcon size={56} round={true} /></EmailShareButton>
                            </Col>
                        </Row>
                    </Container>
                    
                    
                    
                </div>
                </Modal.Body>
            </Modal>
            </div>
        );
    }
};

export default withRouter(FavoritePageCard);