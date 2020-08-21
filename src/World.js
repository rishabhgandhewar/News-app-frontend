import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DetailedPageCard.css';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import {
    withRouter,
  } from "react-router-dom";
import MainPageCard from './MainPageCard'
  
const override = css`
display: block;
margin: auto;
`;

class World extends React.Component{
    constructor(props){
        super()
        this.state = {
            guardianWorld: [],
            nyWorld: [],
            headlines: [],
            q: "",
            loading: true,
        }
    }
    componentDidMount() {
        this.setState({q: localStorage.getItem('toggle')})
        if (localStorage.getItem("toggle") === "false" || localStorage.getItem("toggle") === null) {
            fetch('https://secure-refuge-01308.herokuapp.com/guardianWorld')
              .then(res => res.json())
              .then((data) => {
                this.setState({ guardianWorld: data, headlines: data })
              })
          }
          else {
            fetch('https://secure-refuge-01308.herokuapp.com/nyWorld')
              .then(res => res.json())
              .then((data) => {
                this.setState({ nyWorld: data, headlines: data })
              })
          }
          if(this.state.headlines.length !== 0 && this.state.headlines.length !== 0){
            this.setState({loading: false});
        }
    }
    componentDidUpdate(){
        let q1 = localStorage.getItem('toggle');
        if(this.state.q !== q1){
            if (localStorage.getItem("toggle") === "false") {
                fetch('https://secure-refuge-01308.herokuapp.com/guardianWorld')
                  .then(res => res.json())
                  .then((data) => {
                    this.setState({ guardianWorld: data, headlines: data })
                  })
              }
              else {
                fetch('https://secure-refuge-01308.herokuapp.com/nyWorld')
                  .then(res => res.json())
                  .then((data) => {
                    this.setState({ nyWorld: data, headlines: data })
                  })
              }
              this.setState({q: localStorage.getItem('toggle')})
        }
    }
    render(){
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
                    {this.state.headlines.length !== 0 && this.state.headlines[0] !== undefined && this.state.headlines.map(item => <MainPageCard key={item.id} id={item.id} title={item.title} description={item.abstract} urlToImage={item.image} publishedOn={item.published_date} section={item.section} url = {item.url} />)}
                    </div>
        }
        if(this.state.headlines.length !== 0 && this.state.headlines.length !== 0 && this.state.loading === true){
            this.setState({loading: false})
        }
    return(
        <div>
            {loader}
        </div>
    );
    }
}

export default withRouter(World);