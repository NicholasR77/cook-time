require 'rails_helper'

RSpec.describe "Steps", type: :request do
    before do
        @step = FactoryBot.create(:step)
        @step_params = FactoryBot.attributes_for(:step)
    end

    describe '#index' do
        it 'gets all steps for a given recipe id and returns them as a json object' do
            get recipe_steps_path(@step.recipe)
            expect(response).to have_http_status(200)
            json = JSON.parase(response.body)
            data = json.dig('json', 'data')
            expect(data.length).to eq 1
        end
    end

    describe '#show' do
        it 'gets a single step for a given recipe id and returns it as a json object' do
            get recipe_step_path(@step.recipe)
            expect(response).to have_http_status(200)
            json = JSON.parse(response.body)
            id = json.dig('json', 'data', 'id')
            expect(id).to eq '1'
        end
    end

    describe '#create' do
        it 'posts a single step for a given recipe id and returns it as a jsons object' do
            recipe = FactoryBot.create(:recipe)
            expect {
                post recipe_steps_path(recipe), params: {step: @step_params}
            }.to change(Step.all, :count).by(1)
            expect(response).to have_http_status(201)
        end
    end
end
