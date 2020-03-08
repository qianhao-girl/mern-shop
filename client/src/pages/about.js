import React,{ Component } from 'react';
import Carousel from '../components/utils/Carousel/Carousel';
import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';


export default class About extends Component{

    render(){
        return (
            <>
                <h1>this is our about page</h1>
                <Carousel>
                    <Carousel.Item>
                        <img src={photo1}></img>
                        <Carousel.Caption>
                            <h2>Slide 1</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={photo2}></img>
                        <Carousel.Caption>
                            <h2>Slide 2</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={photo3}></img>
                        <Carousel.Caption>
                            <h2>Slide 3</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </>
        );
    }
}