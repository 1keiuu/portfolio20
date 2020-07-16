Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :contributions
  namespace :admin do
    post 'login/new'
    resources 'home'
  end
end
