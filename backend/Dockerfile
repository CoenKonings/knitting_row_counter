FROM golang:1.24.4

WORKDIR /go/src/app
COPY . .
RUN go get .
RUN go build -o main main.go
CMD ["./main"]
