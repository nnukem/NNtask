import { AutoAnimateOptions, AutoAnimationPlugin } from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import classNames from "classnames";
import React, { useMemo } from "react";

export type AutoAnimateFunction = (
  options: Partial<AutoAnimateOptions>
) => AutoAnimationPlugin;

export interface PageTransitionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<AutoAnimateOptions> {
  children?: React.ReactNode;
  pluginFunction?: AutoAnimateFunction;
}

export const PageTransition = ({
  children,
  duration = 150,
  easing = "ease-in-out",
  pluginFunction,
  className,
  ...rest
}: PageTransitionProps) => {
  const plugin = useMemo(() => {
    if (pluginFunction) return pluginFunction({ duration, easing });
    return { duration, easing };
  }, [duration, easing, pluginFunction]);

  const [parent] = useAutoAnimate(plugin);

  return (
    <div ref={parent} className={classNames(className)} {...rest}>
      {children}
    </div>
  );
};
