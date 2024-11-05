class MessagesController < ApplicationController
    before_action :authenticate_user

    def index
      @room = Room.find(params[:room_id])
      @messages = @room.messages

      render json: @messages
    end
  
    def create
      @room = Room.find(params[:room_id])
      @message = @room.messages.new(message_params.merge(user_id: @current_user_id))
    
      if @message.save
        # Menyertakan data `user` dalam broadcast
        message_with_user = @message.as_json(include: { user: { only: [:id, :username] } })
        ActionCable.server.broadcast("messages_channel", message_with_user)
    
        render json: @message, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @room = Room.find(params[:room_id])
      @message = @room.messages.find(params[:id])
      
      if @message.user_id == @current_user_id
        @message.destroy
        ActionCable.server.broadcast("messages_channel", { id: @message.id, action: 'delete' })
        
        render json: { message: 'Message deleted successfully' }, status: :ok
      else
        render json: { error: 'Not authorized to delete this message' }, status: :forbidden
      end
    end
  
    private
  
    def message_params
      params.require(:message).permit(:content, :user_id)
    end
  end
  