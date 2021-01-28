class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :difficulty, :ingredients, :id
  has_many :steps
end
