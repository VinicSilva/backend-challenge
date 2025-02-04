init:
	cp .env.example .env
	make up

up:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

build:
	make down
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

cov:
	docker-compose exec backend_api npm run test:cov
	
bash:
	docker-compose exec backend_api sh
