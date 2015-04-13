Rails.application.routes.draw do

  resources :experiments
  root 'home#index'

end
