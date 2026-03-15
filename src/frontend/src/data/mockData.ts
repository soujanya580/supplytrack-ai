export type InventoryCategory =
  | "LPG Cylinders"
  | "Bulk Tanks"
  | "Food Supply"
  | "Medical Supply"
  | "Electronics"
  | "Raw Materials";
export type InventoryStatus = "Safe" | "Warning" | "LowStock";
export type SupplierStatus = "Active" | "Inactive" | "Pending";
export type POStatus = "Pending" | "Approved" | "Rejected";
export type AlertSeverity = "Critical" | "Warning" | "Info";
export type AlertType =
  | "LowStock"
  | "ShipmentDelay"
  | "DemandSpike"
  | "SupplierRisk"
  | "System";
export type MessageType = "Text" | "AlertNotification" | "SystemMessage";
export type Region = "North" | "South" | "East" | "West";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: InventoryCategory;
  warehouse: string;
  stockQty: number;
  thresholdQty: number;
  status: InventoryStatus;
  lastUpdated: string;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  flag: string;
  phone: string;
  email: string;
  rating: number;
  category: string;
  status: SupplierStatus;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  itemsOrdered: string;
  quantity: number;
  deliveryDate: string;
  status: POStatus;
  createdBy: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  severity: AlertSeverity;
  timestamp: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  messageType: MessageType;
  timestamp: string;
}

export interface DemandData {
  region: Region;
  currentDemand: number;
  predictedDemand: number;
  seasonalFactor: number;
  supplyGap: number;
}

export interface ApprovalRequest {
  id: string;
  requester: string;
  requesterRole: string;
  requestType: "Purchase Order" | "Supplier Registration" | "Inventory Update";
  details: string;
  urgency: "High" | "Medium" | "Low";
  status: "Pending" | "Approved" | "Rejected";
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "LPG Cylinder 14kg",
    sku: "LPG-001",
    category: "LPG Cylinders",
    warehouse: "Mumbai Warehouse",
    stockQty: 245,
    thresholdQty: 100,
    status: "Safe",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Bulk LPG Tank 1000L",
    sku: "BLK-002",
    category: "Bulk Tanks",
    warehouse: "Delhi Depot",
    stockQty: 45,
    thresholdQty: 50,
    status: "Warning",
    lastUpdated: "4 hours ago",
  },
  {
    id: "3",
    name: "Rice 50kg Bags",
    sku: "FOOD-003",
    category: "Food Supply",
    warehouse: "Chennai Hub",
    stockQty: 12,
    thresholdQty: 80,
    status: "LowStock",
    lastUpdated: "1 hour ago",
  },
  {
    id: "4",
    name: "Paracetamol 500mg",
    sku: "MED-004",
    category: "Medical Supply",
    warehouse: "Bangalore Store",
    stockQty: 320,
    thresholdQty: 200,
    status: "Safe",
    lastUpdated: "6 hours ago",
  },
  {
    id: "5",
    name: "Arduino Nano",
    sku: "ELEC-005",
    category: "Electronics",
    warehouse: "Hyderabad Center",
    stockQty: 67,
    thresholdQty: 100,
    status: "Warning",
    lastUpdated: "3 hours ago",
  },
  {
    id: "6",
    name: "Steel Rods 6m",
    sku: "RAW-006",
    category: "Raw Materials",
    warehouse: "Pune Yard",
    stockQty: 8,
    thresholdQty: 50,
    status: "LowStock",
    lastUpdated: "5 hours ago",
  },
];

