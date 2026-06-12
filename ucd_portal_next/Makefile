# Variables
IMAGE_NAME := ucd_portal_next-app
CONTAINER_NAME := ucd_portal_next-app
PORT := 3172

# Default target
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make build          - Build the Docker image"
	@echo "  make run            - Run the Docker container"
	@echo "  make stop           - Stop the running container"
	@echo "  make migrate        - Run Django migrations"
	@echo "  make superuser      - Create Django superuser"
	@echo "  make collectstatic  - Run Django collectstatic"
	@echo "  make clean          - Remove the container and image"

# Build the Docker image
.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
.PHONY: run
run:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):3172 --env-file .env $(IMAGE_NAME)

# Stop the running container
.PHONY: stop
stop:
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
	
# Clean up: Remove container and image
.PHONY: clean
clean:
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
	-docker rmi -f $(IMAGE_NAME)
