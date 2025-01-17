--Advent Of Code 2024 Day 1 Part 1

local lList = {}
local rList = {}
local result = 0

---Splits strings by separator into a table
---@param inputstr string
---@param sep string
---@return table
function Split(inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t = {}
    for str in string.gmatch(inputstr, "([^" .. sep .. "]+)") do
        table.insert(t, str)
    end
    return t
end

for line in io.lines("input1.txt") do
    local splitLine = Split(line, "   ")
    table.insert(lList, tonumber(splitLine[1]))
    table.insert(rList, tonumber(splitLine[2]))
end

table.sort(lList)
table.sort(rList)

for i = 1, #lList do
    result = result + math.abs(lList[i] - rList[i])
end

print(result)
