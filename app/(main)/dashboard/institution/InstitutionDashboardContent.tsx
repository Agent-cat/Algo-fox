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
    <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Institution Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Manage your institution&apos;s staff, students, and classrooms
            </p>
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
    <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${colorStyles[color]} flex items-center justify-center transition-colors border`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#1a1a1a] px-2 py-1 rounded-full uppercase tracking-wide">
            {trend}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          {value.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {title}
        </p>
      </div>
    </div>
  );
}
