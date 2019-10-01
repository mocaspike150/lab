all: git_config pull
	date > date.txt
	git add .
	git commit -m `date`
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master
