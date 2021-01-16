class RecipesController < ApplicationController
  before_action :check_recipe_exists, only: %i[show update destroy]

  def index
    recipes = Recipe.all
    render json: {
      status: 200,
      json: RecipeSerializer.new(recipes)
    }, status: 200
  end

  def show
    render json: {
      status: 200,
      json: RecipeSerializer.new(@recipe)
    }, status: 200
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
    if @recipe.update(recipe_params)
      render json: {
        status: 200,
        json: RecipeSerializer.new(@recipe)
      }, status: 200
    else
      render json: {
        error: 'Unable to update the resource.',
        status: 400
      }, status: 400
    end
  end

  def destroy
    if @recipe.destroy
      render json: {
        status: 200
      }, status: 200
    else
      render json: {
        error: 'Unable to destroy the resource.'
      }, status: 400
    end
  end

  protected

  def recipe_params
    params.require(:recipe).permit(:name, :description, :difficulty, :ingredients)
  end

  def check_recipe_exists
    @recipe = Recipe.find(params[:id])
    unless @recipe
      render json: {
        error: 'Unable to find the resource.',
        status: 400
      }, status: 400
    end
  end
end
