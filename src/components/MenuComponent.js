import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


// Images should be used from the server not from public folder asset, images are frequently changed,  
// except logo.png, becuae logo.png never be changed.
    function RenderMenuItem({dish, onClick}){
        return(
            // use <Link to> to do as "onClick" method
            // {`/menu/${dish.id}`} 
            <Card>
                <Link to={`/menu/${dish.id}`}>
                {/** get information from the server*/}
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
                </Link>
            </Card> 
        );
    }


    // a style of function
    const Menu = (props) =>{
        const menu= props.dishes.dishes.map((dish) => { // change props.dishes to props.dishes.dishes(containing isLoading etc objects)
            return(
                <div className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} />         
                </div>
            );
        });

        if(props.dishes.isLoading){
            return(
                /** "container" can proplerly position on screen using  a boostrap grid*/
               <div className="container"> 
                   <div className="row">
                       <Loading />
                   </div>
               </div>

            );
       }
       else if (props.dishes.errMess){
           return(
              <div className="container"> 
                  <div className="row">
                     <h4>{props.dishes.errMess}</h4>
                  </div>
              </div>
           );
       }
        else
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }


export default Menu;