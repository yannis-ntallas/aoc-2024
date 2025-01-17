local Utils = require("utils")

local isValidAsc = function (previous, current)
    local diff = math.abs(previous - current)
    return (previous < current) and (diff > 0) and (diff < 4)
end

local isValidDsc = function (previous, current)
    local diff = math.abs(previous - current)
    return (previous > current) and (diff > 0) and (diff < 4)
end

local isValidReport = function (report)
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

local count = 0

for line in io.lines("input1.txt") do
    local report = Utils.stringSplit(line, " ")
    if isValidReport(report) then
        count = count + 1
    end
end

print(count)