module Mutations
    class AddRecipe < Mutations::BaseMutation
      argument :params, Types::Input::RecipeInputType, required: true
  
      field :recipe, Types::RecipeType, null: false
  
      def resolve(params:)
        recipe_params = Hash params
  
        begin
          recipe = Recipe.create!(recipe_params)
  
          { recipe: recipe }
        rescue ActiveRecord::RecordInvalid => e
          GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
            " #{e.record.errors.full_messages.join(', ')}")
        end
      end
    end
  end