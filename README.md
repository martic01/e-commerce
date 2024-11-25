### By Aboyade Matthew

# _Martic Memory Game_


## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Description](#description)
- [Features](#features)
- [License](#license)
- [Contact](#contact)






## Technologies
```bash
* GIT
* CSS
* HTML
* JAVASCRIPT
* JQUERY
```

## Description

#### _This is a JavaScript-based interactive card-flipping game where the player needs to uncover matching cards in order to win. The game involves a dynamic animation system where the cards flip, a fire element that grows as incorrect matches are made, and lives that reduce over time. The player must win by uncovering cards before the fire consumes the runing man._


## Features

#### Key features include:

* Card Flipping Animation: Each card flips with a smooth CSS animation upon clicking.
* Fire Progression: The fire increases its size when incorrect moves are made, adding urgency to the gameplay.
* Lives Counter: The player starts with 4 lives, and each incorrect move reduces the count.
* Win/Loss Conditions: The game ends when the player either runs out of lives (loss) or successfully uncovers the necessary matches (win).
* Restart Feature: The game can be restarted at any time, resetting all game elements including lives, fire, and card states. 

## Game Logic

### Card State Management:
* The game uses arrays to keep track of the state of each card (cardState), as well as the current match checks (check and checkFinal). Based on the state of these arrays, the game determines if a player has successfully matched cards or needs to continue.

### Fire Mechanism:
* The fireChase() function increases the width of a fire element by 2.5vw every time an incorrect card is flipped. The fire serves as a visual representation of how close the player is to losing.

### Lives:
* Each incorrect move reduces the player’s lives by one, displayed on the screen. The game ends when the lives reach zero.

### Card Reset:
* If the player makes an incorrect match, all cards are reset using the resetAll() function, which flips all cards back and hides the images, allowing the player to try again.

### Winning and Losing:
* The game tracks progress using the check1() function. If the player matches enough cards, they win, and the interface updates to show their victory. If the lives hit zero, the player loses, and the interface reflects their loss.

## Installation

### Clone to system
```bash
# Repository Address

git clone https://github.com/martic01/memory.git
```
### Navigate to top directory
```bash
# Project Name

cd memory

```
### Open the code part of the application

```bash
# Open file in

* In your code editor.
OR
* On your to directory type [code .]
```
### Prepare Application for Launching

```bash
# To RUN

In Your Terminal or GIT Bash Type.
1. npm install
2. npm run build
 
```
### To Launch Project

```bash
# To RUN

In Your Terminal or GIT Bash Type.
* npm run start
 
```
## Known Bugs

* no bugs yet

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

```bash

* Phone no : 09125701625

     *   GMAIL    *
```
 aboyadematthew2@gmail.com