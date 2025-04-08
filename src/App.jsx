import React from "react";
import DieComponent from "./Die.jsx"
import Confetti from "react-confetti"
import "./index.css"
import {nanoid} from "nanoid"
import { useState, useRef, useEffect } from "react"


export default function App(){
    const buttonRef = useRef(null)
    function allNewDice(){
        const randomnumberarray = []
        let i = 0
        while(i<10){
            randomnumberarray.push({value:Math.ceil(Math.random() * 6),
                isHeld:false,
                id:nanoid()
            })
            i+=1
        }
        return randomnumberarray
    }

    const [allDiceObjects,setallDiceObjects] = React.useState(() => allNewDice())
    let gameWon = false
    if(allDiceObjects.every(die => die.isHeld) && allDiceObjects.every(die => die.value === allDiceObjects[0].value)){
        gameWon = true
    }

    
    let buttonValue = "Roll"
    if(gameWon){
        buttonValue = "New Game"
    }

    useEffect(() => {
        if(gameWon){
            buttonRef.current.focus()
        }
    },[gameWon])

    function handleRoll(){
        if(gameWon){
            setallDiceObjects(() => allNewDice())
            gameWon = false

        }
        else{
            setallDiceObjects(prev => {
                return prev.map(item => {
                    return item.isHeld === true ?
                    item :
                    {...item, value:Math.ceil(Math.random() * 6)}
                })
            })
        }
    }

    function holdDice(id){
        setallDiceObjects(prev => {
            return prev.map(item => {
                return (item.id === id) ?
                {...item, isHeld:!item.isHeld} :
                item

            })
        })
    }
    
    const diceElements = allDiceObjects.map(item => <DieComponent key={item.id} id={item.id} value={item.value} isHeld={item.isHeld} hold={holdDice}/>)
    return (
        <main>
            {gameWon && <Confetti />}
            <h1>Tenzies</h1>
            <p className="rules">Roll until all dice are same.Click each die to freeze it at its current value between rolls</p>
            <div className="all-dice">
                {diceElements}
            </div>
            <button ref = {buttonRef} className="roll" onClick={handleRoll}>{buttonValue}</button>
        </main>
        
    )
}