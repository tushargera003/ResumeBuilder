// ResumeForm.jsx
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiFileText,
  FiEdit2,
  FiUpload,
  FiArrowUp,
  FiEdit,
  FiHome,
  FiBookOpen,
  FiUserCheck,
  FiMapPin,
  FiCalendar,
  FiBookmark,
  FiPercent,
  FiBarChart2,
  FiFolder,
  FiLink,
  FiHeart,
  FiUsers,
  FiTool,
  FiEye,
  FiTrash2,
  FiStar,
  FiBriefcase,
  FiBook,
  FiAward,
  FiGlobe,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiUser,
  FiSliders,
  FiDownload,
  FiCode,
} from "react-icons/fi";
import resumeData from "./resumeData.js";
import Section from "./components/Section";
import InputField from "./components/InputField";
import DynamicSection from "./components/DynamicSection";
import StyleCard from "./components/StyleCard";
import SectionPreview from "./components/SectionPreview";
import ResumePreview from "./ResumePreview";
import STYLE_PREVIEWS from "./STYLE_PREVIEWS.js";

function ResumeForm() {
  const [formData, setFormData] = useState(resumeData);
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.documentElement.setAttribute("data-theme", newTheme);
  // };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPreviewOpen(true);
    setShowPreview(true);
  };
  const captureGradientBackground = (element, gradientFrom, gradientTo) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the element
    canvas.width = element.scrollWidth;
    canvas.height = element.scrollHeight;

    // Create gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, gradientFrom);
    gradient.addColorStop(1, gradientTo);

    // Fill canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  };
  const hexToRgb = (hex) => {
    // Remove the hash if present
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };
  const handleDownloadResume = async () => {
    const element = document.getElementById("reviewResumeComponent");
    if (!element) return;

    try {
      setLoading(true); // Start loading

      // Add PDF preview class for fixed dimensions
      element.classList.add("pdf-preview");

      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait a bit for rendering

      // Get background details from style (if needed)
      const style = STYLE_PREVIEWS[selectedStyle];
      const bgColor = style.bgColor || "#ffffff";
      const gradientFrom = style.gradientFrom;
      const gradientTo = style.gradientTo;

      // Capture gradient background if exists
      let gradientBackground = null;
      if (gradientFrom && gradientTo) {
        gradientBackground = captureGradientBackground(
          element,
          gradientFrom,
          gradientTo
        );
      }

      if (!gradientFrom && !gradientTo) {
        element.style.backgroundColor = bgColor;
      }

      // Capture the element with html2canvas (using moderate scale for quality)
      const canvas = await html2canvas(element, {
        scale: 2, // moderate resolution, adjust if needed
        backgroundColor: null,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Remove PDF preview class and reset background color
      element.classList.remove("pdf-preview");
      element.style.backgroundColor = "";

      // Convert canvas to JPEG (with quality factor 0.8)
      const imgData = canvas.toDataURL("image/jpeg", 0.8);

      // Create PDF with compression enabled
      const pdf = new jsPDF("p", "mm", "a4", { compress: true });
      const pageWidth = pdf.internal.pageSize.getWidth(); // ~210 mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // ~297 mm

      // Fill PDF background
      if (gradientBackground) {
        pdf.addImage(gradientBackground, "JPEG", 0, 0, pageWidth, pageHeight);
      } else {
        const [r, g, b] = hexToRgb(bgColor);
        pdf.setFillColor(r, g, b);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
      }

      // Calculate image dimensions to fit one page
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      const mmWidth = imgWidthPx * 0.264583;
      const mmHeight = imgHeightPx * 0.264583;
      const scaleFactor = Math.min(pageWidth / mmWidth, pageHeight / mmHeight);
      const pdfImgWidth = mmWidth * scaleFactor;
      const pdfImgHeight = mmHeight * scaleFactor;

      // Center the image on the PDF page
      const marginX = (pageWidth - pdfImgWidth) / 2;
      const marginY = (pageHeight - pdfImgHeight) / 2;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfImgWidth,
        pdfImgHeight,
        "",
        "FAST"
      );
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("Download PDF error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };
  const buttonVariants = {
    initial: { opacity: 1, scale: 1, x: 0, y: 0 },
    floating: {
      opacity: 1,
      scale: 0.9,
      x: -100,
      y: 20,
      transition: { duration: 0.5 },
    },
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          personalInformation: {
            ...prev.personalInformation,
            photo: reader.result,
          },
        }));
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Preview section variants for slide-down animation
  const previewVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true); // Show button if scrolled past 300px
      } else {
        setShowScrollToTop(false); // Hide button if near the top
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-500 p-6">
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FiFileText className="inline-block mr-3 text-blue-500" />
              Resume Builder
            </motion.h1>

            <motion.h2
              className="text-2xl font-medium text-gray-600 relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Made with ❤️ by ~
              <a
                href="https://www.linkedin.com/in/tushar-gera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1 relative"
              >
                TUSHAR GERA
                {/* Tooltip (Shifted Down) */}
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-2 transition-opacity duration-300 shadow-lg">
                  Connect with me on LinkedIn!
                </span>
              </a>
            </motion.h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Section
                title="Personal Information"
                icon={<FiUser className="text-2xl text-blue-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData.personalInformation).map(
                    ([key, value]) =>
                      key === "photo" ? null : (
                        <InputField
                          key={key}
                          label={key}
                          value={value}
                          onChange={(v) =>
                            setFormData((prev) => ({
                              ...prev,
                              personalInformation: {
                                ...prev.personalInformation,
                                [key]: v,
                              },
                            }))
                          }
                          className="input input-bordered w-full bg-gray-50 focus:bg-white"
                          icon={<FiEdit className="text-gray-400" />}
                        />
                      )
                  )}
                  {/* Image Upload Field */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="photo-upload"
                        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add(
                            "border-blue-500",
                            "bg-blue-50"
                          );
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove(
                            "border-blue-500",
                            "bg-blue-50"
                          );
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file)
                            handleImageUpload({ target: { files: [file] } });
                          e.currentTarget.classList.remove(
                            "border-blue-500",
                            "bg-blue-50"
                          );
                        }}
                      >
                        {photo ? (
                          <div className="relative">
                            <img
                              src={photo}
                              alt="Profile Preview"
                              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                            />
                            {/* Overlay with icons */}
                            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                              {/* Edit Button */}
                              <label
                                htmlFor="photo-upload"
                                className="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-200"
                              >
                                <FiEdit2 className="w-5 h-5 text-gray-700" />
                              </label>
                              {/* Remove Button */}
                              <button
                                type="button"
                                onClick={() => setPhoto(null)}
                                className="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-red-200"
                              >
                                <FiTrash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <FiUpload className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              SVG, PNG, JPG (max. 800x800px)
                            </p>
                          </>
                        )}
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </Section>
            </motion.div>

            {/* Summary */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Section
                title="Summary"
                icon={<FiBookOpen className="text-2xl text-blue-500" />}
              >
                <textarea
                  className="textarea textarea-bordered w-full h-40 bg-gray-50 focus:bg-white"
                  value={formData.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  placeholder="Write a brief summary about yourself..."
                ></textarea>
              </Section>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Work Experience"
                icon={<FiBriefcase className="text-2xl text-blue-500" />}
                data={formData.workExperience}
                fields={[
                  { key: "company", label: "Company", icon: <FiHome /> },
                  { key: "position", label: "Position", icon: <FiUserCheck /> },
                  { key: "location", label: "Location", icon: <FiMapPin /> },
                  {
                    key: "startDate",
                    label: "Start Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "endDate",
                    label: "End Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    workExperience: [
                      ...prev.workExperience,
                      {
                        company: "",
                        position: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        responsibilities: [],
                        achievements: [],
                      },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    workExperience: prev.workExperience.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    workExperience: prev.workExperience.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Education */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Education"
                icon={<FiBook className="text-2xl text-blue-500" />}
                data={formData.education}
                fields={[
                  {
                    key: "institution",
                    label: "Institution",
                    icon: <FiBookOpen />,
                  },
                  { key: "degree", label: "Degree", icon: <FiAward /> },
                  {
                    key: "fieldOfStudy",
                    label: "Field Of Study",
                    icon: <FiBookmark />,
                  },
                  {
                    key: "startDate",
                    label: "Start Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "endDate",
                    label: "End Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "gpa",
                    label: "GPA",
                    type: "number",
                    icon: <FiPercent />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    education: [
                      ...prev.education,
                      {
                        institution: "",
                        degree: "",
                        fieldOfStudy: "",
                        startDate: "",
                        endDate: "",
                        gpa: "",
                      },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    education: prev.education.filter((_, i) => i !== index),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    education: prev.education.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Certifications */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Certifications"
                icon={<FiAward className="text-2xl text-blue-500" />}
                data={formData.certifications}
                fields={[
                  {
                    key: "name",
                    label: "Certification Name",
                    icon: <FiFileText />,
                  },
                  { key: "issuer", label: "Issuer", icon: <FiUserCheck /> },
                  {
                    key: "issueDate",
                    label: "Issue Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "expirationDate",
                    label: "Expiration Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "description",
                    label: "Description",
                    icon: <FiEdit />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    certifications: [
                      ...prev.certifications,
                      {
                        name: "",
                        issuer: "",
                        issueDate: "",
                        expirationDate: "",
                        description: "",
                      },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    certifications: prev.certifications.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    certifications: prev.certifications.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Languages */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Languages"
                icon={<FiGlobe className="text-2xl text-blue-500" />}
                data={formData.languages}
                fields={[
                  { key: "language", label: "Language", icon: <FiGlobe /> },
                  {
                    key: "proficiency",
                    label: "Proficiency",
                    icon: <FiBarChart2 />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    languages: [
                      ...prev.languages,
                      { language: "", proficiency: "" },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    languages: prev.languages.filter((_, i) => i !== index),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    languages: prev.languages.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Projects */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Projects"
                icon={<FiCode className="text-2xl text-blue-500" />}
                data={formData.projects}
                fields={[
                  { key: "title", label: "Project Title", icon: <FiFolder /> },
                  {
                    key: "description",
                    label: "Description",
                    icon: <FiEdit />,
                  },
                  { key: "link", label: "Link", icon: <FiLink /> },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    projects: [
                      ...prev.projects,
                      { title: "", description: "", link: "" },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    projects: prev.projects.filter((_, i) => i !== index),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Awards */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Awards"
                icon={<FiStar className="text-2xl text-blue-500" />}
                data={formData.awards}
                fields={[
                  { key: "title", label: "Award Title", icon: <FiAward /> },
                  { key: "issuer", label: "Issuer", icon: <FiUserCheck /> },
                  {
                    key: "date",
                    label: "Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "description",
                    label: "Description",
                    icon: <FiEdit />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    awards: [
                      ...prev.awards,
                      { title: "", issuer: "", date: "", description: "" },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    awards: prev.awards.filter((_, i) => i !== index),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    awards: prev.awards.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Volunteer Experience */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="Volunteer Experience"
                icon={<FiHeart className="text-2xl text-blue-500" />}
                data={formData.volunteerExperience}
                fields={[
                  {
                    key: "organization",
                    label: "Organization",
                    icon: <FiHome />,
                  },
                  { key: "role", label: "Role", icon: <FiUserCheck /> },
                  {
                    key: "startDate",
                    label: "Start Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "endDate",
                    label: "End Date",
                    type: "date",
                    icon: <FiCalendar />,
                  },
                  {
                    key: "description",
                    label: "Description",
                    icon: <FiEdit />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    volunteerExperience: [
                      ...prev.volunteerExperience,
                      {
                        organization: "",
                        role: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    volunteerExperience: prev.volunteerExperience.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    volunteerExperience: prev.volunteerExperience.map(
                      (item, i) =>
                        i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* References */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <DynamicSection
                title="References"
                icon={<FiMail className="text-2xl text-blue-500" />}
                data={formData.references}
                fields={[
                  { key: "name", label: "Name", icon: <FiUser /> },
                  {
                    key: "relationship",
                    label: "Relationship",
                    icon: <FiUsers />,
                  },
                  {
                    key: "contactInfo",
                    label: "Contact Info",
                    icon: <FiPhone />,
                  },
                ]}
                onAdd={() =>
                  setFormData((prev) => ({
                    ...prev,
                    references: [
                      ...prev.references,
                      { name: "", relationship: "", contactInfo: "" },
                    ],
                  }))
                }
                onRemove={(index) =>
                  setFormData((prev) => ({
                    ...prev,
                    references: prev.references.filter((_, i) => i !== index),
                  }))
                }
                onChange={(index, field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    references: prev.references.map((item, i) =>
                      i === index ? { ...item, [field]: value } : item
                    ),
                  }))
                }
              />
            </motion.div>

            {/* Skills */}
            <motion.div
              className="p-8 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Section
                title="Skills"
                icon={<FiTool className="text-2xl text-blue-500" />}
              >
                <div className="flex flex-wrap gap-3">
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSkills = formData.skills.filter(
                            (_, i) => i !== index
                          );
                          setFormData((prev) => ({
                            ...prev,
                            skills: updatedSkills,
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <InputField
                      label="Add Skill"
                      value={newSkill}
                      onChange={(v) => setNewSkill(v)}
                      className="input input-bordered w-full bg-gray-50 focus:bg-white"
                      icon={<FiPlus className="text-gray-400" />}
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn btn-outline btn-primary mt-6 md:mt-6 shadow-sm hover:shadow-md transition transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiPlus className="mr-2" /> Add Skill
                  </motion.button>
                </div>
              </Section>
            </motion.div>

            {/* Style Selector */}
            <motion.div
              className="p-6 border border-gray-200 rounded-xl bg-white"
              whileHover={{ scale: 1.01 }}
            >
              <Section
                title="Choose Template"
                icon={<FiSliders className="text-xl text-blue-500" />}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(STYLE_PREVIEWS).map(([key, style]) => (
                    <StyleCard
                      key={key}
                      name={key}
                      className={style.class}
                      isSelected={selectedStyle === key}
                      onSelect={() => setSelectedStyle(key)}
                    />
                  ))}
                </div>
              </Section>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {!isPreviewOpen && (
                  <motion.div
                    className="text-center mt-6"
                    initial="initial"
                    animate="initial"
                    exit="floating"
                    variants={buttonVariants}
                  >
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary btn-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                    >
                      <FiEye className="mr-2" /> Preview & Save
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Button */}
              <AnimatePresence>
                {isPreviewOpen && (
                  <motion.div
                    className="fixed left-4 bottom-4 z-50"
                    initial={{ opacity: 0, x: -100, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button className="btn btn-primary btn-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                      <FiEye className="mr-2" /> Open Preview
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Preview Section */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    id="previewSection"
                    className="mt-12 max-w-5xl mx-auto"
                    variants={previewVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Preview content goes here */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </form>

          {/* Preview Section */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12  "
            >
              <div id="reviewResumeComponent">
                <ResumePreview
                  data={formData}
                  styleConfig={STYLE_PREVIEWS[selectedStyle]}
                />
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={handleDownloadResume}
                  disabled={loading} // Disable button while loading
                  className={`relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md transition-all duration-300 ${
                    loading
                      ? "bg-pink-400 cursor-not-allowed" // Disabled state
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FiDownload className="mr-2" /> Download PDF
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
        <AnimatePresence>
          {showScrollToTop && (
            <motion.button
              className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 z-50"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ResumeForm;
