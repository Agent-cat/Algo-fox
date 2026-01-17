"use client";

import { useState, useEffect, useCallback } from "react";
import {
  addStaffMember,
  getInstitutionStaff,
} from "@/actions/institution/staff";
import { searchUsersByEmail } from "@/actions/admin/institution";
import {
  Users,
  GraduationCap,
  Building2,
  Mail,
  Plus,
  Loader2,
  Check,
  Trophy,
  BookOpen,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

interface Stats {
  students: number;
  teachers: number;
  contestManagers: number;
  classrooms: number;
}

interface Staff {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
}

interface InstitutionDashboardContentProps {
  initialStats: Stats | null;
  initialStaff: Staff[];
  institutionId: string;
  institutionName: string | null;
}

export function InstitutionDashboardContent({
  initialStats,
  initialStaff,
  institutionId,
  institutionName,
}: InstitutionDashboardContentProps) {
  const router = useRouter();
  const [stats] = useState(initialStats);
  const [staff, setStaff] = useState(initialStaff);
  const [managerEmail, setManagerEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "TEACHER" | "CONTEST_MANAGER"
  >("TEACHER");
  const [isAssigning, setIsAssigning] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedEmail = useDebounce(managerEmail, 300);

  useEffect(() => {
    if (debouncedEmail && debouncedEmail.length > 2) {
      searchUsersByEmail(debouncedEmail).then((res) => {
        if (res.success && res.users) {
          setSuggestions(res.users);
          setShowSuggestions(true);
        }
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedEmail]);

  const handleAddStaff = useCallback(async () => {
    if (!managerEmail || !institutionId) return;

    setIsAssigning(true);
    try {
      const res = await addStaffMember({
        email: managerEmail,
        role: selectedRole,
        institutionId,
      });

      if (res.success) {
        toast.success(
          `${
            selectedRole === "TEACHER" ? "Teacher" : "Contest Manager"
          } added successfully`
        );
        setManagerEmail("");
        setShowSuggestions(false);

        // Refresh staff list
        const staffRes = await getInstitutionStaff(institutionId);
        if (staffRes.success && staffRes.staff) {
          setStaff(staffRes.staff);
        }
        router.refresh();
      } else {
        toast.error(res.error || "Failed to add staff member");
      }
    } catch (error) {
      console.error("Add staff error:", error);
      toast.error("Failed to add staff member");
    } finally {
      setIsAssigning(false);
    }
  }, [managerEmail, institutionId, selectedRole, router]);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] transition-colors duration-300 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-2">
              <Building2 className="w-4 h-4" />
              Institution Admin
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
          </div>
          {institutionName && (
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-bold text-sm text-gray-700 dark:text-gray-200">
                {institutionName}
              </span>
            </div>
          )}
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={stats?.students || 0}
            icon={Users}
            trend="+12% this month"
            color="blue"
          />
          <StatCard
            title="Active Teachers"
            value={stats?.teachers || 0}
            icon={GraduationCap}
            trend="Full Staff"
            color="orange"
          />
          <StatCard
            title="Classrooms"
            value={stats?.classrooms || 0}
            icon={BookOpen}
            trend="Active Batches"
            color="purple"
          />
          <StatCard
            title="Managers"
            value={stats?.contestManagers || 0}
            icon={Trophy}
            trend="Contest Control"
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Staff Directory */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-gray-400" />
                Staff Directory
              </h2>
              <span className="px-3 py-1 bg-gray-200 dark:bg-[#262626] text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full">
                {staff.length} Members
              </span>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.length > 0 ? (
                staff.map((member) => (
                  <div
                    key={member.id}
                    className="group flex flex-col p-5 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 dark:hover:shadow-none relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] flex items-center justify-center text-gray-900 dark:text-white font-black text-lg overflow-hidden shadow-sm">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name || ""}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.name?.[0] || member.email[0]
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                          {member.name || "Unnamed User"}
                        </div>
                        <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1">
                          {member.email}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 dark:border-[#1a1a1a] flex items-center justify-between">
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                          member.role === "TEACHER"
                            ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20"
                            : "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20"
                        }`}
                      >
                        {member.role.replace("_", " ")}
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                        Active
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center bg-white dark:bg-[#141414] border border-dashed border-gray-200 dark:border-[#262626] rounded-2xl">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    No staff members found
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Add your first team member to get started
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 md:p-8 shadow-2xl shadow-gray-200/20 dark:shadow-none sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gray-900 dark:bg-white rounded-lg text-white dark:text-black">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-none">
                    Add Staff
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    Invite new members
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 block">
                    Role Assignment
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedRole("TEACHER")}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 border ${
                        selectedRole === "TEACHER"
                          ? "bg-orange-50 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/50 text-orange-700 dark:text-orange-400 shadow-sm"
                          : "bg-gray-50 dark:bg-[#1a1a1a] border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                      }`}
                    >
                      Teacher
                    </button>
                    <button
                      onClick={() => setSelectedRole("CONTEST_MANAGER")}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 border ${
                        selectedRole === "CONTEST_MANAGER"
                          ? "bg-green-50 dark:bg-green-500/20 border-green-200 dark:border-green-500/50 text-green-700 dark:text-green-400 shadow-sm"
                          : "bg-gray-50 dark:bg-[#1a1a1a] border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                      }`}
                    >
                      Manager
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors group-focus-within:text-orange-500" />
                    <input
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      onFocus={() =>
                        managerEmail.length > 2 && setShowSuggestions(true)
                      }
                      placeholder="colleague@institution.edu"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl text-sm font-medium focus:bg-white dark:focus:bg-[#0a0a0a] focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      autoComplete="off"
                    />
                  </div>

                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50 dark:divide-[#262626]">
                      {suggestions.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => {
                            setManagerEmail(user.email);
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors text-left group"
                        >
                          <div>
                            <div className="text-xs font-bold text-gray-900 dark:text-white">
                              {user.name || "User"}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                          <Check className="w-3 h-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddStaff}
                  disabled={isAssigning || !managerEmail}
                  className="w-full py-4 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-gray-200 dark:shadow-none hover:shadow-2xl disabled:opacity-50 disabled:shadow-none translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isAssigning ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    `Add Member`
                  )}
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-1">Secure Access</h3>
                <p className="text-xs text-blue-100 leading-relaxed opacity-90">
                  Members receive immediate access. Institution admins have full
                  revocation rights.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  trend: string;
  color: string;
}) {
  const colorStyles: any = {
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20",
    orange:
      "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20",
    purple:
      "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20",
    green:
      "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20",
  };

  return (
    <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-2xl ${colorStyles[color]} flex items-center justify-center transition-colors border`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#1a1a1a] px-2 py-1 rounded-full uppercase tracking-wide">
            {trend}
          </span>
        )}
      </div>

      <div>
        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          {title}
        </div>
        <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:translate-x-1 transition-transform">
          {value}
        </div>
      </div>
    </div>
  );
}
