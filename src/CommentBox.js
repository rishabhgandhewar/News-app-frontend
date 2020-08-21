import React from 'react';
import commentBox from 'commentbox.io';
import { withRouter } from 'react-router';

class CommentBox extends React.Component{
    constructor(props){
        super();
        this.state = {
        }
    }
    componentDidMount() {
        this.removeCommentBox = commentBox('5700750206304256-proj');
    }
    componentWillUnmount(){
        this.removeCommentBox();
    }
    render(){
        return (
            <div className="commentbox" id={this.props.id}/>
        )
    }
}

export default withRouter(CommentBox);