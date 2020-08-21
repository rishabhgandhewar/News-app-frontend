import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './DetailedPageCard.css';
import {TwitterIcon, FacebookIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from 'react-share';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Collapse from 'react-bootstrap/Collapse'
import { Link, Events, animateScroll as scroll } from 'react-scroll'
// import commentBox from 'commentbox.io';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import ReactTooltip from 'react-tooltip'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import {
    withRouter
  } from "react-router-dom";
import CommentBox from './CommentBox';

const override = css`
  display: block;
  margin: auto;
`;
let hashtags = ["CSCI_571_NewsApp"];
toast.configure()

class DetailedPageCard extends React.Component{
    constructor(props){
        super();
        this.state = {
            showModal: false,
            cat: "",
            expanded: false,
            date: "",
            id: "",
            detailed: [],
            fill: "",
            loading: true,

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.createBookmark = this.createBookmark.bind(this);
        this.removeBookmark = this.removeBookmark.bind(this);
        this.hideToolTip = this.hideToolTip.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
    }
    componentDidMount() {
        let article = this.props.location.search;
        let articleId = article.substring(4);
        this.setState({id : articleId.substring(4)});
        

        
        if(articleId.substring(0,5) === "https"){
            fetch('https://secure-refuge-01308.herokuapp.com/detailNY?id='+articleId)
            .then(res => res.json())
            .then((data) => {
            this.setState({ detailed: data })
            })
            
        }
        else{
            fetch('https://secure-refuge-01308.herokuapp.com/detailGuardian?id='+articleId)
            .then(res => res.json())
            .then((data) => {
            this.setState({ detailed: data })
            })
        }
        if(this.state.detailed.length !== 0 && this.state.detailed ){
            this.setState({loading: false});
        }
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });
    
        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        // this.removeCommentBox = commentBox('5700750206304256-proj');

    }
    // componentDidUpdate(prevState) {
        
    // }
    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
        // this.removeCommentBox();
      }
    handleClick(event) {
        this.setState({
          showModal: !this.state.showModal
        });
      }
      handleExpandClick(){
        this.setState({expanded: !this.state.expanded});
    };
    hideToolTip(){
        ReactTooltip.hide();
    }
    scrollTop() {
        scroll.scrollToTop({
            duration:30,

        })
        
      }
      scrollDown(){
          let element = document.getElementById("show")
          element.scrollIntoView();
      }
      createBookmark(){
        ReactTooltip.hide();
        toast("Saving "+this.state.detailed.title,{
            className: "toastColor"
        });
        let ab = JSON.parse(localStorage.getItem('bookmark'));
          if(ab === null || ab === 'null'){
                let ab = [];
                ab.push(this.state.detailed);
                localStorage.setItem('bookmark', JSON.stringify(ab));
          }
          else{
            let ab = [];
            ab = JSON.parse(localStorage.getItem('bookmark'));
            ab.push(this.state.detailed);
            localStorage.setItem('bookmark', JSON.stringify(ab));
            // localStorage.removeItem('bookmark')
          }
          let ab1 = []
          ab1 = JSON.parse(localStorage.getItem('bookmark'));
          console.log(ab1);
          for(let i = 0; i < ab1.length; i++){
            console.log(ab1[i].title === this.state.detailed.title);
          }
          this.setState({'fill': 'fill'});
      }
      removeBookmark(){
        ReactTooltip.hide();
        toast("Removing - "+this.state.detailed.title,{
            className: "toastColor"
        });
        let ab = [];
        ab = JSON.parse(localStorage.getItem('bookmark'));
        for(let i = 0; i < ab.length; i++){
            if(ab[i].title === this.state.detailed.title){
                ab.splice(i,1);
                localStorage.setItem('bookmark', JSON.stringify(ab));
            }
            let ab1 = []
            ab1 = JSON.parse(localStorage.getItem('bookmark'));
            console.log(ab1);
            console.log(ab1.includes(this.state.detailed));
        }
        this.setState({'fill': 'nofill'});
      }
    render(){
        let article = this.props.location.search;
        let params = new URLSearchParams(article);
        let aB = []
        aB = JSON.parse(localStorage.getItem('bookmark'));
        let bIcon;
        let flag;
        if(aB !== null){
            for(let i = 0; i < aB.length; i++){
                if(aB[i].title === this.state.detailed.title){
                    flag = "true";
                    break;
                }
            }
        }
        else{
            bIcon = <span style={{color: '#e60000'}} data-tip="Bookmark"><FaRegBookmark onClick={this.createBookmark} style={{fontSize: '30px'}}/></span>
        }
        if(aB !== null && flag === "true"){
            bIcon = <span style={{color: '#e60000'}}data-tip="Bookmark"><FaBookmark onClick={this.removeBookmark} style={{fontSize: '30px'}}/></span>
        }
        else{
            bIcon = <span style={{color: '#e60000'}} data-tip="Bookmark"><FaRegBookmark onClick={this.createBookmark} style={{fontSize: '30px'}}/></span>
        }
        let icon;

        if(this.state.expanded){

            icon =
                    <FaChevronUp
                    onClick={this.handleExpandClick}
                    style={{float:'right'}}
                    />
        }
        else{
            icon =   <Link activeClass="active" to="show" spy={true} smooth={true} duration={500} >
                    <FaChevronDown 
                    onClick={this.handleExpandClick}
                    style={{float:'right'}}
                    >
                    </FaChevronDown>
                    </Link>
        }
        if(this.state.detailed.length !== 0 && this.state.detailed !== "" && this.state.loading === true){
            this.setState({loading: false})
        }
        let loader;
        if(this.state.loading === true){
            loader = <div style={{textAlign:'center', marginTop:'23%'}}>
                        <BounceLoader
                            css={override}
                            size={40}
                            color={"blue"}
                            loading={this.state.loading}
                        />
                        <div style={{fontSize:'24px'}}>Loading</div>
                    </div>
        }
        else{
            loader = <div>
                    <ReactTooltip 
                        place="bottom"
                        effect="solid"
                        clickable="true"
                    />
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
                    <Card id="hidden" style={{margin: '20px', boxShadow: '1px 3px 5px 4px #dbdbdb'}}>
                    <Card.Title  style={{fontSize: '32px', paddingLeft: '20px', fontStyle: 'italic'}}>
                        {this.state.detailed.title}
                    </Card.Title>
                    <Container fluid>
                    <Row>
                    <Col lg = {9} md = {7} sm = {7} xs = {5}>
                        <label style={{fontSize: '18px', color: 'black', paddingLeft: '15px', fontStyle: 'italic'}}>
                        {this.state.detailed.published_date}
                        </label>
                    </Col>
                    <Col lg = {2} md = {3} sm = {3} xs = {5} style={{textAlign:'right'}}>
                        <FacebookShareButton url={this.state.detailed.url} hashtag= "#CSCI_571_NewsApp" >
                        <FacebookIcon size={32} round={true} data-tip="Facebook" onClick={this.hideToolTip}/>
                        </FacebookShareButton>
                        <TwitterShareButton url={this.state.detailed.url} hashtags= {hashtags} >
                        <TwitterIcon size={32} round={true} data-tip="Twitter" onClick={this.hideToolTip}/>
                        </TwitterShareButton>
                        <EmailShareButton url={this.state.detailed.url} subject="#CSCI_571_NewsApp" >
                        <EmailIcon size={32} round={true} data-tip="Email" onClick={this.hideToolTip}/>
                        </EmailShareButton>
                    </Col>
                    <Col  lg = {1} md = {2} sm = {2} xs = {2} style={{textAlign:'center'}}>
                        {bIcon}
                    </Col>
                    </Row>
                    </Container>
                    <Card.Body>
                    <Card.Img variant="top" src={this.state.detailed.image}  />

                    <Card.Text style={{fontSize: '16px', color: 'black'}}>
                    {window.screen.width >= 1224 && this.state.detailed.description.substring(0,this.state.detailed.big+1)}
                    {window.screen.width < 1224 && this.state.detailed.description.substring(0,this.state.detailed.small+1)}
                    </Card.Text>
                    <Row id="show" style={{marginLeft:'2px', marginRight: '5px'}}>
                    <Collapse in={this.state.expanded} onEntered={this.scrollDown} onExited={this.scrollTop} unmountOnExit>
                        <Card.Text style={{fontSize: '16px', color: 'black'}}>
                        {window.screen.width >= 1224 && this.state.detailed.description.substring(this.state.detailed.big+1)}
                        {window.screen.width < 1224 && this.state.detailed.description.substring(this.state.detailed.small+1)}
                        </Card.Text>
                    </Collapse>
                    </Row>
                    {icon}
                    </Card.Body>
                    </Card>
                    <CommentBox id={params.get('id')}/>
                </div>
        }
        return (
            <div>
                {loader}
            </div>
        );
    }
};

export default withRouter(DetailedPageCard);