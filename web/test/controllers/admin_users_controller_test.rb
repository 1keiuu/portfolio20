require 'test_helper'

class AdminUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_user = admin_users(:one)
  end

  test "should get index" do
    get admin_users_url, as: :json
    assert_response :success
  end

  test "should create admin_user" do
    assert_difference('AdminUser.count') do
      post admin_users_url, params: { admin_user: { email: @admin_user.email, password: @admin_user.password, token: @admin_user.token } }, as: :json
    end

    assert_response 201
  end

  test "should show admin_user" do
    get admin_user_url(@admin_user), as: :json
    assert_response :success
  end

  test "should update admin_user" do
    patch admin_user_url(@admin_user), params: { admin_user: { email: @admin_user.email, password: @admin_user.password, token: @admin_user.token } }, as: :json
    assert_response 200
  end

  test "should destroy admin_user" do
    assert_difference('AdminUser.count', -1) do
      delete admin_user_url(@admin_user), as: :json
    end

    assert_response 204
  end
end
