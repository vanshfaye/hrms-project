'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, Clock, Loader2, Edit2, DollarSign, X, Play, LogIn, LogOut, Coffee } from 'lucide-react';
import Link from "next/link"
// Note: UI components like Button, Card, Input, and Select are defined below 
// for this single-file React component structure.

// --- Types ---
interface TimeLogEntry {
  id: string;
  taskName: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  date: string;      // "YYYY-MM-DD"
  duration: number;  // Duration in hours (e.g., 2.5)
  projectId: string; // ID of the project
  isBillable: boolean; // Whether the time is billable
}

interface Project {
  id: string;
  name: string;
}

interface AttendanceRecord {
  date: string;
  clockIn: string | null; // "HH:mm:ss"
  clockOut: string | null; // "HH:mm:ss"
  breakStart: string | null;
  breakEnd: string | null;
  status: 'ClockedOut' | 'ClockedIn' | 'OnBreak';
}

// --- Mock Data & Helpers ---

const MOCK_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'HRMS Phase 1 Development' },
  { id: 'proj-2', name: 'Marketing Campaign Setup' },
  { id: 'proj-3', name: 'Internal Training & Documentation' },
  { id: 'proj-4', name: 'Client X - Project Alpha' },
];

const getProjectName = (id: string): string => 
  MOCK_PROJECTS.find(p => p.id === id)?.name || 'Unknown Project';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getAttendanceTimeString = () => {
    const now = new Date();
    // Return time string in HH:mm:ss format
    return now.toTimeString().substring(0, 8); 
};


const initialTimeLogs: TimeLogEntry[] = [
  { id: 't1', taskName: 'Design component mockups', startTime: '09:00', endTime: '12:00', date: '2025-10-14', duration: 3.0, projectId: 'proj-1', isBillable: true },
  { id: 't2', taskName: 'Team stand-up meeting', startTime: '13:00', endTime: '13:30', date: '2025-10-14', duration: 0.5, projectId: 'proj-3', isBillable: false },
  { id: 't3', taskName: 'Code review for PR #123', startTime: '14:00', endTime: '15:15', date: '2025-10-13', duration: 1.25, projectId: 'proj-4', isBillable: true },
];

const initialAttendance: AttendanceRecord = {
    date: getTodayDateString(),
    clockIn: null,
    clockOut: null,
    breakStart: null,
    breakEnd: null,
    status: 'ClockedOut',
};

// --- Layout Placeholder Components (Simplified for standalone view) ---

const SiteHeader: React.FC = () => (
    <div 
        className="bg-white shadow-sm dark:bg-slate-900 border-b dark:border-slate-800 p-3 flex items-center justify-between h-14" 
    >
        <div className="text-lg font-medium text-slate-900 dark:text-slate-50">Time Logging</div>
    </div>
);


// --- Simplified UI Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'destructive' | 'outline' | 'success', size?: 'default' | 'icon' }> = ({ children, className, variant = 'primary', size = 'default', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  if (variant === 'primary') {
    baseClasses += ' bg-slate-900 text-slate-50 shadow hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200';
  } else if (variant === 'outline') {
    baseClasses += ' border border-slate-200 bg-white shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800';
  } else if (variant === 'destructive') {
    baseClasses += ' bg-red-600 text-white shadow-sm hover:bg-red-700';
  } else if (variant === 'success') {
    baseClasses += ' bg-green-600 text-white shadow-sm hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600';
  }


  if (size === 'default') {
    baseClasses += ' h-10 px-4 py-2';
  } else if (size === 'icon') {
    baseClasses += ' h-9 w-9';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { title: string, className?: string, children: React.ReactNode }> = ({ title, className, children, ...props }) => (
  <div className={`rounded-xl border bg-white text-slate-950 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${className}`} {...props}>
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>
    </div>
    <div className="p-6 pt-0">
      {children}
    </div>
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ${className}`}
    {...props}
  />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...props }) => (
  <select
    className={`flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />
);


// --- Utility Functions ---

/**
 * Calculates the duration between two time strings in "HH:mm" format, in hours.
 */
const calculateDuration = (start: string, end: string): number => {
    if (!start || !end) return 0;
    
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) return 0; // End must be after start

    const diffMinutes = endMinutes - startMinutes;
    return Math.round((diffMinutes / 60) * 100) / 100; // Return rounded to 2 decimal places
};

/**
 * Formats a duration in hours (e.g., 3.5) into a human-readable string (e.g., "3h 30m").
 */
