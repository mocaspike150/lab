all: git_config
	git remote -v
	git checkout master
	node bin/collect.js 327007 > 327007.html # Bergen Runners (always)
	node bin/collect.js 439808 > 439808.html # WERun 东奔西跑
	node bin/collect.js 72363 > 72363.html   # ChiRunners 驰
	node bin/collect.js 301632 > 301632.html # PALS 知足常跑
	node bin/collect.js 523602 > 523602.html # TORCH 追风者
	git add .
	git commit -m 'update'
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"
