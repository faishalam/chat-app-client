# spec/models/room_spec.rb
require 'rails_helper'

RSpec.describe Room, type: :model do
  let(:room) { Room.new(name: 'Test Room') }

  describe 'associations' do
    it 'has many messages' do
      expect(Room.reflect_on_association(:messages).macro).to eq(:has_many)
    end

    it 'has many users through messages' do
      expect(Room.reflect_on_association(:users).macro).to eq(:has_many)
      expect(Room.reflect_on_association(:users).options[:through]).to eq(:messages)
    end
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(room).to be_valid
    end

    it 'is not valid without a name' do
      room.name = nil
      expect(room).to_not be_valid
      expect(room.errors[:name]).to include("can't be blank")
    end
  end

end
