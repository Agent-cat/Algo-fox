import os
import re

modal_files = [
    "AboutEditModal.tsx",
    "AcademicEditModal.tsx",
    "AddressEditModal.tsx",
    "AwardModal.tsx",
    "CourseEditModal.tsx",
    "ExperienceModal.tsx",
    "PatentModal.tsx",
    "PreviousEducationModal.tsx",
    "ProjectModal.tsx",
    "PublicationModal.tsx",
    "SkillModal.tsx",
    "SummaryEditModal.tsx"
]

def process_file(filename):
    filepath = os.path.join("components/settings", filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}")
        return

    with open(filepath, "r") as f:
        content = f.read()

    # 1. Update SheetContent
    content = re.sub(
        r'<SheetContent className="[^"]*">',
        r'<SheetContent className="sm:max-w-[800px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl flex flex-col">',
        content
    )

    # 2. Update Header
    title_match = re.search(r'<SheetTitle[^>]*>(.*?)</SheetTitle>', content, re.DOTALL)
    title_text = "Edit Item"
    if title_match:
        text_inner = title_match.group(1).strip()
        if "Add" in text_inner or "Edit" in text_inner:
            # Try to extract the base noun (e.g. "Add New Project" -> "Project")
            m = re.search(r'(?:Add|Edit)(?:\s+New)?\s+(.*)', text_inner)
            if m:
                noun = m.group(1).strip()
                title_text = f'{{isEditing ? "Edit {noun}" : "Add {noun}"}}'
            else:
                title_text = text_inner
        else:
            title_text = text_inner

    header_replacement = f"""<SheetHeader className="p-8 pb-2">
                    <SheetTitle className="text-left text-2xl font-normal text-gray-800 dark:text-gray-100 tracking-tight">
                        {title_text}
                    </SheetTitle>
                </SheetHeader>"""

    content = re.sub(
        r'<SheetHeader[^>]*>.*?</SheetHeader>',
        header_replacement,
        content,
        flags=re.DOTALL
    )

    # 3. Update inputClasses
    content = re.sub(
        r'const inputClasses\s*=\s*"[^"]*";',
        r'const inputClasses = "w-full py-2 border-b-2 border-gray-200 dark:border-[#333] focus:border-gray-400 dark:focus:border-gray-500 bg-transparent text-[15px] outline-none transition-colors dark:text-gray-100 placeholder:text-gray-400";\n\n    const InputLabel = ({ title, required }: { title: string, required?: boolean }) => (\n        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">\n            {title} {required && <span className="text-red-500">*</span>}\n        </label>\n    );',
        content
    )

    # 4. Replace single button footer
    footer_replacement = """<div className="p-8 pt-4 flex justify-end gap-3 mt-auto">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="px-8 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 rounded-full text-[15px] font-medium transition-colors"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-2.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-[15px] font-medium transition-colors flex items-center justify-center min-w-[120px]"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? "Save" : "Create")}
                        </button>
                    </div>"""
    
    content = re.sub(
        r'<div className="p-6 flex justify-center border-t[^>]*>.*?</div>\s*</form>',
        f'{footer_replacement}\n                </form>',
        content,
        flags=re.DOTALL
    )

    # 5. Fix padding in body container: <div className="p-8 flex-1 overflow-y-auto space-y-6">
    content = re.sub(
        r'<div className="p-8 flex-1 overflow-y-auto space-y-6">',
        r'<div className="p-8 flex-1 overflow-y-auto space-y-8">',
        content
    )
    content = re.sub(
        r'<div className="p-6 flex-1 overflow-y-auto space-y-6">',
        r'<div className="p-8 flex-1 overflow-y-auto space-y-8">',
        content
    )

    # 6. Change all inputs to have InputLabel.
    # This is tricky because inputs are often wrapped in <div>. We will try to find <input ... placeholder="..."> inside a <div> and insert the label right before it.
    # To be safe, we'll iterate over lines and inject.
    lines = content.split('\n')
    new_lines = []
    
    for i, line in enumerate(lines):
        # Look for simple inputs with placeholder
        m_input = re.search(r'<input\s+.*?\bplaceholder="([^"]+)"', line)
        if m_input and 'type="date"' not in line and 'type="checkbox"' not in line:
            raw_placeholder = m_input.group(1)
            # Remove "Enter " and " *" from placeholder
            clean_title = raw_placeholder.replace('Enter ', '').replace(' *', '').replace('...', '')
            req = 'true' if 'required' in line or '*' in raw_placeholder else 'false'
            
            # The input might be inside a div. We should just place the label on the previous line if it's a bare div, but it's simpler to just replace the line with Label + Input.
            indent = line[:len(line) - len(line.lstrip())]
            label_code = f'{indent}<InputLabel title="{clean_title}" required={{{req}}} />'
            # Change placeholder to be more elegant or leave it blank
            # The prompt says use layout not text as it is, so keeping placeholder is fine but maybe remove the *
            new_line = line.replace(f'placeholder="{raw_placeholder}"', f'placeholder="{clean_title}"')
            new_lines.append(label_code)
            new_lines.append(new_line)
        else:
            new_lines.append(line)

    content = '\n'.join(new_lines)

    # Convert simple checkboxes into switches.
    # <input type="checkbox" {...register("...")} className="..." />
    # We'll use a regex to find checkboxes inside a label and convert them to the toggle switch UI.
    def checkbox_replacer(match):
        register_str = match.group(1)
        span_text = match.group(2)
        return f"""<label className="flex items-center gap-3 cursor-pointer select-none">
                                <div className="relative inline-flex items-center">
                                    <input type="checkbox" {register_str} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#333] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                </div>
                                <span className="text-[15px] text-gray-700 dark:text-gray-300">{span_text}</span>
                            </label>"""
    
    content = re.sub(
        r'<label className="flex items-center gap-3 cursor-pointer select-none">\s*<input type="checkbox"\s+(\{\.\.\.register\("[^"]+"\)\})\s+className="[^"]+"\s*/>\s*<span className="[^"]*">(.*?)</span>\s*</label>',
        checkbox_replacer,
        content,
        flags=re.DOTALL
    )

    with open(filepath, "w") as f:
        f.write(content)
    
    print(f"Processed {filename}")

for f in modal_files:
    process_file(f)

