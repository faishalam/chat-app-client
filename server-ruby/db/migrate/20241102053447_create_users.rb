class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false  # Gunakan password_digest untuk bcrypt

      t.timestamps
    end

    # Menambahkan indeks unik pada kolom email
    add_index :users, :email, unique: true
  end
end
