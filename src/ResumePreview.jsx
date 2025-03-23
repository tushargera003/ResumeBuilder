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
    <div className="flex flex-col">
      {!excludePersonal && (
        <>
          <div className={`p-4 ${personalInfoClass}`}>
            <h2 className="text-2xl font-semibold mb-4 text-left">
              Personal Info
            </h2>
            <div className="space-y-2">
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
          {data.skills && data.skills.length > 0 && (
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
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
      <div className="p-4 space-y-6">
        {data.summary && data.summary.trim() !== "" && (
          <SectionPreview
            title="Summary"
            icon={<FiUser style={{ color: iconColor || "#000" }} />}
          >
            <p
              style={{ color: iconColor }}
              className="whitespace-normal max-w-full"
            >
              {data.summary}
            </p>
          </SectionPreview>
        )}

        {data.workExperience &&
          data.workExperience.filter(
            (exp) =>
              (exp.position && exp.position.trim() !== "") ||
              (exp.company && exp.company.trim() !== "") ||
              (exp.startDate && exp.startDate.trim() !== "") ||
              (exp.endDate && exp.endDate.trim() !== "") ||
              (exp.responsibilities &&
                exp.responsibilities.some((r) => r.trim() !== ""))
          ).length > 0 && (
            <SectionPreview
              title="Work Experience"
              icon={<FiBriefcase style={{ color: iconColor }} />}
            >
              {data.workExperience
                .filter(
                  (exp) =>
                    (exp.position && exp.position.trim() !== "") ||
                    (exp.company && exp.company.trim() !== "") ||
                    (exp.startDate && exp.startDate.trim() !== "") ||
                    (exp.endDate && exp.endDate.trim() !== "") ||
                    (exp.responsibilities &&
                      exp.responsibilities.some((r) => r.trim() !== ""))
                )
                .map((exp, index) => (
                  <div key={index} className="mb-6">
                    {exp.position && exp.position.trim() !== "" && (
                      <h3 className="font-semibold text-lg mb-1">
                        {exp.position}
                      </h3>
                    )}
                    {exp.company && exp.company.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {exp.company}
                      </p>
                    )}
                    {(exp.startDate || exp.endDate) &&
                      ((exp.startDate && exp.startDate.trim() !== "") ||
                        (exp.endDate && exp.endDate.trim() !== "")) && (
                        <p
                          className={`text-sm ${dateClass} mb-2`}
                          style={{ color: iconColor }}
                        >
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                      )}
                    {exp.responsibilities &&
                      exp.responsibilities.filter((r) => r.trim() !== "")
                        .length > 0 && (
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

        {data.education &&
          data.education.filter(
            (edu) =>
              (edu.degree && edu.degree.trim() !== "") ||
              (edu.fieldOfStudy && edu.fieldOfStudy.trim() !== "") ||
              (edu.institution && edu.institution.trim() !== "") ||
              (edu.startDate && edu.startDate.trim() !== "") ||
              (edu.endDate && edu.endDate.trim() !== "") ||
              (edu.gpa && edu.gpa.toString().trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Education"
              icon={<FiBook style={{ color: iconColor }} />}
            >
              {data.education
                .filter(
                  (edu) =>
                    (edu.degree && edu.degree.trim() !== "") ||
                    (edu.fieldOfStudy && edu.fieldOfStudy.trim() !== "") ||
                    (edu.institution && edu.institution.trim() !== "") ||
                    (edu.startDate && edu.startDate.trim() !== "") ||
                    (edu.endDate && edu.endDate.trim() !== "") ||
                    (edu.gpa && edu.gpa.toString().trim() !== "")
                )
                .map((edu, index) => (
                  <div key={index} className="mb-6">
                    {(edu.degree || edu.fieldOfStudy) &&
                      edu.degree.trim() !== "" &&
                      edu.fieldOfStudy.trim() !== "" && (
                        <h3 className="font-semibold text-lg mb-1">
                          {edu.degree} in {edu.fieldOfStudy}
                        </h3>
                      )}
                    {edu.institution && edu.institution.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) &&
                      ((edu.startDate && edu.startDate.trim() !== "") ||
                        (edu.endDate && edu.endDate.trim() !== "")) && (
                        <p
                          className={`text-sm ${dateClass} mb-2`}
                          style={{ color: iconColor }}
                        >
                          {edu.startDate} - {edu.endDate || "Present"}
                        </p>
                      )}
                    {edu.gpa && edu.gpa.toString().trim() !== "" && (
                      <p className="text-sm" style={{ color: iconColor }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
            </SectionPreview>
          )}

        {data.certifications &&
          data.certifications.filter(
            (cert) =>
              (cert.name && cert.name.trim() !== "") ||
              (cert.issuer && cert.issuer.trim() !== "") ||
              (cert.issueDate && cert.issueDate.trim() !== "") ||
              (cert.expirationDate && cert.expirationDate.trim() !== "") ||
              (cert.description && cert.description.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Certifications"
              icon={<FiAward style={{ color: iconColor }} />}
            >
              {data.certifications
                .filter(
                  (cert) =>
                    (cert.name && cert.name.trim() !== "") ||
                    (cert.issuer && cert.issuer.trim() !== "") ||
                    (cert.issueDate && cert.issueDate.trim() !== "") ||
                    (cert.expirationDate &&
                      cert.expirationDate.trim() !== "") ||
                    (cert.description && cert.description.trim() !== "")
                )
                .map((cert, index) => (
                  <div key={index} className="mb-6">
                    {cert.name && cert.name.trim() !== "" && (
                      <h3 className="font-semibold text-lg mb-1">
                        {cert.name}
                      </h3>
                    )}
                    {cert.issuer && cert.issuer.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {cert.issuer}
                      </p>
                    )}
                    {(cert.issueDate || cert.expirationDate) &&
                      ((cert.issueDate && cert.issueDate.trim() !== "") ||
                        (cert.expirationDate &&
                          cert.expirationDate.trim() !== "")) && (
                        <p
                          className={`text-sm ${dateClass} mb-2`}
                          style={{ color: iconColor }}
                        >
                          {cert.issueDate} - {cert.expirationDate || "Present"}
                        </p>
                      )}
                    {cert.description && cert.description.trim() !== "" && (
                      <p className="text-sm" style={{ color: iconColor }}>
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
            </SectionPreview>
          )}

        {data.languages &&
          data.languages.filter(
            (lang) =>
              (lang.language && lang.language.trim() !== "") ||
              (lang.proficiency && lang.proficiency.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Languages"
              icon={<FiGlobe style={{ color: iconColor }} />}
            >
              {data.languages
                .filter(
                  (lang) =>
                    (lang.language && lang.language.trim() !== "") ||
                    (lang.proficiency && lang.proficiency.trim() !== "")
                )
                .map((lang, index) => (
                  <div
                    key={index}
                    className="mb-2"
                    style={{ color: iconColor }}
                  >
                    {lang.language} ({lang.proficiency})
                  </div>
                ))}
            </SectionPreview>
          )}

        {data.projects &&
          data.projects.filter(
            (proj) =>
              (proj.title && proj.title.trim() !== "") ||
              (proj.description && proj.description.trim() !== "") ||
              (proj.link && proj.link.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Projects"
              icon={<FiCode style={{ color: iconColor }} />}
            >
              {data.projects
                .filter(
                  (proj) =>
                    (proj.title && proj.title.trim() !== "") ||
                    (proj.description && proj.description.trim() !== "") ||
                    (proj.link && proj.link.trim() !== "")
                )
                .map((proj, index) => (
                  <div key={index} className="mb-6">
                    {proj.title && proj.title.trim() !== "" && (
                      <h3 className="font-semibold text-lg mb-1">
                        {proj.title}
                      </h3>
                    )}
                    {proj.description && proj.description.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {proj.description}
                      </p>
                    )}
                    {proj.link && proj.link.trim() !== "" && (
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

        {data.awards &&
          data.awards.filter(
            (award) =>
              (award.title && award.title.trim() !== "") ||
              (award.issuer && award.issuer.trim() !== "") ||
              (award.date && award.date.trim() !== "") ||
              (award.description && award.description.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Awards"
              icon={<FiStar style={{ color: iconColor }} />}
            >
              {data.awards
                .filter(
                  (award) =>
                    (award.title && award.title.trim() !== "") ||
                    (award.issuer && award.issuer.trim() !== "") ||
                    (award.date && award.date.trim() !== "") ||
                    (award.description && award.description.trim() !== "")
                )
                .map((award, index) => (
                  <div key={index} className="mb-6">
                    {award.title && award.title.trim() !== "" && (
                      <h3 className="font-semibold text-lg mb-1">
                        {award.title}
                      </h3>
                    )}
                    {award.issuer && award.issuer.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {award.issuer}
                      </p>
                    )}
                    {award.date && award.date.trim() !== "" && (
                      <p
                        className={`text-sm ${dateClass} mb-2`}
                        style={{ color: iconColor }}
                      >
                        {award.date}
                      </p>
                    )}
                    {award.description && award.description.trim() !== "" && (
                      <p className="text-sm" style={{ color: iconColor }}>
                        {award.description}
                      </p>
                    )}
                  </div>
                ))}
            </SectionPreview>
          )}

        {data.volunteerExperience &&
          data.volunteerExperience.filter(
            (vol) =>
              (vol.role && vol.role.trim() !== "") ||
              (vol.organization && vol.organization.trim() !== "") ||
              (vol.startDate && vol.startDate.trim() !== "") ||
              (vol.endDate && vol.endDate.trim() !== "") ||
              (vol.description && vol.description.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="Volunteer Experience"
              icon={<FiBriefcase style={{ color: iconColor }} />}
            >
              {data.volunteerExperience
                .filter(
                  (vol) =>
                    (vol.role && vol.role.trim() !== "") ||
                    (vol.organization && vol.organization.trim() !== "") ||
                    (vol.startDate && vol.startDate.trim() !== "") ||
                    (vol.endDate && vol.endDate.trim() !== "") ||
                    (vol.description && vol.description.trim() !== "")
                )
                .map((vol, index) => (
                  <div key={index} className="mb-6">
                    {vol.role && vol.role.trim() !== "" && (
                      <h3 className="font-semibold text-lg mb-1">{vol.role}</h3>
                    )}
                    {vol.organization && vol.organization.trim() !== "" && (
                      <p style={{ color: iconColor }} className="mb-1">
                        {vol.organization}
                      </p>
                    )}
                    {(vol.startDate || vol.endDate) &&
                      ((vol.startDate && vol.startDate.trim() !== "") ||
                        (vol.endDate && vol.endDate.trim() !== "")) && (
                        <p
                          className={`text-sm ${dateClass} mb-2`}
                          style={{ color: iconColor }}
                        >
                          {vol.startDate} - {vol.endDate || "Present"}
                        </p>
                      )}
                    {vol.description && vol.description.trim() !== "" && (
                      <p className="text-sm" style={{ color: iconColor }}>
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))}
            </SectionPreview>
          )}

        {data.references &&
          data.references.filter(
            (ref) =>
              (ref.name && ref.name.trim() !== "") ||
              (ref.relationship && ref.relationship.trim() !== "") ||
              (ref.contactInfo && ref.contactInfo.trim() !== "")
          ).length > 0 && (
            <SectionPreview
              title="References"
              icon={<FiMail style={{ color: iconColor }} />}
            >
              {data.references
                .filter(
                  (ref) =>
                    (ref.name && ref.name.trim() !== "") ||
                    (ref.relationship && ref.relationship.trim() !== "") ||
                    (ref.contactInfo && ref.contactInfo.trim() !== "")
                )
                .map((ref, index) => (
                  <div key={index} className="mb-4">
                    {ref.name && ref.name.trim() !== "" && (
                      <p className="font-semibold">{ref.name}</p>
                    )}
                    {ref.relationship && ref.relationship.trim() !== "" && (
                      <p className="text-sm" style={{ color: iconColor }}>
                        {ref.relationship}
                      </p>
                    )}
                    {ref.contactInfo && ref.contactInfo.trim() !== "" && (
                      <a
                        href={`mailto:${ref.contactInfo}`}
                        className="text-sm hover:underline"
                        style={{ color: iconColor }}
                      >
                        {ref.contactInfo}
                      </a>
                    )}
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
      className={`${containerClass} rounded-lg`}
      style={{
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
              <h2 className="text-2xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="space-y-2 text-left">
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
            {data.skills && data.skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
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
          <div className="flex-1 p-4">{renderSingleColumn(true)}</div>
        </div>
      ) : (
        // Single-column layout for other personalPlacement values
        renderSingleColumn()
      )}
    </div>
  );
};

export default ResumePreview;
