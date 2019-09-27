all: git_config pull total top50

git_config:
	git config --global user.email "ontouchstart@gmail.com"
	git config --global user.name "Sam Liu"


pull:
	git checkout master
	git pull

collect:
	node bin/collect.js 72363
	node bin/collect.js 128445
	node bin/collect.js 142275
	node bin/collect.js 147066
	node bin/collect.js 155681
	node bin/collect.js 157594
	node bin/collect.js 175314
	node bin/collect.js 176328
	node bin/collect.js 183643
	node bin/collect.js 187897
	node bin/collect.js 196102
	node bin/collect.js 197462
	node bin/collect.js 204946
	node bin/collect.js 229749
	node bin/collect.js 234023
	node bin/collect.js 236304
	node bin/collect.js 241951
	node bin/collect.js 299365
	node bin/collect.js 301632
	node bin/collect.js 302045
	node bin/collect.js 327007
	node bin/collect.js 330129
	node bin/collect.js 438046
	node bin/collect.js 439808
	node bin/collect.js 452045
	node bin/collect.js 452667
	node bin/collect.js 464836
	node bin/collect.js 479503
	node bin/collect.js 481356
	node bin/collect.js 484248
	node bin/collect.js 513442
	node bin/collect.js 516025
	node bin/collect.js 519388
	node bin/collect.js 523430
	node bin/collect.js 523602

	git add data/collected_html
	git commit -m 'collect html by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master
latest: collect
	node bin/latest.js 72363
	node bin/latest.js 128445
	node bin/latest.js 142275
	node bin/latest.js 147066
	node bin/latest.js 155681
	node bin/latest.js 157594
	node bin/latest.js 175314
	node bin/latest.js 176328
	node bin/latest.js 183643
	node bin/latest.js 187897
	node bin/latest.js 196102
	node bin/latest.js 197462
	node bin/latest.js 204946
	node bin/latest.js 229749
	node bin/latest.js 234023
	node bin/latest.js 236304
	node bin/latest.js 241951
	node bin/latest.js 299365
	node bin/latest.js 301632
	node bin/latest.js 302045
	node bin/latest.js 327007
	node bin/latest.js 330129
	node bin/latest.js 438046
	node bin/latest.js 439808
	node bin/latest.js 452045
	node bin/latest.js 452667
	node bin/latest.js 464836
	node bin/latest.js 479503
	node bin/latest.js 481356
	node bin/latest.js 484248
	node bin/latest.js 513442
	node bin/latest.js 516025
	node bin/latest.js 519388
	node bin/latest.js 523430
	node bin/latest.js 523602

	git add data/html
	git commit -m 'update latest html by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master
convert: latest
	node bin/convert.js 72363
	node bin/convert.js 128445
	node bin/convert.js 142275
	node bin/convert.js 147066
	node bin/convert.js 155681
	node bin/convert.js 157594
	node bin/convert.js 175314
	node bin/convert.js 176328
	node bin/convert.js 183643
	node bin/convert.js 187897
	node bin/convert.js 196102
	node bin/convert.js 197462
	node bin/convert.js 204946
	node bin/convert.js 229749
	node bin/convert.js 234023
	node bin/convert.js 236304
	node bin/convert.js 241951
	node bin/convert.js 299365
	node bin/convert.js 301632
	node bin/convert.js 302045
	node bin/convert.js 327007
	node bin/convert.js 330129
	node bin/convert.js 438046
	node bin/convert.js 439808
	node bin/convert.js 452045
	node bin/convert.js 452667
	node bin/convert.js 464836
	node bin/convert.js 479503
	node bin/convert.js 481356
	node bin/convert.js 484248
	node bin/convert.js 513442
	node bin/convert.js 516025
	node bin/convert.js 519388
	node bin/convert.js 523430
	node bin/convert.js 523602

	git add data/json
	git commit -m 'update json by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master
total: convert
	node bin/total.js 
	date > data/update_time.txt
	node bin/current_miles.js > data/current_miles.txt
	node bin/club_ranking.js > data/club_ranking.csv
	git add data/leaderboard.json
	git add data/update_time.txt
	git add data/current_miles.txt
	git add data/club_ranking.csv
	git commit -m 'update total by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master

top50:
	node bin/currentweek_top50.js
	git add data/leaderboard
	git commit -m 'update leaderboard top50 by Makefile' | true
	git push -u https://ontouchstart:${GITHUB_TOKEN}@github.com/mocaspike150/lab master
