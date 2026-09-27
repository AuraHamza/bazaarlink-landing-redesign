import React from 'react';
import { ShieldCheck, Shield } from 'lucide-react';
import { PlatformPersonnel } from '../../types/platformAdmin';

interface PersonnelDirectoryProps {
  personnel: PlatformPersonnel[];
}

export const PersonnelDirectory: React.FC<PersonnelDirectoryProps> = ({
  personnel,
}) => {
  // Requirement: Keep ONLY the single Platform Admin and Market Admins.
  // There is ONLY ONE Platform Admin in the system.
  // Do NOT add Shop Admin management.
  const relevantPersonnel = personnel.filter(
    (p) => p.role === 'PLATFORM_ADMIN' || p.role === 'MARKET_ADMIN'
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-['Lexend']">
            PERSONNEL DIRECTORY
          </h2>
          <p className="text-xs text-slate-500">
            Administrative personnel governing BazaarLink (Platform Admin & Market Admins)
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Total: <strong className="text-slate-800">{relevantPersonnel.length} Personnel Member{relevantPersonnel.length === 1 ? '' : 's'}</strong>
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Assigned Market</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {relevantPersonnel.map((person) => {
                const isPlatformAdmin = person.role === 'PLATFORM_ADMIN';

                return (
                  <tr key={person.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                            isPlatformAdmin
                              ? 'bg-blue-50 text-[#1E4E8C] border border-blue-200'
                              : 'bg-teal-50 text-[#2EC4B6] border border-teal-200'
                          }`}
                        >
                          {person.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 font-['Lexend'] text-sm block">
                            {person.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {person.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                      {person.email}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                          isPlatformAdmin
                            ? 'bg-blue-50 text-[#1E4E8C] border-blue-200'
                            : 'bg-teal-50 text-teal-700 border-teal-200'
                        }`}
                      >
                        {isPlatformAdmin ? (
                          <Shield className="w-3 h-3 text-[#1E4E8C]" />
                        ) : (
                          <ShieldCheck className="w-3 h-3 text-[#2EC4B6]" />
                        )}
                        <span>{person.role.replace('_', ' ')}</span>
                      </span>
                    </td>

                    {/* Assigned Market */}
                    <td className="py-4 px-4">
                      {person.assignedMarketName ? (
                        <span className="font-semibold text-slate-800">
                          {person.assignedMarketName}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          {isPlatformAdmin ? 'All Metros (Central Oversight)' : 'Unassigned'}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          person.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {person.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
