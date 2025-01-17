local Utils = require("utils")

local isInRange = function(diff)
    return (diff > 0) and (diff < 4)
end

local isValidAsc = function(previous, current)
    local diff = math.abs(previous - current)
    return (previous < current) and isInRange(diff)
end

local isValidDsc = function(previous, current)
    local diff = math.abs(previous - current)
    return (previous > current) and isInRange(diff)
end

local isValidReport = function(report)
    local isAsc = false
    local diff = tonumber(report[2]) - tonumber(report[1])
    if diff == 0 then
        return false
    end
    if diff > 0 then
        isAsc = true
    end

    local validator = isAsc and isValidAsc or isValidDsc
    for i = 2, #report do
        if not validator(tonumber(report[i - 1]), tonumber(report[i])) then
            return false
        end
    end

    return true
end

local createSubReports = function(report)
    local subReports = {}
    for i = 1, #report do
        local subReport = {}
        for j = 1, #report do
            if j ~= i then
                table.insert(subReport, report[j])
            end
        end
        table.insert(subReports, subReport)
    end
    return subReports
end


local c = 0

for line in io.lines("input1.txt") do
    local report = Utils.stringSplit(line, " ")
    if isValidReport(report) then
        c = c + 1
    else
        local subReports = createSubReports(report)
        for i = 1, #subReports do
            if isValidReport(subReports[i]) then
                c = c + 1
                break
            end
        end
    end
end

print(c)
