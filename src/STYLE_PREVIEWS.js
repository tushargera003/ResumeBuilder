// const STYLE_PREVIEWS = {
//   modern: {
//     class: "bg-white p-8 rounded-lg shadow-lg",
//     bgColor: "#ffffff", // bg-white
//     layout: "grid grid-cols-1 md:grid-cols-3 gap-8",
//     iconColor: "#2563eb", // blue-600
//     skillClass: "bg-blue-100 text-blue-700 rounded-md",
//     showIcons: true,
//   },
//   midnight: {
//     class: "bg-gray-900 p-8 text-gray-100",
//     bgColor: "#111827", // bg-gray-900 (Tailwind v2)
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
//     iconColor: "#818cf8", // indigo-400
//     skillClass:
//       "bg-indigo-900 text-indigo-300 rounded-lg border border-indigo-700",
//     showIcons: true,
//   },
//   cyberpunk: {
//     class: "bg-black p-8 neon-border text-[#ff00ff]",
//     bgColor: "#000000", // bg-black
//     layout: "space-y-6",
//     iconColor: "#ff00ff", // neon pink
//     skillClass:
//       "bg-pink-900 text-pink-300 rounded-full border-2 border-green-400",
//     showIcons: true,
//   },
//   forest: {
//     class: "bg-emerald-900 p-8 text-emerald-50",
//     bgColor: "#064e3b", // approximate for bg-emerald-900
//     layout: "grid grid-cols-1 md:grid-cols-3 gap-4",
//     iconColor: "#10b981", // emerald-500
//     skillClass:
//       "bg-emerald-800 text-emerald-200 rounded-md border border-emerald-600",
//     showIcons: true,
//   },
//   halloween: {
//     class: "bg-purple-900 p-8 text-orange-400",
//     bgColor: "#581c87", // approximate for bg-purple-900
//     layout: "space-y-6",
//     iconColor: "#f59e0b", // orange-400
//     skillClass:
//       "bg-purple-800 text-orange-300 rounded-lg border border-orange-500",
//     showIcons: true,
//   },
//   luxury: {
//     class: "bg-black p-8 text-amber-400 border-2 border-amber-600",
//     bgColor: "#000000", // bg-black
//     layout: "grid grid-cols-2 gap-8",
//     iconColor: "#d4af37", // gold
//     skillClass:
//       "bg-amber-900 text-amber-200 rounded-md border border-amber-700",
//     showIcons: true,
//   },
//   dracula: {
//     class: "bg-gray-800 p-8 text-pink-300",
//     bgColor: "#1f2937", // bg-gray-800
//     layout: "space-y-6",
//     iconColor: "#ff79c6", // dracula pink
//     skillClass:
//       "bg-gray-700 text-pink-200 rounded-full border border-pink-500",
//     showIcons: true,
//   },
//   coffee: {
//     class: "bg-brown-900 p-8 text-[#6f4e37]",
//     bgColor: "#2d1b1b", // estimated for bg-brown-900
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-4",
//     iconColor: "#6f4e37", // coffee brown
//     skillClass:
//       "bg-brown-800 text-[#6f4e37] rounded-md border border-amber-700",
//     showIcons: true,
//   },
//   synthwave: {
//     class: "bg-violet-900 p-8 text-pink-300",
//     bgColor: "#4c1d95", // bg-violet-900 (Tailwind v2 default)
//     layout: "space-y-6",
//     iconColor: "#e879f9", // pink-400
//     skillClass:
//       "bg-pink-900 text-pink-200 rounded-lg border-2 border-cyan-400",
//     showIcons: true,
//   },
//   valentine: {
//     class: "bg-pink-900 p-8 text-red-100",
//     bgColor: "#831843", // bg-pink-900 (approx.)
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
//     iconColor: "#fda4af", // rose-300
//     skillClass:
//       "bg-pink-800 text-pink-100 rounded-full border border-red-300",
//     showIcons: true,
//   },
//   aqua: {
//     class: "bg-slate-900 p-8 text-cyan-300",
//     bgColor: "#0f172a", // bg-slate-900
//     layout: "space-y-6",
//     iconColor: "#22d3ee", // cyan-400
//     skillClass:
//       "bg-cyan-900 text-cyan-100 rounded-md border border-cyan-500",
//     showIcons: true,
//   },
//   traditional: {
//     class: "bg-stone-50 p-8 border-l-4 border-blue-800",
//     bgColor: "#fafaf9", // bg-stone-50 (approx.)
//     layout: "space-y-6",
//     iconColor: "#57534e", // stone-600
//     skillClass: "bg-gray-200 text-gray-800 rounded-none",
//     showIcons: false,
//   },
//   elegant: {
//     class: "bg-white p-8 border-t-8 border-blue-800 font-serif italic",
//     bgColor: "#ffffff", // bg-white
//     layout: "space-y-8",
//     iconColor: "#1e40af", // blue-800
//     skillClass: "bg-purple-100 text-purple-900 rounded-lg shadow",
//     showIcons: true,
//   },
//   google: {
//     class: "bg-white p-8 rounded-lg shadow-sm",
//     bgColor: "#ffffff", // bg-white
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
//     iconColor: "#34a853", // Google green
//     skillClass: "bg-green-100 text-green-800 rounded-full",
//     showIcons: true,
//   },
//   minimal: {
//     class: "bg-white p-8 border border-gray-300",
//     bgColor: "#ffffff", // bg-white
//     layout: "space-y-4",
//     iconColor: "#6b7280", // gray-500
//     skillClass: "bg-white border border-gray-400 text-gray-600",
//     showIcons: false,
//   },
//   professional: {
//     class: "bg-white p-8 rounded-lg shadow-md",
//     bgColor: "#ffffff", // bg-white
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
//     iconColor: "#3b82f6", // blue-500
//     skillClass: "bg-blue-50 text-blue-600 rounded-md",
//     showIcons: true,
//   },
//   sleek: {
//     class:
//       "bg-[#2A2787] p-8 rounded-lg text-white",
//     bgColor: "#2A2787", // approximate from-purple-500
//     layout: "space-y-6",
//     iconColor: "#ffffff", // white
//     skillClass:
//       "bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg",
//     showIcons: true,
//   },
//   creative: {
//     class:
//       "bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg text-white",
//     // For gradients, choose a representative color (using the from-color)
//     gradientFrom: "#8b5cf6",
//     gradientTo: "#ec4899",
//     bgColor: null, // approximate from-purple-500
//     layout: "space-y-6",
//     iconColor: "#ffffff", // white
//     skillClass:
//       "bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg",
//     showIcons: true,
//   },
//   tech: {
//     class: "bg-gray-900 p-8 rounded-lg text-white",
//     bgColor: "#111827", // bg-gray-900
//     layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
//     iconColor: "#60a5fa", // blue-400
//     skillClass: "bg-gray-800 text-blue-300 rounded-md",
//     showIcons: true,
//   },
//   corporate: {
//     class: "bg-white p-8 border-t-8 border-indigo-600",
//     bgColor: "#ffffff", // bg-white
//     layout: "space-y-6",
//     iconColor: "#4f46e5", // indigo-600
//     skillClass: "bg-indigo-50 text-indigo-600 rounded",
//     showIcons: true,
//   },
//   startup: {
//     class: "bg-[#BDB0B0] p-8 rounded-lg shadow-lg",
//     bgColor: "#BDB0B0", // using the explicit hex value
//     layout: "grid grid-cols-1 gap-6",
//     iconColor: "#5AA0A2",
//     skillClass: "bg-[#D3D9A7] text-yellow-800 rounded-full",
//     showIcons: true,
//   },
// };

