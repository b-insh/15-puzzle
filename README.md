# 15-puzzle

15-puzzle is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing. The goal of the game is to get all the tiles ordered from 1 through the highest number from left to right, up to down.

### Implementation

#### Resizability
Because I wanted to have the game be easily resizable to a 3x3 or 5x5 game, I avoided hard coding and logic that relied specifically on the board being a 4x4 or having 16 total cells. I took this into account as well in my styling, making the width of each cell dependent on how many total cells there are. This is easily expandable for larger or smaller games, but as the game becomes either impossible or too easy at that point, I only accounted for 3x3 - 5x5.

#### Shuffling
In order to have the board be shuffleable, I needed a way to access all my values from 1 to the number of cells minus 1, and have it be randomly ordered. I decided to use the Underscore.js library which gave me the functionality I needed without having to bother with creating my own random numbers. When I want to shuffle the board, I call my function that creates a new shuffled array and use that to populate the board.

#### Cell locations
In order to have a permanent reference to each cell regardless of what its inner HTML is, I used unique ids from 1 to the amount of cells to keep track of each of them. This allowed me clean and readable code as well as the ability to easily check if a selected cell is free to move into the blank space. `inRow` checks each individual row of the board to see if both the selected cell and the blank space are in the same row and returns a boolean. `inColumn` does the same thing, checking to see if the difference between the selected cell's id and the blank space's id have a difference that is a multiple of the length of the row. If it is, we know they are in the same column.

#### Instructions
I really like CSS and doing pretty and fun things with it. I wanted to keep page as clean as possible and I didn't like the idea of having the instructions stay on the page the whole time when they are really only needed for the first five seconds. Using a tooltip element that appears when its parent is being hovered over gave me the functionality and flexibility that I wanted. Also, I think it's cute.


### Future Features

1. Inclusion of drop down menu that allows user to choose what size game they would like to play.

2. Allow users to choose different themes or images for the cells. When solved the cells would display a full image or pattern.

3. Only allow solvable arrangements to be displayed.
