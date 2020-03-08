import React,{ Component,cloneElement }from 'react';
import classNames from 'classnames';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Carousel.css'


const defaultProps = {
  Interval: 4000,
  PauseOnHover: true,
  ActiveIndex: 0,
  Controls: true,
  Indictors: true,
  autoSlide: true,
}

class Carousel extends Component {
    //React.Children.?method() : If children is a Fragment,
    // it will be treated as a single child and not traversed.
  constructor(props){
      super(props);
			let itemsAmount = React.Children.toArray(this.props.children).length;
			this.isUnmounted = false;
			this._isSliding = false;
			this._autoSlide = props.autoSlide;
      this.state = {
					prevClasses: "",
					currentClasses:"active",
					activeIndex: 0,
					itemsAmount: itemsAmount,
					prevActiveIndex: itemsAmount - 1,		
      }
  }
    
    //cloneElement(<Item />,{className: this.props.className("carousel-item") + "..."}) will not work here(the next commented), 
    //because className:"carousel-item" in the div does not belong to Item props
    // static Item = (props) =>  <div className="carousel-item">{props.children}</div>  
    
  static Item = (props) =>  <div {...props}>{props.children}</div>  
  static Caption = (props) => <div className="carousel-caption">{props.children}</div>
	

	
  componentDidMount() {
	  if(this._autoSlide){
		this.cycle();
	  }
	}

	//componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
	
	componentDidUpdate(_,prevState){
		console.log(this._isSliding);
		if(this.isSliding || this.state.activeIndex === prevState.activeIndex) return;
		this._isSliding = true;
		this.setState({prevClasses: "active", currentClasses: "carousel-item-next"},() => {
			console.log(1);
			this.setState({prevClasses: "active carousel-item-left", currentClasses: "carousel-item-next carousel-item-nxt"}, () => {
				console.log(2);
				new Promise((resolve,reject) => {
					setTimeout(()=> {
						this.setState({
							prevClasses: "",
							currentClasses: "active"
						});
					},1500);
					resolve();
				}).then(() => {
					console.log(3);
					this._isSliding = false;
				})
			})
		})
	}
	
	componentWillUnmount(){
		clearInterval(this._interval);
		this.isUnmounted = true;
	}

  mouseOverHandler = () => {
    if(this.props.PauseOnHover) this.pause();
	}
	
	mouseOutHandler = () => {
		this.cycle();
	}

  onIndictorClickHandler = (event) => {
    let currentIndex = event.target.value;
    this.setState({activeIndex: currentIndex});
  }

  pause() {
      this._isPaused = true;
      clearInterval(this._interval);
      this._interval = null;
  }

  cycle = () => {
    this._interval = setInterval(()=>this.handleNext(),
      this.props.Interval)
  }

  handleNext = () => {
				let index = (this.state.activeIndex + 1) % this.state.itemsAmount;
        this.setState((prevState)=> {
					return { ...prevState,
						activeIndex: index,
						prevActiveIndex: prevState.activeIndex,
						
					}
				},);
  }

  handlePrev = () => {
				let index = (this.state.activeIndex - 1 + this.state.itemsAmount) % this.state.itemsAmount;
        this.setState((prevState)=> {
					return { ...prevState,activeIndex: index, prevActiveIndex: prevState.activeIndex }},
				);
  }
	 

  render(){
			const { activeIndex, prevActiveIndex, prevClasses, currentClasses} = this.state;
			const { Controls, Indictors } = this.props;

      return (
        <div className="carousel" onMouseOver={this.mouseOverHandler}
					onMouseOut={this.mouseOutHandler}>
					{Indictors?
						<ol className="carousel-indictors">
							{this.props.children ? this.props.children.map((item, index) => {
									return <li key={index} value={index} onClick={this.onIndictorClickHandler}
													 className={index===activeIndex? "active": null}></li>
								}) : null
							}
						</ol>
					:null}
          <div className="carousel-inner">
            {this.props.children.map((child, index) => {
								const current = index === activeIndex;
								const previous = index === prevActiveIndex;
                return cloneElement(child, { 
										className: classNames(child.props.className, 
											"carousel-item", 
											current && currentClasses,
											previous && prevClasses),
                })
            })}
          </div>
					{Controls?
						<>
							<a className="carousel-prev-control" onClick={this.handlePrev}>
								<FaArrowLeft className="carousel-control-icon" />
							</a>
          		<a className="carousel-next-control" onClick={this.handleNext}>
								<FaArrowRight className="carousel-control-icon"/>
							</a>
						</>
					:null
					}     
        </div>
        )
    }
}


Carousel.defaultProps = defaultProps;

export default Carousel;

//getDerivedStateFromProps is a static method 
//Since it is a static method, you cannot access 'this' inside this method 
//neither you can access any other class method.
  
//This method exists for rare use cases where the state depends on changes in props over time.
// For example, it might be handy for implementing a <Transition> component that compares its previous
// and next children to decide which of them to animate in and out.

//getDerivedStateFromProps is a static method which is invoked after a component
// is instantiated as well as when it receives new props and right before calling the render method!!!, 
// It should return an object to update the state, or null to update nothing.
//getDerivedStateFromProps(nextProps, prevState)