// export default STYLE_PREVIEWS;





// stylePreviews.js
// stylePreviews.js
// stylePreviews.js
// stylePreviews.js
const STYLE_PREVIEWS = {
  modern: {
    class: "bg-white p-8 rounded-lg shadow-lg",
    bgColor: "#ffffff",
    layout: "grid grid-cols-1 md:grid-cols-3 gap-8",
    iconColor: "#2563eb",
    skillClass: "bg-blue-100 text-blue-700 rounded-md px-2 py-1",
    showIcons: true,
    personalPlacement: "sidebar-left",
    dateAlignment: "left",
    dateDisplay: "block",
    imageStyle: "rounded-full border-4 border-white shadow-lg", // Rounded with border
    blendMode: "normal", // No blending
    removeBackground: true, // No background removal
  },
  leftAligned: {
    class: "bg-gray-100 p-8 rounded-md shadow-sm",
    bgColor: "#f3f4f6",
    layout: "flex flex-col items-start space-y-4",
    iconColor: "#374151",
    skillClass: "bg-gray-200 text-gray-800 rounded-sm px-2 py-1",
    showIcons: true,
    personalPlacement: "top-left",
    dateAlignment: "left",
    dateDisplay: "block",
    imageStyle: "rounded-lg border-2 border-gray-300", // Slightly rounded
    blendMode: "multiply", // Blend with background
    removeBackground: true,
  },
  centeredHeader: {
    class: "bg-white p-10 rounded-xl shadow-xl",
    bgColor: "#ffffff",
    layout: "flex flex-col items-center space-y-6",
    iconColor: "#1f2937",
    skillClass: "bg-blue-50 text-blue-700 rounded-lg px-3 py-1",
    showIcons: true,
    personalPlacement: "center-top",
    dateAlignment: "center",
    dateDisplay: "block",
    imageStyle: "rounded-full border-4 border-blue-500 shadow-xl", // Rounded with blue border
    blendMode: "normal",
    removeBackground: true,
  },
  iconSide: {
    class: "bg-indigo-50 p-8 rounded-lg shadow-md",
    bgColor: "#eef2ff",
    layout: "flex flex-col space-y-4",
    iconColor: "#4f46e5",
    skillClass: "bg-indigo-100 text-indigo-700 rounded-md px-2 py-1",
    showIcons: true,
    personalPlacement: "top-left",
    dateAlignment: "left",
    dateDisplay: "block",
    imageStyle: "rounded-[20%] border-2 border-indigo-300", // Custom rounded corners
    blendMode: "overlay", // Blend with background
    removeBackground: true,
  },
  datesRight: {
    class: "bg-white p-8 rounded-lg border border-gray-300",
    bgColor: "#ffffff",
    layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
    iconColor: "#10b981",
    skillClass: "bg-green-100 text-green-800 rounded-md px-2 py-1",
    showIcons: true,
    personalPlacement: "sidebar-left",
    dateAlignment: "right",
    dateDisplay: "block",
    imageStyle: "rounded-lg border-2 border-green-300", // Slightly rounded with green border
    blendMode: "normal",
    removeBackground: true,
  },
  minimal: {
    class: "bg-white p-6 border border-gray-300",
    bgColor: "#ffffff",
    layout: "flex flex-col space-y-3",
    iconColor: "#6b7280",
    skillClass: "bg-gray-100 text-gray-600 border border-gray-400 rounded-sm px-2 py-1",
    showIcons: false,
    personalPlacement: "top-left",
    dateAlignment: "left",
    dateDisplay: "block",
    imageStyle: "rounded-none border-2 border-gray-400", // Square image
    blendMode: "normal",
    removeBackground: true,
  },
  elegant: {
    class: "bg-white p-10 border-t-8 border-blue-900 font-serif italic",
    bgColor: "#ffffff",
    layout: "flex flex-col space-y-6",
    iconColor: "#1e3a8a",
    skillClass: "bg-purple-100 text-purple-900 rounded-lg shadow px-3 py-1",
    showIcons: true,
    personalPlacement: "center-top",
    dateAlignment: "center",
    dateDisplay: "inline",
    imageStyle: "rounded-full border-4 border-purple-500 shadow-lg", // Rounded with purple border
    blendMode: "normal",
    removeBackground: true,
  },
  creative: {
    class: "p-10 rounded-2xl shadow-xl",
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
    bgColor: null,
    layout: "flex flex-col items-center space-y-8",
    iconColor: "#ffffff",
    skillClass: "bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full px-3 py-1",
    showIcons: true,
    personalPlacement: "center-top",
    dateAlignment: "right",
    dateDisplay: "inline",
    imageStyle: "rounded-[20%] border-2 border-pink-300", // Custom rounded corners
    blendMode: "soft-light", // Blend with gradient background
    removeBackground: true,
  },
  professional: {
    class: "bg-white p-8 rounded-lg shadow-md",
    bgColor: "#ffffff",
    layout: "grid grid-cols-1 md:grid-cols-2 gap-8",
    iconColor: "#3b82f6",
    skillClass: "bg-blue-50 text-blue-600 rounded-md px-3 py-1",
    showIcons: true,
    personalPlacement: "sidebar-left",
    dateAlignment: "right",
    dateDisplay: "inline",
    imageStyle: "rounded-lg border-2 border-blue-300", // Slightly rounded with blue border
    blendMode: "normal",
    removeBackground: true,
  },
  alternative: {
    class: "bg-gray-50 p-8 rounded-lg shadow-sm",
    bgColor: "#f9fafb",
    layout: "flex flex-col space-y-6",
    iconColor: "#ef4444",
    skillClass: "bg-red-100 text-red-700 rounded-md px-2 py-1",
    showIcons: true,
    personalPlacement: "top-center",
    dateAlignment: "left",
    dateDisplay: "block",
    imageStyle: "rounded-full border-4 border-red-300 shadow-lg", // Rounded with red border
    blendMode: "normal",
    removeBackground: true,
  },
  futuristic: {
    class: "bg-gray-900 p-10 rounded-2xl text-white shadow-2xl",
    gradientFrom: "#0f172a",
    gradientTo: "#1e293b",
    bgColor: null,
    layout: "flex flex-col items-center space-y-4",
    iconColor: "#0ea5e9",
    skillClass: "bg-sky-100 text-sky-700 rounded-lg px-3 py-1",
    showIcons: true,
    personalPlacement: "center-top",
    dateAlignment: "right",
    dateDisplay: "inline",
    imageStyle: "rounded-none border-2 border-sky-500", // Square image with sky border
    blendMode: "overlay", // Blend with dark background
    removeBackground: true,
  },
  classic: {
    class: "bg-beige-50 p-8 rounded-lg shadow",
    bgColor: "#faf3e0",
    layout: "flex flex-col space-y-4",
    iconColor: "#5d4037",
    skillClass: "bg-beige-100 text-beige-900 rounded-sm px-2 py-1",
    showIcons: true,
    personalPlacement: "top-left",
    dateAlignment: "inline",
    dateDisplay: "inline",
    imageStyle: "rounded-full border-4 border-beige-500 shadow-lg", // Rounded with beige border
    blendMode: "normal",
    removeBackground: true,
  },
  vintage: {
    class: "bg-gray-200 p-8 rounded-md shadow-md",
    bgColor: "#e0e0e0",
    layout: "flex flex-col space-y-5",
    iconColor: "#6d4c41",
    skillClass: "bg-brown-100 text-brown-800 rounded-md px-2 py-1",
    showIcons: true,
    personalPlacement: "top-center",
    dateAlignment: "inline",
    dateDisplay: "inline",
    imageStyle: "rounded-lg border-2 border-brown-300", // Slightly rounded with brown border
    blendMode: "multiply", // Blend with vintage background
    removeBackground: true,
  },
  bold: {
    class: "bg-yellow-100 p-8 rounded-xl shadow-lg",
    bgColor: "#fef9c3",
    layout: "grid grid-cols-1 gap-6",
    iconColor: "#d97706",
    skillClass: "bg-yellow-200 text-yellow-800 rounded-full px-3 py-1",
    showIcons: true,
    personalPlacement: "top-left",
    dateAlignment: "inline",
    dateDisplay: "inline",
    imageStyle: "rounded-full border-4 border-yellow-500 shadow-xl", // Rounded with yellow border
    blendMode: "normal",
    removeBackground: true,
  },
  darkExecutive: {
    class: "bg-gray-900 text-gray-100 p-10 rounded-xl shadow-2xl",
    bgColor: "#111827",
    layout: "grid grid-cols-1 md:grid-cols-4 gap-8",
    iconColor: "#818cf8",
    skillClass: "bg-gray-800 text-indigo-300 rounded-md px-3 py-1",
    showIcons: true,
    personalPlacement: "sidebar-right",
    dateAlignment: "right",
    dateDisplay: "block",
    accentBorder: "border-l-4 border-indigo-500",
    imageStyle: "rounded-lg border-2 border-indigo-500", // Slightly rounded with indigo border
    blendMode: "overlay", // Blend with dark background
    removeBackground: true,
  },
};

export default STYLE_PREVIEWS;


