# Transcript System Guide

## 🎯 **Problem Solved**

- ❌ **Before**: Buggy timestamp annotations, icons don't show, need to highlight text to add timestamps
- ✅ **After**: Clean, structured transcript segments with easy timestamp input and optional rich text editing

## 📝 **Two Editing Methods Available**

### Method 1: Structured Segments (Recommended ⭐)

**Best for**: Most users, easy timestamp management, clean organization

**How to use**:

1. Use the "Transcript Segments" field (primary option)
2. Click "+" to add a new segment
3. Fill in:
   - **Timestamp**: e.g., "1:23" or "1:23:45"
   - **Speaker**: Choose speaker type and select:
     - **Host**: Reference the podcast host (singleton)
     - **Guest**: Select from episode guests
     - **Other/Manual**: Enter custom speaker name
   - **Text**: What the speaker says
   - **Key Moment**: Toggle on for important parts ⭐
4. Segments are automatically sorted and organized

**Benefits**:

- ✅ No need to highlight text to add timestamps
- ✅ Easy to add/edit timestamps
- ✅ Better organization by speaker
- ✅ Mark key moments for highlights
- ✅ Clean preview showing timestamp + speaker + text
- ✅ Sortable by timestamp
- ✅ Quick and intuitive editing

### Method 2: Rich Text (Advanced)

**Best for**: Advanced users who need rich formatting (bold, italic, etc.)

**How to use**:

1. Use the "Rich Text Transcript (Advanced)" field
2. Type your transcript text normally
3. To add timestamps:
   - **Type text first**: "This is an important point"
   - **Select the text** you want to timestamp
   - **Click the timestamp button** in the toolbar
   - **Enter the time** (e.g., 1:23)
   - **Mark as key moment** if needed

**Note**: The rich text method requires text selection before adding timestamps.

## 🔧 **Implementation Details**

### **Setting Up Host Information**

1. **Create Host Document**: Go to Content → Podcast Host in Sanity Studio
2. **Fill in host details**: Name, title, bio, photo, social links
3. **Note**: Only one host document can exist (singleton pattern)
4. **Usage**: Host will appear as an option in transcript segments

### **In Sanity Studio**

- **Primary field**: "Transcript Segments" (structured, easy to use)
- **Secondary field**: "Rich Text Transcript (Advanced)" (hidden when segments are used)
- **Legacy field**: Old transcript data preserved but hidden

### **On the Frontend**

The TranscriptDisplay component automatically detects which format is used:

- Shows structured segments with clickable timestamps
- Falls back to portable text if available
- Displays "no transcript" message if neither exists

### **Speaker References**

- **Host**: Automatically links to the podcast host document (singleton)
- **Guest**: Links to specific guest documents for proper attribution
- **Other/Manual**: For co-hosts, moderators, or other speakers not in the system
- **Benefits**: Consistent speaker names, proper attribution, and structured data

### **Timestamp Format**

- Accepts: `1:23`, `1:23:45`, `123` (auto-formats to `1:23`)
- Validates: MM:SS or HH:MM:SS format
- Displays: Clickable timestamp buttons with jump-to functionality

### **Key Moments**

- Mark important segments with ⭐ star indicator
- Highlighted in yellow for better visibility
- Useful for creating episode highlights

## 💡 **Pro Tips**

### **For Structured Segments**:

- Start with timestamp 0:00 for intro
- Use descriptive speaker names (Host, Guest Name, etc.)
- Mark 2-3 key moments per episode
- Keep segments focused (1-2 minutes each)

### **For Rich Text**:

- Write your transcript first, then add timestamps
- Select full sentences or paragraphs before timestamping
- Use heading styles for speaker names
- Bold important quotes or key points

## 🔄 **Migration Path**

1. **New episodes**: Use "Transcript Segments" (recommended)
2. **Existing episodes**: Keep current transcripts, optionally migrate important ones
3. **Future**: Eventually remove legacy fields when all content is migrated

## 🎬 **Example Usage**

### Structured Segment Example:

```
Timestamp: 1:23
Speaker:
  - Type: host
  - Host Reference: → Jack Smith (Podcast Host)
Text: Welcome to today's episode! I'm excited to have [guest] on the show.
Key Moment: false
```

### Guest Segment Example:

```
Timestamp: 5:45
Speaker:
  - Type: guest
  - Guest Reference: → Dr. Jane Doe (Episode Guest)
Text: Thanks for having me, Jack. I'm excited to share my insights on business growth.
Key Moment: true
```

### Rich Text Example:

```
Welcome to today's episode! [1:23] I'm excited to have our guest on the show.
```

Both methods produce the same result on the frontend, but structured segments are much easier to edit and manage.

- ✅ No more buggy annotation system
- ✅ Easy to add/edit timestamps
- ✅ Better organization by speaker
- ✅ Mark key moments for highlights
- ✅ Clean preview showing timestamp + speaker + text
- ✅ Sortable by timestamp

## 🔄 **Migration Strategy**

### **Phase 1: Start Using New System**

- Start adding new transcripts using "Transcript Segments"
- Old transcripts remain in "Legacy Transcript" field

### **Phase 2: Gradually Migrate** (Optional)

- Copy important timestamps from old transcripts to new format
- Use new system for all future episodes

### **Phase 3: Clean Up** (Later)

- Remove the legacy transcript field when ready
- All transcripts will be in structured format

## 💡 **Pro Tips**

### **For Efficiency**

1. **Batch Entry**: Add multiple segments at once
2. **Speaker Shortcuts**: Set default speaker per episode
3. **Key Moments**: Use these for episode highlights/chapters
4. **Consistent Format**: Stick to MM:SS for shorter episodes

### **For Quality**

1. **Regular Intervals**: Add timestamps every 30-60 seconds
2. **Speaker Changes**: New segment when speaker changes
3. **Topic Changes**: New segment for topic transitions
4. **Important Quotes**: Mark as key moments

## 🎨 **UI Preview**

Each segment shows as:

```
1:23 ⭐ [host] This is an important point about...
2:45 [guest] I think the key thing to remember...
```

This makes it much easier to:

- Navigate through the transcript
- Find specific moments
- Edit individual segments
- Export for other uses

## 🔧 **Technical Notes**

- Validation ensures proper timestamp format
- Auto-sorting by timestamp (if needed)
- Easy to query via GROQ for frontend display
- Compatible with existing episode structure
