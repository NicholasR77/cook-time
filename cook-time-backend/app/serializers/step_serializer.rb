class StepSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  belongs_to :recipe
end
