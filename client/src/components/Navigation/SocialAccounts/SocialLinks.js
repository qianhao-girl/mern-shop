import React, { Component } from 'react';
import classes from "./SocialLinks.module.css";

export default class SocialLinks extends Component {
    state = {
        dist = [
            {info: {
                name: Linkedln, 
                account: "@qianhao",
                link: "https://www.linkedin.com/in/%E7%9A%93-%E9%92%B1-501808161/"
                }, 
            show: true},
            {info: {
                name: Github,
                account: "@qianhao-girl",
                link:"https://github.com/qianhao-girl?tab=repositories"
                },
             show: true,},
        ]
    }


    render() {
        let temp = this.state.dist.filter(item => item.show === true).map((item, index)=>{
            <a href={ item.info.link } key={`social-links-${index}`}>
                <strong>{ item.info.name }</strong>
                <span>{ item.info.account }</span>
            </a>
        })
        return (
            <div className={classes.SocialLinks}>{ temp }</div>
        )
    }
}
