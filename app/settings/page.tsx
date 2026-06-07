import {
  Settings,
  Home,
  Heart,
  MessageSquare,
  History,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  LogOut,
  Camera,
  BadgeCheck,
} from "lucide-react";
 
export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
 
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-lg font-bold text-[#0B1E4A] mb-6">
              MY ACCOUNT
            </h2>
 
            <nav className="space-y-5">
              <SidebarItem icon={<Settings size={20} />} label="Settings" />
              <SidebarItem icon={<Home size={20} />} label="My Properties" />
              <SidebarItem icon={<Heart size={20} />} label="Saved Properties" />
              <SidebarItem icon={<MessageSquare size={20} />} label="My Inquiries" />
              <SidebarItem icon={<History size={20} />} label="Recent Activity" />
            </nav>
 
            <div className="mt-10 rounded-xl overflow-hidden border">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                alt="house"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-[#0B1E4A]">
                  Want to sell your property?
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  List your property and reach thousands of serious buyers.
                </p>
                <button className="w-full mt-4 bg-[#0B1E4A] text-white py-2 rounded-lg hover:bg-[#1A6373] transition">
                  Get Started
                </button>
              </div>
            </div>
          </aside>
 
          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
 
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-[#0B1E4A]">Settings</h1>
              <p className="text-gray-600">
                Manage your personal information and preferences.
              </p>
            </div>
 
            {/* Profile Card */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-[#1A6373]/20 flex items-center justify-center">
                  <User size={70} className="text-[#1A6373]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Madeline Pimentel</h2>
                  <p className="text-gray-600">pimentelmadd.12@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-2">Member since January 2026</p>
                </div>
                <div className="flex items-center gap-2 text-[#1A6373] font-semibold">
                  <BadgeCheck size={20} />
                  Verified Account
                </div>
              </div>
            </section>
 
            {/* Personal Information */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#0B1E4A] mb-6">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoItem icon={<User />} title="Full Name" value="Madeline Beatriz Pineda Pimentel" />
                <InfoItem icon={<Mail />} title="Email" value="pimentelmadd.12@gmail.com" />
                <InfoItem icon={<Phone />} title="Phone" value="+503 7867 8564" />
                <InfoItem icon={<MapPin />} title="Address" value="La Libertad, El Salvador" />
              </div>
            </section>
 
            {/* Profile Photo */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#0B1E4A] mb-6">
                Profile Photo
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-[#1A6373]/20 flex items-center justify-center">
                  <User size={70} className="text-[#1A6373]" />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button className="bg-[#0B1E4A] text-white px-5 py-2 rounded-lg flex items-center gap-2">
                    <Camera size={18} />
                    Change Photo
                  </button>
                  <button className="border px-5 py-2 rounded-lg">
                    Remove Photo
                  </button>
                </div>
              </div>
            </section>
 
            {/* Security */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#0B1E4A] mb-6">
                Security
              </h2>
              <div className="space-y-6">
                <SecurityItem
                  icon={<Lock size={24} />}
                  title="Change Password"
                  description="Choose a strong password to keep your account secure."
                />
                <SecurityItem
                  icon={<Shield size={24} />}
                  title="Account Verification"
                  description="Verify your account to access all features."
                />
                <SecurityItem
                  icon={<LogOut size={24} />}
                  title="Log Out"
                  description="Log out from your ValTrust account on this device."
                />
              </div>
            </section>
 
          </main>
        </div>
      </div>
    </div>
  );
}
 
function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-700 hover:text-[#1A6373] cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}
 
function InfoItem({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="text-[#1A6373]">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}
 
function SecurityItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A6373]/10 shrink-0">
        <div className="text-[#1A6373]">{icon}</div>
      </div>
      <div>
        <h3 className="text-base font-extrabold text-[#0B1E4A]">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
 
 