Rails.application.routes.draw do
  resources :recipes, only: [:index, :show, :create, :update, :destroy] do
    resources :steps, only: [:index, :show, :create, :update, :destroy]
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  
  post "/graphql", to: "graphql#execute"
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