const formatDuration = (hours: number): string => {
    if (hours === 0) return '0h 0m';
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
};

/**
 * Formats total seconds into HH:mm:ss for the running timer.
 */
const formatSeconds = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};


// --- Time Log Main Content Component ---
const TimeLogPageContent: React.FC = () => {
  const today = getTodayDateString();
  const [timeLogs, setTimeLogs] = useState<TimeLogEntry[]>(initialTimeLogs);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For Manual Entry Modal
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false); // For Quick Start/Stop Modal
  
  // States for Manual Entry
  const [newLog, setNewLog] = useState({
    taskName: '',
    date: today, // Default to today
    startTime: '09:00',
    endTime: '17:00',
    projectId: MOCK_PROJECTS[0].id, // Default project
    isBillable: true, // Default billable
  });
  const [loading, setLoading] = useState(false);

  // ATTENDANCE STATES (FIXED FOR HYDRATION)
  // 1. Initialize to a server-safe default
  const [isAttendanceLoaded, setIsAttendanceLoaded] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord>(initialAttendance); 

  // 2. Load client-specific state in useEffect
  useEffect(() => {
    const currentDay = getTodayDateString();

    // Load persisted state from localStorage
    const savedAttendance = localStorage.getItem('todayAttendance');
    if (savedAttendance) {
        const parsed = JSON.parse(savedAttendance) as AttendanceRecord;
        
        if (parsed.date === currentDay) {
            // Data is for today, use it
            setTodayAttendance(parsed);
        } else {
            // Data is old, reset it for today
            setTodayAttendance({ ...initialAttendance, date: currentDay });
            localStorage.removeItem('todayAttendance');
        }
    }
    
    setIsAttendanceLoaded(true);
  }, []); // Run only once on the client side mount

  // 3. Persist Attendance State whenever it changes
  useEffect(() => {
    if (isAttendanceLoaded) { // Only persist if initial load is complete
        localStorage.setItem('todayAttendance', JSON.stringify(todayAttendance));
    }
  }, [todayAttendance, isAttendanceLoaded]);


  // TASK TIMER STATES (NEW)
  const [isRunning, setIsRunning] = useState(false);
  const [timerStart, setTimerStart] = useState<number | null>(null); // Unix timestamp
  const [elapsedTime, setElapsedTime] = useState(0); // In seconds
  const [currentTask, setCurrentTask] = useState({
    taskName: '',
    projectId: MOCK_PROJECTS[0].id,
    isBillable: true,
  });

  // --- Effects ---

  // Timer Tick Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerStart !== null) {
        interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - timerStart) / 1000));
        }, 1000);
    } 
    // Cleanup function
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [isRunning, timerStart]);


  // --- Calculations ---

  // Calculate the duration for the manual entry form preview
  const formDuration = calculateDuration(newLog.startTime, newLog.endTime);

  // Calculate Total Hours Logged for today's date
  const totalHoursToday = useMemo(() => {
    return timeLogs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + log.duration, 0) + (isRunning ? elapsedTime / 3600 : 0); // Include running time
  }, [timeLogs, today, isRunning, elapsedTime]);
  
  // Calculate Billable Rate today
  const billableHoursToday = useMemo(() => {
    const loggedBillable = timeLogs
      .filter(log => log.date === today && log.isBillable)
      .reduce((sum, log) => sum + log.duration, 0);
      
    const runningBillable = isRunning && currentTask.isBillable ? elapsedTime / 3600 : 0;
    
    return loggedBillable + runningBillable;
  }, [timeLogs, today, isRunning, elapsedTime, currentTask.isBillable]);

  const billableRateToday = totalHoursToday > 0 
    ? ((billableHoursToday / totalHoursToday) * 100).toFixed(0) 
    : '0';

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox for boolean value
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
        setNewLog({ ...newLog, [name]: e.target.checked });
    } else {
        setNewLog({ ...newLog, [name]: value });
    }
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.taskName || formDuration <= 0) return;

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newEntry: TimeLogEntry = {
        id: crypto.randomUUID(),
        taskName: newLog.taskName,
        date: newLog.date,
        startTime: newLog.startTime,
        endTime: newLog.endTime,
        duration: formDuration, 
        projectId: newLog.projectId,
        isBillable: newLog.isBillable,
      };

      // Add to logs and sort by date descending
      const updatedLogs = [newEntry, ...timeLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setTimeLogs(updatedLogs);
      
      // Reset form state
      setNewLog({ 
        taskName: '', 
        date: today, 
        startTime: '09:00', 
        endTime: '17:00',
        projectId: MOCK_PROJECTS[0].id,
        isBillable: true,
      });
      setIsDialogOpen(false);
      setLoading(false);
    }, 500);
  };
  
  const handleStartTimer = () => {
    // Open the quick start modal
    setIsTimerModalOpen(true);
  };

  const handleStopTimer = () => {
    if (!timerStart || !currentTask.taskName) return;

    const start = new Date(timerStart);
    const end = new Date();
    
    const startTimeStr = start.toTimeString().substring(0, 5); // HH:mm
    const endTimeStr = end.toTimeString().substring(0, 5);     // HH:mm
    const logDate = start.toISOString().split('T')[0];

    const durationHours = elapsedTime / 3600;

    const newEntry: TimeLogEntry = {
      id: crypto.randomUUID(),
      taskName: currentTask.taskName,
      date: logDate,
      startTime: startTimeStr,
      endTime: endTimeStr,
      duration: Math.round(durationHours * 100) / 100, // Round to 2 decimals
      projectId: currentTask.projectId,
      isBillable: currentTask.isBillable,
    };

    // Save the new entry
    setTimeLogs([newEntry, ...timeLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    // Reset timer state
    setIsRunning(false);
    setTimerStart(null);
    setElapsedTime(0);
    setCurrentTask({ // Reset for the next run
      taskName: '',
      projectId: MOCK_PROJECTS[0].id,
      isBillable: true,
    });
  };

  const handleDelete = (id: string) => {
    // IMPORTANT: In a real canvas environment, DO NOT use window.confirm/alert. Use a custom modal instead.
    if (window.confirm('Are you sure you want to delete this time entry?')) {
        setTimeLogs(timeLogs.filter(log => log.id !== id));
    }
  };
  
  // --- Attendance Handlers ---
  
  const handleClockIn = () => {
    if (todayAttendance.status === 'ClockedOut') {
        setTodayAttendance(prev => ({
            ...prev,
            clockIn: getAttendanceTimeString(),
            status: 'ClockedIn',
        }));
    }
  };

  const handleBreakAction = () => {
    if (todayAttendance.status === 'ClockedIn') {
        // Start Break
        setTodayAttendance(prev => ({
            ...prev,
            breakStart: getAttendanceTimeString(),
            status: 'OnBreak',
        }));
        // If task timer is running, stop it
        if (isRunning) handleStopTimer(); 
        
    } else if (todayAttendance.status === 'OnBreak') {
        // End Break
        setTodayAttendance(prev => ({
            ...prev,
            breakEnd: getAttendanceTimeString(),
            status: 'ClockedIn',
        }));
    }
  };

  const handleClockOut = () => {
    if (todayAttendance.status !== 'ClockedOut') {
        // Stop any running task timer first
        if (isRunning) handleStopTimer();

        setTodayAttendance(prev => ({
            ...prev,
            clockOut: getAttendanceTimeString(),
            status: 'ClockedOut',
            // If the user clocked out while on break, we assume the break ended now too
            breakEnd: prev.status === 'OnBreak' && !prev.breakEnd ? getAttendanceTimeString() : prev.breakEnd
        }));
    }
  };

  // --- Attendance UI Helpers ---
  const isClockedIn = todayAttendance.status !== 'ClockedOut';
  const isOnBreak = todayAttendance.status === 'OnBreak';

  const getStatusText = (): { text: string, color: string } => {
    if (!isAttendanceLoaded) {
      return { text: 'Loading...', color: 'text-blue-500' };
    }
    switch (todayAttendance.status) {
        case 'ClockedIn': return { text: 'Clocked In', color: 'text-green-500' };
        case 'OnBreak': return { text: 'On Break', color: 'text-yellow-500' };
        case 'ClockedOut':
        default:
            return { text: todayAttendance.clockIn ? 'Clocked Out' : 'Ready to Start', color: 'text-slate-500' };
    }
  };
  
  const { text: statusText, color: statusColor } = getStatusText();

  return (
     <div className="min-h-screen bg-gray-50 p-8">
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
        <span className="text-foreground font-semibold">Timelog</span>
      </div>
      
    <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      
      {/* Page Header and Timer Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        {/* <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Time Log & Attendance</h1> */}
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          
          {/* Active Timer Display and Stop Button */}
          {isRunning && (
            <div className="flex items-center space-x-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-xl border border-blue-500/50 w-full sm:w-auto">
              <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{getProjectName(currentTask.projectId)}</span>
                <span className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-50">
                  {formatSeconds(elapsedTime)}
                </span>
              </div>
              <Button 
                onClick={handleStopTimer} 
                variant="destructive" 
                className="shadow-md h-10 px-6 ml-4 flex-shrink-0"
                title="Stop and Save Entry"
              >
                <X className="w-4 h-4 mr-2" /> Stop & Save
              </Button>
            </div>
            
          )}

          {/* Timer Start Button */}
          {!isRunning && (
            <Button 
              onClick={handleStartTimer} 
              variant="success" 
              className="shadow-lg w-full sm:w-auto"
              disabled={!isAttendanceLoaded || !isClockedIn || isOnBreak} // Disabled while loading or if not clocked in/on break
            >
              <Play className="w-4 h-4 mr-2" />
              {!isAttendanceLoaded ? 'Loading...' : ((!isClockedIn || isOnBreak) ? 'Clock In First' : 'Start Task Timer')}
            </Button>
          )}
          
          {/* Manual Log Button (Kept for flexibility) */}
          <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Manual Entry
          </Button>

        </div>
      </div>

      {/* Stats Cards and Attendance Controls (Updated Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 mb-8">
        
        {/* Attendance Status Card (FIXED FOR HYDRATION) */}
        <Card title="Attendance Status" className="col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col justify-between"> 
            <div className="mb-4">
                {isAttendanceLoaded ? (
                  <>
                    <p className={`text-3xl font-extrabold ${statusColor}`}>
                        {statusText}
                    </p>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 space-y-1">
                        {todayAttendance.clockIn && <p>In: <span className="font-mono font-semibold text-slate-900 dark:text-slate-50">{todayAttendance.clockIn.substring(0, 5)}</span></p>}
                        {todayAttendance.clockOut && <p>Out: <span className="font-mono font-semibold text-slate-900 dark:text-slate-50">{todayAttendance.clockOut.substring(0, 5)}</span></p>}
                        {todayAttendance.breakStart && <p>Break: <span className="font-mono font-semibold text-slate-900 dark:text-slate-50">{todayAttendance.breakStart.substring(0, 5)}</span> {todayAttendance.breakEnd ? `(End: ${todayAttendance.breakEnd.substring(0, 5)})` : '(Running)'}</p>}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-xl text-blue-500 font-semibold">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading Attendance...
                  </div>
                )}
            </div>
            
            <div className="flex space-x-2">
                {/* Clock In/Out Button */}
                {!isClockedIn ? (
                    <Button onClick={handleClockIn} variant="success" className="flex-1" disabled={!isAttendanceLoaded}>
                        <LogIn className="w-4 h-4 mr-2" /> Clock In
                    </Button>
                ) : (
                    <Button onClick={handleClockOut} variant="destructive" className="flex-1" disabled={!isAttendanceLoaded}>
                        <LogOut className="w-4 h-4 mr-2" /> Clock Out
                    </Button>
                )}
                
                {/* Break Button */}
                {isClockedIn && (
                    <Button 
                        onClick={handleBreakAction} 
                        variant={isOnBreak ? 'primary' : 'outline'} 
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600 dark:hover:bg-yellow-700"
                        style={{ backgroundColor: isOnBreak ? 'var(--tw-colors-yellow-600)' : undefined }}
                        disabled={!isAttendanceLoaded}
                    >
                        <Coffee className="w-4 h-4 mr-2" /> 
                        {isOnBreak ? 'End Break' : 'Start Break'}
                    </Button>
                )}
            </div>
        </Card>

        {/* Simple Stat Card for Today's Hours */}
        <Card title="Task Hours Today" className="col-span-1"> 
          <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {totalHoursToday.toFixed(2)}h
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Task Time ({formatDuration(totalHoursToday)})
          </p>
        </Card>

        {/* Billable Rate Card (Now dynamic) */}
        <Card title="Billable Rate" className="col-span-1">
          <p className="text-3xl font-extrabold text-green-600">
            {billableRateToday}%
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {billableHoursToday.toFixed(2)} billable hours
          </p>
        </Card>
        
        {/* Mock for Total Entries */}
        <Card title="Total Tasks" className="col-span-1">
          <p className="text-3xl font-extrabold text-blue-500">
            {timeLogs.length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Total recorded tasks
          </p>
        </Card>
      </div>


      {/* Time Log Table */}
      <Card title="Recent Time Entries">
        <div className="overflow-x-auto rounded-lg border dark:border-slate-800">
          <table className="min-w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Project / Task</th>
                <th scope="col" className="px-6 py-3">Task Details</th>
                <th scope="col" className="px-6 py-3">Duration</th>
                <th scope="col" className="px-6 py-3 text-center">Billable</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeLogs.map((log) => (
                <tr key={log.id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                    {log.date === today ? 'Today' : log.date}
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-semibold">
                    {getProjectName(log.projectId)}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{log.taskName}</td>
                  <td className="px-6 py-4">
                    {formatDuration(log.duration)} 
                    <span className="text-xs ml-1 text-slate-400">({log.startTime} - {log.endTime})</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {log.isBillable ? (
                        <span title="Billable">
                        <DollarSign className="w-5 h-5 text-green-500 mx-auto" />
                        </span>
                    ) : (
                        <span title="Non-Billable">
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                        </span>
                    )}
                    </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Button size="icon" variant="outline" title="Edit" className="h-8 w-8">
                      <Edit2 className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleDelete(log.id)} title="Delete" className="h-8 w-8">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {timeLogs.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-b-lg">
              No time entries logged yet.
            </div>
          )}
        </div>
      </Card>

      {/* Quick Start Timer Modal */}
      {isTimerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900 transform transition-all scale-100 duration-300">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-50">Start New Timer</h2>
            
            <div className="space-y-3">
              {/* Project Selection */}
              <div>
                <Label htmlFor="quickProjectId">Project</Label>
                <Select
                  id="quickProjectId"
                  name="projectId"
                  value={currentTask.projectId}
                  onChange={(e) => setCurrentTask({ ...currentTask, projectId: e.target.value })}
                  required
                >
                  {MOCK_PROJECTS.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Task Name */}
              <div>
                <Label htmlFor="quickTaskName">Task Description</Label>
                <Input
                  id="quickTaskName"
                  name="taskName"
                  value={currentTask.taskName}
                  onChange={(e) => setCurrentTask({ ...currentTask, taskName: e.target.value })}
                  placeholder="What are you working on now? (e.g., Implementing API calls)"
                  required
                />
              </div>

              {/* Billable Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                    id="quickIsBillable"
                    name="isBillable"
                    type="checkbox"
                    checked={currentTask.isBillable}
                    onChange={(e) => setCurrentTask({ ...currentTask, isBillable: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
                />
                <Label htmlFor="quickIsBillable" className="select-none">Mark as Billable Time</Label>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button type="button" variant="outline" onClick={() => setIsTimerModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                disabled={!currentTask.taskName}
                onClick={() => {
                  setIsRunning(true);
                  setTimerStart(Date.now());
                  setIsTimerModalOpen(false);
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Tracking
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* Manual Entry Dialog (Original Modal) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900 transform transition-all scale-100 duration-300">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50">Log Manual Time Entry</h2>
            <form onSubmit={handleSubmitManual} className="space-y-4">
              
              {/* Project / Task Selection */}
              <div>
                <Label htmlFor="projectId">Project / Task</Label>
                <Select
                  id="projectId"
                  name="projectId"
                  value={newLog.projectId}
                  onChange={handleInputChange}
                  required
                >
                  {MOCK_PROJECTS.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Task Name */}
              <div>
                <Label htmlFor="taskName">Task Description</Label>
                <Input
                  id="taskName"
                  name="taskName"
                  value={newLog.taskName}
                  onChange={handleInputChange}
                  placeholder="e.g., Working on new feature X"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newLog.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Time Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={newLog.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={newLog.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Billable Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                    id="isBillable"
                    name="isBillable"
                    type="checkbox"
                    checked={newLog.isBillable}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
                />
                <Label htmlFor="isBillable" className="select-none">Mark as Billable Time</Label>
              </div>

              {/* Calculated Duration Preview */}
              <div className="text-sm text-slate-600 dark:text-slate-300 pt-2">
                Calculated duration: <span className={`font-semibold ${formDuration > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatDuration(formDuration)} ({formDuration.toFixed(2)}h)
                </span>
                {formDuration <= 0 && <p className="text-xs text-red-500 mt-1">End time must be after start time.</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading || formDuration <= 0}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  Save Entry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>
    </div>
  );
};


// --- Default Export Component (The Layout Wrapper) ---
const TimeLogPage: React.FC = () => {
    return (
        // The main container now ensures it takes up the full screen height and width
        <div className="flex flex-col min-h-screen w-full font-sans">
            <SiteHeader />
            {/* The main content area is now flex-1 and scrollable */}
            <main className="flex flex-1 overflow-auto">
                <TimeLogPageContent/>
            </main>
        </div>
    );
}

export default TimeLogPage;
