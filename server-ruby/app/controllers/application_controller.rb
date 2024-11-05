class ApplicationController < ActionController::API
    private
  
    def authenticate_user
      access_token = request.headers['Authorization']&.split(' ')&.last
      secret_key = 'rahasia_saya'

      if access_token.nil?
        render json: { error: 'Token not provided' }, status: :unauthorized and return
      end
  
      begin
        decoded_token = JWT.decode(access_token, secret_key, false, { algorithm: 'HS256', iss: 'expected_issuer', verify_iss: true })
        @current_user_id = decoded_token[0]['user_id']
      rescue JWT::DecodeError => e
        render json: { error: 'Unauthorized', message: e.message }, status: :unauthorized
      end
    end
  end
  