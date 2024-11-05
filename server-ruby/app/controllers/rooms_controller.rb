class RoomsController < ApplicationController
  before_action :authenticate_user
  
    def index
      @rooms = Room.order(created_at: :desc) 
      render json: @rooms
    end
  
    def show
      @room = Room.includes(:messages).find(params[:id]) 
  
      render json: @room.as_json(include: {
      messages: {
        include: {
          user: { only: [:id, :username] } 
        },
        only: [:id, :content, :user_id, :created_at]  
      }
    })
    end
  
    def create
      @room = Room.new(room_params)
      if @room.save
        ActionCable.server.broadcast("rooms_channel", @room)
        render json: @room, status: :created
      else
        render json: @room.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @room = Room.find_by(id: params[:id])
  
      if @room
        @room.destroy
        ActionCable.server.broadcast("rooms_channel", { action: "delete", room_id: @room.id })
        render json: { message: "Room deleted successfully" }, status: :ok
      else
        render json: { error: "Room not found" }, status: :not_found
      end
    end  
  
    private
  
    def room_params
      params.require(:room).permit(:name)
    end
end