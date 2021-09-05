import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";

const Popup = ({
    correctLetters,
    wrongLetters,
    selectedWord,
    setPlayable,
    playAgain,
}) => {
    let finalMessage = "";
    let finalMessageRevealWord = "";
    let playable = true;

    if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
        finalMessage = "Congrats! you win!!";
        playable = false;
    } else if (
        checkWin(correctLetters, wrongLetters, selectedWord) === "lose"
    ) {
        finalMessage = "Sorry! you lost! Better luck next time!";
        finalMessageRevealWord = `The correct word was "${selectedWord}".`;
        playable = false;
    }

    useEffect(() => setPlayable(playable));

    return (
        <div
            className="popup-container"
            style={finalMessage !== "" ? { display: "flex" } : {}}
        >
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
};

export default Popup;