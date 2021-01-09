module Queries
    class FetchRecipes < Queries::BaseQuery
  
      type [Types::RecipeType], null: false
  
      def resolve
        Recipe.all.order(created_at: :desc)
      end
    end
end