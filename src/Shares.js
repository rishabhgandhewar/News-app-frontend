import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPageCard from './SearchPageCard';
import {Container, Row} from 'react-bootstrap';
import './SearchPageCard.css';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: auto;
`;


class Shares extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headlinesNY: [],
            headlinesGuardian: [],
            headlines: [],
            q: "",
            loading: true,
        };
    }
    //q = localStorage.getItem('query');
    componentDidMount(){
        this.setState({q: localStorage.getItem('query')})
        fetch('https://secure-refuge-01308.herokuapp.com/searchGuardian?query='+localStorage.getItem('query'))
                .then(res => res.json())
                .then((data) => {
                this.setState({ headlinesGuardian: data})
                console.log("data"+data);
                //this.setState({headlines: data})
            })

        fetch('https://secure-refuge-01308.herokuapp.com/searchNY?query='+localStorage.getItem('query'))
            .then(res => res.json())
            .then((data) => {
            this.setState({ headlinesNY: data})
            //array.push(data);
        })
        if(this.state.headlinesGuardian.length !== 0 || this.state.headlinesNY.length !== 0){
            this.setState({loading: false});
        }
        //console.log(this.state.headlinesNY);
    }
    componentDidUpdate(prevState){
        let q1 = localStorage.getItem('query');
        console.log(this.state.q);
        console.log(q1);
        if(this.state.q !== q1 && q1 !== undefined && q1 !== "undefined"){
            fetch('https://secure-refuge-01308.herokuapp.com/searchGuardian?query='+q1)
                    .then(res => res.json())
                    .then((data) => {
                    this.setState({ headlinesGuardian: data})
                })
            fetch('https://secure-refuge-01308.herokuapp.com/searchNY?query='+q1)
                .then(res => res.json())
                .then((data) => {
                this.setState({ headlinesNY: data})
            })
            this.setState({q: localStorage.getItem('query')})
        }
    }
    render(){
        let array = [];
        for(let i = 0; i < this.state.headlinesGuardian.length; i++){
            if(this.state.headlinesGuardian[i] !== undefined)
                array.push(this.state.headlinesGuardian[i]);
        }
        for(let i = 0; i < this.state.headlinesNY.length; i++){
            if(this.state.headlinesNY.length !== undefined)
                array.push(this.state.headlinesNY[i]);
        }
        console.log(array);
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
            if(array.length === 0){
                loader = <div className="center-header"><label>No Results</label> </div>
            }
            else{
            loader = <div>
            <label className="header">Results</label> 
            <Container fluid>
                <Row lg = {4}>
                    {array.length !== 0 && array[0] !== undefined && array.map(item => <SearchPageCard key={item.id} id={item.id} title={item.title} urlToImage={item.image} publishedOn={item.published_date} section={item.section} url = {item.url} />)}
                </Row>
            </Container>
        </div>
            }
        }
        if((this.state.headlinesNY.length !== 0 || this.state.headlinesGuardian.length !== 0) && this.state.loading === true){
            this.setState({loading: false})
        }
    return(
            <div>
                {loader}
            </div>
    );
    }
}

export default Shares;