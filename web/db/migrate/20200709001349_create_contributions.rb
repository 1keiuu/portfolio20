class CreateContributions < ActiveRecord::Migration[6.0]
  def change
    create_table :contributions do |t|
      t.integer :count
      t.date :date
      t.timestamps
    end
  end
end
