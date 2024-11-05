Rails.application.routes.draw do
  resources :users do
    collection do
      post :login  # Tambahkan rute login untuk UsersController
      post :register   # Rute untuk registrasi pengguna baru
    end
  end
  
  resources :rooms do
    resources :messages, only: [:index, :create, :destroy]
  end

  mount ActionCable.server => '/cable'

end
