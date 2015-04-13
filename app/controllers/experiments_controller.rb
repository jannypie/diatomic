class ExperimentsController < ApplicationController
  def index
    experiments = if params[:keywords]
                     Experiment.where('title ilike ?',"%#{params[:keywords]}%")
                   else
                     []
                   end

    render json: experiments
  end

  def show
    render json: Experiment.find(params[:id])
  end

  def create
    @experiment = Experiment.new(params.require(:experiment).permit(:title,:description))
    @experiment.save
    render json: @experiment, status: 201
  end

  def update
    experiment = Experiment.find(params[:id])
    experiment.update_attributes(params.require(:experiment).permit(:title,:description))
    head :no_content
  end

  def destroy
    experiment = Experiment.find(params[:id])
    experiment.destroy
    head :no_content
  end

end
