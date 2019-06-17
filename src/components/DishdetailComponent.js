//{} to include a component 
import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
        Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    const required = (val) => val && val.length;
    const maxLen = (len) => (val) => (!val) || (val.length <= len);
    const minLen = (len) => (val) => (val) && (val.length >= len);
        
    class CommentForm  extends Component{
        constructor(props){
            super(props);
            this.state={
                isCommentOpen: false
            };

            this.toggleComment = this.toggleComment.bind(this);
            this.CommentSubmit = this.CommentSubmit.bind(this);
        }
        

        toggleComment(){
            this.setState({
                isCommentOpen: !this.state.isCommentOpen

            });
        }

        CommentSubmit(values){
            this.toggleComment();
            //console.log("Current state is: "  + JSON.stringify(values));
            //alert("Current state: " + JSON.stringify(values));
            this.props.postComment(this.props.dishId, values.rating, values.author,values.comment);
        }

        render(){
           return(
            <React.Fragment>
                <Button outline onClick={this.toggleComment} className="mt-3">
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
            
                <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                    <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.CommentSubmit(values)}>
                            <Row className="group-form">
                                <Col md={12}>Rating</Col>
                            </Row>
                            <Row className="group-form mt-2">
                                <Col md={6}>
                                <Control.select model=".rating" name="rating" 
                                    className="form-control"
                                    validators={{
                                        required
                                    }}        
                                >
                                    {/*<option>Please rating</option>*/}
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors 
                                    className="text-danger"
                                    model=".rating"
                                    show= "true"
                                    messages={{
                                        required: "Must select one rating."
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="group-form mt-2">
                                <Col md={12}>Your Name</Col>
                            </Row>
                            <Row className="group-form mt-2">
                                <Col md={8}>
                                    <Control.text model=".author" id="author" name="author" 
                                        placeholder="Your Name" 
                                        className="form-control" 
                                        validators={{
                                            required, maxLen: maxLen(15), minLen: minLen(3)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Please fill out this text field. ",
                                            minLen: "Must be greater than 2 characters",
                                            maxLen: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="group-form mt-2">
                                <Col md={12}>Comment</Col>
                            </Row>
                            <Row className="group-form mt-2"> 
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
           );
        }
    }

    // {dish} with {} means dish come from MainComponent
    function RenderDish({dish}){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg width="100" src={baseUrl + dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform> 
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    // {comments} with {} means dish come from MainComponent

    function RenderComments({comments, postComment, dishId}){
        if(comments.length !==0){   // or if(comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    
                    <ul className="list-unstyled">  
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                            {/*<ShowComments comments = {comments} /> hide this line and function ShowComments()*/}  
                    </Stagger>
                    </ul>
                    
                        <CommentForm dishId={dishId} postComment={postComment}/> {/* For CommentForm */}
                    
                </div>
            ); 
        }
        else{
            return(
                <div></div>
            );
        }
    }
    // {comments} with {} means dish come from MainComponent
/*
    function ShowComments({comments}){
        return comments.map((comment)=>{
            
            const month=[ "Jan", "Feb", "Mar", "Apr","May",
                        "Jun", "Jul", "Aug", "Sep", "Oct",
                        "Nov", "Dec"
                  ];
            //{new Intl.DateTimeFormat('en-US', {year:'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));}                                                 
            const date = new Date(comment.date);
            const dateFormate = ' ' + month[date.getMonth()] + ' ' + date.getDate( ) + ', ' + date.getFullYear();
        
        return(
                <div>
                   <Fade in>
                        <li className='mt-3'>{comment.comment}</li>
                        <li>{'-- ' + comment.author+ ' ' + dateFormate}</li>
                    </Fade>
                </div>
            );
        });
        
    }
*/
    // props contains isLoading, errMess, dishes... from MainComponent
    const DishDetail = (props) => {
        if(props.isLoading){
             return(
                 /** "container" can proplerly position on screen using  a boostrap grid*/
                <div className="container"> 
                    <div className="row">
                        <Loading />
                    </div>
                </div>

             );
        }
        else if (props.errMess){
            return(
               <div className="container"> 
                   <div className="row">
                      <h4>{props.errMess}</h4>
                   </div>
               </div>
            );
        }
        else if(props.dish != null)
            return(
                <div class="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        <RenderDish dish={props.dish} />
                        {/* supply two more attributes to here, postComment and dishId*/}
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}    />                        
                    </div>
                </div>

            );
        else
            return(
                <div></div>
            );
    }


export default DishDetail;