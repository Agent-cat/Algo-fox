import os
import glob
import re

directory = "components/settings"
files = glob.glob(os.path.join(directory, "*.tsx"))

pattern = re.compile(r'\s*<InputLabel[^>]+/>\n?')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub('', content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")

print("Done")
