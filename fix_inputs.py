import os
import glob

# The old bad inputClasses string
bad_input = '"w-full py-2 border-b-2 border-gray-200 dark:border-[#333] focus:border-gray-400 dark:focus:border-gray-500 bg-transparent text-[15px] outline-none transition-colors dark:text-gray-100 placeholder:text-gray-400"'

# The new good inputClasses string
good_input = '"w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200"'

directory = "components/settings"
files = glob.glob(os.path.join(directory, "*.tsx"))

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if bad_input in content:
        new_content = content.replace(bad_input, good_input)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")

print("Done")
