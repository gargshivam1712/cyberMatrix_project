import React, { Component } from 'react'
import Board from "../components/games/tic-tac-toe/Board"

export default class HomePage extends Component {

    render() {
        return (
            <div className = "mx-auto">
                <Board/>
            </div>
        )
    }
}
