module Types
    module Input
      class RecipeInputType < Types::BaseInputObject
        argument :name, String, required: true
        argument :description, String, required: false
        argument :difficulty, String, required: false
        argument :ingredients, String, required: false
      end
    end
  end
