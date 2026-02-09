# Google Sheet Column Structure Guide

# Google Sheet Column Structure Guide - NEW NAMING CONVENTION

## Overview
The Google Sheet now generates **573+ columns** with structured naming convention for better data analysis.

## Column Structure

### Fixed Administrative Columns (18)
1. `Serial Number` - Sequential: 1, 2, 3...
2. `Timestamp` - Submission date/time
3. `Q1A_City` - City code (1-5)
4. `Q1B_OEM` - OEM code (1-7) 
5. `Q1C_Model` - Model code (1-7)
6. `S1_1_DealerName` - Dealer name
7. `S1_2_DealerAddress` - Dealer address
8. `S1_3_DistrictName` - District
9. `S1_4_StateName` - State
10. `S1_5_RespondentName` - Respondent name
11. `S1_6_RespondentContact` - 10-digit phone number
12. `Q1C_Gender` - Gender
13. `Q2_Experience` - Experience years
14. `Q3_Designation` - Job title
15. `Q4_ModelExperience` - Model experience
16. `Q5_KnowledgeLevel` - Knowledge level
17. `filledForms_URLs` - Drive URLs for uploaded images
18. `brochures_URLs` - Drive URLs for uploaded PDFs

### NEW Feature Column Pattern  
**Q[Section][Question].[FeatureID] [Feature Name] [Question Type]**

Examples:
- `Q6a.1 Drive mode (Eco, Normal, Sport) OEM (Factory Fitted / Dealer Fitted)`
- `Q6b.1 Drive mode (Eco, Normal, Sport) MOST PREFERRED`
- `Q6c.1 Drive mode (Eco, Normal, Sport) IMPORTANT`
- `Q6d.1 Drive mode (Eco, Normal, Sport) AVAILABLE AFTERMARKET`
- `Q6e.1 Drive mode (Eco, Normal, Sport) After Market Price`

### Q6 - Comfort Features (185 columns)
**37 features × 5 = 185 columns**

Pattern for each feature (1-37):
- `Q6a.[ID] [Feature Name] OEM (Factory Fitted / Dealer Fitted)`
- `Q6b.[ID] [Feature Name] MOST PREFERRED`
- `Q6c.[ID] [Feature Name] IMPORTANT`
- `Q6d.[ID] [Feature Name] AVAILABLE AFTERMARKET`
- `Q6e.[ID] [Feature Name] After Market Price`

### Q7 - Safety Features (130 columns)
**26 features × 5 = 130 columns**

Pattern for each feature (1-26):
- `Q7a.[ID] [Feature Name] OEM (Factory Fitted / Dealer Fitted)`
- `Q7b.[ID] [Feature Name] MOST PREFERRED`
- `Q7c.[ID] [Feature Name] IMPORTANT`
- `Q7d.[ID] [Feature Name] AVAILABLE AFTERMARKET`
- `Q7e.[ID] [Feature Name] After Market Price`

### Q7f - ADAS Features (10 columns)
**10 features × 1 = 10 columns (Simple Yes/No only)**

Pattern for each ADAS feature (1-10):
- `Q7f.1 Adaptive Cruise Control`
- `Q7f.2 Lane Departure Warning`
- `Q7f.3 Lane Keep Assist`
- etc.

### Q8 - Exterior Features (75 columns)
**15 features × 5 = 75 columns**

### Q9 - Interior Features (105 columns)
**21 features × 5 = 105 columns**

### Q9f - ICL Features (9 columns)
**9 features × 1 = 9 columns (Simple Yes/No only)**

Pattern for each ICL feature (1-9):
- `Q9f.1 Speedometer`
- `Q9f.2 Tachometer`
- `Q9f.3 Fuel Gauge`
- etc.

### Q10 - Infotainment Features (30 columns)
**6 features × 5 = 30 columns**

### Q11 - Connectivity Features (65 columns)
**13 features × 5 = 65 columns**

### Q12 - Performance Features (30 columns)
**6 features × 5 = 30 columns**

### Q13 - Missing Features (10 columns)
**10 open-ended text fields**
- `Q13.1 Missing Features`
- `Q13.2 Missing Features`
- etc.

### Q14 - Other Desired Features (10 columns)
**10 open-ended text fields**
- `Q14.1 Other Desired Features`
- `Q14.2 Other Desired Features`
- etc.

## Total Column Count: 573 Columns
- Administrative: 18
- Feature columns: 555 (detailed breakdown below)

## How Data is Stored

### OEM/Aftermarket Columns (✓/✗ symbols)
- **Yes** → `"✓"` (Green checkmark)
- **No** → `"✗"` (Red X mark)
- **Not Selected** → `""` (empty cell)

### Most Preferred Columns (Feature IDs)  
- **Single selection** → `"5"`
- **Multiple selections** → `"1, 5, 12, 18"`
- **No selections** → `""`

### Important Columns (Visual Ratings)
- **Most Important** → `"⭐⭐⭐ Most Important"`
- **Good to have** → `"⭐⭐ Good to Have"`
- **Not Important** → `"⭐ Not Important"`
- **Not Selected** → `""` (empty cell)

### Price Columns (INR Values)
- **Price value** → `"25000"` (in INR)
- **No price** → `""`

## Data Analysis Benefits

✅ **Structured naming** - Q[Section][Question].[ID] format for easy sorting  
✅ **Feature ID tracking** - .1, .2, .3 makes feature identification simple  
✅ **Visual clarity** - Tick marks ✓/✗ instead of confusing 1/2 codes  
✅ **Star ratings** - ⭐⭐⭐ shows importance at a glance  
✅ **Clear question separation** - OEM vs AFTERMARKET vs IMPORTANT vs PRICE  
✅ **Consistent pattern** - Every feature follows same 5-column structure  
✅ **Analysis ready** - Perfect for Excel/Power BI/Python pivot tables  
✅ **Scalable design** - Easy to add new features maintaining same pattern

## Important Notes

⚠️ **NEW column naming** - Q[Section][Question].[FeatureID] [Feature Name] [Question Type]  
⚠️ **Visual symbols used** - ✓/✗ for Yes/No, ⭐ for importance ratings  
⚠️ **File data excluded** - Only URLs stored, not base64 data  
⚠️ **Serial numbers sequential** - 1, 2, 3... (not GR-codes)  
⚠️ **Re-deploy required** - Update Google Apps Script after naming changes  
⚠️ **573 total columns** - 18 admin + 555 feature columns (mixed structure patterns)