require 'rails_helper'

RSpec.describe 'Steps', type: :request do
  before do
    @step = FactoryBot.create(:step)
    @step_params = FactoryBot.attributes_for(:step)
  end

  describe '#index' do
    it 'gets all steps for a given recipe id and returns them as a json object' do
      get recipe_steps_path(@step.recipe)
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      data = json.dig('json', 'data')
      expect(data.length).to eq 1
    end
  end

  describe '#show' do
    it 'gets a single step for a given recipe id and returns it as a json object' do
      get recipe_step_path(@step.recipe, @step)
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      name = json.dig('json', 'data', 0, 'attributes', 'name')
      expect(name).to eq @step.name
    end
  end

  describe '#create' do
    it 'posts a single step for a given recipe id and returns it as a json object' do
      recipe = FactoryBot.create(:recipe)
      expect do
        post recipe_steps_path(recipe), params: { step: @step_params }
      end.to change(Step.all, :count).by(1)
      expect(response).to have_http_status(201)
    end
  end

  describe '#update' do
    it 'patches a single step for a given recipe id and returns it as a json object' do
      name_change_params = {
        name: 'New Name',
        description: @step.description
      }
      patch recipe_step_path(@step.recipe, @step), params: { step: name_change_params }
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      name = json.dig('json', 'data', 0, 'attributes', 'name')
      expect(name).to eq 'New Name'
    end
  end

  describe '#destroy' do
    it 'destroys a single step for a given recipe id' do
      expect do
        delete recipe_step_path(@step.recipe, @step)
      end.to change(Step.all, :count).by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
