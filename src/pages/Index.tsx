
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PassportCard from "@/components/PassportCard";
import SearchBar from "@/components/SearchBar";
import { samplePassports, Passport } from "@/data/passportData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PassportForm from "@/components/PassportForm";
import StatusBadge from "@/components/StatusBadge";
import { format } from "date-fns";
import { FileText, User, Calendar, Flag, IdCard } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [passports, setPassports] = useState<Passport[]>(samplePassports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [selectedPassport, setSelectedPassport] = useState<Passport | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const handleAddPassport = () => {
    setSelectedPassport(null);
    setFormOpen(true);
    setEditMode(false);
  };
  
  const handleEditPassport = (passport: Passport) => {
    setSelectedPassport(passport);
    setFormOpen(true);
    setEditMode(true);
  };
  
  const handleViewPassport = (passport: Passport) => {
    setSelectedPassport(passport);
    setDetailsOpen(true);
  };
  
  const handleFormSubmit = (data: any) => {
    if (editMode && selectedPassport) {
      // Update existing passport
      setPassports(passports.map(p => 
        p.id === selectedPassport.id ? { ...p, ...data } : p
      ));
      toast({
        title: "Passport Updated",
        description: `${data.fullName}'s passport details have been updated.`,
      });
    } else {
      // Create new passport
      const newPassport: Passport = {
        id: (passports.length + 1).toString(),
        ...data,
        dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
        issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : "",
        expiryDate: data.expiryDate ? data.expiryDate.toISOString().split('T')[0] : "",
        passportNumber: data.passportNumber || "",
      };
      setPassports([...passports, newPassport]);
      toast({
        title: "Application Submitted",
        description: `${data.fullName}'s passport application has been submitted.`,
      });
    }
    setFormOpen(false);
  };
  
  const filteredPassports = passports.filter(passport => {
    // Apply search filter
    const searchMatch = searchTerm === "" || 
      passport.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passport.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === "all" || passport.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNewPassport={handleAddPassport} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Passport Management Dashboard</h2>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPassports.length > 0 ? (
            filteredPassports.map(passport => (
              <PassportCard 
                key={passport.id} 
                passport={passport}
                onView={handleViewPassport}
                onEdit={handleEditPassport}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No passports found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* New/Edit Passport Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Passport" : "New Passport Application"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the passport information below." 
                : "Fill in the information below to submit a new passport application."}
            </DialogDescription>
          </DialogHeader>
          <PassportForm 
            initialData={selectedPassport || undefined} 
            onSubmit={handleFormSubmit}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Passport Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPassport && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Passport Details</DialogTitle>
                  <StatusBadge status={selectedPassport.status} />
                </div>
                <DialogDescription>
                  Complete information about this passport.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Personal Details</TabsTrigger>
                    <TabsTrigger value="passport">Passport Information</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-4 space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      {selectedPassport.photo ? (
                        <img 
                          src={selectedPassport.photo} 
                          alt={selectedPassport.fullName} 
                          className="w-20 h-20 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full">
                          <User className="h-10 w-10 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold">{selectedPassport.fullName}</h3>
                        <p className="text-muted-foreground">{selectedPassport.nationality}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[20px_1fr] gap-x-4 gap-y-3 items-center">
                      <Calendar className="h-5 w-5 text-passport-blue" />
                      <div>
                        <p className="text-sm font-medium">Date of Birth</p>
                        <p>{selectedPassport.dateOfBirth && format(new Date(selectedPassport.dateOfBirth), "PPP")}</p>
                      </div>
                      
                      <Flag className="h-5 w-5 text-passport-blue" />
                      <div>
                        <p className="text-sm font-medium">Nationality</p>
                        <p>{selectedPassport.nationality}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="passport" className="mt-4">
                    {selectedPassport.passportNumber ? (
                      <div className="grid grid-cols-[20px_1fr] gap-x-4 gap-y-3 items-center">
                        <IdCard className="h-5 w-5 text-passport-blue" />
                        <div>
                          <p className="text-sm font-medium">Passport Number</p>
                          <p>{selectedPassport.passportNumber}</p>
                        </div>
                        
                        <Calendar className="h-5 w-5 text-passport-blue" />
                        <div>
                          <p className="text-sm font-medium">Issue Date</p>
                          <p>{selectedPassport.issueDate && format(new Date(selectedPassport.issueDate), "PPP")}</p>
                        </div>
                        
                        <Calendar className="h-5 w-5 text-passport-blue" />
                        <div>
                          <p className="text-sm font-medium">Expiry Date</p>
                          <p>{selectedPassport.expiryDate && format(new Date(selectedPassport.expiryDate), "PPP")}</p>
                        </div>
                        
                        <FileText className="h-5 w-5 text-passport-blue" />
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <StatusBadge status={selectedPassport.status} />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          {selectedPassport.status === "pending" && "Application is pending review."}
                          {selectedPassport.status === "processing" && "Application is being processed."}
                          {selectedPassport.status === "rejected" && "Application was rejected."}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
