import os
import glob

directory = "components/settings"
files = glob.glob(os.path.join(directory, "*.tsx"))

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()

    # Only modify files that have <SheetContent
    if "<SheetContent" in content:
        # Add h-full flex flex-col to form
        new_content = content.replace("<form onSubmit={handleSubmit(onSubmit)}>", "<form onSubmit={handleSubmit(onSubmit)} className=\"flex flex-col h-full\">")
        # Same for forms without onSubmit directly, though all seem to use react-hook-form here
        new_content = new_content.replace("<form onSubmit={handleSubmit(onSubmit)} className=\"\">", "<form onSubmit={handleSubmit(onSubmit)} className=\"flex flex-col h-full\">")
        new_content = new_content.replace("<form>", "<form className=\"flex flex-col h-full\">")
        
        # Make the scrollable div flex-1 instead of h-full
        new_content = new_content.replace("h-full overflow-y-auto", "flex-1 overflow-y-auto")
        
        if content != new_content:
            with open(filepath, "w") as f:
                f.write(new_content)
            print(f"Fixed flex in {filepath}")

