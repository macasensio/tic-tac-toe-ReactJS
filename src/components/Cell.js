import { useState } from "react"

const Cell = ({ id, cell, setCells, go, setGo, cells, winningMsg, turn, setTurn }) => {

    const [clickEnabled, setClickEnabled] = useState(true)


    const handleClick = (e) => {
        setTurn(turn + 1)
        const taken =
            e.target.firstChild.classList.contains('circle') || 
            e.target.firstChild.classList.contains('cross')

        if(!taken){
            if (go === 'circle') {
                e.target.firstChild.classList.add('circle')
                handleCellChange('circle')
                setGo('cross')
            }
            if (go === 'cross') {
                e.target.firstChild.classList.add('cross')
                handleCellChange('cross')
                setGo('circle')
            }
        }
        setClickEnabled(false)
    }

    const handleCellChange = (className) => {
        const nextCells = cells.map((cell, index) => {
            if(index === id) {
                return className
            } else {
                return cell
            }
        })
        setCells(nextCells)
    }


    return (
        <div
            className="square"
            id={id}
            onClick={clickEnabled && !winningMsg ? handleClick : null}
        >
            <div className={cell}></div>
        </div>
    )
}

export default Cell