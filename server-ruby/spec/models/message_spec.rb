# spec/models/message_spec.rb
require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:room) { Room.create(name: 'Test Room') }  # Buat room untuk asosiasi
  let(:user) { User.create(username: 'test_user', email: 'test@example.com', password: 'password') } # Buat user untuk asosiasi
  let(:message) { Message.new(content: 'Hello, world!', room: room, user: user) }  # Buat message

  describe 'associations' do
    it 'belongs to a room' do
      expect(Message.reflect_on_association(:room).macro).to eq(:belongs_to)
    end

    it 'belongs to a user' do
      expect(Message.reflect_on_association(:user).macro).to eq(:belongs_to)
    end
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(message).to be_valid
    end

    it 'is not valid without content' do
      message.content = nil
      expect(message).to_not be_valid
      expect(message.errors[:content]).to include("can't be blank")
    end

    it 'is not valid without a room' do
      message.room = nil
      expect(message).to_not be_valid
      expect(message.errors[:room]).to include("must exist")
    end

    it 'is not valid without a user' do
      message.user = nil
      expect(message).to_not be_valid
      expect(message.errors[:user]).to include("must exist")
    end
  end
end
