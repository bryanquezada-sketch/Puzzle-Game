import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);


        const COMPONENTS = {
            RED_TRIANGLE: {
              id: "RED_TRIANGLE",
              color: "red",
              symbol: "triangle"
            },
            BLUE_CIRCLE: {
              id: "BLUE_CIRCLE",
              color: "blue",
              symbol: "circle"
            },
            YELLOW_SQUARE: {
              id: "YELLOW_SQUARE",
              color: "yellow",
              symbol: "square"
            }
          };

        const SLOTS = ["TOP", "MIDDLE", "BOTTOM"];
        const boardState = {
            TOP: null,
            MIDDLE: null,
            BOTTOM: null
          };

          
        const RULES = [
            {
                id: "RED_NOT_MIDDLE",
                validate: (state) => {
                return state.MIDDLE !== "RED_TRIANGLE";
                }
            },

            {
                id: "SQUARE_BELOW_CIRCLE",
                validate: (state) => {
                const squareSlot = findSlot(state, "YELLOW_SQUARE");
                const circleSlot = findSlot(state, "BLUE_CIRCLE");

                if (!squareSlot || !circleSlot) return false;

                return SLOTS.indexOf(squareSlot) > SLOTS.indexOf(circleSlot);
                }
            },

            {
                id: "YELLOW_NOT_ABOVE_RED",
                validate: (state) => {
                const yellowSlot = findSlot(state, "YELLOW_SQUARE");
                const redSlot = findSlot(state, "RED_TRIANGLE");

                if (!yellowSlot || !redSlot) return false;

                return SLOTS.indexOf(yellowSlot) >= SLOTS.indexOf(redSlot);
                }
            }
        ];


        function findSlot(state, componentId) {
            return Object.keys(state).find(slot => state[slot] === componentId);
        }

          
        function isPuzzleSolved(state) {
            return RULES.every(rule => rule.validate(state));
        }


        const HINTS = {
            RED_NOT_MIDDLE: {
              calm: [
                "The red piece should never sit in the center."
              ],
              stressed: [
                "Red doesn’t belong boxed in."
              ],
              panic: [
                "Just—keep red out of the middle!"
              ]
            },
          
            SQUARE_BELOW_CIRCLE: {
              calm: [
                "The square must be positioned lower than the circle."
              ],
              stressed: [
                "Square should trail the circle… vertically."
              ],
              panic: [
                "Hierarchy matters—circle before square!"
              ]
            },
          
            YELLOW_NOT_ABOVE_RED: {
              calm: [
                "Yellow should never be placed above red."
              ],
              stressed: [
                "Yellow causes problems if it’s higher up."
              ],
              panic: [
                "Yellow on top just feels wrong!"
              ]
            }
          };

          
            const COMPANION_STATES = {
                CALM: "calm",
                STRESSED: "stressed",
                PANIC: "panic",
                IRRITATED: "irritated"
            };

          
            function getCompanionState(timeRemaining) {
                if (timeRemaining > 0.6) return COMPANION_STATES.CALM;
                if (timeRemaining > 0.25) return COMPANION_STATES.STRESSED;
                return COMPANION_STATES.PANIC;
            }

          




        
        


        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
