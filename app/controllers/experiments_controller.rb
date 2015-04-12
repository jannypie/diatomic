class ExperimentsController < ApplicationController
  def index
    @experiments = if params[:keywords]
                     Experiment.where('title ilike ?',"%#{params[:keywords]}%")
                   else
                     []
                   end

  end
end
