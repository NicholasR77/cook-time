require 'rails_helper'

RSpec.describe Recipe, type: :model do 
  it 'is valid with valid attributes' do
    recipe = FactoryBot.build(:recipe)
    expect(recipe).to be_valid
  end

  it 'is invalid without a name' do
    recipe = FactoryBot.build(:recipe, name: nil)
    expect(recipe).to_not be_valid
  end
end
