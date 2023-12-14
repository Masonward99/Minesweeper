# Minesweeper

## About 

Based on the classic video game Minesweeper, this project utilises raw
JavaScript and CSS. This app creates a grid and randomly places a
specified number of mines inside it. The user wins when all the cells
that do not contain a bomb are visible.

This app manipulates DOM elements to create the grid and place the
mines.

## Features

- Three difficulties levels. Each level has a different grid size and
number of mines
- Timer to show how long a succesful attempt has taken

- Flags can be added by pressing the flag button or by right clicking
on the cell

- The first cell clicked cannot contain a mine, allowing for gameplay
that feels fairer

## Challenges faced and solution

1. Preventing the first click from being a mine.  
  
Solution:
- Create a firstClick variable
- Generate a new grid if the firstClick varible is true and the cell contains a mine
- Create a function that has the same behaviour as clicking on the cell. This would be passed the cells row and collumn index.
  
2. Ensuring that ce

Solution: 

- Getting a better undertanding of the heirachy of CSS classes. This allowed me to get cells to display properly even if they had multiple classes.
- Using important for properties that should always be displayed if that class is active. Example: the background color of a flagged square should always be green