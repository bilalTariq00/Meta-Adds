"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, GripVertical, Settings, Edit, Trash2, ChevronRight, ChevronDown, Check } from "lucide-react";

export default function CampaignNameModal({ isOpen, onClose }) {
  const [showAddComponentDropdown, setShowAddComponentDropdown] = useState(false);
  const [showCampaignFieldsDropdown, setShowCampaignFieldsDropdown] = useState(false);
  const [showChooseTemplateDropdown, setShowChooseTemplateDropdown] = useState(false);
  const [fieldSeparator, setFieldSeparator] = useState("—");
  const [itemSeparator, setItemSeparator] = useState("::");
  const [showFieldSeparatorDropdown, setShowFieldSeparatorDropdown] = useState(false);
  const [showItemSeparatorDropdown, setShowItemSeparatorDropdown] = useState(false);
  const [templateComponents, setTemplateComponents] = useState([]);
  const [editingComponent, setEditingComponent] = useState(null);
  const [editText, setEditText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const dropdownRef = useRef(null);
  const campaignFieldsRef = useRef(null);
  const chooseTemplateRef = useRef(null);
  const fieldSeparatorRef = useRef(null);
  const itemSeparatorRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAddComponentDropdown(false);
      }
      if (campaignFieldsRef.current && !campaignFieldsRef.current.contains(event.target) && 
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCampaignFieldsDropdown(false);
      }
      if (chooseTemplateRef.current && !chooseTemplateRef.current.contains(event.target)) {
        setShowChooseTemplateDropdown(false);
      }
      if (fieldSeparatorRef.current && !fieldSeparatorRef.current.contains(event.target)) {
        setShowFieldSeparatorDropdown(false);
      }
      if (itemSeparatorRef.current && !itemSeparatorRef.current.contains(event.target)) {
        setShowItemSeparatorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addComponent = (type, label, value = null) => {
    const newComponent = {
      id: Date.now(),
      type,
      label,
      value: value || label.toLowerCase().replace(/\s+/g, '_'),
      customText: type === "open_text" || type === "custom" ? label : null
    };
    setTemplateComponents([...templateComponents, newComponent]);
    setShowAddComponentDropdown(false);
    setShowCampaignFieldsDropdown(false);
  };

  const startEditing = (component) => {
    setEditingComponent(component.id);
    setEditText(component.customText || component.label);
    setOriginalText(component.customText || component.label);
  };

  const saveEdit = () => {
    if (editingComponent && editText.trim()) {
      setTemplateComponents(templateComponents.map(comp => 
        comp.id === editingComponent 
          ? { ...comp, customText: editText.trim(), label: editText.trim() }
          : comp
      ));
    }
    setEditingComponent(null);
    setEditText("");
  };

  const updateEditText = (text) => {
    setEditText(text);
    // Update the component in real-time
    if (editingComponent) {
      setTemplateComponents(templateComponents.map(comp => 
        comp.id === editingComponent 
          ? { ...comp, customText: text, label: text }
          : comp
      ));
    }
  };

  const cancelEdit = () => {
    // Restore original text when canceling
    if (editingComponent) {
      setTemplateComponents(templateComponents.map(comp => 
        comp.id === editingComponent 
          ? { ...comp, customText: originalText, label: originalText }
          : comp
      ));
    }
    setEditingComponent(null);
    setEditText("");
    setOriginalText("");
  };

  const removeComponent = (id) => {
    setTemplateComponents(templateComponents.filter(comp => comp.id !== id));
  };

  const generatePreview = () => {
    if (templateComponents.length === 0) return "";
    
    return templateComponents.map(comp => {
      // Use custom text if available, otherwise use default values
      if (comp.customText) {
        return comp.customText;
      }
      
      switch (comp.type) {
        case "advantage_budget":
          return "CBO on";
        case "objective":
          return "Reach";
        case "campaign_id":
          return "campaign_group_id";
        case "open_text":
          return "Open text field";
        case "custom":
          return "Custom field";
        default:
          return comp.label;
      }
    }).join(fieldSeparator);
  };

  const fieldSeparatorOptions = ["—", "-", "_", "|", " "];
  const itemSeparatorOptions = ["::", ":", ";", "|", " "];

  const existingTemplates = [
    { id: 1, name: "Custom template 1", preview: "Objective" },
    { id: 2, name: "Custom template 2", preview: "ID" }
  ];

  const loadExistingTemplate = (template) => {
    if (template.id === 1) {
      setTemplateComponents([{ id: 1, type: "objective", label: "Objective", value: "objective" }]);
    } else if (template.id === 2) {
      setTemplateComponents([{ id: 2, type: "campaign_id", label: "Campaign ID", value: "campaign_id" }]);
    }
    setShowChooseTemplateDropdown(false);
  };

  // Reset modal to initial state when closing
  const handleClose = () => {
    setTemplateComponents([]);
    setFieldSeparator("—");
    setItemSeparator("::");
    setShowAddComponentDropdown(false);
    setShowCampaignFieldsDropdown(false);
    setShowChooseTemplateDropdown(false);
    setShowFieldSeparatorDropdown(false);
    setShowItemSeparatorDropdown(false);
    setEditingComponent(null);
    setEditText("");
    setOriginalText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-visible relative">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Campaign name</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3 overflow-visible">
          {/* Description */}
          <p className="text-gray-600">
            Name your campaigns consistently by creating a template based on your naming convention. 
            Campaign names will update automatically to match your current campaign settings.
          </p>

          {/* Template Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Template</h3>
            
            {/* Template Builder */}
            <div className="border border-gray-200 rounded-lg p-3 min-h-[60px] bg-gray-50 overflow-visible">
              {templateComponents.length > 0 ? (
                <div className="space-y-2">
                  {templateComponents.map((component, index) => (
                    <div key={component.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 flex-1 ${
                          editingComponent === component.id ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-100'
                        }`}>
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{component.customText || component.label}</span>
                          {editingComponent === component.id && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <Edit 
                            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" 
                            onClick={() => startEditing(component)}
                          />
                          <Trash2 
                            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" 
                            onClick={() => removeComponent(component.id)}
                          />
                        </div>
                        {index < templateComponents.length - 1 && (
                          <span className="text-gray-400">{fieldSeparator}</span>
                        )}
                      </div>
                      
                      {/* Small inline input field below the component */}
                      {editingComponent === component.id && (
                        <div className="ml-8 flex items-center gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => updateEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                saveEdit();
                              } else if (e.key === 'Escape') {
                                cancelEdit();
                              }
                            }}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter text..."
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-2">

                </div>
              )}
              
              {/* Add Component Button */}
              <div className="flex items-center gap-2 mt-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowAddComponentDropdown(!showAddComponentDropdown)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add component
                  </button>
                  
                  {showAddComponentDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000] min-w-48">
                      <div className="relative">
                        <div 
                          className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          onClick={() => setShowCampaignFieldsDropdown(!showCampaignFieldsDropdown)}
                        >
                          <span className="font-medium">Campaign fields</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        
                        {showCampaignFieldsDropdown && (
                          <div 
                            ref={campaignFieldsRef}
                            className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000] min-w-48"
                          >
                            <div 
                              className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                              onClick={() => addComponent("advantage_budget", "Advantage+ campaign budget")}
                            >
                              Advantage+ campaign budget
                            </div>
                            <div 
                              className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                              onClick={() => addComponent("objective", "Objective")}
                            >
                              Objective
                            </div>
                            <div 
                              className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                              onClick={() => addComponent("campaign_id", "Campaign ID")}
                            >
                              Campaign ID
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                        onClick={() => addComponent("open_text", "Open text field")}
                      >
                        <div>Open text field</div>
                        <div className="text-xs text-gray-500">An empty space you can fill in</div>
                      </div>
                      
                      <div 
                        className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                        onClick={() => addComponent("custom", "Custom field")}
                      >
                        <div>Custom field</div>
                        <div className="text-xs text-gray-500">Unique info you can add about your ads</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowChooseTemplateDropdown(!showChooseTemplateDropdown)}
                    className="px-3 py-2 text-sm rounded-lg transition-colors text-blue-600 hover:bg-blue-50"
                  >
                    Choose existing template
                  </button>
                  
                  {showChooseTemplateDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000] min-w-48">
                      {existingTemplates.map((template) => (
                        <div 
                          key={template.id}
                          className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer rounded"
                          onClick={() => {
                            loadExistingTemplate(template);
                            setShowChooseTemplateDropdown(false);
                          }}
                        >
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.preview}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Separators Section - Only show when components exist */}
          {templateComponents.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Field separator</label>
                <div className="relative" ref={fieldSeparatorRef}>
                  <button
                    onClick={() => setShowFieldSeparatorDropdown(!showFieldSeparatorDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span>{fieldSeparator}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showFieldSeparatorDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000]">
                      {fieldSeparatorOptions.map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setFieldSeparator(option);
                            setShowFieldSeparatorDropdown(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Item separator</label>
                <div className="relative" ref={itemSeparatorRef}>
                  <button
                    onClick={() => setShowItemSeparatorDropdown(!showItemSeparatorDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span>{itemSeparator}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showItemSeparatorDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000]">
                      {itemSeparatorOptions.map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setItemSeparator(option);
                            setShowItemSeparatorDropdown(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Preview Section - Only show when components exist */}
          {templateComponents.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{generatePreview() || "No preview available"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-3 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save logic here
              console.log("Template saved:", { templateComponents, fieldSeparator, itemSeparator });
              handleClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
