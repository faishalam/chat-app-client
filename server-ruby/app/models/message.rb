class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user

  validates :content, presence: true 
  validates :room, presence: true     
  validates :user, presence: true  
end
