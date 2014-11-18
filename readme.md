# Echo Test

##Global Requirements.

	$ npm install -g foreman bower grunt-cli nodemon

##Local Requirements

	$ npm install
	$ bower install

## Build
	$ grunt build

##Run with
	
	$ nodemon server.js --watch server.js


## Usage

	To see the player got to
	
	http://localhost:3000
	
	To pause the song using Socket.io got to

	http://localhost:3000/api/sound/pause

	To change volume

	http://localhost:3000/api/sound/volume/:volume 

	where volume is some integer between 0 and 100

	To change progress

	http://localhost:3000/api/sound/progress/:progress

	Where progress is some integer representing the milliseconds of the duration of the song

	

