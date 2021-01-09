module Types
    module Input
      class StepInputType < Types::BaseInputObject
        argument :name, String, required: true
        argument :description, String, required: false
      end
    end
  end
