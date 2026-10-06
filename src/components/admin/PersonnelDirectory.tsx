import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  MoreVertical,
} from 'lucide-react';
import { PlatformPersonnel } from '../../types/platformAdmin';

interface PersonnelDirectoryProps {
  personnel: PlatformPersonnel[];
  onOpenViewPersonnel: (person: PlatformPersonnel) => void;
  onOpenEditPersonnel: (person: PlatformPersonnel) => void;
  onOpenDeletePersonnel: (person: PlatformPersonnel) => void;
  onTogglePersonnelStatus: (person: PlatformPersonnel) => void;
}

export const PersonnelDirectory: React.FC<PersonnelDirectoryProps> = ({
  personnel,
  onOpenViewPersonnel,
  onOpenEditPersonnel,
  onOpenDeletePersonnel,
  onTogglePersonnelStatus,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Requirement: Keep ONLY the single Platform Admin and Market Admins.
  // There is ONLY ONE Platform Admin in the system.
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-visible shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F172A] text-slate-200 uppercase text-xs font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Assigned Market</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {relevantPersonnel.map((person) => {
                const isPlatformAdmin = person.role === 'PLATFORM_ADMIN';
                const isActive = person.status === 'ACTIVE';
                const isMenuOpen = activeMenuId === person.id;

                return (
                  <tr key={person.id} className="even:bg-slate-50/50 hover:bg-slate-100 transition-colors">
                    {/* Name */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                            isPlatformAdmin
                              ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                              : 'bg-teal-50 text-teal-700 border border-teal-200/80'
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
                            {person.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 font-mono ${
                          isPlatformAdmin
                            ? 'border-blue-300 bg-blue-50 text-blue-700'
                            : 'border-teal-300 bg-teal-50 text-teal-700'
                        }`}
                      >
                        {isPlatformAdmin ? (
                          <Shield className="w-3 h-3 text-blue-700" />
                        ) : (
                          <ShieldCheck className="w-3 h-3 text-teal-700" />
                        )}
                        <span>{person.role.replace('_', ' ')}</span>
                      </span>
                    </td>

                    {/* Assigned Market */}
                    <td className="py-4 px-4">
                      {isPlatformAdmin ? (
                        <span className="font-semibold text-slate-700">
                          Central Administration
                        </span>
                      ) : person.assignedMarketName ? (
                        <span className="font-semibold text-slate-800">
                          {person.assignedMarketName}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 font-mono ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {person.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      {isPlatformAdmin ? (
                        /* PLATFORM ADMIN: EXACTLY ONE ACCOUNT - NO DESTRUCTIVE OR SELF-MANAGEMENT ACTIONS */
                        <span
                          className="text-slate-300 font-mono text-base px-3 select-none"
                          title="Central root identity (no self-management actions)"
                        >
                          —
                        </span>
                      ) : (
                        /* MARKET ADMIN: VIEW / EDIT / ACTIVATE-DEACTIVATE / DELETE */
                        <div className="flex items-center justify-end gap-1.5 relative">
                          {/* Quick Icon Actions */}
                          <button
                            type="button"
                            onClick={() => onOpenViewPersonnel(person)}
                            className="p-1.5 text-slate-500 bg-slate-100 hover:text-teal-700 hover:bg-teal-50 border border-slate-200/60 rounded-lg transition-colors cursor-pointer"
                            title="View administrator profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onTogglePersonnelStatus(person)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isActive
                                ? 'text-amber-600 bg-amber-50/70 border-amber-200/60 hover:bg-amber-100'
                                : 'text-emerald-600 bg-emerald-50/70 border-emerald-200/60 hover:bg-emerald-100'
                            }`}
                            title={isActive ? 'Deactivate administrator' : 'Activate administrator'}
                          >
                            {isActive ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenEditPersonnel(person)}
                            className="p-1.5 text-slate-600 bg-slate-100 hover:text-[#1E4E8C] hover:bg-blue-50 border border-slate-200/60 rounded-lg transition-colors cursor-pointer"
                            title="Edit administrator details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenDeletePersonnel(person)}
                            className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/60 rounded-lg transition-colors cursor-pointer"
                            title="Delete administrator"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Action Menu (Kebab ⋮ Dropdown) */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : person.id);
                              }}
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                isMenuOpen
                                  ? 'bg-slate-200 border-slate-300 text-slate-800'
                                  : 'bg-slate-50 border-slate-200/60 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                              }`}
                              title="More actions"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>

                            {isMenuOpen && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setActiveMenuId(null)}
                                />
                                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onOpenViewPersonnel(person);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-sky-600" />
                                    <span>View Details</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onOpenEditPersonnel(person);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-[#1E4E8C]" />
                                    <span>Edit Admin</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onTogglePersonnelStatus(person);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                                  >
                                    {isActive ? (
                                      <>
                                        <XCircle className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Deactivate</span>
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Activate</span>
                                      </>
                                    )}
                                  </button>
                                  <div className="my-1 border-t border-slate-100" />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      onOpenDeletePersonnel(person);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                    <span>Delete Admin</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
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
