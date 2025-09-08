import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdsReportingPage from "@/components/ads-reporting/AdsReportingPage";
import { getReportTemplate } from "@/data/reportTemplates";

export default function DetailedReport() {
  const [searchParams] = useSearchParams();
  const [templateData, setTemplateData] = useState(null);
  const [reportName, setReportName] = useState("Untitled report");
  
  const templateId = searchParams.get('template');

  useEffect(() => {
    console.log("DetailedReport useEffect - templateId:", templateId);
    if (templateId) {
      const template = getReportTemplate(templateId);
      if (template) {
        console.log("Using specified template:", template.title);
        setTemplateData(template);
        setReportName(template.title);
      } else {
        console.warn(`Template with ID "${templateId}" not found`);
        // Use default template if specified template is not found
        const defaultTemplate = getReportTemplate('engagement');
        if (defaultTemplate) {
          console.log("Using default template (engagement) as fallback");
          setTemplateData(defaultTemplate);
          setReportName(defaultTemplate.title);
        }
      }
    } else {
      // No template specified, use default template
      const defaultTemplate = getReportTemplate('engagement');
      if (defaultTemplate) {
        console.log("No template specified, using default template (engagement)");
        setTemplateData(defaultTemplate);
        setReportName(defaultTemplate.title);
      }
    }
  }, [templateId]);

  return <AdsReportingPage templateData={templateData} reportName={reportName} />;
}
