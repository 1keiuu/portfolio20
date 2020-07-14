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
        

        # 年別で取得
        first = contributions_array[0]
        years = (first.date.year..today.year).to_a
        yearly_array=[]
        yearly = {labels:[],data:[]}
        years.each{|year|
            yearly_data = contributions_array.select{|contribution|contribution.date.year == year}
            yearly_array.push({year:year,count:yearly_data})
            yearly[:labels].push(year)
            yearly[:data].push(yearly_data.sum(&:count))
        }

        # 月別で取得
        def culc (year_arr)
            array = []
            today  = Time.current.at_beginning_of_day

            i = 12
            while i >= 1
                if i == today.month
                    monthly_data = year_arr.select{|y| y.date.month == i && y.date.year == today.year}
                else
                    monthly_data = year_arr.select{|y| y.date.month == i}
                end

                array.push({month:monthly_data[0]&.date&.strftime("%Y/%m"),count:monthly_data.pluck(:count).sum()})
                i -= 1
            end

            monthly_labels = array.pluck(:month).reverse()
            monthly_count = array.pluck(:count).reverse()
            monthly = {labels:monthly_labels,data:monthly_count}
        end

        monthly_array = []
        yearly_array.reverse().each do |y|
            monthly_array.push(culc(y[:count]))
        end
        
        render :json => {contributions:{weekly:weekly,monthly:monthly_array,yearly:yearly}}
    end
end