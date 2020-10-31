import React, { Component } from 'react'
import * as utils from '../../../utils/functions'
import Box from "./Box-Board"

export default class Board extends React.Component {
    constructor(props) {
    super(props)

        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }
    }

    // method call when we click on box
    handleBoxClick(index) {
        const boxes = this.state.boxes.slice()
        let history = this.state.history

        // check someone win or not
        if (utils.findWinner(boxes) || boxes[index]) {
            return
        }

        // check all boxes all fill or not
        if(utils.areAllBoxesClicked(boxes) === true) {
            return
        }
        boxes[index] = this.state.xIsNext ? 'x' : 'o'
        history.push(this.state.xIsNext ? 'x' : 'o')
    this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }
    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        })
    }

    onMouseEnter = ()=>{
        console.log('c')
        return this.state.xIsNext ? 'x' : 'o'
    }

    render() {
        
    const winner = utils.findWinner(this.state.boxes)
    const isFilled = utils.areAllBoxesClicked(this.state.boxes)
    let status
        // check someone will or not for messaage
        if (winner) {
            status = `The winner is: ${winner}!`
        } else if(!winner && isFilled) {
            status = 'Game drawn!'
        } 
        else{
            status = `Player ${this.state.xIsNext ? 'X' : 'O'} will play`
        }
        return (
            <>

            <div className = 'container'>
                <div className = 'row h2 text-center mb-5'>
                    <div className = 'col-12'>{status}</div>
                </div>
                <div className = 'row bg-white' style = {{width : '450px'}}>
                    {this.state.boxes.map((value,index)=>{
                     return <Box onMouseEnter = {this.onMouseEnter} key = {index} value = {value} onClick={() => this.handleBoxClick(index)}  />})}
                </div>
                <div className = "row mt-5">
                    <button className = 'btn btn-primary' onClick = {this.handleBoardRestart}>Restart Game</button>
                </div>
            </div>

               
            </>
        )
    }
}