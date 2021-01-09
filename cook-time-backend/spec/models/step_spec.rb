require 'rails_helper'

RSpec.describe Step, type: :model do
  it 'is valid with valid attriutes' do
    step = FactoryBot.build(:step)
    expect(step).to be_valid
  end

  it 'is invalid without a name' do
    step = FactoryBot.build(:step, name: nil)
    expect(step).to_not be_valid
  end
end
