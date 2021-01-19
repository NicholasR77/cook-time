require 'rails_helper'

RSpec.feature 'Recipes', type: :feature do
  scenario 'a user creates a new recipe' do
    visit 'http://127.0.0.1:8080/'
    expect {
      click_on 'New Recipe'
      fill_in 'Name', with: 'PB&J'
      fill_in 'Description', with: 'Yummm'
      fill_in 'Ingredients', with: 'Bread, peanut butter, jelly'
      fill_in 'Difficulty', with: 'Easy'
      click_on 'Create Recipe'
    }.to change(Recipe,all, :count).by(1)
    expect(page).to have_content 'Recipe was created successfully.'
    expect(page).to have_content 'PB&J'
  end
end
