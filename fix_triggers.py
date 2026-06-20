import os
import glob
import re

directory = "components/settings"
files = glob.glob(os.path.join(directory, "*.tsx"))

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()

    new_content = content.replace("<DialogTrigger", "<SheetTrigger")
    new_content = new_content.replace("</DialogTrigger>", "</SheetTrigger>")
    new_content = new_content.replace("DialogTrigger", "SheetTrigger")
    
    # Check for DialogClose as well
    new_content = new_content.replace("<DialogClose", "<SheetClose")
    new_content = new_content.replace("</DialogClose>", "</SheetClose>")
    new_content = new_content.replace("DialogClose", "SheetClose")

    if content != new_content:
        with open(filepath, "w") as f:
            f.write(new_content)
        print(f"Fixed Triggers in {filepath}")

