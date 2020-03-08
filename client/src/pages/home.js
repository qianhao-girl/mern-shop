import React from 'react';
import StyledHero from '../components/utils/StyledHero';

export default function home() {
    return (
        <div>
            <StyledHero>
                <p style={{diplay: "inline-block", textTransform: "capitalize"}}>this is home page</p>
            </StyledHero>
        </div>
    )
}
