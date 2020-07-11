class ContributionsController < BaseController
    def index
        render :json => {contributions: Contribution.all.order(date: "DESC").map{|contribute|{count: contribute.count,date: contribute.date}}}
    end
end