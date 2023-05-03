# ECM1417 Web Development coursework

Link to Azure VM: ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:61394

All pages: 
- Background image set as specified
- style.css used for styling

0. navbar.php
- Font, size, colour and position as specified
- Avatar shown on the right when registered
- Created using Bootstrap

1. index.php
- As specified
- Says 'Welcome to Pairs, *username*' if registered

2. registration.php (complex)
- Processed by registration_processing.php
- When hover over the username input, says 'Shouldn't contain !@#%&*()+=^{}[]—;:“'<>?/'
- When invalid username or no username is typed, says 'Names only contain letters and whitespace' and 'Name not set', respectively
- When no avatar/username selected/username invalid, corresponding messages appear underneath the input - errors  stored in sessions for registration.php to analyse but then unset 
- The user can't proceed if no username or avatar selected + invalid username
- Avatar: Basic layout without options in HTML. Dropdown menus populated in avatar.js 
- Username and avatar selection are stored in cookies which expire in 1 hour (although sessions would have been more secure)

3. pairs.php (complex)
(advanced)
- Flipping animation of cards
- When game starts, the sound is played. Volume is reduced when the game is over, turns off when button on the 'after-game' screen is clicked

4. leaderboard.php
- scores.txt file used as a 'database' for different browsers to 'see' each other

Additional pages: avatar.js, checkScore.php, delete_last_score.php, navbar.php, pairs-cards.js, registration_processing.php, storeScore.php, style.css, submit_score.php
