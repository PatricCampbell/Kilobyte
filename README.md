# Kilobyte

Kilobyte is a browser game inspired by 1024. The object of Kilobyte is to create a tile of value 1024. The player starts with two tiles of value 2 and must combine same number tiles. This adds up the value in the tiles in a new tile. The game ends when the whole board is full or when a tile reaches 1024.

## Minimum Viable Product
While playing Kilobyte, users will be able to:
* Use the arrow keys or the mouse to move tiles in one of the four cardinal directions.
* Restart a lost game with two new random initial tiles.
* See their score and the best they have gotten this play session.

In addition, the project will have:
* Instructions on gameplay and how to win.
* A production README.

## Technologies Used

Kilobyte will use vanilla JavaScript for game logic, CSS and HTML to display the game, and Animate.css for the game animations.

I will be using a CSS animation library instead of a JavaScript library because CSS animations are more lightweight and have better pefromance. Animate.css is a mature library with many users that will help me with the sliding and combining animations the tiles will have.

There will be two script files used in this project in vanilla JavaScript to control the game:

* board.js will handle the logic of the tiled board, keep track of thee position of the tiles, determine if the game is won or lost, and will tell the browser how to render the board.
* tile.js will handle the logic of each tile and will have a factory method to create new tiles.

## Wireframes

Kilobyte is a one page app that contains the current score and session high score at the top. The board will be in the center with arrow buttons on each side of the board. Below the board will be the instructions on how to play. At the bottom will be links to my portfolio, Github, and LinkedIn.

[Wireframe]: https://github.com/PatricCampbell/Kilobyte/blob/master/kilobyte.png

## Implementation Timeline

Day 1: Initial setup ensuring that Animate.css works correctly. Start creating the two script files mentioned above with game logic.

Day 2: Finish the game logic and make a prototype of the game board in the browser without styling or animations. Add keyboard controls to start with. Ensure that the game logic is sound and the game can be won and lost. Make sure the game can be reset. If time, start learning the Animate.css library.

Day 3: Use CSS and Animate.css to style and add animations to the game. Add mouse controls by adding arrow buttons on each side of the game board. Add personal profile links and instructions on how to play.

## Bonus Features

After completion of the base game, these features will be added:
* A nice musical track to relax the user while playing,
* High scores saved on the backend using FireBase so that users can compete against each other.