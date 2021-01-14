class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :difficulty, :ingredients
end
