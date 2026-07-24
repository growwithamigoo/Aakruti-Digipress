import { Settings, Shield, User, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your admin preferences and portal configuration.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-cyan/10 text-brand-cyan rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Account</h2>
              <p className="text-gray-500 text-sm">admin@aakrutidigipress.com</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-gray-500">Update your account password</div>
                </div>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Update</button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Email Notifications</div>
                  <div className="text-sm text-gray-500">Receive alerts for new enquiries</div>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Note: Full configuration settings will be available in the upcoming v2.0 dashboard release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
