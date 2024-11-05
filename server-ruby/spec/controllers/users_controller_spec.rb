# spec/controllers/users_controller_spec.rb
require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let!(:user) { User.create(username: 'test_user', email: 'test@example.com', password: 'password') }
  let(:valid_attributes) { { username: 'new_user', email: 'new@example.com', password: 'password' } }
  let(:invalid_attributes) { { username: '', email: 'invalid_email', password: 'short' } }

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: user.id }
      expect(response).to be_successful
      expect(JSON.parse(response.body)['username']).to eq(user.username)
    end
  end

  describe "POST #register" do
    context "with valid attributes" do
      it "creates a new user" do
        expect {
          post :register, params: valid_attributes
        }.to change(User, :count).by(1)
      end

      it "returns a created response" do
        post :register, params: valid_attributes
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid attributes" do
      it "does not create a new user" do
        expect {
          post :register, params: invalid_attributes
        }.to change(User, :count).by(0)
      end

      it "returns an unprocessable entity response" do
        post :register, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "POST #login" do
    context "with valid credentials" do
      it "returns a success response with user and token" do
        post :login, params: { email: user.email, password: 'password' }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include('user' => hash_including('username' => user.username))
        expect(JSON.parse(response.body)).to have_key('access_token')
      end
    end

    context "with invalid credentials" do
      it "returns an unauthorized response" do
        post :login, params: { email: user.email, password: 'wrong_password' }
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['message']).to eq('Invalid email or password')
      end
    end
  end
end