export const suppliers: Supplier[] = [
  {
    id: "1",
    name: "IndoGas Corp",
    country: "India",
    flag: "🇮🇳",
    phone: "+91-9876543210",
    email: "indogas@mail.com",
    rating: 4.5,
    category: "LPG & Energy",
    status: "Active",
  },
  {
    id: "2",
    name: "FreshFarms Ltd",
    country: "USA",
    flag: "🇺🇸",
    phone: "+1-555-0100",
    email: "fresh@farms.com",
    rating: 4.2,
    category: "Food Supply",
    status: "Active",
  },
  {
    id: "3",
    name: "MediTrade ME",
    country: "UAE",
    flag: "🇦🇪",
    phone: "+971-50-123456",
    email: "medi@trade.ae",
    rating: 3.8,
    category: "Medical Supply",
    status: "Pending",
  },
  {
    id: "4",
    name: "TechParts Inc",
    country: "USA",
    flag: "🇺🇸",
    phone: "+1-555-0200",
    email: "tech@parts.com",
    rating: 4.7,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "5",
    name: "RawMat Co",
    country: "Iran",
    flag: "🇮🇷",
    phone: "+98-21-123456",
    email: "raw@mat.ir",
    rating: 3.5,
    category: "Raw Materials",
    status: "Inactive",
  },
  {
    id: "6",
    name: "Gulf Energy Co",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    phone: "+966-50-123456",
    email: "gulf@energy.sa",
    rating: 4.3,
    category: "LPG & Energy",
    status: "Active",
  },
  {
    id: "7",
    name: "EuroFresh GmbH",
    country: "Germany",
    flag: "🇩🇪",
    phone: "+49-30-123456",
    email: "euro@fresh.de",
    rating: 4.6,
    category: "Food Supply",
    status: "Active",
  },
  {
    id: "8",
    name: "Japan Med Supplies",
    country: "Japan",
    flag: "🇯🇵",
    phone: "+81-3-1234567",
    email: "japan@med.jp",
    rating: 4.8,
    category: "Medical Supply",
    status: "Active",
  },
  {
    id: "9",
    name: "SingaTech Pte",
    country: "Singapore",
    flag: "🇸🇬",
    phone: "+65-9123-4567",
    email: "singa@tech.sg",
    rating: 4.5,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "10",
    name: "BrazilRaw Ltda",
    country: "Brazil",
    flag: "🇧🇷",
    phone: "+55-11-12345678",
    email: "raw@brazil.com",
    rating: 3.9,
    category: "Raw Materials",
    status: "Pending",
  },
  {
    id: "11",
    name: "UK Pharma Ltd",
    country: "United Kingdom",
    flag: "🇬🇧",
    phone: "+44-20-12345678",
    email: "uk@pharma.co.uk",
    rating: 4.4,
    category: "Medical Supply",
    status: "Active",
  },
  {
    id: "12",
    name: "AusFoods Pty",
    country: "Australia",
    flag: "🇦🇺",
    phone: "+61-2-12345678",
    email: "aus@foods.com.au",
    rating: 4.1,
    category: "Food Supply",
    status: "Active",
  },
  {
    id: "13",
    name: "ChinaParts Co",
    country: "China",
    flag: "🇨🇳",
    phone: "+86-10-12345678",
    email: "parts@china.com",
    rating: 4.0,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "14",
    name: "CanadaOil Corp",
    country: "Canada",
    flag: "🇨🇦",
    phone: "+1-416-1234567",
    email: "oil@canada.ca",
    rating: 3.7,
    category: "LPG & Energy",
    status: "Pending",
  },
  {
    id: "15",
    name: "KoreaElec Ltd",
    country: "South Korea",
    flag: "🇰🇷",
    phone: "+82-2-12345678",
    email: "elec@korea.kr",
    rating: 4.6,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "16",
    name: "FranceLux SA",
    country: "France",
    flag: "🇫🇷",
    phone: "+33-1-12345678",
    email: "lux@france.fr",
    rating: 3.4,
    category: "Raw Materials",
    status: "Inactive",
  },
  {
    id: "17",
    name: "SA Minerals",
    country: "South Africa",
    flag: "🇿🇦",
    phone: "+27-11-1234567",
    email: "minerals@sa.co.za",
    rating: 4.2,
    category: "Raw Materials",
    status: "Active",
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplierId: "1",
    supplierName: "IndoGas Corp",
    itemsOrdered: "LPG Cylinders",
    quantity: 500,
    deliveryDate: "2024-03-20",
    status: "Approved",
    createdBy: "Manager Priya",
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplierId: "2",
    supplierName: "FreshFarms Ltd",
    itemsOrdered: "Rice Bags 50kg",
    quantity: 200,
    deliveryDate: "2024-03-25",
    status: "Pending",
    createdBy: "Manager Priya",
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    supplierId: "3",
    supplierName: "MediTrade ME",
    itemsOrdered: "Paracetamol 500mg",
    quantity: 1000,
    deliveryDate: "2024-04-01",
    status: "Pending",
    createdBy: "Manager Arjun",
  },
  {
    id: "4",
    poNumber: "PO-2024-004",
    supplierId: "4",
    supplierName: "TechParts Inc",
    itemsOrdered: "Arduino Nano",
    quantity: 150,
    deliveryDate: "2024-04-05",
    status: "Rejected",
    createdBy: "Manager Arjun",
  },
  {
    id: "5",
    poNumber: "PO-2024-005",
    supplierId: "5",
    supplierName: "RawMat Co",
    itemsOrdered: "Steel Rods 6m",
    quantity: 300,
    deliveryDate: "2024-04-10",
    status: "Pending",
    createdBy: "Manager Priya",
  },
];

export const alerts: Alert[] = [
  {
    id: "1",
    title: "LPG Stock Critical",
    description:
      "Rice supply at Chennai Hub is at 15% of threshold. Immediate restocking required.",
    type: "LowStock",
    severity: "Critical",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Shipment Delay",
    description:
      "Dubai shipment #SH-2024-089 is delayed by 3 days due to port congestion.",
    type: "ShipmentDelay",
    severity: "Warning",
    timestamp: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Demand Spike Detected",
    description:
      "Electronics demand has increased 340% in the Western region. Adjust forecasts.",
    type: "DemandSpike",
    severity: "Critical",
    timestamp: "1 day ago",
    isRead: false,
  },
  {
    id: "4",
    title: "Supplier Risk Alert",
    description:
      "RawMat Co credit rating has been downgraded. Consider alternate suppliers.",
    type: "SupplierRisk",
    severity: "Warning",
    timestamp: "1 day ago",
    isRead: false,
  },
  {
    id: "5",
    title: "Scheduled Maintenance",
    description:
      "System maintenance window scheduled for Sunday 2:00 AM - 4:00 AM IST.",
    type: "System",
    severity: "Info",
    timestamp: "2 days ago",
    isRead: true,
  },
];

