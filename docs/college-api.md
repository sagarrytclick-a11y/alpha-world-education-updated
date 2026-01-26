# 📚 College API Documentation

## 🔗 **Endpoint: `/api/admin/colleges`**

### ✅ **POST - Create College**

**Request Format:**
```json
{
  "name": "College Name",
  "slug": "college-slug",
  "country_ref": "country-slug",
  "fees": 15000,
  "duration": "4 years",
  "banner_url": "https://example.com/image.jpg",
  "about_content": "College description",
  "is_active": true,
  "exams": ["SAT", "TOEFL", "IELTS"]
}
```

### 🌍 **Available Countries (with slugs):**

| Flag | Country | Slug |
|------|---------|------|
| 🇮🇳 | India | `india` |
| 🇺🇸 | United States | `united-states` |
| 🇬🇧 | United Kingdom | `united-kingdom` |
| 🇨🇦 | Canada | `canada` |
| 🇦🇺 | Australia | `australia` |
| 🇵🇰 | Luxembourg | `luxunberg` |

### 📝 **Exam Field:**

The `exams` field accepts an array of strings (not ObjectIds):

**Common Exams:**
- `SAT`
- `TOEFL` 
- `IELTS`
- `GRE`
- `GMAT`
- `ACT`

**Example:**
```json
"exams": ["SAT", "TOEFL", "IELTS"]
```

### ✅ **Success Response (201):**
```json
{
  "success": true,
  "message": "College created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "College Name",
    "slug": "college-slug",
    "country_ref": "507f1f77bcf86cd799439012",
    "fees": 15000,
    "duration": "4 years",
    "banner_url": "https://example.com/image.jpg",
    "about_content": "College description",
    "is_active": true,
    "createdAt": "2026-01-26T07:29:59.260Z",
    "updatedAt": "2026-01-26T07:29:59.260Z"
  }
}
```

### ❌ **Error Responses:**

#### **1. Country Not Found (400):**
```json
{
  "success": false,
  "message": "Country not found",
  "error": {
    "invalidCountry": "wrong-country",
    "availableCountries": [
      {"slug": "india", "name": "India", "flag": "🇮🇳"},
      {"slug": "united-states", "name": "United States", "flag": "🇺🇸"}
    ],
    "message": "Country with slug 'wrong-country' not found. Available countries:\n- india (🇮🇳 India)\n- united-states (🇺🇸 United States)"
  },
  "type": "validation_error"
}
```

#### **2. Missing Required Fields (400):**
```json
{
  "success": false,
  "message": "Missing required fields: name, slug, country_ref, fees, duration, about_content",
  "error": {
    "missingFields": ["name", "slug", "country_ref"]
  },
  "type": "validation_error"
}
```

#### **3. Duplicate Slug (409):**
```json
{
  "success": false,
  "message": "slug already exists",
  "error": "A record with this slug already exists. Please use a different value.",
  "type": "duplicate_error"
}
```

---

## 🛠️ **For Non-Technical Users:**

### **How to Add a College:**

1. **Use the Admin Dashboard** (Recommended):
   - Go to `/admin/colleges`
   - Click "Add College"
   - Fill the form with country dropdown
   - Submit ✅

2. **Use API (Advanced):**
   - Use correct country slug from table above
   - Don't use country codes like "usa", "uk"
   - Use full slugs like "united-states", "united-kingdom"

### **Common Mistakes & Solutions:**

| ❌ Wrong | ✅ Correct | Issue |
|---------|-----------|-------|
| `"country_ref": "usa"` | `"country_ref": "united-states"` | Use full slug |
| `"country_ref": "uk"` | `"country_ref": "united-kingdom"` | Use full slug |
| Missing `about_content` | Add description | Required field |
| Empty `name` | Add college name | Required field |

---

## 🔧 **Technical Implementation:**

### **Validation Features:**
- ✅ Required field validation
- ✅ Country existence check with helpful suggestions
- ✅ Duplicate slug prevention
- ✅ Proper error types and messages
- ✅ Development vs Production error details

### **Security:**
- ✅ Input validation
- ✅ Proper error handling
- ✅ No sensitive data exposure

### **Database Relations:**
- College → Country (Many-to-One)
- College → Exams (Many-to-Many)
- Uses ObjectIds for relationships

---

## 📞 **Support:**

If you face issues:
1. Check country slug from table above
2. Ensure all required fields are present
3. Use admin dashboard for easier management
4. Check browser console for detailed errors
