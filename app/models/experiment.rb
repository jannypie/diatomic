class Experiment < ActiveRecord::Base
  def as_json(options={})
    { id: id, title: title, description: description }
  end
end
