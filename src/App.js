import { useState, useEffect } from "react";
import Cell from "./components/Cell";


const App = () => {

    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
    const [go, setGo] = useState('circle')
    const [winningMsg, setWinningMsg] = useState(null)

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
                return
            }
        })
        winningCombos.forEach(array => {
            const crossWins = array.every(cell => cells[cell] === 'cross')
            if (crossWins) {
                setWinningMsg('Cross wins!')
                return
            }
        })
    }

    //check score after the cells[] changes
    useEffect(() => {
        checkScore()
    }, [cells])


    return (
        <div className="app">
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
                    />
                )}
            </div>

            <p>{winningMsg || message}</p>
        </div>
    )
}

export default App
