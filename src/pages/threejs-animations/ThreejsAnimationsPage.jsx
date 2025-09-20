import React from "react";
import Example from "./Example/Example";
import AnimationsGrid from "@/components/AnimationsGrid/AnimationsGrid";

export const threejsAnimations = [
  { id: "example", component: Example, codeSource: "Example" },
];

function ThreejsAnimationsPage() {
  return (
    <div>
      ThreejsAnimationsPage
      <AnimationsGrid animations={threejsAnimations} folder="threejs-animations" />
    </div>
  );
}

export default ThreejsAnimationsPage;
