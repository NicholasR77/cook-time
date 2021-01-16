class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :difficulty, :ingredients
  has_many :steps
end
