all: git_config pull build
	date > docs/date.txt
	git add .
	git commit -m "`date`"
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"


pull:
	git checkout master
	git pull

build:
	make leaderboard
	make leaderboard
	make leaderboard
	make leaderboard
	make leaderboard
	
slideshow:
	node bin/qr.js
	node bin/profile_img.js
	node bin/profile.js
	node bin/qr.js
	node bin/image_to_slide.js
	node bin/slideshow.js

leaderboard:
	node bin/collect_leaderboard.js 128445 |tee 128445.log
	node bin/collect_leaderboard.js 72363 |tee 72363.log
	node bin/collect_leaderboard.js 204946 |tee 204946.log
