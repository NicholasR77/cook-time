class RecipesController < ApplicationController
    def index
        recipes = Recipe.all
        render json: {
            status: 200,
            json: RecipeSerializer.new(recipes)
        }
    end

    def show
        recipe = Recipe.find(params[:id])
        render json: {
            status: 200,
            json: RecipeSerializer.new(recipe)
        }
    end

    def create
        recipe = Recipe.new(recipe_params)

        if recipe.save
            render json: {
                status: 201,
                json: RecipeSerializer.new(recipe)
            }, status: 201
        else
            render json: {
                error: 'Unable to create the resource.',
                status: 400
            }, status: 400
        end
    end

    def update
        recipe = Recipe.find(params[:id])

        if recipe.update(recipe_params)
            render json: {
                status: 200,
                json: RecipeSerializer.new(recipe)
            }, status: 200
        else
            render json: {
                error: 'Unable to update the resource.',
                status: 400
            }, status: 400
        end
    end

    def destroy
        recipe = Recipe.find(params[:id])

        if recipe.destroy
            render json: {
                status: 200
            }, status: 200
        else
            render json: {
                error: 'Unable to destroy the resource.'
            }, status: 400
        end
    end

    private
    def recipe_params
        params.require(:recipe).permit(:name, :description, :difficulty, :ingredients)
    end
end
