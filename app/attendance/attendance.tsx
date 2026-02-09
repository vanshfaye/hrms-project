import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Clock,
  TrendingUp,
  Award,
  User,
  Briefcase,
  Bell,
  Database,
  CheckCircle,
  XCircle,
  Webcam,
  Zap,
  Calendar,
  DollarSign,
  Users,
  Target,
  Info
} from 'lucide-react';
import Link from "next/link";

// --- INTERFACES (TypeScript Definitions) ---
interface AttendanceRecord {
  type: 'Clock In' | 'Clock Out';
  time: string;
  timestamp: string;
  overtime: number;
}

interface Team {
  name: string;
  punctualityScore: number;
  top: boolean;
}

interface AttendanceClockProps {
  onCheckInAttempt: (type: 'Clock In' | 'Clock Out', scanSuccess: boolean) => void;
}

interface AnalyticsDashboardProps {
  monthlyAttendance: number[];
  performanceScore: number;
}

interface RecordsProps {
  records: AttendanceRecord[];
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

interface RewardsSectionProps {
  perfectStreakDays: number;
  badges: string[];
  teams: Team[];
}

type ClockStatus = 'ready' | 'scanning' | 'success' | 'error';

// --- MOCK DATA ---
const MOCK_USER = {
  id: 'emp-007',
  name: 'Dev',
  team: 'Product Innovation',
  shift: '9:00 AM - 6:00 PM',
  performanceScore: 92,
  perfectStreakDays: 35,
  badges: ['Punctual Pioneer', 'Early Bird', 'Consistency Champion'],
  monthlyAttendance: [8, 7, 8, 9, 8, 7, 8, 8, 9, 8, 7, 8, 8, 9, 8, 7, 8, 8, 9, 8, 7, 8],
};

const MOCK_TEAMS: Team[] = [
  { name: 'Product Innovation', punctualityScore: 95, top: true },
  { name: 'Operations Squad', punctualityScore: 88, top: false },
  { name: 'Marketing Masters', punctualityScore: 92, top: false },
];

const getCurrentTime = (): string =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

const getOvertimeHours = (records: AttendanceRecord[]): string => {
  let totalOvertime: number = 0;
  records.forEach((r: AttendanceRecord) => {
    if (r.type === 'Clock Out' && r.overtime > 0) {
      totalOvertime += r.overtime;
    }
  });
  return totalOvertime.toFixed(2);
};

// --- COMPONENTS ---
const Notification: React.FC<NotificationProps> = ({ message, type, onDismiss }) => {
  const baseClasses =
    "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center transition-all duration-300 transform";

  let icon;
  let colorClasses;

  switch (type) {
    case 'success':
      icon = <CheckCircle className="w-6 h-6 mr-3" />;
      colorClasses = "bg-green-100 text-green-800 border-l-4 border-green-500";
      break;
    case 'error':
      icon = <XCircle className="w-6 h-6 mr-3" />;
      colorClasses = "bg-red-100 text-red-800 border-l-4 border-red-500";
      break;
    case 'info':
    default:
      icon = <Info className="w-6 h-6 mr-3" />;
      colorClasses = "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
      break;
  }

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      {icon}
      <span className="font-medium text-sm sm:text-base">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-4 text-lg font-bold hover:text-gray-600 transition-colors"
      >
        &times;
      </button>
    </div>
  );
};

