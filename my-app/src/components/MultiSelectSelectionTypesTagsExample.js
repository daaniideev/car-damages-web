import React from "react";
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";

export const MultiSelectSelectionTypesTagsExample = () => {
  const options = [
    {
      value: 0,
      label: "Angular",
      selected: true,
    },
    {
      value: 1,
      label: "Bootstrap",
      selected: true,
      disabled: true,
    },
    {
      value: 2,
      label: "React.js",
    },
    {
      value: 3,
      label: "Vue.js",
    },
    {
      label: "backend",
      options: [
        {
          value: 4,
          label: "Django",
        },
        {
          value: 5,
          label: "Laravel",
          selected: true,
        },
        {
          value: 6,
          label: "Node.js",
        },
      ],
    },
  ];

  return <CMultiSelect options={options} selectionType="tags" />;
};
