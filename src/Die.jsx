import React from "react"



export default function Die(props){
    let diceClassName = "die-component"
    if(props.isHeld === true){
        diceClassName = "die-component-clicked"
    }
    
 
    return (
        <>
            <button aria-label = {`Die with value ${props.value}`} 
                    aria-pressed = {props.isHeld}
                    className = {diceClassName} 
                    onClick = {()=>props.hold(props.id)}  
            >{props.value}</button>
        </>
    )
} 