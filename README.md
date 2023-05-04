# ECM1417

Azure VM: ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:61394

## All pages: ##
- Background-image as specified
- #main, navbar names, fonts, colours, borders as specified

## Responsive layout: ##
- Pages styling: @media screen and max-width 768px and 991px

- navbar.php: 
  * Toggler appears when screen less 991px, if registered - avatar is hidden
  * When toggler opened, blocks below go down

- registration.php:
  * Moves down when toggler opened
  * Smaller screen:
    * Inputs/buttons fit into registration block 

- pairs.php: 
  * Moves down when toggler opened, attempts/score hidden
  * Smaller: 
    * Text with attempts/score moves to the bottom
    * Size of cards changed to fit
  
- leaderboard.php: 
  * Moves down when toggler opened
  * Smaller:
    * Buttons 2 under 2 instead of 4 in row 

## 0. navbar.php ##
- Avatar shown on the right when registered
- Created using Bootstrap

## 1. index.php ## 
-'Welcome to Pairs, *username*' if registered

## 2. registration.php (complex) ##
- Username/avatar selection stored in cookies, expire in 1 hour (although sessions would have been more secure)
- When hover over username input - says 'Shouldn't contain !@#%&*()+=^{}[]—;:“'<>?/'
- When username invalid/already exists/none typed - 'Names only contain letters and whitespace', 'Username already exists' and 'Name not set', respectively inside input
- When no avatar/username selected/invalid, corresponding messages appear underneath input - errors  stored in sessions for registration.php to analyse but then unset 
- Avatar: Basic layout without options in HTML. Dropdown menus populated in avatar.js 
- Users choose avatar themselves using dropdown menus (compulsory)

## 3. pairs.php (complex) ##
- 3 levels (max theoretical score: 400)
  1. 
    - score: Math.round(0.2*(100-numCurrentAttempts+time-left/1000))
    - no.cards: 10
  2. 
    - score: Math.round(0.3*(100-numCurrentAttempts+time-left/1000))
    - no.cards: 15
  3. 
    - score: Math.round(0.5*(100-numCurrentAttempts+time-left/1000))
    - no.cards:20
- Max attempts: 100; max time: 300s
- If run out, corresponding message displayed + Play again button
- Random cards configured every game
- Background changes to gold as specified
- Must pass all 3 levels
- Scores stored in file (forever, even if VM turned off)
- POST request sent to leaderboard.php if 'Submit score' clicked (registered)
- 'Play again' - no scores saved, scores reset, redirected to 'Start game' (registered/unregistered)
(advanced)
- Flipping animation
- When game starts, sound is played. Volume is reduced when game over, turned off when button on 'after-game' screen clicked

## 4. leaderboard.php ##
- Default: sorts by Total scores
- If same score, have same place
- scores.txt used as 'database' for different browsers to 'see' each other
