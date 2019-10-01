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
	node bin/qr.js
	node bin/profile_img.js
