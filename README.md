# ECM1417 Web Development coursework

Link to Azure VM: ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:61394

## All pages: ##
- Background image set as specified
- #main, names in navbar, fonts, colours as specified
- style.css used for styling

## Responsive layout: ##
- Pages styling: @media screen and (max-width: 768px) and @media (max-width: 991px)

- navbar.php: 
  * Toggler appears when screen less 991px, if registered - avatar is hidden
  * When toggler appears, blocks below go down (if can overflow)

- registration.php:
  * Moves down when toggler appears

- pairs.php: 
  * Moves down when toggler appears, attempts/score hidden
  * Smaller screen: 
    * Text with attempts/score moves to the bottom
    * Size of cards changed to fit
  
- leaderboard.php: 
  * Moves down when toggler appears
  * Smaller screen: button 2 under 2 instead 4 in row 

## 0. navbar.php ##
- Font, size, colour and position as specified
- Avatar shown on the right when registered
- Created using Bootstrap


## 1. index.php ## 
- As specified
- Says 'Welcome to Pairs, *username*' if registered

## 2. registration.php (complex) ##
- When hover over the username input, says 'Shouldn't contain !@#%&*()+=^{}[]—;:“'<>?/'
- When invalid username, username already exists or no username is typed, says 'Names only contain letters and whitespace', 'Username already exists' and 'Name not set', respectively
- When no avatar/username selected/username invalid, corresponding messages appear underneath the input - errors  stored in sessions for registration.php to analyse but then unset 
- The user can't proceed if no username or avatar selected + invalid username
- Avatar: Basic layout without options in HTML. Dropdown menus populated in avatar.js 
- Username and avatar selection are stored in cookies which expire in 1 hour (although sessions would have been more secure)

## 3. pairs.php (complex) ##
- 3 levels
  - Level 1 score: Math.round(0.2 * (100 - numCurrentAttempts + distance/1000))
  - Level 2 score: Math.round(0.3 * (100 - numCurrentAttempts + distance/1000))
  - Level 3 score: Math.round(0.5 * (100 - numCurrentAttempts + distance/1000))
- Max attempts: 100; max time: 300s
- Random cards appear every game
- If run out, corresponding message displayed
- Can only win if pass all 3 levels
- Scores are stored in a file (forever, even if VM turned off)
(advanced)
- Flipping animation of cards
- When game starts, the sound is played. Volume is reduced when the game is over, turns off when button on the 'after-game' screen is clicked
- Smaller screen: When toggler open, time and attempts hidden

## 4. leaderboard.php ##
- Default: sorts by Total scores
- If same score, will have same place
- scores.txt used as a 'database' for different browsers to 'see' each other

Additional pages: avatar.js, checkScore.php, delete_last_score.php, navbar.php, pairs-cards.js, registration_processing.php, storeScore.php, style.css, submit_score.php
