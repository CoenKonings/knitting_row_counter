FROM golang:1.24.4

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN go install github.com/githubnemo/CompileDaemon@latest
ENTRYPOINT ["CompileDaemon", "-command=./row-counter-api"]
