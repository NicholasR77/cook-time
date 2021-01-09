FactoryBot.define do
  factory :step do
    name { 'Step 1' }
    description { 'Do all of it.'}
    association :recipe
  end
end
