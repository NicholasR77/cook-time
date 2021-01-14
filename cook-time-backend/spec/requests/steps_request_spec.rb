require 'rails_helper'

RSpec.describe "Steps", type: :request do
    before do
        @step = FactoryBot.create(:step)
        @step_params = FactoryBot.attributes_for(:step)
    end

    describe '#index' do
        it 'gets all steps for a recipe id and returns them as a json object' do
           
        end
    end
end
