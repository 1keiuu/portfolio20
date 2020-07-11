class ContributionsController < BaseController
    def index
        contributions_array = Contribution.all.to_a

        today  = Time.current.at_beginning_of_day

        # 週別で取得
        lastday_of_thisweek = (today - 14.day)
        lastday_of_thisyear = (today - 1.year)
        contribution_of_thisyear = contributions_array.select{|d|today >d.date && d.date >lastday_of_thisyear}
        weekly = contribution_of_thisyear.select{|y|today >y.date && y.date >=lastday_of_thisweek}
        
        # 月別で取得
        monthly = []
        i = today.month
        while i >= 1
            if i == today.month
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == i && y.date.year == today.year}
            else
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == i}
            end
            monthly.push({month:monthly_data[0]&.date&.strftime("%Y/%m"),count_sum:monthly_data.pluck(:count).sum()})
            i -= 1
        end
        index = 12
        diff = today.month + 1
        while index >= diff
            if diff == today.month
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == index && y.date.year == today.year}
            else
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == index}
            end
            monthly.push({month:monthly_data[0].date.strftime("%Y/%m"),count_sum:monthly_data.pluck(:count).sum()})
            index -= 1
        end

        # 年別で取得
            
        render :json => {contributions:{weekly:weekly,monthly:monthly}}
    end
end