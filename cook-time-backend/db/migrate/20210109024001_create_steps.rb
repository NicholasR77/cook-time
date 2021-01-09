class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.string :name
      t.text :description

      t.belongs_to :recipe

      t.timestamps
    end
  end
end
