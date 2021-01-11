require 'rails_helper'

RSpec.describe "Recipes", type: :request do
    describe '#index' do
        it 'gets all recipes and returns them as a json object' do
            recipe = FactoryBot.create(:recipe)
            get recipes_path
            expect(response).to have_http_status(:success)
            json = JSON.parse(response.body)
            expect(json.length).to eq 1
            expect(json['data'][0]['id']).to eq '1'
        end
    end
    
    describe '#show' do
        it 'gets a single recipe and returns it as a json object' do
            recipe = FactoryBot.create(:recipe)
            get recipe_path(recipe)
            expect(response).to have_http_status(:success)
            json = JSON.parse(response.body)
            expect(json.length).to eq 1
            expect(json['data']['id']).to eq '1'
        end
    end

    describe '#create' do
        it 'posts a single recipe' do
            recipe_params = FactoryBot.attributes_for(:recipe)
            expect {
                post recipes_path, params: { recipe: recipe_params }
            }.to change(Recipe.all, :count).by(1)
        end
    end

    describe '#destroy' do
        
    end
end
