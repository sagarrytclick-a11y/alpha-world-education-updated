# 🔗 Database Relationships Summary

## 📊 **Quick Overview**

```
🌍 Countries (1) ←→ (Many) 🏫 Colleges
📝 Exams (Many) ←→ (Many) 🏫 Colleges  
🌍 Countries (Many) ←→ (Many) 📝 Exams
📖 Blogs (1) ←→ (Many) 📝 Exams
```

## 🎯 **Key Relationships**

### **Country ↔ College**
- **1 Country** has **Many Colleges**
- **1 College** belongs to **1 Country**
- *Example:* USA → Harvard, MIT, Stanford

### **College ↔ Exam** 
- **1 College** requires **Many Exams**
- **1 Exam** required by **Many Colleges**
- *Example:* MIT → SAT, TOEFL, IELTS

### **Exam ↔ Country**
- **1 Exam** applicable in **Many Countries** 
- **1 Country** has **Many applicable Exams**
- *Example:* SAT → USA, Canada, UK

### **Blog ↔ Exam**
- **1 Blog** related to **Many Exams**
- **1 Exam** referenced by **Many Blogs**
- *Example:* "SAT Guide" → SAT Exam

---

## 🗂️ **Google Drive Visualization**

**Imagine this folder structure:**

```
📁 Alpha World Education/
├── 📁 Countries/
│   ├── 🇺🇸 United States/
│   │   ├── 📄 country-info.txt
│   │   └── 🔗 Links to: Harvard, MIT, Stanford
│   └── 🇨🇦 Canada/
│       ├── 📄 country-info.txt  
│       └── 🔗 Links to: Toronto, McGill
├── 📁 Colleges/
│   ├── 🏫 Harvard/
│   │   ├── 📄 college-info.txt
│   │   └── 🔗 Links to: USA, SAT, TOEFL
│   └── 🏫 MIT/
│       ├── 📄 college-info.txt
│       └── 🔗 Links to: USA, SAT, IELTS
├── 📁 Exams/
│   ├── 📝 SAT/
│   │   ├── 📄 exam-info.txt
│   │   └── 🔗 Links to: USA, Canada, Harvard, MIT
│   └── 📝 TOEFL/
│       ├── 📄 exam-info.txt
│       └── 🔗 Links to: USA, UK, Harvard
└── 📁 Blogs/
    ├── 📖 "SAT Guide"/
    │   ├── 📄 blog-content.txt
    │   └── 🔗 Links to: SAT Exam
    └── 📖 "Study in USA"/
        ├── 📄 blog-content.txt
        └── 🔗 Links to: USA Country
```

---

## 🔗 **Conceptual Google Drive Link**

**📎 Visual Diagram:** 
```
https://drive.google.com/drive/folders/1ALPHA_WORLD_EDUCATION_DB_RELATIONS
```

*This represents how all entities are interconnected like files in a shared drive with shortcuts/links between them.*

---

## 💡 **Simple Analogy**

Think of it like a **school filing system**:

- **Countries** = **Main Folders** (USA, Canada, UK)
- **Colleges** = **Sub-folders** inside countries (Harvard in USA folder)
- **Exams** = **Requirement documents** linked to multiple folders
- **Blogs** = **Information guides** linked to relevant exams

**Each folder/document has shortcuts/links to related items!**