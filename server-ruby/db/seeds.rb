# db/seeds.rb

# Menghapus semua data sebelumnya (hanya untuk pengembangan)
User.destroy_all
Room.destroy_all
Message.destroy_all

# Membuat User Dummy
user1 = User.create(username: 'user1', email: 'user1@example.com', password: 'password1')
user2 = User.create(username: 'user2', email: 'user2@example.com', password: 'password2')

# Membuat Room Dummy
room1 = Room.create(name: 'Room 1')
room2 = Room.create(name: 'Room 2')

# Membuat Message Dummy
Message.create(content: 'Hello from User 1 in Room 1', room: room1, user: user1)
Message.create(content: 'Hello from User 2 in Room 1', room: room1, user: user2)
Message.create(content: 'Welcome to Room 2', room: room2, user: user1)
Message.create(content: 'This is a second message in Room 2', room: room2, user: user2)

puts "Seed data created: #{User.count} users, #{Room.count} rooms, #{Message.count} messages."
