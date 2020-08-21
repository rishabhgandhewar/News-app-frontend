import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdShare } from 'react-icons/io';
import {TwitterIcon, FacebookIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from 'react-share';
import {Modal} from 'react-bootstrap';
import {
    withRouter,
} from "react-router-dom";
import './SearchPageCard.css';
let hashtags = ["CSCI_571_NewsApp"];

class SearchPageCard extends React.Component{
    constructor(props){
        super();
        this.state = {
            cat: "",
            showModal: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.details = this.details.bind(this);
    }
    componentDidMount(){
        if(this.props.section === "WORLD" || this.props.section === "SPORTS" || this.props.section === "TECHNOLOGY" || this.props.section === "BUSINESS" || this.props.section === "POLITICS"){
            this.setState({cat: this.props.section});
        }
        else{
            this.setState({cat: "OTHER"});
        }
    }
    handleClick(event) {
        console.log("Shares");
        this.setState({
          showModal: !this.state.showModal
        });
      }
      details(event){
        event.stopPropagation();
        console.log(event.nativeEvent.target);
        if(event.target.className === "modal-title h4" || event.target.className === "fade modal show" || event.target.className === "shareModal" || event.target.className === "modal-header" || event.target.className === "modal-body" || event.target.className === "col-lg-4 col-md-4 col-sm-4 col-4" || event.nativeEvent.target.localName === "svg" || event.nativeEvent.target.localName === "path" || event.nativeEvent.target.localName === "span" || event.nativeEvent.target.localName === "circle"){
                return;
            }
            console.log("Details");
            this.props.history.push('/detailedpage?id='+this.props.id)
      }
    render(){

        return (
            <div onClick={this.details}>
            <Card className="box"> 
            <Card.Body>
                <Container>
                    <Row style={{marginBottom:"3%"}}>
                    <Card.Title>{this.props.title}<IoMdShare onClick={this.handleClick}/></Card.Title>
                    </Row>
                    <Row>
                    <Card.Img className = "cardImage2" variant="top" src={this.props.urlToImage} style={{border: '0.5px grey groove', padding: '3px', borderRadius:'2px', height: '200px'}} />
                    </Row>
                </Container>
                    <Container style={{marginTop:"5%"}}>
                    <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                    <label style={{fontStyle:'italic'}}>{this.props.publishedOn}</label>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                    <span className = {this.state.cat} style={{color:'white', height: '20px'}}>
                        {this.props.section}
                    </span>
                    </Col >
                    </Row>
                </Container>
                </Card.Body>
            </Card>
            <Modal size="md" show={this.state.showModal} onHide={this.handleClick}>
                <Modal.Header closeButton>
                <Modal.Title style={{fontWeight: "500", fontSize: "20px"}}>{this.props.title}</Modal.Title>
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

export default withRouter(SearchPageCard);