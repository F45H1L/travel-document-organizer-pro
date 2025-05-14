
export interface Passport {
  id: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending" | "processing" | "rejected";
  photo?: string;
}

export const samplePassports: Passport[] = [
  {
    id: "1",
    fullName: "John Smith",
    dateOfBirth: "1985-05-15",
    nationality: "United States",
    passportNumber: "US12345678",
    issueDate: "2020-01-10",
    expiryDate: "2030-01-09",
    status: "active",
    photo: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    fullName: "Emma Johnson",
    dateOfBirth: "1992-08-23",
    nationality: "United Kingdom",
    passportNumber: "UK87654321",
    issueDate: "2018-06-15",
    expiryDate: "2023-01-20",
    status: "expired",
    photo: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    fullName: "Michael Chen",
    dateOfBirth: "1979-11-07",
    nationality: "Canada",
    passportNumber: "CA98765432",
    issueDate: "2021-03-25",
    expiryDate: "2031-03-24",
    status: "active",
    photo: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    fullName: "Sophie Martin",
    dateOfBirth: "1990-02-18",
    nationality: "France",
    passportNumber: "FR24681357",
    issueDate: "2022-05-05",
    expiryDate: "2032-05-04",
    status: "active",
    photo: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: "5",
    fullName: "David Kim",
    dateOfBirth: "1988-09-30",
    nationality: "South Korea",
    passportNumber: "KR13572468",
    issueDate: "",
    expiryDate: "",
    status: "pending",
    photo: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: "6",
    fullName: "Maria Rodriguez",
    dateOfBirth: "1995-04-12",
    nationality: "Spain",
    passportNumber: "",
    issueDate: "",
    expiryDate: "",
    status: "processing",
    photo: "https://i.pravatar.cc/150?img=6"
  }
];
