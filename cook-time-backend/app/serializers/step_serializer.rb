class StepSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :id
  belongs_to :recipe
end
