import { useState } from "react";
import Layout from "./components/Layout";
import RobotGuide from "./components/RobotGuide";
import AdminApprovalScreen from "./screens/AdminApprovalScreen";
import AlertsScreen from "./screens/AlertsScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import AppDetailsScreen from "./screens/AppDetailsScreen";
import Dashboard from "./screens/Dashboard";
import DemandInsightsScreen from "./screens/DemandInsightsScreen";
import InventoryScreen from "./screens/InventoryScreen";
import LoginScreen from "./screens/LoginScreen";
import MessagesScreen from "./screens/MessagesScreen";
import PurchaseOrdersScreen from "./screens/PurchaseOrdersScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SuppliersScreen from "./screens/SuppliersScreen";

export type Screen =
  | "login"
  | "register"
  | "dashboard"
  | "inventory"
  | "suppliers"
  | "orders"
  | "alerts"
  | "messages"
  | "demand"
  | "approval"
  | "analytics"
  | "appdetails";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setScreen("dashboard");
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setScreen("login");
  };

  if (!isLoggedIn) {
    if (screen === "register") {
      return (
        <RegisterScreen
          onRegister={handleRegister}
          onCancel={() => setScreen("login")}
          onLoginLink={() => setScreen("login")}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={handleLogin}
        onCreateAccount={() => setScreen("register")}
      />
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":
        return <Dashboard onNavigate={setScreen} />;
      case "inventory":
        return <InventoryScreen />;
      case "suppliers":
        return <SuppliersScreen />;
      case "orders":
        return <PurchaseOrdersScreen />;
      case "alerts":
        return <AlertsScreen />;
      case "messages":
        return <MessagesScreen />;
      case "demand":
        return <DemandInsightsScreen />;
      case "approval":
        return <AdminApprovalScreen />;
      case "analytics":
        return <AnalyticsScreen />;
      case "appdetails":
        return <AppDetailsScreen />;
      default:
        return <Dashboard onNavigate={setScreen} />;
    }
  };

  return (
    <>
      <Layout
        currentScreen={screen}
        onNavigate={setScreen}
        onLogout={handleLogout}
      >
        {renderScreen()}
      </Layout>
      <RobotGuide />
    </>
  );
}
