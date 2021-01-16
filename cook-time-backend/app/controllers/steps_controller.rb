class StepsController < ApplicationController
  before_action :check_recipe_exists
  before_action :check_step_exists, only: %i[show update destroy]

  def index
    steps = Step.where(recipe_id: params[:recipe_id])
    render json: {
      status: 200,
      json: StepSerializer.new(steps)
    }, status: 200
  end

  def show
    render json: {
      status: 200,
      json: StepSerializer.new(@step)
    }, status: 200
  end

  def create
    step = @recipe.steps.create(step_params)
    if step
      render json: {
        status: 201,
        json: StepSerializer.new(step)
      }, status: 201
    else
      render json: {
        error: 'Unable to create the resource.',
        status: 400
      }, status: 400
    end
  end

  def update
    if @step.update(step_params)
      render json: {
        status: 200,
        json: StepSerializer.new(@step)
      }, status: 200
    else
      render json: {
        error: 'Unable to update the resource.',
        status: 400
      }, status: 400
    end
  end

  def destroy
    if @recipe.steps.destroy(@step)
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

  def step_params
    params.require(:step).permit(:name, :description)
  end

  def check_recipe_exists
    @recipe = Recipe.find(params[:recipe_id])
    unless @recipe
      render json: {
        error: 'Unable to find the resource.',
        status: 400
      }, status: 400
    end
  end

  def check_step_exists
    @step = Step.where(recipe_id: params[:recipe_id], id: params[:id])
    unless @step
      render json: {
        error: 'Unable to find the resource.',
        status: 400
      }, status: 400
    end
  end
end
