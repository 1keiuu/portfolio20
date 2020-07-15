class AdminUsersController < ApplicationController
  before_action :set_admin_user, only: [:show, :update, :destroy]

  # GET /admin_users
  def index
    @admin_users = AdminUser.all

    render json: @admin_users
  end

  # GET /admin_users/1
  def show
    render json: @admin_user
  end

  # POST /admin_users
  def create
    @admin_user = AdminUser.new(admin_user_params)

    if @admin_user.save
      render json: @admin_user, status: :created, location: @admin_user
    else
      render json: @admin_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin_users/1
  def update
    if @admin_user.update(admin_user_params)
      render json: @admin_user
    else
      render json: @admin_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /admin_users/1
  def destroy
    @admin_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_user
      @admin_user = AdminUser.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def admin_user_params
      params.require(:admin_user).permit(:email, :password, :token)
    end
end
