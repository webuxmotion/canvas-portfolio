import React from "react";
import LambertaPetersLayout from "./LambertaPetersLayout/LambertaPetersLayout";
import { animationsList } from "./animationsList";
import Example from "./Example/Example";
import { Route } from "react-router-dom";

export default function LambertaPetersRoutes() {
  return [
    <Route key="lamberta-layout" path="/books-animations" element={<LambertaPetersLayout />}>
      <Route
        key="lamberta-example"
        path="based-on/labmerta-peters"
        element={<Example />}
      />
      {animationsList.map((anim) => {
        const Page = anim.component;
        return (
          <Route
            key={anim.id}
            path={`based-on/labmerta-peters/${anim.id}`}
            element={<Page />}
          />
        );
      })}
    </Route>,
  ];
}