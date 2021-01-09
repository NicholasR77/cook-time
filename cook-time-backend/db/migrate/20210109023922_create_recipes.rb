class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.string :difficulty
      t.text :ingredients

      t.timestamps
    end
  end
end
