FROM ruby:2.6.5
ENV LANG C.UTF-8

# install required libraries
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN gem install bundler -v 2.0.2

# install bundler
RUN gem install bundler

WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install

WORKDIR /app
COPY . /app
