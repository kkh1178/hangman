import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import { showNotification as show } from "./helpers/helpers";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

import "./App.css";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const handleKeydown = (event) => {
            console.log(event.key, event.keyCode);
            const { key, keyCode } = event;
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();

                /* 
              If the selected word include the letter we chose and correct letters doesn't yet, add the correct letter in 
              the setCorrect letter array. If the correct letter already exists in the correct letter array (or in the 
              wrongLetters array), then we need to show a notification that we already used that letter
              */
                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters((currentLetters) => [
                            ...currentLetters,
                            letter,
                        ]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters((wrongLetters) => [
                            ...wrongLetters,
                            letter,
                        ]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    function playAgain() {
        setPlayable(true);

        setCorrectLetters([]);
        setWrongLetters([]);

        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    }

    return (
        <>
            <Header></Header>
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word
                    selectedWord={selectedWord}
                    correctLetters={correctLetters}
                />
            </div>
            <Popup
                correctLetters={correctLetters}
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                setPlayable={setPlayable}
                playAgain={playAgain}
            />
            <Notification showNotification={showNotification} />
        </>
    );
}

export default App;
