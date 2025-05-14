
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "expired" | "pending" | "processing" | "rejected";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-passport-green text-white";
      case "expired":
        return "bg-passport-red text-white";
      case "pending":
        return "bg-passport-gold text-black";
      case "processing":
        return "bg-blue-500 text-white";
      case "rejected":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <Badge 
      className={cn("font-medium capitalize", getStatusColor(), className)} 
      variant="outline"
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
