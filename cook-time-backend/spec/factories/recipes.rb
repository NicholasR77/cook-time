FactoryBot.define do
  factory :recipe do
    name { 'Grandmas Fave Lasanga' }
    description { 'It is cheesy. It is wondeful. It is lasanga.' }
    difficulty { 'Easy' }
    ingredients { 'Cheese, sauce, pasta, and love.' } 
  end
end
