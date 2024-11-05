class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_channel"
    # stream_from "MessageChannel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("messages_channel", data)
  end
end
