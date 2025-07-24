# React Native Components Documentation

## Core Components

### **View**
- **Use case**: Container omponent, similar to `<div>` in web development
- Acts as a wrapper for other components
- Supports styling, layout, and touch handling

### **Text**
- **Use case**: Display text content
- Only component that can contain text nodes
- Supports styling, nesting, and touch events

### **Image**
- **Use case**: Display static and network images
- Supports various image formats (PNG, JPG, GIF, WebP)
- Can load from local files or remote URLs

### **ScrollView**
- **Use case**: Scrollable container for content that exceeds screen size
- Good for small lists or content
- Renders all children at once

### **TextInput**
- **Use case**: Text input field for user input
- Supports single-line and multi-line text input
- Includes features like placeholder, keyboard types, and validation

## List Components

### **FlatList**
- **Use case**: Efficient rendering of large lists
- Only renders visible items (virtualization)
- Built-in pull-to-refresh and infinite scrolling

### **SectionList**
- **Use case**: Lists with section headers
- Groups related items under section titles
- Supports sticky headers

## Interactive Components

### **TouchableOpacity**
- **Use case**: Touchable wrapper that reduces opacity when pressed
- Common for buttons and clickable elements

### **TouchableHighlight**
- **Use case**: Touchable wrapper that highlights when pressed
- Good for list items and menu options

### **Pressable**
- **Use case**: Modern touchable component with more control
- Supports hover, focus, and press states
- Replaces older Touchable components

## Navigation & Layout

### **SafeAreaView**
- **Use case**: Ensures content renders within safe area boundaries
- Prevents content from being hidden by notches or status bars

### **Modal**
- **Use case**: Present content above the current screen
- Good for dialogs, overlays, and temporary content

### **ActivityIndicator**
- **Use case**: Loading spinner
- Shows progress or loading state

## Platform-Specific Components

### **Switch** *(iOS/Android)*
- **Use case**: Toggle between two states
- Platform-specific styling

### **Picker** *(Deprecated)*
- **Use case**: Select from a list of options
- Dropdown-style selection
- **Note**: Use community packages like `@react-native-picker/picker`

