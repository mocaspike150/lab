all: git_config
	git remote -v
	git checkout master
	node bin/collect.js 327007 > 327007.html
	git add .
	git commit -m 'update'
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"
