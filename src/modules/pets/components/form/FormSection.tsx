import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { IconComponent } from "../../types/form.types";
import { FORM_CONFIG } from "../../constants/form.constants";

interface FormSectionProps {
  title: string;
  icon: IconComponent;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  children,
}) => (
  <Card className="border-border rounded-none pb-6 shadow-sm">
    <CardHeader className="bg-linen py-2 shadow-sm">
      <CardTitle className="font-nunito-600 text-primary flex items-center space-x-2 text-lg">
        <Icon size={FORM_CONFIG.ICON_SIZE.medium} />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="bg-white">{children}</CardContent>
  </Card>
);
