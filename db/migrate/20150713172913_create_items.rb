class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :item_type
      t.integer :parent_id
      t.integer :position
      t.timestamps null: false
    end
  end
end
