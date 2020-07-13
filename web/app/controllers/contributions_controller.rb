class ContributionsController < BaseController
    def index
        contributions_array = Contribution.all.to_a

        today  = Time.current.at_beginning_of_day

        # 週別で取得
        lastday_of_thisweek = (today - 7.day)
        lastday_of_thisyear = (today - 1.year)
        contribution_of_thisyear = contributions_array.select{|d|today >d.date && d.date >lastday_of_thisyear}
        contribution_of_thismonth = []
        4.times{|n|
            this_day = today-(7*n).day
            contribution_of_thismonth.push(contributions_array.select{|d|this_day >d.date && d.date >=this_day - 7.day})
        }
        weekly = []
        contribution_of_thismonth.each do |c|
            weekly.push({
                labels:c.pluck(:date)&.map{|date|date.strftime("%m/%d")},
                data:c.pluck(:count)
            })
        end
        # 月別で取得
        monthly_array = []
        i = today.month
        while i >= 1
            if i == today.month
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == i && y.date.year == today.year}
            else
                monthly_data = contribution_of_thisyear.select{|y| y.date.month == i}
            end
            monthly_array.push({month:monthly_data[0]&.date&.strftime("%Y/%m"),count:monthly_data.pluck(:count).sum()})
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
            monthly_array.push({month:monthly_data[0].date.strftime("%Y/%m"),count:monthly_data.pluck(:count).sum()})
            index -= 1
        end

        monthly_labels = monthly_array.pluck(:month).reverse()
        monthly_count = monthly_array.pluck(:count).reverse()
        monthly = {labels:monthly_labels,data:monthly_count}

        # 年別で取得
        first = contributions_array[0]
        years = (first.date.year..today.year).to_a
        yearly_array=[]
        years.each{|year|
            yearly_data = contributions_array.select{|contribution|contribution.date.year == year}
            yearly_array.push({year:year,count:yearly_data.sum(&:count)})
        }
        yearly_labels = yearly_array.pluck(:year)
        yearly_count = yearly_array.pluck(:count)
        yearly = {labels:yearly_labels,data:yearly_count}

        render :json => {contributions:{weekly:weekly,monthly:monthly,yearly:yearly}}
    end
end