export const messages: Message[] = [
  {
    id: "1",
    senderId: "op1",
    senderName: "Ravi Kumar",
    senderRole: "Operator",
    content:
      "LPG cylinder count at warehouse 3 is critically low. Down to 45 units.",
    messageType: "Text",
    timestamp: "2h ago",
  },
  {
    id: "2",
    senderId: "mgr1",
    senderName: "Priya Sharma",
    senderRole: "Manager",
    content:
      "Raising a Purchase Order immediately. How many units do we need minimum?",
    messageType: "Text",
    timestamp: "1h 45m ago",
  },
  {
    id: "3",
    senderId: "op1",
    senderName: "Ravi Kumar",
    senderRole: "Operator",
    content: "Minimum 200 units needed to cover the next 2 weeks of demand.",
    messageType: "Text",
    timestamp: "1h 30m ago",
  },
  {
    id: "4",
    senderId: "admin",
    senderName: "Soujanya S",
    senderRole: "Admin",
    content:
      "BROADCAST: All teams please conduct a full inventory audit by end of day today.",
    messageType: "AlertNotification",
    timestamp: "30m ago",
  },
  {
    id: "5",
    senderId: "system",
    senderName: "System",
    senderRole: "System",
    content: "PO-2024-002 has been submitted for admin approval.",
    messageType: "SystemMessage",
    timestamp: "15m ago",
  },
];

export const demandData: DemandData[] = [
  {
    region: "North",
    currentDemand: 850,
    predictedDemand: 1200,
    seasonalFactor: 15,
    supplyGap: 350,
  },
  {
    region: "South",
    currentDemand: 620,
    predictedDemand: 780,
    seasonalFactor: 8,
    supplyGap: 160,
  },
  {
    region: "East",
    currentDemand: 430,
    predictedDemand: 390,
    seasonalFactor: -5,
    supplyGap: -40,
  },
  {
    region: "West",
    currentDemand: 710,
    predictedDemand: 960,
    seasonalFactor: 22,
    supplyGap: 250,
  },
];

export const approvalRequests: ApprovalRequest[] = [
  {
    id: "1",
    requester: "Priya Sharma",
    requesterRole: "Manager",
    requestType: "Purchase Order",
    details: "PO-2024-002: 200 units Rice 50kg from FreshFarms Ltd",
    urgency: "Medium",
    status: "Pending",
  },
  {
    id: "2",
    requester: "Arjun Mehta",
    requesterRole: "Manager",
    requestType: "Purchase Order",
    details: "PO-2024-003: 1000 units Paracetamol from MediTrade ME",
    urgency: "High",
    status: "Pending",
  },
  {
    id: "3",
    requester: "Priya Sharma",
    requesterRole: "Manager",
    requestType: "Purchase Order",
    details: "PO-2024-005: 300 Steel Rods 6m from RawMat Co",
    urgency: "Low",
    status: "Pending",
  },
  {
    id: "4",
    requester: "Ravi Kumar",
    requesterRole: "Operator",
    requestType: "Supplier Registration",
    details: "New supplier: MediTrade ME from Dubai - Medical Supply category",
    urgency: "High",
    status: "Pending",
  },
  {
    id: "5",
    requester: "Sanjay Patel",
    requesterRole: "Operator",
    requestType: "Inventory Update",
    details: "Bulk LPG Tank 1000L: Update stock count from 50 to 45 units",
    urgency: "Medium",
    status: "Pending",
  },
];

export const shipmentsByCountry = [
  { country: "India", count: 42, color: "#00D4AA" },
  { country: "UAE", count: 28, color: "#3B82F6" },
  { country: "USA", count: 35, color: "#8B5CF6" },
  { country: "Iran", count: 18, color: "#F97316" },
  { country: "Germany", count: 22, color: "#EC4899" },
  { country: "Japan", count: 19, color: "#F43F5E" },
  { country: "Singapore", count: 15, color: "#14B8A6" },
  { country: "UK", count: 24, color: "#6366F1" },
  { country: "Australia", count: 12, color: "#EAB308" },
];

export const recentActivity = [
  {
    id: "1",
    text: "PO-2024-002 submitted by Manager Priya",
    time: "15m ago",
    type: "order",
  },
  {
    id: "2",
    text: "Low stock alert triggered for Rice 50kg Bags",
    time: "1h ago",
    type: "alert",
  },
  {
    id: "3",
    text: "Supplier MediTrade ME added for approval",
    time: "2h ago",
    type: "supplier",
  },
  {
    id: "4",
    text: "Inventory audit completed — Mumbai Warehouse",
    time: "3h ago",
    type: "inventory",
  },
  {
    id: "5",
    text: "Shipment SH-2024-089 departed from Dubai",
    time: "4h ago",
    type: "shipment",
  },
];
