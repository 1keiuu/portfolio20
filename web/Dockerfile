FROM golang:latest

RUN mkdir /go/src/work

WORKDIR /go/src/work

# RUN go get github.com/pressly/goose
RUN go get github.com/oxequa/realize

# CMD [ "realize", "start", "--run" ]

ADD . /go/src/work

