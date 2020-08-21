import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdShare } from 'react-icons/io';
import {Modal} from 'react-bootstrap';
import {TwitterIcon, FacebookIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from 'react-share';
import {
    withRouter,
} from "react-router-dom";
import './MainPageCard.css'

let hashtags = ["CSCI_571_NewsApp"];
class MainPageCard extends React.Component{
    constructor(props){
        super();
        this.state = {
            showModal: false,
            cat: "",
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
    //   Example = () => {
    //     return(
    //     <div>
    //       <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
    //         {this.props.description}
    //       </MediaQuery>
    //       {/* <MediaQuery >
    //         {this.props.description.substring(0,40)}
    //      </MediaQuery> */}
    //     </div>
    //     )
    //   }
    render(){

        return (
            <div onClick={this.details} className="main">
            <Card className = "Box">
            <Container fluid style={{paddingTop: '20px', paddingLeft: '20px', paddingBottom: '20px'}}>
                <Row >
                    <Col lg = {3} xs={0} style={{height: '90%'}}>
                        <Card.Img className = "cardImage" variant="top" src={this.props.urlToImage} style={{border: '0.5px grey groove', padding: '2%', borderRadius:'2px'}}/>
                    </Col>
                    <Col lg = {9} xs={12}>
                            <Card.Title style={{fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', width: '100%'}}>{this.props.title}
                                <IoMdShare onClick={this.handleClick}/>
                            </Card.Title>
                            <Card.Text style={{fontSize: '14px', color: 'black', marginTop: '-15px'}}>
                                {window.screen.width >= 1224 && this.props.description}
                                {window.screen.width < 1224 && this.props.description.substring(0,130)+"..."}
                            </Card.Text>
                                    {/* <Card.Text>
                                    <span  style={{fontSize: '14px', float: 'left', color: 'black', fontStyle: 'italic'}}>{this.props.publishedOn}</span>
                                    <label style={{fontSize: '14px'}}className = {this.state.cat}>{this.props.section}</label>
                                    </Card.Text> */}
                                    <Container fluid>
                                        <Row style={{ marginBottom: '15px'}}>
                                            <Col lg={8} md={5} sm={5} xs={8}>
                                            <label style={{fontStyle:'italic', marginLeft:'-10px', cursor:'pointer'}}>{this.props.publishedOn}</label>
                                            </Col>
                                            <Col lg={4} md={4} sm={4} xs={4}>
                                            <label className = {this.state.cat} style={{height: '20px', cursor:'pointer'}}>{this.props.section}</label>
                                            </Col >
                                            
                                        </Row>
                                    </Container>
                    </Col>
                </Row>
            </Container>
            </Card>
            <Modal size="md" show={this.state.showModal} onHide={this.handleClick}>
                <Modal.Header closeButton>
                <Modal.Title style={{fontWeight: "500", fontSize: "20px"}}>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
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
                </Modal.Body>
            </Modal>
            </div>
        );
    }
};

export default withRouter(MainPageCard);