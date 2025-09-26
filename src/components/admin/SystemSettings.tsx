
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Mail, 
  Shield, 
  Database, 
  Globe,
  Bell,
  CreditCard,
  Users,
  Save,
  RefreshCw
} from "lucide-react";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "SafariCom Learning Platform",
    siteDescription: "Empowering Kenyan youth with digital skills",
    adminEmail: "admin@safaricom.co.ke",
    supportEmail: "support@safaricom.co.ke",
    enableRegistration: true,
    enableEmailVerification: true,
    enablePayments: true,
    enableNotifications: true,
    maintenanceMode: false,
    allowGuestAccess: false,
    maxFileSize: "10",
    sessionTimeout: "24",
    backupFrequency: "daily",
    emailProvider: "smtp",
    paymentGateway: "mpesa"
  });

  const handleSettingChange = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    // Implement save functionality
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <Input
                value={settings.siteName}
                onChange={(e) => handleSettingChange("siteName", e.target.value)}
                placeholder="Enter site name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Admin Email</label>
              <Input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
              placeholder="Enter site description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Support Email</label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
              placeholder="support@example.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* User & Access Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User & Access Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable User Registration</h4>
              <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
            </div>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => handleSettingChange("enableRegistration", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Verification Required</h4>
              <p className="text-sm text-gray-600">Require email verification for new accounts</p>
            </div>
            <Switch
              checked={settings.enableEmailVerification}
              onCheckedChange={(checked) => handleSettingChange("enableEmailVerification", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Allow Guest Access</h4>
              <p className="text-sm text-gray-600">Allow users to browse courses without registration</p>
            </div>
            <Switch
              checked={settings.allowGuestAccess}
              onCheckedChange={(checked) => handleSettingChange("allowGuestAccess", checked)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Session Timeout (hours)</label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                placeholder="24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max File Upload Size (MB)</label>
              <Input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                placeholder="10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Provider</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={settings.emailProvider}
              onChange={(e) => handleSettingChange("emailProvider", e.target.value)}
            >
              <option value="smtp">SMTP</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
              <option value="aws-ses">AWS SES</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Email Notifications</h4>
              <p className="text-sm text-gray-600">Send automated emails to users</p>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Payments</h4>
              <p className="text-sm text-gray-600">Allow users to purchase premium courses</p>
            </div>
            <Switch
              checked={settings.enablePayments}
              onCheckedChange={(checked) => handleSettingChange("enablePayments", checked)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Payment Gateway</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={settings.paymentGateway}
              onChange={(e) => handleSettingChange("paymentGateway", e.target.value)}
            >
              <option value="mpesa">M-Pesa</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="razorpay">Razorpay</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Maintenance Mode</h4>
              <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Backup Frequency</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup Now
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Clear Cache
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Scan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 mb-3">Enhanced security for admin accounts</p>
              <Button size="sm" variant="outline">Configure 2FA</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">IP Whitelist</h4>
              <p className="text-sm text-gray-600 mb-3">Restrict admin access to specific IPs</p>
              <Button size="sm" variant="outline">Manage IPs</Button>
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">Security Alerts</h4>
            <p className="text-sm text-orange-700 mb-3">Configure alerts for suspicious activities</p>
            <Button size="sm" variant="outline">Configure Alerts</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
