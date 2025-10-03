# 📸 Room Images Reference

## Image Mapping for All 9 Rooms

### 🖼️ Real Photos (JPG)
These are actual hotel room photos located in `/public/`

1. **Standard Room** → `/standard-room.jpg`
   - Price: ৳24,999/night
   - Type: Real photo
   
2. **Deluxe Room** → `/deluxe-room.jpg`
   - Price: ৳39,999/night
   - Type: Real photo
   
3. **Presidential Suite** → `/suite-room.jpg`
   - Price: ৳89,999/night
   - Type: Real photo

---

### 🎨 SVG Placeholders
These are professional gradient placeholders located in `/public/`

4. **Superior Room** → `/superior-room.svg`
   - Price: ৳32,999/night
   - Gradient: Green-Teal (#10B981 → #06B6D4)
   
5. **Premium Deluxe** → `/premium-deluxe.svg`
   - Price: ৳49,999/night
   - Gradient: Pink-Purple (#EC4899 → #8B5CF6)
   
6. **Junior Suite** → `/junior-suite.svg`
   - Price: ৳64,999/night
   - Gradient: Blue (#3B82F6 → #1E40AF)
   
7. **Executive Suite** → `/executive-suite.svg`
   - Price: ৳74,999/night
   - Gradient: Purple-Indigo (#8B5CF6 → #6366F1)
   
8. **Family Suite** → `/family-suite.svg`
   - Price: ৳79,999/night
   - Gradient: Orange-Red (#F59E0B → #EF4444)
   
9. **Honeymoon Suite** → `/honeymoon-suite.svg`
   - Price: ৳99,999/night
   - Gradient: Green-Cyan (#10B981 → #06B6D4)

---

## 📂 File Locations

### All Images Now in `/public/`
```
public/
├── standard-room.jpg      ✅ Real photo (66 KB)
├── deluxe-room.jpg        ✅ Real photo (68 KB)
├── suite-room.jpg         ✅ Real photo (58 KB)
├── superior-room.svg      ✅ Placeholder (<1 KB)
├── premium-deluxe.svg     ✅ Placeholder (<1 KB)
├── junior-suite.svg       ✅ Placeholder (<1 KB)
├── executive-suite.svg    ✅ Placeholder (<1 KB)
├── family-suite.svg       ✅ Placeholder (<1 KB)
└── honeymoon-suite.svg    ✅ Placeholder (<1 KB)
```

**Why `/public/`?**
- Images in `/public/` can be referenced by URL path from the database
- No need for import statements
- Direct access via `image_url` field in database
- Works perfectly with dynamic data loading

---

## 🔄 How Images Are Loaded

### Database → Frontend Flow
```
1. Database (Supabase)
   ├── rooms table
   └── image_url column: '/standard-room.jpg'

2. API Fetch (roomsApi.getAllRooms())
   ├── Fetches: dbRoom.image_url
   └── Maps to: room.image

3. React Component (RoomCard.tsx)
   └── Displays: <img src={room.image} />

4. Browser
   └── Loads: http://localhost:8081/standard-room.jpg
```

### Code Path
```typescript
// Rooms.tsx - Fetching from DB
const mappedRooms: Room[] = data.map((dbRoom) => ({
  ...
  image: dbRoom.image_url || "",  // ← Maps DB field
  ...
}));

// RoomCard.tsx - Displaying image
<img 
  src={room.image}  // ← Uses mapped image URL
  alt={room.name}
  className="w-full h-64 object-cover"
/>
```

---

## 🎯 Database Setup

### SQL Insert Example
```sql
INSERT INTO rooms (..., image_url, ...) VALUES
(
    'Standard Room',
    ...,
    '/standard-room.jpg',  ← Path to public folder
    ...
);
```

### Verify Images After SQL Insert
```sql
SELECT id, name, image_url FROM rooms ORDER BY id;
```

Expected output:
```
 id | name               | image_url
----|--------------------|-----------------------
  1 | Standard Room      | /standard-room.jpg
  2 | Superior Room      | /superior-room.svg
  3 | Deluxe Room        | /deluxe-room.jpg
  4 | Premium Deluxe     | /premium-deluxe.svg
  5 | Junior Suite       | /junior-suite.svg
  6 | Executive Suite    | /executive-suite.svg
  7 | Family Suite       | /family-suite.svg
  8 | Presidential Suite | /suite-room.jpg
  9 | Honeymoon Suite    | /honeymoon-suite.svg
```

---

## 🖼️ Replacing SVG Placeholders

### When You Get Real Photos

1. **Save photos to `/public/` folder:**
   ```bash
   # Example filenames
   superior-room.jpg
   premium-deluxe.jpg
   junior-suite.jpg
   executive-suite.jpg
   family-suite.jpg
   honeymoon-suite.jpg
   ```

2. **Update database:**
   ```sql
   UPDATE rooms 
   SET image_url = '/superior-room.jpg' 
   WHERE name = 'Superior Room';
   
   UPDATE rooms 
   SET image_url = '/premium-deluxe.jpg' 
   WHERE name = 'Premium Deluxe';
   
   -- Repeat for other rooms...
   ```

3. **Refresh app** - Images update automatically!

---

## 📐 Image Specifications

### Recommended Specs for Real Photos
- **Format**: JPG or PNG
- **Dimensions**: 800×600px (4:3 ratio) or 1200×800px
- **File Size**: < 200 KB (optimized for web)
- **Quality**: 80-85% compression
- **Style**: Professional hotel photography
- **Lighting**: Bright, natural light preferred

### Current Display Size
- **Card Image**: 100% width × 256px height (16rem)
- **Object Fit**: cover (fills area, maintains aspect)
- **Hover Effect**: Scale 1.05× on hover

---

## ✅ Checklist

After running SQL, verify:

- [ ] All 9 rooms display images (no broken image icons)
- [ ] Images load quickly (< 1 second)
- [ ] JPG images are clear and professional
- [ ] SVG placeholders display colorful gradients
- [ ] Hover effect works (image scales slightly)
- [ ] Images maintain aspect ratio
- [ ] No console errors for missing images

---

## 🐛 Troubleshooting

### Issue: Broken Image Icon
**Check:**
1. Is the file in `/public/` folder?
2. Does filename match exactly? (case-sensitive)
3. Is the path in database correct? (starts with `/`)
4. Did you refresh the browser? (Ctrl+F5)

### Issue: Image Not Loading
**Solutions:**
```bash
# Verify file exists
ls -la public/*.jpg public/*.svg

# Check database values
# (Run in Supabase SQL Editor)
SELECT name, image_url FROM rooms;

# Restart dev server
npm run dev
```

---

## 📊 Image Statistics

| Type | Count | Total Size | Location |
|------|-------|-----------|----------|
| JPG (Real Photos) | 3 | ~193 KB | /public/ |
| SVG (Placeholders) | 6 | ~4 KB | /public/ |
| **Total** | **9** | **~197 KB** | **/public/** |

---

## 🚀 Performance

### Load Times (Estimated)
- **First Load**: ~200ms (all 9 images)
- **Cached**: Instant (browser cache)
- **SVG**: < 10ms (tiny file size)
- **JPG**: 50-100ms each

### Optimization Tips
1. ✅ Use WebP format for better compression
2. ✅ Lazy load images below fold
3. ✅ Add responsive images (srcset)
4. ✅ Implement image CDN for production

---

**Last Updated**: October 4, 2025  
**Status**: ✅ All images configured and ready  
**Next Step**: Run `INSERT_ROOMS_DHAKA.sql` in Supabase
