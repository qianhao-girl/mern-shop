import React,{ useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineMessage, AiOutlineMail } from 'react-icons/ai';
import { FaRegHeart, FaMobileAlt, FaRocketchat } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { GoTriangleUp } from 'react-icons/go';
import './MiniSidebar.css';


export default function MiniSidebar() {
    // const [Style,setStyle] = useState("");
    // toggleStyle = () => {
    //     setStyle("right: -40px; visibility: visible; border-left: 4px;");
    // }

    // styleToggler = (event) => {
    //     event.currentTarget.style = "right: -40px; visibility: visible; border-left: 4px;"
    // }


    function Anchor(){
        return <div id="backtop-anchor"></div>
    }


    return (
        <div className="aside-mini" >
            <ul className="aside-list">
                <li className="aside-item aside-cart">
                    <div className="aside-item-container">
                        <FiShoppingCart className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            My Cart
                        </a>
                    </div>
                </li>
                <li className="aside-item aside-coupons">
                    <div className="aside-item-container">
                        <GiTakeMyMoney className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            My Coupons
                        </a>
                    </div>
                </li>
                <li className="aside-item aside-wish">
                    <div className="aside-item-container">
                        <FaRegHeart className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            My Wish List
                        </a>
                    </div>
                </li>
                <li className="aside-item aside-subscribe">
                    <div className="aside-item-container">
                        <AiOutlineMail className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            developing
                        </a>
                    </div>
                </li>
                <li className="aside-item aside-feedback">
                    <div className="aside-item-container">
                        <AiOutlineMessage className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            developing
                        </a>
                    </div>
                </li>
                <li className="aside-item aside-app">
                    <div className="aside-item-container">
                        <FaMobileAlt className="aside-icon"/>
                    </div>
                    <div className="aside-item-floating">
                        <a href="/">
                            developing
                        </a>
                    </div>
                </li>            
            </ul> 
            <div className="aside-backtop">
                <GoTriangleUp className="aside-icon"/>
                <p>Top</p>
            </div>   
        </div>
    )
}
