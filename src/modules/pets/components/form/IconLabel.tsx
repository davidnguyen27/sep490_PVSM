import React from "react";
import { FormLabel } from "@/components/ui/form";
import type { IconComponent } from "../../types/form.types";
import { FORM_CONFIG } from "../../constants/form.constants";

interface IconLabelProps {
  icon: IconComponent;
  children: React.ReactNode;
}

export const IconLabel: React.FC<IconLabelProps> = ({
  icon: Icon,
  children,
}) => (
  <FormLabel className="font-nunito-600 text-dark flex items-center gap-2 text-sm">
    <Icon size={FORM_CONFIG.ICON_SIZE.small} className="text-primary" />
    {children}
  </FormLabel>
);
