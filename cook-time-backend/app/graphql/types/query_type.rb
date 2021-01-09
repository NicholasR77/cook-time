module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :fetch_recipes, resolver: Queries::FetchRecipes
    field :fetch_recipe, resolver: Queries::FetchRecipe
  end
end
