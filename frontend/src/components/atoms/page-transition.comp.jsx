import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionDirection, setTransitionDirection] = useState("fade");
  const location = useLocation();

  useEffect(() => {
    if (children !== displayChildren) {
      setIsTransitioning(true);

      // Bestimme Transition-Richtung basierend auf der Route
      const currentPath = location.pathname;
      if (currentPath.includes("/dashboard")) {
        setTransitionDirection("slide-up");
      } else if (currentPath.includes("/profile")) {
        setTransitionDirection("slide-left");
      } else if (currentPath.includes("/food")) {
        setTransitionDirection("slide-right");
      } else if (currentPath.includes("/settings")) {
        setTransitionDirection("slide-down");
      } else {
        setTransitionDirection("fade");
      }

      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [children, displayChildren, location.pathname]);

  const getTransitionClasses = () => {
    const baseClasses = "transition-all duration-300 ease-in-out";

    if (isTransitioning) {
      switch (transitionDirection) {
        case "slide-up":
          return `${baseClasses} opacity-0 transform translate-y-8 scale-95`;
        case "slide-down":
          return `${baseClasses} opacity-0 transform -translate-y-8 scale-95`;
        case "slide-left":
          return `${baseClasses} opacity-0 transform translate-x-8 scale-95`;
        case "slide-right":
          return `${baseClasses} opacity-0 transform -translate-x-8 scale-95`;
        default:
          return `${baseClasses} opacity-0 transform translate-y-4 scale-98`;
      }
    } else {
      return `${baseClasses} opacity-100 transform translate-y-0 scale-100`;
    }
  };

  return <div className={getTransitionClasses()}>{displayChildren}</div>;
}
