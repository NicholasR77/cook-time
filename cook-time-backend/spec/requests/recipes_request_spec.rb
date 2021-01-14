require 'rails_helper'

RSpec.describe "Recipes", type: :request do
    before do
        @recipe = FactoryBot.create(:recipe)
        @recipe_params = FactoryBot.attributes_for(:recipe)
    end

    describe '#index' do
        it 'gets all recipes and returns them as a json object' do
            recipe_two = FactoryBot.create(:recipe)
            get recipes_path
            expect(response).to have_http_status(:success)
            json = JSON.parse(response.body)
            expect(json['json']['data'].length).to eq 2
        end
    end
    
    describe '#show' do
        it 'gets a single recipe and returns it as a json object' do
            get recipe_path(@recipe)
            expect(response).to have_http_status(200)
            json = JSON.parse(response.body)
            expect(json['json']['data']['id']).to eq '1'
        end
    end

    describe '#create' do
        it 'posts a single recipe' do
            expect {
                post recipes_path, params: { recipe: @recipe_params }
            }.to change(Recipe.all, :count).by(1)
            expect(response).to have_http_status(201)
        end
    end

    describe '#update' do
        it 'patches a single recipe' do
            name_change_params = {
                :name => 'New Name',
                :description => @recipe.description,
                :difficulty => @recipe.difficulty,
                :ingredients => @recipe.ingredients
            }
            patch recipe_path(@recipe), params: { recipe: name_change_params }
            expect(response).to have_http_status(200)
            json = JSON.parse(response.body)
            expect(json['json']['data']['attributes']['name']).to eq 'New Name'
        end
    end

    describe '#destroy' do
        it 'deletes a single recipe' do
            expect {
                delete recipe_path(@recipe)
            }.to change(Recipe.all, :count).by(-1)
            expect(response).to have_http_status(200)
        end 
    end
end
