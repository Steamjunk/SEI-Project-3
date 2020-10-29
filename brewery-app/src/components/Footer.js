import React from "react"
import * as F from "../styles/FooterStyles";


const Footer = () => {

    return (
        <F.FooterDiv>
            <F.Div>
                <F.Note>Please remember to drink responsibly.</F.Note>
            </F.Div>
            <F.Div>
                <div>
                    <p>&#169; 2020</p>
                    <p>Darci Dietrich | Nick LaPointe | Chris Myers</p>
                </div>
            </F.Div>
            <F.Div>
                <div>
                    <F.Bold>Comments or issues?</F.Bold><br/>
                    <F.ExternalLink href="https://github.com/Steamjunk88/SEI-Project-3/issues" target="_blank">Let us know!</F.ExternalLink>
                </div>
            </F.Div>
        </F.FooterDiv>
    )
}

export default Footer;
