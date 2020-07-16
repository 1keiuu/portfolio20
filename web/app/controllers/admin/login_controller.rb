module Admin
  class LoginController < ApplicationController
    def new
      login_user = AdminUser.find_by(email:params[:email],password:params[:password])
      if login_user != nil
        render plain: login_user.token
      else
        render plain: 'no auth' , status: 401
      end
    end
  end
end