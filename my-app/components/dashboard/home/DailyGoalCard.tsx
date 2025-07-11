'use client';

import { ChevronRight, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

interface DailyGoalCardProps {
  currentAmount: number;
  goalAmount: number;
  percentage: number;
}

const DailyGoalCard = ({ 
  currentAmount, 
  goalAmount, 
  percentage 
}: DailyGoalCardProps) => {
  const remaining = goalAmount - currentAmount;
  
  // Datos para PieChart - estructura correcta para indicador de progreso
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  
  const chartData = [
    {
      name: 'completed',
      value: normalizedPercentage,
      fill: '#22C55F'
    },
    {
      name: 'remaining', 
      value: 100 - normalizedPercentage,
      fill: '#E5E5E5'
    }
  ];



  // Determinar color y estado basado en el progreso
  const getProgressStatus = () => {
    if (percentage >= 100) return { color: 'text-green-600', bgColor: 'bg-green-50', status: 'Ziel erreicht!' };
    if (percentage >= 80) return { color: 'text-brand-600', bgColor: 'bg-brand-50', status: 'Fast geschafft!' };
    if (percentage >= 50) return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', status: 'Auf gutem Weg' };
    return { color: 'text-gray-600', bgColor: 'bg-gray-50', status: 'Weiter so!' };
  };

  const progressStatus = getProgressStatus();
  
  return (
    <section className="mb-6">
      <Card className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-50 rounded-lg">
                <Target className="w-4 h-4 text-brand-600" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Tagesziel</h2>
            </div>
            <button className="p-1 hover:bg-muted rounded-lg transition-colors duration-200 tap-highlight-transparent">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Gráfico circular profesional con Recharts */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="85%"
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Contenido central del gráfico */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-foreground">{percentage}%</span>
              </div>
            </div>
            
            {/* Información del objetivo mejorada */}
            <div className="flex-1 space-y-3">
              {/* Amounts */}
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  CHF {currentAmount.toLocaleString('de-CH')}
                  <span className="text-base font-normal text-muted-foreground ml-1">
                    / {goalAmount.toLocaleString('de-CH')}
                  </span>
                </div>
                
                {/* Status badge */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${progressStatus.bgColor} transition-colors duration-300`}>
                  <TrendingUp className={`w-3 h-3 ${progressStatus.color}`} />
                  <span className={`text-xs font-medium ${progressStatus.color}`}>
                    {progressStatus.status}
                  </span>
                </div>
              </div>
              
              {/* Remaining amount */}
              {remaining > 0 && (
                <div className="text-sm text-muted-foreground">
                  Noch CHF {remaining.toLocaleString('de-CH')} zum Ziel
                </div>
              )}
              
              {/* Progress bar */}
              <div className="w-full">
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DailyGoalCard; 