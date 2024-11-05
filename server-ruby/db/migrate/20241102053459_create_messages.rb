class CreateMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.references :room, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    # Uncomment this line only if you haven't created an index manually yet
    # add_index :messages, :room_id
  end
end
