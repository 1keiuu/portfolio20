Rails.application.routes.draw do
  resources :admin_users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :contributions
  post 'login/new'
  post 'login/authenticate'

end
