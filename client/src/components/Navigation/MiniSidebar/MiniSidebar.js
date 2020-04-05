import React,{ useState, useRef, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineMessage, AiOutlineMail } from 'react-icons/ai';
import { FaRegHeart, FaMobileAlt, FaRocketchat } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { GoTriangleUp } from 'react-icons/go';
import './MiniSidebar.css';


export default function MiniSidebar() {
    const BackTopRef = useRef(null);
   
    useEffect(() => {
        window.onscroll = backTopController;
        return function cleanup(){
            window.onscroll = null;
        }
    },[BackTopRef]);

    
    const backTopController = () => {
        if(document.body.scrollTop > window.innerHeight 
            || document.documentElement.scrollTop > window.innerHeight){
            // BackTopRef.current.style.visibility = "visible";
            BackTopRef.current.style.display = "block";
        }else{
            // BackTopRef.current.style.visibility = "hidden";
            BackTopRef.current.style.display = "none";
        };
    }

    const backTopClickHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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
            <div className="aside-backtop" ref={BackTopRef} onClick={backTopClickHandler}>
                <GoTriangleUp className="aside-icon"/>
                <p>Top</p>
            </div>
            {/*The following code did not work in the html !!!,why???
             <script type="text/javascript">
               {`window.onscroll=${backTopController}`};
            </script>    */}
        </div>
    )
}
