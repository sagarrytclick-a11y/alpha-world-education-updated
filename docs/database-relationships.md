# 🗂️ Database Relationships - Alpha World Education

## 📊 **Entity Relationship Diagram (ERD)**

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     Country     │◄────────┤      College     │────────┤      Exam        │
│                 │         │                 │         │                 │
│ - _id           │         │ - _id           │         │ - _id           │
│ - name          │         │ - name          │         │ - name          │
│ - slug          │         │ - slug          │         │ - slug          │
│ - flag          │         │ - country_ref   │◄────────│ - applicable_   │
│ - description   │         │ - exams[]       │         │   countries[]  │
│ - meta_title    │         │ - fees          │         │ - exam_type     │
│ - meta_desc     │         │ - duration      │         │ - conducting_   │
│ - is_active     │         │ - banner_url    │         │   body          │
│ - timestamps    │         │ - about_content │         │ - exam_mode     │
└─────────────────┘         │ - is_active     │         │ - frequency     │
                            │ - timestamps    │         │ - description   │
                            └─────────────────┘         │ - is_active     │
                                                        │ - display_order │
                                                        │ - timestamps    │
                                                        └─────────────────┘
                                     ▲
                                     │
                                     │
                            ┌─────────────────┐
                            │      Blog        │
                            │                 │
                            │ - _id           │
                            │ - title         │
                            │ - slug          │
                            │ - category      │
                            │ - tags[]        │
                            │ - content       │
                            │ - related_exams │◄────────┘
                            │ - is_active     │
                            │ - timestamps    │
                            └─────────────────┘
```

## 🔗 **Detailed Relationships**

### 1. **Country ↔ College (One-to-Many)**
```javascript
// Country Model (Parent)
{
  _id: ObjectId,
  name: "United States",
  slug: "united-states"
}

// College Model (Child)
{
  _id: ObjectId,
  name: "Harvard University",
  country_ref: ObjectId("..."), // References Country._id
  exams: ["SAT", "TOEFL"]
}
```

**Relationship:** 
- 🇺🇸 One Country can have **Many Colleges**
- 🏫 Each College belongs to **Exactly One Country**

---

### 2. **College ↔ Exam (Many-to-Many via String Array)**
```javascript
// College Model
{
  _id: ObjectId,
  name: "MIT",
  exams: ["SAT", "TOEFL", "IELTS"] // String array, not ObjectIds
}

// Exam Model
{
  _id: ObjectId,
  name: "SAT",
  applicable_countries: [ObjectId("...")] // References Countries
}
```

**Relationship:**
- 📝 One College can require **Many Exams**
- 📋 One Exam can be required by **Many Colleges**
- ⚠️ **Note:** Currently using string arrays, not ObjectId references

---

### 3. **Exam ↔ Country (Many-to-Many)**
```javascript
// Exam Model
{
  _id: ObjectId,
  name: "SAT",
  applicable_countries: [
    ObjectId("usa_id"), 
    ObjectId("canada_id")
  ]
}

// Country Model
{
  _id: ObjectId,
  name: "United States"
}
```

**Relationship:**
- 🌍 One Exam can be applicable to **Many Countries**
- 📝 One Country can have **Many applicable Exams**

---

### 4. **Blog ↔ Exam (One-to-Many)**
```javascript
// Blog Model
{
  _id: ObjectId,
  title: "How to Prepare for SAT",
  related_exams: [
    ObjectId("sat_id"), 
    ObjectId("act_id")
  ]
}

// Exam Model
{
  _id: ObjectId,
  name: "SAT"
}
```

**Relationship:**
- 📖 One Blog can be related to **Many Exams**
- 📝 One Exam can be referenced by **Many Blogs**

---

## 📋 **Summary Table**

| Entity | Primary Key | Relationships | Cardinality |
|--------|-------------|---------------|-------------|
| **Country** | `_id` | → Colleges | 1 → Many |
| **College** | `_id` | ← Country, → Exams (strings) | Many → 1, Many → Many |
| **Exam** | `_id` | ← Colleges (strings), → Countries, ← Blogs | Many → Many, Many → Many, 1 → Many |
| **Blog** | `_id` | → Exams | 1 → Many |

---

## 🔧 **Technical Implementation**

### **Foreign Key References:**
```javascript
// College → Country
country_ref: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Country",
  required: true
}

// Exam → Countries
applicable_countries: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Country"
}]

// Blog → Exams
related_exams: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Exam"
}]

// College → Exams (Strings)
exams: [{
  type: String  // Simple string array, not ObjectId
}]
```

### **Query Examples:**

```javascript
// Get all colleges in a country
const colleges = await College.find({ country_ref: countryId })
  .populate('country_ref', 'name flag');

// Get all exams applicable to a country
const exams = await Exam.find({ 
  applicable_countries: countryId 
});

// Get all blogs related to an exam
const blogs = await Blog.find({ 
  related_exams: examId 
}).populate('related_exams', 'name slug');
```

---

## 🎯 **Key Insights:**

1. **Central Hub:** Countries are central - everything connects to countries
2. **Exams Bridge:** Exams connect countries, colleges, and blogs
3. **Simple College-Exam:** Uses strings for simplicity (can be upgraded to ObjectIds)
4. **Content-Exam Link:** Blogs are linked to exams for content relevance
5. **Geographic Focus:** Strong country-based organization

---

## 📈 **Scalability Considerations:**

### **Current Design:**
- ✅ Simple and efficient
- ✅ Fast queries with proper indexing
- ✅ Easy to understand and maintain

### **Future Improvements:**
- 🔄 College-Exam: Convert string arrays to ObjectId references
- 📊 Add junction tables for better many-to-many relationships
- 🔍 Add composite indexes for complex queries
- 📱 Add user-specific relationships (favorites, applications)

---

## 🗂️ **Google Drive Link Structure:**

For a visual representation, imagine this Google Drive folder structure:

```
📁 Alpha World Education Database/
├── 📁 Countries/
│   ├── 📄 United States.doc
│   ├── 📄 Canada.doc
│   └── 📄 UK.doc
├── 📁 Colleges/
│   ├── 📄 Harvard University.doc
│   │   └── 🔗 Links to: United States, SAT, TOEFL
│   └── 📄 MIT.doc
│       └── 🔗 Links to: United States, SAT, IELTS
├── 📁 Exams/
│   ├── 📄 SAT.doc
│   │   └── 🔗 Links to: USA, Canada, Harvard, MIT, Blog Posts
│   └── 📄 TOEFL.doc
│       └── 🔗 Links to: USA, UK, Harvard, Blog Posts
└── 📁 Blogs/
    ├── 📄 "SAT Preparation Guide".doc
    │   └── 🔗 Links to: SAT Exam
    └── 📄 "Study in Canada".doc
        └── 🔗 Links to: TOEFL Exam
```

**Visual Link:** https://drive.google.com/file/d/1DATABASE_RELATIONSHIP_DIAGRAM/view?usp=sharing

*(This is a conceptual Google Drive link structure for visualization)*
