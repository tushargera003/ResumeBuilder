import React from "react";
import SectionPreview from "./components/SectionPreview.jsx";
import {
  FiBriefcase,
  FiBook,
  FiAward,
  FiGlobe,
  FiCode,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiUser,
  FiStar,
} from "react-icons/fi";

const ResumePreview = ({ data, styleConfig }) => {
  const {
    layout,
    showIcons,
    iconColor,
    skillClass,
    bgColor,
    gradientFrom,
    gradientTo,
    class: containerClass,
    personalPlacement,
    dateAlignment,
  } = styleConfig;

  const dateClass =
    dateAlignment === "right"
      ? "text-right"
      : dateAlignment === "center"
      ? "text-center"
      : "text-left";

  // Helper: Map common personal info fields to icons
  const IconMapper = ({ field, style }) => {
    const icons = {
      email: <FiMail style={style} />,
      phone: <FiPhone style={style} />,
      linkedin: <FiLinkedin style={style} />,
      github: <FiGithub style={style} />,
      website: <FiGlobe style={style} />,
      address: <FiMapPin style={style} />,
    };
    return icons[field] || null;
  };

  // Personal info alignment class
  let personalInfoClass = "";
  if (
    personalPlacement === "center-top" ||
    personalPlacement === "top-center"
  ) {
    personalInfoClass = "text-center";
  } else {
    personalInfoClass = "text-left";
  }

  // renderSingleColumn will render all sections except personal info and skills if excludePersonal=true.
  const renderSingleColumn = (excludePersonal = false) => (
    <div className="flex flex-col space-y-6 ">
      {!excludePersonal && (
        <>
          <div className={`p-4 ${personalInfoClass}`}>
            <h2 className="text-2xl font-semibold mb-2 text-left ">
              Personal Info
            </h2>
            <div className="space-y-1">
              {Object.entries(data.personalInformation).map(
                ([key, value]) =>
                  key !== "fullName" &&
                  key !== "photo" &&
                  value &&
                  value.toString().trim() !== "" && (
                    <p key={key} className="flex items-center gap-2 text-sm">
                      {showIcons && (
                        <IconMapper
                          field={key}
                          style={{ color: iconColor || "#000" }}
                        />
                      )}
                      {["email", "linkedin", "github", "website"].includes(
                        key
                      ) ? (
                        <a
                          href={key === "email" ? `mailto:${value}` : value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </p>
                  )
              )}
            </div>
          </div>
          {data.skills && (
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className={`${skillClass} px-3 py-1`}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* The rest of the sections */}
      <div className="p-4">
        {data.summary && data.summary.trim() !== "" && (
          <SectionPreview
            title="Summary"
            icon={<FiUser style={{ color: iconColor || "#000" }} />}
          >
            <p style={{ color: iconColor }}>{data.summary}</p>
          </SectionPreview>
        )}
        {data.workExperience.length > 0 && (
          <SectionPreview
            title="Work Experience"
            icon={<FiBriefcase style={{ color: iconColor }} />}
          >
            {data.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                {exp.position && (
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                )}
                {exp.company && (
                  <p style={{ color: iconColor }}>{exp.company}</p>
                )}
                {(exp.startDate || exp.endDate) && (
                  <p
                    className={`text-sm ${dateClass}`}
                    style={{ color: iconColor }}
                  >
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                )}
                {exp.responsibilities &&
                  exp.responsibilities.filter((r) => r.trim() !== "").length >
                    0 && (
                    <ul className="mt-2 space-y-1 pl-4">
                      {exp.responsibilities
                        .filter((r) => r.trim() !== "")
                        .map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {resp}
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.education && data.education.length > 0 && (
          <SectionPreview
            title="Education"
            icon={<FiBook style={{ color: iconColor }} />}
          >
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <p style={{ color: iconColor }}>{edu.institution}</p>
                {(edu.startDate || edu.endDate) && (
                  <p
                    className={`text-sm ${dateClass}`}
                    style={{ color: iconColor }}
                  >
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                )}
                {edu.gpa && (
                  <p className="text-sm" style={{ color: iconColor }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.certifications && data.certifications.length > 0 && (
          <SectionPreview
            title="Certifications"
            icon={<FiAward style={{ color: iconColor }} />}
          >
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                <p style={{ color: iconColor }}>{cert.issuer}</p>
                {(cert.issueDate || cert.expirationDate) && (
                  <p
                    className={`text-sm ${dateClass}`}
                    style={{ color: iconColor }}
                  >
                    {cert.issueDate} - {cert.expirationDate || "Present"}
                  </p>
                )}
                {cert.description && (
                  <p className="text-sm" style={{ color: iconColor }}>
                    {cert.description}
                  </p>
                )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.languages && data.languages.length > 0 && (
          <SectionPreview
            title="Languages"
            icon={<FiGlobe style={{ color: iconColor }} />}
          >
            {data.languages.map((lang, index) => (
              <div key={index} className="mb-1" style={{ color: iconColor }}>
                {lang.language} ({lang.proficiency})
              </div>
            ))}
          </SectionPreview>
        )}
        {data.projects && data.projects.length > 0 && (
          <SectionPreview
            title="Projects"
            icon={<FiCode style={{ color: iconColor }} />}
          >
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg">{proj.title}</h3>
                {proj.description && (
                  <p style={{ color: iconColor }}>{proj.description}</p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                    style={{ color: iconColor }}
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.awards && data.awards.length > 0 && (
          <SectionPreview
            title="Awards"
            icon={<FiStar style={{ color: iconColor }} />}
          >
            {data.awards.map((award, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg">{award.title}</h3>
                <p style={{ color: iconColor }}>{award.issuer}</p>
                {award.date && (
                  <p
                    className={`text-sm ${dateClass}`}
                    style={{ color: iconColor }}
                  >
                    {award.date}
                  </p>
                )}
                {award.description && (
                  <p className="text-sm" style={{ color: iconColor }}>
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.volunteerExperience && data.volunteerExperience.length > 0 && (
          <SectionPreview
            title="Volunteer Experience"
            icon={<FiBriefcase style={{ color: iconColor }} />}
          >
            {data.volunteerExperience.map((vol, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg">{vol.role}</h3>
                <p style={{ color: iconColor }}>{vol.organization}</p>
                {(vol.startDate || vol.endDate) && (
                  <p
                    className={`text-sm ${dateClass}`}
                    style={{ color: iconColor }}
                  >
                    {vol.startDate} - {vol.endDate || "Present"}
                  </p>
                )}
                {vol.description && (
                  <p className="text-sm" style={{ color: iconColor }}>
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </SectionPreview>
        )}
        {data.references && data.references.length > 0 && (
          <SectionPreview
            title="References"
            icon={<FiMail style={{ color: iconColor }} />}
          >
            {data.references.map((ref, index) => (
              <div key={index} className="mb-1">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-sm" style={{ color: iconColor }}>
                  {ref.relationship}
                </p>
                <a
                  href={`mailto:${ref.contactInfo}`}
                  className="text-sm  hover:underline"
                  style={{ color: iconColor }}
                >
                  {ref.contactInfo}
                </a>
              </div>
            ))}
          </SectionPreview>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="reviewResumeComponent"
      className={`${containerClass} rounded-lg mx-auto`}
      style={{
        maxWidth: "210mm",
        backgroundColor: bgColor || "transparent",
        backgroundImage:
          gradientFrom && gradientTo
            ? `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
            : "none",
      }}
    >
      {/* Header */}
      <div
        className={`border-b pb-4 mb-4 pt-2 pl-2 ${personalInfoClass}`}
        style={{
          textAlign: personalInfoClass.includes("center") ? "center" : "left",
        }}
      >
        {data.personalInformation.photo && (
          <img
            src={data.personalInformation.photo}
            alt={data.personalInformation.fullName}
            className={`w-24 h-24 mb-2 object-cover border-2 border-gray-300 ${
              styleConfig.imageStyle
            } ${
              personalInfoClass.includes("text-center")
                ? "mx-auto"
                : "ml-0 mr-auto"
            }`}
          />
        )}
        {data.personalInformation.fullName.trim() !== "" && (
          <h1 className="text-4xl font-bold ml-3 pt-2">
            {data.personalInformation.fullName}
          </h1>
        )}
        <p className="text-sm ml-3">
          {data.personalInformation.email} | {data.personalInformation.phone}
        </p>
      </div>

      {/* Layout selection based on personalPlacement */}
      {personalPlacement === "sidebar-left" ? (
        // Two-column layout: Left sidebar renders personal info & skills; main content renders the rest.
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4 border-r md:border-r-2 border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Personal Information
              </h2>
              <div className="space-y-1 text-left">
                {Object.entries(data.personalInformation).map(
                  ([key, value]) =>
                    key !== "fullName" &&
                    key !== "photo" &&
                    value &&
                    value.toString().trim() !== "" && (
                      <p key={key} className="flex items-center gap-2 text-sm">
                        {showIcons && (
                          <IconMapper
                            field={key}
                            style={{ color: iconColor || "#000" }}
                          />
                        )}
                        {["email", "linkedin", "github", "website"].includes(
                          key
                        ) ? (
                          <a
                            href={key === "email" ? `mailto:${value}` : value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </p>
                    )
                )}
              </div>
            </div>
            {data.skills && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className={`${skillClass} px-3 py-1`}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-4">{renderSingleColumn(true)}</div>
        </div>
      ) : (
        // Single-column layout for other personalPlacement values
        renderSingleColumn()
      )}
    </div>
  );
};

export default ResumePreview;
