local function readFile(filename)
    local file = io.open(filename, "r")
    if not file then
        print("Error reading file:", filename)
        return nil
    end
    local data = file:read("*a")
    file:close()
    return data
end

local data = readFile("input1.txt")
if not data then return end

local input = data:match("^[^\r\n]+")

local fileId = 0
local disk = {}

for i = 1, #input do
    local char = tonumber(input:sub(i, i))
    if (i - 1) % 2 == 0 then
        for j = 1, char do
            table.insert(disk, fileId)
        end
        fileId = fileId + 1
    else
        for j = 1, char do
            table.insert(disk, ".")
        end
    end
end

local i = 1
local j = #disk

while i ~= j and i < j do
    if disk[i] == "." and disk[j] ~= "." then
        disk[i] = disk[j]
        disk[j] = "."
        i = i + 1
        j = j - 1
    elseif disk[i] ~= "." then
        i = i + 1
    elseif disk[j] == "." then
        j = j - 1
    end
end

local checksum = 0
for k = 1, #disk do
    if disk[k] ~= "." then
        checksum = checksum + (k - 1) * disk[k]
    end
end

print(checksum)
