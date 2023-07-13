import { useState, useEffect } from "react";
import Cell from "./components/Cell";
import ResetBtn from "./components/ResetBtn";


const App = () => {

    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
    const [go, setGo] = useState('circle')
    const [winningMsg, setWinningMsg] = useState(null)
    const [isWinner, setIsWinner] = useState(false)
    const [turn, setTurn] = useState(1)

    const message = `It is now ${go}'s go`
    

    const checkScore = () => {

        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        winningCombos.forEach(array => {
            const circleWins = array.every(cell => cells[cell] === 'circle')
            if (circleWins) {
                setWinningMsg('Circle wins!')
                return setIsWinner(true)
            }
        })
        winningCombos.forEach(array => {
            const crossWins = array.every(cell => cells[cell] === 'cross')
            if (crossWins) {
                setWinningMsg('Cross wins!')
                return setIsWinner(true)
            }
        })
        
    }

    //check score after the cells[] changes
    useEffect(() => {
        checkScore()
    }, [cells])

    //no one wins message
    useEffect(() => {
        if(turn > 9 && !isWinner){
            setWinningMsg(`No one wins! Try again`)
        }
    }, [turn, isWinner])


    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <div className="gameboard">
                {cells.map((cell, index) => 
                    <Cell 
                    key={index} 
                    id={index} 
                    cell={cell}
                    
                    cells={cells}
                    setCells={setCells} 
                    go={go} 
                    setGo={setGo}
                    winningMsg={winningMsg}
                    
                    turn={turn}
                    setTurn={setTurn}
                />
                )}
            </div>

            <p id="info">{winningMsg || message}</p>
            <ResetBtn />
        </div>
    )
}

export default App
