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
    local char = input:sub(i, i)
    if (i - 1) % 2 == 0 then
        table.insert(disk, { id = fileId, size = tonumber(char) })
        fileId = fileId + 1
    else
        table.insert(disk, { id = ".", size = tonumber(char) })
    end
end

for i = #disk, 1, -1 do
    local file = disk[i]
    if file.id ~= "." then
        -- Find a block that fits the file size
        local index = nil
        for j = 1, i - 1 do
            local diskSpace = disk[j]
            if diskSpace.id == "." and tonumber(diskSpace.size) >= tonumber(file.size) then
                index = j
                -- Set file's space as new empty space
                disk[i] = { id = ".", size = file.size }
                -- Update empty space we found in case the file is smaller
                disk[index] = {
                    id = disk[index].id,
                    size = disk[index].size - file.size
                }
                -- Move file to new space
                table.insert(disk, index, { id = file.id, size = file.size })
                break
            end
        end
    end
end

local checksum = 0
local i = 0

for k = 1, #disk do
    if disk[k].id == "." or disk[k].size <= 0 then
        i = i + disk[k].size
    else
        for j = 0, disk[k].size - 1 do
            local startingIndex = i + j
            checksum = checksum + startingIndex * disk[k].id
        end
        i = i + disk[k].size
    end
end

print(checksum)
