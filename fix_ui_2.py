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

input_class_str = """
    const inputClasses = "w-full py-2 border-b-2 border-gray-200 dark:border-[#333] focus:border-gray-400 dark:focus:border-gray-500 bg-transparent text-[15px] outline-none transition-colors dark:text-gray-100 placeholder:text-gray-400";

    const InputLabel = ({ title, required }: { title: string, required?: boolean }) => (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {title} {required && <span className="text-red-500">*</span>}
        </label>
    );
"""

long_class = 'w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200'

for filename in modal_files:
    filepath = os.path.join("components/settings", filename)
    if not os.path.exists(filepath): continue
    
    with open(filepath, "r") as f:
        content = f.read()

    # If isEditing is not defined, we should fix the footer button text.
    if 'isEditing =' not in content and 'isEditing)' not in content and 'isEditing?' not in content:
        # Actually it's failing because isEditing is missing.
        # Let's replace `(isEditing ? "Save" : "Create")` with `"Save"` and `{isEditing ? ... : ...}` in SheetTitle with the static title.
        pass

    # A better approach: define isEditing = false if missing, or just remove the ternary.
    if 'const isEditing = ' not in content and 'const isEditing =' not in content:
        content = content.replace('{isEditing ? "Save" : "Create"}', '"Save"')
        content = content.replace('{isEditing ? "Edit About Info" : "Add About Info"}', '"About Info"')
        content = content.replace('{isEditing ? "Edit Academic Details" : "Add Academic Details"}', '"Academic Details"')
        content = content.replace('{isEditing ? "Edit Address" : "Add Address"}', '"Address"')
        content = content.replace('{isEditing ? "Edit Experience" : "Add Experience"}', '"Experience"')
        content = content.replace('{isEditing ? "Edit Education Details" : "Add Education Details"}', '"Education Details"')
        content = content.replace('{isEditing ? "Edit Summary" : "Add Summary"}', '"Summary"')
        content = content.replace('{isEditing ? "Edit Course" : "Add Course"}', '"Course"')
        content = content.replace('{isEditing ? "Edit Skill" : "Add Skill"}', '"Skill"')
        content = content.replace('{isEditing ? "Edit Publication" : "Add Publication"}', '"Publication"')
        content = content.replace('{isEditing ? "Edit Patent" : "Add Patent"}', '"Patent"')
        content = content.replace('{isEditing ? "Edit Award" : "Add Award"}', '"Award"')

    # Inject InputLabel if missing
    if 'const InputLabel' not in content:
        # insert it right before return (
        content = re.sub(r'(\s*return\s*\(\s*<Sheet)', r'\n' + input_class_str + r'\1', content)

    # Replace old class with {inputClasses}
    content = content.replace(f'className="{long_class}"', 'className={inputClasses}')
    
    # Remove old existing <label> around inputs that we injected <InputLabel> next to
    # Specifically for CourseEditModal and PreviousEducationModal
    content = re.sub(r'<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1\.5">\s*.*?\s*</label>', '', content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)

