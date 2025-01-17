--Advent Of Code 2024 Day 1 Part 2

local lList        = {}
local rList        = {}
local rFrequencies = {}
local result       = 0

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

for _, v in ipairs(rList) do
    if rFrequencies[v] == nil then
        rFrequencies[v] = 1
    else
        rFrequencies[v] = rFrequencies[v] + 1
    end
end

for _, v in ipairs(lList) do
    result = result + v * (rFrequencies[v] and rFrequencies[v] or 0)
end

print(result)
