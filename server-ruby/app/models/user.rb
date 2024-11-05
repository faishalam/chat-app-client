class User < ApplicationRecord
     # Menambahkan dukungan untuk autentikasi
     has_secure_password
     
    # Relasi one-to-many dengan pesan
    has_many :messages, dependent: :destroy
    # Relasi many-to-many melalui pesan dengan room
    has_many :rooms, through: :messages
  
    # Validasi
    validates :username, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
   
end
  