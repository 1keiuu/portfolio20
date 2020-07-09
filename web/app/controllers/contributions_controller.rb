class ContributionsController < BaseController
    def index
        render :json => {data: Contribution.all}
    end
end