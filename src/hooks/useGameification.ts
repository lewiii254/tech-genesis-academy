
import { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GameificationState {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalPoints: number;
  achievements: Achievement[];
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-login',
    title: 'Welcome Aboard!',
    description: 'Complete your first login',
    icon: '🎉',
    unlocked: false
  },
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: 'Maintain a 3-day study streak',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'streak-30',
    title: 'Dedication Master',
    description: 'Maintain a 30-day study streak',
    icon: '👑',
    unlocked: false
  },
  {
    id: 'points-1000',
    title: 'Point Collector',
    description: 'Earn 1000 points',
    icon: '💎',
    unlocked: false
  }
];

export const useGameification = () => {
  const [gameState, setGameState] = useState<GameificationState>(() => {
    const saved = localStorage.getItem('gameification-state');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      totalPoints: 2450, // Starting with existing points from design
      achievements: initialAchievements
    };
  });

  useEffect(() => {
    localStorage.setItem('gameification-state', JSON.stringify(gameState));
  }, [gameState]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (gameState.lastStudyDate === today) {
      return; // Already studied today
    }

    let newStreak = gameState.currentStreak;
    
    if (gameState.lastStudyDate === yesterday) {
      newStreak = gameState.currentStreak + 1;
    } else {
      newStreak = 1; // Reset streak if missed a day
    }

    setGameState(prev => ({
      ...prev,
      currentStreak: newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak),
      lastStudyDate: today
    }));

    // Check for new achievements
    checkAchievements(newStreak, gameState.totalPoints);
    addPoints(10); // 10 points for daily study
  };

  const addPoints = (points: number) => {
    setGameState(prev => {
      const newTotal = prev.totalPoints + points;
      checkAchievements(prev.currentStreak, newTotal);
      return {
        ...prev,
        totalPoints: newTotal
      };
    });
  };

  const checkAchievements = (streak: number, points: number) => {
    setGameState(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        
        switch (achievement.id) {
          case 'first-login':
            shouldUnlock = true;
            break;
          case 'streak-3':
            shouldUnlock = streak >= 3;
            break;
          case 'streak-7':
            shouldUnlock = streak >= 7;
            break;
          case 'streak-30':
            shouldUnlock = streak >= 30;
            break;
          case 'points-1000':
            shouldUnlock = points >= 1000;
            break;
        }

        if (shouldUnlock) {
          return {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date()
          };
        }

        return achievement;
      })
    }));
  };

  return {
    gameState,
    updateStreak,
    addPoints,
    checkAchievements
  };
};
