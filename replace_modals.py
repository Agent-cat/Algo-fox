import os
import glob
import re

directory = "components/settings"
files = glob.glob(os.path.join(directory, "*.tsx"))

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()

    if "from \"@/components/ui/dialog\"" in content or "from \"@/components/ui/sheet\"" in content:
        # Import
        new_content = re.sub(
            r'from "@/components/ui/dialog"',
            'from "@/components/ui/sheet"',
            content
        )
        
        # Elements
        new_content = new_content.replace("<Dialog", "<Sheet")
        new_content = new_content.replace("</Dialog>", "</Sheet>")
        new_content = new_content.replace("<DialogContent", "<SheetContent")
        new_content = new_content.replace("</DialogContent>", "</SheetContent>")
        new_content = new_content.replace("<DialogHeader", "<SheetHeader")
        new_content = new_content.replace("</DialogHeader>", "</SheetHeader>")
        new_content = new_content.replace("<DialogTitle", "<SheetTitle")
        new_content = new_content.replace("</DialogTitle>", "</SheetTitle>")
        new_content = new_content.replace("<DialogDescription", "<SheetDescription")
        new_content = new_content.replace("</DialogDescription>", "</SheetDescription>")
        new_content = new_content.replace("<DialogFooter", "<SheetFooter")
        new_content = new_content.replace("</DialogFooter>", "</SheetFooter>")
        
        # Imports replacements
        new_content = new_content.replace("{ Dialog, DialogContent, DialogHeader, DialogTitle }", "{ Sheet, SheetContent, SheetHeader, SheetTitle }")
        new_content = new_content.replace("{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }", "{ Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription }")
        
        # Fix rounded corners which don't look good on sheets
        new_content = new_content.replace("rounded-2xl", "")
        new_content = new_content.replace("rounded-xl", "")
        
        # Fix max-height on inner scrollable divs if any, so they take full height or allow scrolling properly
        # Usually they have `max-h-[70vh] overflow-y-auto`
        new_content = new_content.replace("max-h-[70vh]", "h-full")
        new_content = new_content.replace("max-h-[75vh]", "h-full")
        new_content = new_content.replace("max-h-[80vh]", "h-full")
        new_content = new_content.replace("max-h-[90vh]", "h-full")
        
        if content != new_content:
            with open(filepath, "w") as f:
                f.write(new_content)
            print(f"Updated {filepath}")

