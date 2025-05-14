
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Passport } from "@/data/passportData";
import StatusBadge from "@/components/StatusBadge";
import { Edit, FileText } from "lucide-react";

interface PassportCardProps {
  passport: Passport;
  onView: (passport: Passport) => void;
  onEdit: (passport: Passport) => void;
}

const PassportCard: React.FC<PassportCardProps> = ({ passport, onView, onEdit }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Calculate if passport is expiring soon (within 6 months)
  const isExpiringSoon = () => {
    if (passport.status !== "active") return false;
    if (!passport.expiryDate) return false;
    
    const expiryDate = new Date(passport.expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    return expiryDate <= sixMonthsFromNow && expiryDate > new Date();
  };
  
  return (
    <Card className="passport-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              {passport.photo ? (
                <AvatarImage src={passport.photo} alt={passport.fullName} />
              ) : (
                <AvatarFallback>{getInitials(passport.fullName)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{passport.fullName}</h3>
              <p className="text-sm text-muted-foreground">{passport.nationality}</p>
            </div>
          </div>
          <StatusBadge status={passport.status} />
        </div>
      </CardHeader>
      <CardContent>
        {passport.passportNumber && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Passport No:</span>
            <span className="font-medium">{passport.passportNumber}</span>
            
            {passport.issueDate && (
              <>
                <span className="text-muted-foreground">Issue Date:</span>
                <span>{new Date(passport.issueDate).toLocaleDateString()}</span>
              </>
            )}
            
            {passport.expiryDate && (
              <>
                <span className="text-muted-foreground">Expiry Date:</span>
                <span className={isExpiringSoon() ? "text-passport-red font-medium" : ""}>
                  {new Date(passport.expiryDate).toLocaleDateString()}
                  {isExpiringSoon() && " (Expiring soon)"}
                </span>
              </>
            )}
          </div>
        )}
        
        {!passport.passportNumber && passport.status === "pending" && (
          <div className="text-sm text-muted-foreground py-2">
            Application submitted. Waiting for approval.
          </div>
        )}
        
        {!passport.passportNumber && passport.status === "processing" && (
          <div className="text-sm text-muted-foreground py-2">
            Application is being processed. Estimated completion in 2-3 weeks.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(passport)}
          className="flex gap-1"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-flex">Edit</span>
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={() => onView(passport)}
          className="flex gap-1 bg-passport-blue hover:bg-passport-blue/90"
        >
          <FileText className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-flex">View</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PassportCard;
