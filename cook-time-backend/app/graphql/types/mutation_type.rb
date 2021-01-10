module Types
  class MutationType < Types::BaseObject
    field :add_recipe, mutation: Mutations::AddRecipe
  end
end
