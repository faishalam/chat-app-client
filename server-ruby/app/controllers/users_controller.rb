class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    def register
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created
        else
          error_messages = @user.errors.messages.transform_values { |messages| messages.join(", ") }
          render json: { message: @user.errors.full_messages.first }, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(email: params[:email]) 
      
        if user && user.authenticate(params[:password])
          access_token = encode_token(user.id)
          render json: { user: user, access_token: access_token }, status: :ok
        else
          render json: { message: 'Invalid email or password' }, status: :unauthorized
        end
      end

    private

    def user_params
      params.permit(:username, :email, :password)
    end

    def encode_token(user_id)
        JWT.encode({ user_id: user_id, exp: (Time.now + 4.hours).to_i }, Rails.application.secret_key_base)
    end
end
