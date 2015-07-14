require 'test_helper'

class FilesystemControllerTest < ActionController::TestCase
  test "should get scan" do
    get :scan
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
