
export const MOCK_USERS = [
  {
    id: 'user-1',
    firstName: 'Arun',
    lastName: 'Kumar',
    mobile: '9840098400',
    address: '12, T. Nagar, Chennai, Tamil Nadu - 600017',
    registrationDate: '2024-05-01T10:00:00Z',
    password: 'password123',
    active: true,
  },
  {
    id: 'user-2',
    firstName: 'Priya',
    lastName: 'Suresh',
    mobile: '9884098840',
    address: '25, R. S. Puram, Coimbatore, Tamil Nadu - 641002',
    registrationDate: '2024-05-05T11:30:00Z',
    password: 'password123',
    active: true,
  },
  {
    id: 'user-3',
    firstName: 'Karthik',
    lastName: 'Raja',
    mobile: '9790097900',
    address: '42, Anna Nagar, Madurai, Tamil Nadu - 625020',
    registrationDate: '2024-05-08T14:00:00Z',
    password: 'password123',
    active: false,
  },
  {
    id: 'user-4',
    firstName: 'Deepa',
    lastName: 'Murugan',
    mobile: '9500095000',
    address: '7, Cantonment, Tiruchirappalli, Tamil Nadu - 620001',
    registrationDate: '2024-04-28T09:00:00Z',
    password: 'password123',
    active: true,
  }
];

export const MOCK_APPLICATIONS = [
    {
        id: 'app-1', userId: 'user-1', applicantName: 'Arun Kumar', occurrenceDate: '2024-05-10', birthDate: '1988-06-15',
        lossType: 'Property damage', address: '12, T. Nagar, Chennai, Tamil Nadu - 600017', zipcode: '600017', state: 'Tamil Nadu', aadhar: '123412341234',
        proofs: 'house_damage.pdf', submissionDate: '2024-05-11T08:00:00Z', status: 'New'
    },
    {
        id: 'app-2', userId: 'user-2', applicantName: 'Priya Suresh', occurrenceDate: '2024-05-12', birthDate: '1992-11-20',
        lossType: 'Vehicle damage', address: '25, R. S. Puram, Coimbatore, Tamil Nadu - 641002', zipcode: '641002', state: 'Tamil Nadu', aadhar: '234523452345',
        proofs: 'car_photos.zip', submissionDate: '2024-05-13T12:30:00Z', status: 'Verified', remark: 'Verified by Admin'
    },
    {
        id: 'app-3', userId: 'user-4', applicantName: 'Deepa Murugan', occurrenceDate: '2024-05-01', birthDate: '1995-02-10',
        lossType: 'Crop loss', address: '7, Cantonment, Tiruchirappalli, Tamil Nadu - 620001', zipcode: '620001', state: 'Tamil Nadu', aadhar: '456745674567',
        proofs: 'farm_report.pdf', submissionDate: '2024-05-02T18:00:00Z', status: 'Rejected', remark: 'Insufficient proof of loss.'
    },
    {
        id: 'app-4', userId: 'user-1', applicantName: 'Arun Kumar', occurrenceDate: '2024-05-15', birthDate: '1988-06-15',
        lossType: 'Stock loss', address: '12, T. Nagar, Chennai, Tamil Nadu - 600017', zipcode: '600017', state: 'Tamil Nadu', aadhar: '123412341234',
        proofs: 'shop_inventory.xls', submissionDate: '2024-05-16T10:15:00Z', status: 'New'
    },
    {
        id: 'app-5', userId: 'user-2', applicantName: 'Priya Suresh', occurrenceDate: '2024-05-20', birthDate: '1992-11-20',
        lossType: 'Business interruption', address: '25, R. S. Puram, Coimbatore, Tamil Nadu - 641002', zipcode: '641002', state: 'Tamil Nadu', aadhar: '234523452345',
        proofs: 'business_records.pdf', submissionDate: '2024-05-21T11:00:00Z', status: 'New'
    }
];


export const MOCK_ADMIN = {
  id: 'admin-1',
  username: 'admin',
  password: 'password',
};
