FROM golang:latest

WORKDIR /go/src/work

RUN go get bitbucket.org/liamstask/goose/cmd/goose
RUN go get github.com/oxequa/realize

ADD . /go/src/work

RUN go build