const AttendanceClock: React.FC<AttendanceClockProps> = ({ onCheckInAttempt }) => {
  const [status, setStatus] = useState<ClockStatus>('ready');
  const [displayTime, setDisplayTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setDisplayTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleScan = () => {
    setStatus('scanning');
    setTimeout(() => {
      const scanSuccess = Math.random() < 0.9;
      if (scanSuccess) {
        setStatus('success');
        onCheckInAttempt('Clock In', true);
      } else {
        setStatus('error');
        onCheckInAttempt('Clock In', false);
      }
      setTimeout(() => setStatus('ready'), 3000);
    }, 1500);
  };

  const statusMap: Record<ClockStatus, { text: string; icon: React.ReactNode; color: string }> = {
    ready: { text: "Ready to Scan", icon: <Webcam className="w-10 h-10 text-indigo-400" />, color: 'text-indigo-600' },
    scanning: { text: "Scanning Face...", icon: <Zap className="w-10 h-10 animate-pulse text-yellow-400" />, color: 'text-yellow-600' },
    success: { text: "Verified! Welcome.", icon: <CheckCircle className="w-10 h-10 text-green-400" />, color: 'text-green-600' },
    error: { text: "Verification Failed. Try Again.", icon: <XCircle className="w-10 h-10 text-red-400" />, color: 'text-red-600' },
  };

  const currentStatus = statusMap[status];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100 flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center"><Clock className="w-5 h-5 mr-2" /> Smart Clock-In</h2>
      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <div className="text-center">
          {currentStatus.icon}
          <p className={`mt-2 font-semibold ${currentStatus.color}`}>{currentStatus.text}</p>
        </div>
      </div>
      <button
        onClick={handleScan}
        disabled={status !== 'ready'}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${status === 'ready'
          ? 'bg-gray-600 text-white hover:bg-gray-700 shadow-md'
          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
      >
        {status === 'ready' ? 'Check In via Face Scan' : 'Processing...'}
      </button>
      <p className="text-sm text-gray-600 mt-2">Current Time: {displayTime || 'Loading...'}</p>
      <p className="text-xs text-gray-800 mt-1 font-medium">Facial Recognition powered by AI.</p>
    </div>
  );
};

// --- Analytics Dashboard ---
const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ monthlyAttendance, performanceScore }) => {
  const avgAttendance = useMemo((): string => {
    const totalHours = monthlyAttendance.reduce((sum: number, h: number) => sum + h, 0);
    return (totalHours / monthlyAttendance.length).toFixed(1);
  }, [monthlyAttendance]);

  const attendancePercentage = useMemo((): string => {
    const maxHours = monthlyAttendance.length * 8;
    const totalHours = monthlyAttendance.reduce((sum: number, h: number) => sum + h, 0);
    return ((totalHours / maxHours) * 100).toFixed(1);
  }, [monthlyAttendance]);

  return (
    <div className="col-span-1 lg:col-span-2 p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" /> Analytics & Insights
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Monthly Attendance Trend (Hours)</h3>
        <div className="flex items-end h-24 space-x-0.5 border-b border-gray-300 pb-1">
          {monthlyAttendance.map((hours: number, index: number) => (
            <div
              key={index}
              style={{ height: `${(hours / 10) * 100}%` }}
              className="w-full bg-indigo-400 hover:bg-indigo-600 transition-all duration-300 rounded-t-sm relative group"
            >
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {hours}h
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 pt-1">
          <span>Day 1</span>
          <span>Day {monthlyAttendance.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Attendance Percentage</p>
          <p className="text-3xl font-extrabold text-gray-800">{attendancePercentage}%</p>
          <p className="text-xs text-gray-600 mt-1">Based on standard 8-hour shift.</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Attendance vs. Performance</p>
          <div className="flex items-center mt-1">
            <div className="mr-4 text-xl font-extrabold text-gray-800">{avgAttendance}h Avg.</div>
            <div className="text-xl font-extrabold text-gray-800">{performanceScore} Score</div>
          </div>
          <p className="text-xs text-gray-600 mt-1">High correlation with output (Target: {'>'}90)</p>
        </div>
      </div>
    </div>
  );
};

// --- Rewards Section ---
const RewardsSection: React.FC<RewardsSectionProps> = ({ perfectStreakDays, badges, teams }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
    <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center"><Award className="w-5 h-5 mr-2" /> Recognition & Rewards</h2>
    <div className="bg-yellow-50 p-4 rounded-lg mb-4 flex justify-between items-center border border-gray-400">
      <div>
        <p className="text-sm font-medium text-gray-600">Perfect Attendance Streak</p>
        <p className="text-3xl font-extrabold text-gray-800">{perfectStreakDays} Days</p>
      </div>
      <Calendar className="w-8 h-8 text-gray-800" />
    </div>

    <h3 className="text-lg font-semibold text-gray-600 mb-3">My Digital Badges</h3>
    <div className="flex flex-wrap gap-3 mb-6">
      {badges.map((badge: string, index: number) => (
        <div key={index} className="flex items-center p-2 bg-green-100 rounded-full text-sm font-medium text-gray-800 shadow-sm">
          <span className="text-xl mr-2">⭐</span>
          {badge}
        </div>
      ))}
    </div>

    <h3 className="text-lg font-semibold text-gray-600 mb-3 flex items-center"><Users className="w-5 h-5 mr-2" /> Top Punctual Teams</h3>
    <div className="space-y-2">
      {teams.sort((a: Team, b: Team) => b.punctualityScore - a.punctualityScore).map((team: Team, index: number) => (
        <div key={index} className={`p-3 rounded-lg flex justify-between items-center ${team.top ? 'bg-indigo-50 border-2 border-indigo-100' : 'bg-gray-50'}`}>
          <span className="font-medium text-gray-600">
            {index + 1}. {team.name} {team.top && <span className="text-xs ml-1 bg-indigo-100 text-gray-600 px-2 py-0.5 rounded-full">Top!</span>}
          </span>
          <span className="font-bold text-gray-800">{team.punctualityScore}%</span>
        </div>
      ))}
    </div>
  </div>
);

// --- Payroll Integration ---
const PayrollIntegration: React.FC<RecordsProps> = ({ records }) => {
  const totalOvertime = getOvertimeHours(records);
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-xl font-bold text-gray-600 mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" /> Payroll & Project Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Auto-Calculated Overtime</p>
          <p className="text-3xl font-extrabold text-gray-800 mt-1">{totalOvertime} Hrs</p>
          <p className="text-xs text-gray-600 mt-1">Ready for payroll feed.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Project Time Allocation</p>
          <p className="text-3xl font-extrabold text-gray-800 mt-1">45.5 Hrs</p>
          <p className="text-xs text-gray-600 mt-1">Auto-logged to 'Project Phoenix'.</p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg text-sm">
        <p className="font-semibold text-gray-600">Integration Status:</p>
        <p className="text-gray-600 mt-1 flex items-center">
          <Database className="w-4 h-4 mr-2 text-green-600" />
          Attendance data successfully synced with Payroll & Project systems.
        </p>
      </div>
    </div>
  );
};

// --- Daily Summary Notification ---
const DailySummaryNotification: React.FC<RecordsProps> = ({ records }) => {
  const todayRecords: AttendanceRecord[] = records.filter(
    (r: AttendanceRecord) => new Date(r.timestamp).toDateString() === new Date().toDateString()
  );
  const lastCheckIn = todayRecords.find((r: AttendanceRecord) => r.type === 'Clock In')?.time;
  const lastCheckOut = todayRecords.find((r: AttendanceRecord) => r.type === 'Clock Out')?.time;
  if (!lastCheckIn) return null;
  return (
    <div className="p-4 bg-blue-100 rounded-xl shadow-md border border-blue-200 flex items-center justify-between mt-4">
      <div className="flex items-center">
        <Bell className="w-6 h-6 text-green-600 mr-3 animate-bounce" />
        <div>
          <p className="font-bold text-green-600">Daily Summary Notification (Simulated Email)</p>
          <p className="text-sm text-green-600">
            Today's Check In: <span className="font-mono">{lastCheckIn || 'N/A'}</span>.
            {lastCheckOut && <> Check Out: <span className="font-mono">{lastCheckOut}</span>.</>}
          </p>
        </div>
      </div>
      <button className="text-green-600 hover:text-green-800 text-sm font-medium">Dismiss</button>
    </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { type: 'Clock In', time: '08:55 AM', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), overtime: 0 },
    { type: 'Clock Out', time: '06:10 PM', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), overtime: 0.17 },
    { type: 'Clock In', time: '08:58 AM', timestamp: new Date().toISOString(), overtime: 0 },
  ]);

  const [currentNotification, setCurrentNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);

  const clearNotification = useCallback(() => {
    if (notificationTimeout) clearTimeout(notificationTimeout);
    setCurrentNotification(null);
    setNotificationTimeout(null);
  }, [notificationTimeout]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    clearNotification();
    setCurrentNotification({ message, type });
    const timeout = setTimeout(() => setCurrentNotification(null), 3000);
    setNotificationTimeout(timeout);
  }, [clearNotification]);

  const handleClockAttempt = useCallback((type: 'Clock In' | 'Clock Out', scanSuccess: boolean) => {
    if (!scanSuccess) {
      showNotification("Face verification failed. Please retry.", "error");
      return;
    }

    const now = new Date();
    const newRecord: AttendanceRecord = {
      type,
      time: getCurrentTime(),
      timestamp: now.toISOString(),
      overtime: type === 'Clock Out' && now.getHours() > 18 ? (now.getHours() + now.getMinutes() / 60 - 18) : 0,
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    showNotification(`${type} successful at ${newRecord.time}`, "success");
  }, [showNotification]);

  const todayRecords: AttendanceRecord[] = useMemo(() =>
    attendanceRecords.filter((r: AttendanceRecord) => new Date(r.timestamp).toDateString() === new Date().toDateString()),
    [attendanceRecords]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center text-lg text-muted-foreground px-5 py-3 bg-card rounded-xl shadow-sm border border-border mb-6">
        <Link href="/hrms" className="font-medium hover:text-primary transition-colors">
          HRMS
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/hrms/ess" className="font-medium hover:text-primary transition-colors">
         Other
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground font-semibold">Attendance</span>
      </div>

      {currentNotification && (
        <Notification
          message={currentNotification.message}
          type={currentNotification.type}
          onDismiss={clearNotification}
        />
      )}

      {/* <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-600 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 text-gray-600" />
          Smart Attendance Portal
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          Welcome, <strong>{MOCK_USER.name}</strong> ({MOCK_USER.team})
        </p>
      </header> */}

      <DailySummaryNotification records={attendanceRecords} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMN 1: Check-In and User Info */}
        <div className="lg:col-span-1 space-y-8">
          <AttendanceClock onCheckInAttempt={handleClockAttempt} />

          {/* Quick Info */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" /> Employee Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-600" /> Team:
                <span className="font-semibold ml-1">{MOCK_USER.team}</span>
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-600" /> Shift:
                <span className="font-semibold ml-1">{MOCK_USER.shift}</span>
              </p>
              <p className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-gray-600" /> Current Status:
                {todayRecords.length === 0 && <span className="ml-1 text-red-500 font-semibold">Not Checked In</span>}
                {todayRecords.length === 1 && <span className="ml-1 text-green-500 font-semibold">Working</span>}
                {todayRecords.length >= 2 && <span className="ml-1 text-gray-500 font-semibold">Checked Out</span>}
              </p>
            </div>
          </div>

          <PayrollIntegration records={attendanceRecords} />
        </div>

        {/* COLUMN 2 & 3: Analytics, Rewards, and Log */}
        <div className="lg:col-span-2 space-y-8">
          <AnalyticsDashboard
            monthlyAttendance={MOCK_USER.monthlyAttendance}
            performanceScore={MOCK_USER.performanceScore}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <RewardsSection
              perfectStreakDays={MOCK_USER.perfectStreakDays}
              badges={MOCK_USER.badges}
              teams={MOCK_TEAMS}
            />

            {/* Attendance Log */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" /> Today's Log
              </h2>
              <div className="space-y-3">
                {todayRecords.map((record: AttendanceRecord, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-400"
                  >
                    <span className={`font-semibold ${record.type === 'Clock In' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.type}
                    </span>
                    <span className="font-mono text-gray-700">{record.time}</span>
                    {record.overtime > 0 && (
                      <span className="text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-full">
                        +{record.overtime} OT
                      </span>
                    )}
                  </div>
                ))}
                {todayRecords.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No records yet. Please Check In.</p>
                )}
              </div>
              {todayRecords.some((r: AttendanceRecord) => r.type === 'Clock In') &&
                !todayRecords.some((r: AttendanceRecord) => r.type === 'Clock Out') && (
                  <button
                    onClick={() => handleClockAttempt('Clock Out', true)}
                    className="w-full mt-4 py-2 px-4 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                  >
                    Clock Out
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
