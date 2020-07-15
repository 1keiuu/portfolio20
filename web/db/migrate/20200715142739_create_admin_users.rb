class CreateAdminUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :admin_users do |t|
      t.string :email
      t.string :password
      t.string :token

      t.timestamps
    end
    add_index :admin_users, :token, unique: true
  end
end
