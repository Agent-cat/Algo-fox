"use client";

import React, { useEffect, useState } from 'react';
import {
  OverviewData,
  TagMasteryData,
  HeatmapData,
  DifficultyData,
  RiskData,
  AssignmentAnalyticsData,
  ContestAnalyticsData,
  AnalyticsError,
} from '@/lib/analytics/types';
import {
  getOverviewAnalytics,
  getTagMasteryAnalytics,
  getHeatmapAnalytics,
  getDifficultyAnalytics,
  getRiskAnalytics,
  getAssignmentAnalytics,
  getContestAnalytics,
} from '@/actions/classroom-analytics';
import { OverviewPanel } from './OverviewPanel';
import { TagMasterySection } from './TagMasterySection';
import { StudentHeatmap } from './StudentHeatmap';
import { DifficultyAnalysis } from './DifficultyAnalysis';
import { RiskStudentsList } from './RiskStudentsList';
import { AssignmentAnalytics } from './AssignmentAnalytics';
import { ContestAnalytics } from './ContestAnalytics';

interface AnalyticsDashboardProps {
  classroomId: string;
}

export function AnalyticsDashboard({ classroomId }: AnalyticsDashboardProps) {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(true);

  const [tagMastery, setTagMastery] = useState<TagMasteryData | null>(null);
  const [loadingTagMastery, setLoadingTagMastery] = useState(true);

  const [heatmap, setHeatmap] = useState<HeatmapData | null>(null);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);

  const [difficulty, setDifficulty] = useState<DifficultyData | null>(null);
  const [loadingDifficulty, setLoadingDifficulty] = useState(true);

  const [risk, setRisk] = useState<RiskData | null>(null);
  const [loadingRisk, setLoadingRisk] = useState(true);

  const [assignments, setAssignments] = useState<AssignmentAnalyticsData | null>(null);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  const [contests, setContests] = useState<ContestAnalyticsData | null>(null);
  const [loadingContests, setLoadingContests] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Overview
    getOverviewAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setOverview(res);
        setLoadingOverview(false);
      }
    });

    // Tag Mastery
    getTagMasteryAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setTagMastery(res);
        setLoadingTagMastery(false);
      }
    });

    // Heatmap
    getHeatmapAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setHeatmap(res);
        setLoadingHeatmap(false);
      }
    });

    // Difficulty
    getDifficultyAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setDifficulty(res);
        setLoadingDifficulty(false);
      }
    });

    // Risk
    getRiskAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setRisk(res);
        setLoadingRisk(false);
      }
    });

    // Assignments
    getAssignmentAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setAssignments(res);
        setLoadingAssignments(false);
      }
    });

    // Contests
    getContestAnalytics(classroomId).then((res) => {
      if (isMounted) {
        if ('success' in res && res.success) setContests(res);
        setLoadingContests(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [classroomId]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 1. Overview Strip */}
      <OverviewPanel data={overview} isLoading={loadingOverview} />

      {/* 2. Tag Mastery Section */}
      <TagMasterySection data={tagMastery} isLoading={loadingTagMastery} />

      {/* 3. Student Heatmap Matrix */}
      <StudentHeatmap data={heatmap} isLoading={loadingHeatmap} />

      {/* 4. Difficulty Breakdown */}
      <DifficultyAnalysis data={difficulty} isLoading={loadingDifficulty} />

      {/* 5. At-Risk Students List */}
      <RiskStudentsList data={risk} isLoading={loadingRisk} />

      {/* 6. Assignment Analytics */}
      <AssignmentAnalytics data={assignments} classroomId={classroomId} isLoading={loadingAssignments} />

      {/* 7. Contest Analytics */}
      <ContestAnalytics data={contests} isLoading={loadingContests} />
    </div>
  );
}
