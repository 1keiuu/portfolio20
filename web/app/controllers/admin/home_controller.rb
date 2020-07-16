module Admin
    class HomeController < ApplicationController
        include ActionController::HttpAuthentication::Token::ControllerMethods

        before_action :authenticate

        def index
            render json: {'message':'ok'}
        end

        def authenticate
            authenticate_or_request_with_http_token do |token,options|
                auth_user = AdminUser.find_by(token: token)
                auth_user != nil ? true : false
            end
        end
    end
end